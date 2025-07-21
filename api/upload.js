import formidable from 'formidable';
import { put } from '@vercel/blob';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const form = formidable();
  
  try {
    const [fields, files] = await form.parse(req);
    const file = Array.isArray(files.ipa) ? files.ipa[0] : files.ipa;
    
    if (!file) {
      return res.status(400).json({ error: 'No IPA file uploaded' });
    }

    const appName = fields.appName?.[0] || 'YourApp';
    const bundleId = fields.bundleId?.[0] || 'com.example.app';
    const version = fields.version?.[0] || '1.0.0';
    
    // Upload IPA to Vercel Blob
    const timestamp = Date.now();
    const ipaFilename = `${timestamp}.ipa`;
    
    const ipaBlob = await put(ipaFilename, file, {
      access: 'public',
      contentType: 'application/octet-stream',
    });

    // Generate plist content
    const plist = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>items</key>
  <array>
    <dict>
      <key>assets</key>
      <array>
        <dict>
          <key>kind</key>
          <string>software-package</string>
          <key>url</key>
          <string>${ipaBlob.url}</string>
        </dict>
      </array>
      <key>metadata</key>
      <dict>
        <key>bundle-identifier</key>
        <string>${bundleId}</string>
        <key>bundle-version</key>
        <string>${version}</string>
        <key>kind</key>
        <string>software</string>
        <key>title</key>
        <string>${appName}</string>
      </dict>
    </dict>
  </array>
</dict>
</plist>`;

    // Upload plist to Vercel Blob
    const plistFilename = `${timestamp}.plist`;
    const plistBlob = await put(plistFilename, plist, {
      access: 'public',
      contentType: 'application/xml',
    });

    const installLink = `itms-services://?action=download-manifest&url=${plistBlob.url}`;
    
    res.status(200).json({ 
      success: true,
      installLink,
      plistUrl: plistBlob.url,
      ipaUrl: ipaBlob.url,
      appName,
      bundleId,
      version
    });
    
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Failed to process upload' });
  }
}