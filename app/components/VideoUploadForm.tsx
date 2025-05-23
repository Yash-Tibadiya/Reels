"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props";
import {
  Loader2,
  Video,
  Upload,
  FileText,
  MessageSquare,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import { useNotification } from "./Notification";
import { apiClient } from "@/lib/api-client";
import FileUpload from "./FileUpload";

interface VideoFormData {
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
}

// Video Upload Form Component
function VideoUploadForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [videoUploaded, setVideoUploaded] = useState(false);
  const { showNotification } = useNotification();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<VideoFormData>({
    defaultValues: {
      title: "",
      description: "",
      videoUrl: "",
      thumbnailUrl: "",
    },
  });

  const watchedTitle = watch("title");
  const watchedDescription = watch("description");

  const handleUploadSuccess = (response: IKUploadResponse) => {
    setValue("videoUrl", response.filePath);
    setValue("thumbnailUrl", response.thumbnailUrl || response.filePath);
    setVideoUploaded(true);
    showNotification("Video uploaded successfully!", "success");
  };

  const handleUploadProgress = (progress: number) => {
    setUploadProgress(progress);
  };

  const onSubmit = async (data: VideoFormData) => {
    if (!data.videoUrl) {
      showNotification("Please upload a video first", "error");
      return;
    }

    setLoading(true);
    try {
      await apiClient.createVideo(data);
      showNotification("Video published successfully!", "success");

      // Reset form after successful submission
      setValue("title", "");
      setValue("description", "");
      setValue("videoUrl", "");
      setValue("thumbnailUrl", "");
      setUploadProgress(0);
      setVideoUploaded(false);

      router.push("/");
    } catch (error) {
      console.error("Error publishing video:", error);
      showNotification(
        error instanceof Error ? error.message : "Failed to publish video",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Title Field */}
      <div className="space-y-3">
        <label className="flex items-center space-x-2 text-sm font-medium text-white/90">
          <FileText className="w-4 h-4 text-purple-400" />
          <span>Video Title</span>
        </label>
        <div className="relative">
          <input
            type="text"
            className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 backdrop-blur-sm transition-all duration-300 ${
              errors.title
                ? "border-red-500/50 focus:ring-red-500/50 focus:border-red-500/50"
                : "border-white/20 focus:ring-purple-500/50 focus:border-purple-500/50"
            }`}
            placeholder="Give your reel an amazing title..."
            {...register("title", { required: "Title is required" })}
          />
          <div className="absolute top-3 right-3 text-white/40 text-sm">
            {watchedTitle.length}/100
          </div>
        </div>
        {errors.title && (
          <p className="text-red-400 text-sm flex items-center space-x-1">
            <span>⚠️</span>
            <span>{errors.title.message}</span>
          </p>
        )}
      </div>

      {/* Description Field */}
      <div className="space-y-3">
        <label className="flex items-center space-x-2 text-sm font-medium text-white/90">
          <MessageSquare className="w-4 h-4 text-purple-400" />
          <span>Description</span>
        </label>
        <div className="relative">
          <textarea
            rows={4}
            className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 backdrop-blur-sm transition-all duration-300 resize-none ${
              errors.description
                ? "border-red-500/50 focus:ring-red-500/50 focus:border-red-500/50"
                : "border-white/20 focus:ring-purple-500/50 focus:border-purple-500/50"
            }`}
            placeholder="Describe your reel and what makes it special..."
            {...register("description", {
              required: "Description is required",
            })}
          />
          <div className="absolute bottom-3 right-3 text-white/40 text-sm">
            {watchedDescription.length}/500
          </div>
        </div>
        {errors.description && (
          <p className="text-red-400 text-sm flex items-center space-x-1">
            <span>⚠️</span>
            <span>{errors.description.message}</span>
          </p>
        )}
      </div>

      {/* Video Upload Section */}
      <div className="space-y-4">
        <label className="flex items-center space-x-2 text-sm font-medium text-white/90">
          <Video className="w-4 h-4 text-purple-400" />
          <span>Upload Video</span>
        </label>

        <div className="relative p-6 bg-white/5 border-2 border-dashed border-white/20 rounded-xl backdrop-blur-sm transition-all duration-300 hover:border-purple-500/50 hover:bg-white/10">
          <FileUpload
            fileType="video"
            onSuccess={handleUploadSuccess}
            onProgress={handleUploadProgress}
          />

          {/* Upload Progress */}
          {uploadProgress > 0 && uploadProgress < 100 && (
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm text-white/70">
                <span>Uploading...</span>
                <span>{uploadProgress}%</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Upload Success */}
          {videoUploaded && (
            <div className="mt-4 flex items-center space-x-2 text-green-400">
              <CheckCircle className="w-5 h-5" />
              <span className="text-sm font-medium">
                Video uploaded successfully!
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading || !videoUploaded}
        className="w-full relative overflow-hidden bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none group"
      >
        <div className="flex items-center justify-center space-x-2">
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Publishing Reel...</span>
            </>
          ) : (
            <>
              <Upload className="w-5 h-5" />
              <span>Publish Reel</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </>
          )}
        </div>

        {/* Button shine effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
      </button>

      {/* Help Text */}
      <div className="text-center text-white/50 text-sm">
        <p>Supported formats: MP4, MOV, AVI • Max size: 100MB</p>
      </div>
    </form>
  );
}

export default VideoUploadForm;
