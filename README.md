# 🎬 Reels

A modern video-sharing platform built with Next.js, allowing users to upload, view, and interact with short-form videos.

## 📋 Overview

Reels is a web application inspired by popular short-form video platforms like TikTok, Instagram Reels, and YouTube Shorts. It provides a seamless experience for users to discover, create, and share video content.

---

![Reels Preview](https://img.enacton.com/ShareX/2025/05/kOmmhtszfE.png)

![Reels Preview](https://img.enacton.com/ShareX/2025/05/YrxACwB7VD.png)

![Reels Preview](https://img.enacton.com/ShareX/2025/05/mRdug43V1X.png)

## ✨ Features

- **🔐 User Authentication**: Secure login and registration system
- **📤 Video Upload**: Easy-to-use interface for uploading videos (powered by ImageKit.io)
- **🔍 Video Browsing**: Discover and watch videos from other users
- **📱 Responsive Design**: Works on desktop and mobile devices
- **🔄 API Integration**: RESTful API endpoints for frontend-backend communication

## 🛠️ Tech Stack

- **Frontend**: Next.js, React
- **Backend**: Next.js API Routes
- **Database**: MongoDB (with Mongoose)
- **Authentication**: JWT (JSON Web Tokens)
- **Styling**: Tailwind CSS
- **Media Handling**: ImageKit.io for video storage and processing
- **Deployment**: Vercel

## 📂 Project Structure

```
reels/
├── app/                  # Main application code (Next.js App Router)
│   ├── api/              # API endpoints
│   ├── components/       # Reusable UI components
│   ├── fonts/            # Custom fonts
│   ├── login/            # Authentication pages
│   ├── register/         # User registration
│   ├── upload/           # Video upload functionality
│   └── videos/           # Video display/management
├── lib/                  # Utility functions and libraries
├── models/               # Database models
└── public/               # Static assets
```

## 🚀 Getting Started

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Yash-Tibadiya/Reels.git
   cd reels
   ```

2. Install dependencies:
   ```bash
   bun install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following variables:
   ```
   # MongoDB Configuration
   MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/

   # Authentication
   NEXTAUTH_SECRET=your_nextauth_secret_here

   # ImageKit Configuration
   NEXT_PUBLIC_PUBLIC_KEY=your_imagekit_public_key_here
   IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key_here
   NEXT_PUBLIC_URL_ENDPOINT=your_imagekit_url_endpoint_here
   ```

4. Run the development server:
   ```bash
   bun run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 📝 Usage

1. Register a new account or log in with existing credentials
2. Browse videos on the home page
3. Upload your own videos through the upload page

## 🎥 Video Upload with ImageKit.io

For video uploads, we utilize ImageKit.io's powerful media management solution. This provides:

- Fast and reliable video storage
- Automatic transcoding to different qualities
- Global CDN for quick loading worldwide
- Bandwidth optimization
- Advanced media transformation capabilities

Our integration with ImageKit.io ensures a smooth upload experience while maintaining high-quality video playback across all devices.


## 🏃 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- Next.js team for the amazing framework
- MongoDB for database solutions
- ImageKit.io for video hosting services
- All our contributors and supporters