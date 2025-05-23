"use client";

import { Video } from "lucide-react";
import VideoUploadForm from "../components/VideoUploadForm";

export default function VideoUploadPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-2xl border border-white/10 backdrop-blur-sm mb-6">
              <Video className="w-8 h-8 text-white" />
            </div>

            <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent mb-4">
              Upload New Reel
            </h1>
          </div>

          <p className="text-white/70 text-lg max-w-md mx-auto">
            Share your creativity with the world. Upload your video and let your
            story shine.
          </p>
        </div>
        <VideoUploadForm />
      </div>
    </div>
  );
}
