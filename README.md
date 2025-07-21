# iOS App Installer - Vercel Edition 🚀

A serverless iOS app distribution platform built for Vercel. Upload your IPA files and get instant installation links with QR codes for easy distribution.

## Features ✨

- 📱 **IPA Upload**: Drag-and-drop interface for iOS app files
- 🔗 **Instant Install Links**: Generate `itms-services://` links for direct iOS installation
- 📊 **QR Codes**: Automatic QR code generation for easy sharing
- ☁️ **Vercel Blob Storage**: Reliable cloud storage for your IPA files
- ⚡ **Serverless**: Runs on Vercel's edge network for fast, global access
- 🎨 **Beautiful UI**: Modern, responsive design that works on all devices

## Quick Start 🏃‍♂️

### Deploy to Vercel (Automatic Deployment)

1. Click the button below to deploy directly to Vercel:

   [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/mrmoe28/appshare)

2. Follow the prompts to:
   - Connect your GitHub account
   - Clone the repository
   - Deploy the project

3. Once deployed, Vercel will automatically:
   - Set up Blob storage
   - Configure serverless functions
   - Enable automatic deployments on git push

### Manual Setup

1. Clone the repository:
   ```bash
   git clone git@github.com:mrmoe28/appshare.git
   cd appshare
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

4. Deploy to Vercel:
   ```bash
   vercel --prod
   ```

## Automatic Deployment 🔄

This project is configured for automatic deployment:

- **Production**: Push to `main` branch → Automatic deployment to production
- **Preview**: Create a pull request → Get a preview deployment URL
- **Rollback**: Use Vercel dashboard to instantly rollback to previous versions

### GitHub Integration Setup

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Import your GitHub repository
3. Vercel will automatically detect the configuration
4. Every push will trigger a new deployment

## Usage 📱

1. **Upload IPA**:
   - Visit your deployed URL
   - Drag and drop your `.ipa` file
   - Fill in app details (name, bundle ID, version)

2. **Generate Link**:
   - Click "Upload & Generate Install Link"
   - Wait for processing

3. **Share**:
   - Share the install link directly
   - Use the QR code for easy scanning
   - Users can install directly on their iOS devices

## Configuration ⚙️

### Environment Variables

No environment variables required! Vercel Blob storage is automatically configured.

### Vercel Configuration

The `vercel.json` file configures:
- Serverless function settings
- Routing rules
- Maximum execution time (30 seconds for uploads)

## Project Structure 📁

```
appshare/
├── api/
│   └── upload.js      # Serverless upload handler
├── index.html         # Frontend interface
├── package.json       # Dependencies
├── vercel.json        # Vercel configuration
└── README.md          # This file
```

## API Endpoints 🛠️

### POST `/api/upload`

Upload an IPA file and generate installation links.

**Request:**
- Method: `POST`
- Content-Type: `multipart/form-data`
- Fields:
  - `ipa`: IPA file (required)
  - `appName`: App display name
  - `bundleId`: iOS bundle identifier
  - `version`: App version

**Response:**
```json
{
  "success": true,
  "installLink": "itms-services://...",
  "plistUrl": "https://...",
  "ipaUrl": "https://...",
  "appName": "My App",
  "bundleId": "com.example.app",
  "version": "1.0.0"
}
```

## Development 💻

Run locally with Vercel CLI:

```bash
npm run dev
# or
vercel dev
```

This will simulate the Vercel environment locally.

## Security Notes 🔒

- All uploads are public by default
- Consider implementing authentication for private apps
- IPA files are stored in Vercel Blob Storage
- HTTPS is required for iOS installations

## Troubleshooting 🔧

### Common Issues

1. **"Unable to install app"**
   - Ensure the IPA is properly signed
   - Check that the device is provisioned for the app
   - Verify HTTPS is being used

2. **Upload fails**
   - Check file size (Vercel has limits based on your plan)
   - Ensure the file is a valid IPA

3. **QR code not working**
   - iOS Camera app should recognize install links
   - Try opening in Safari first

## Contributing 🤝

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License 📄

This project is open source and available under the [MIT License](LICENSE).

## Support 💬

- Create an issue on GitHub
- Check existing issues for solutions
- Contributions welcome!

---

Built with ❤️ for the iOS development community