"use client";

import React, { useEffect, useState } from "react";
import { IKVideo } from "imagekitio-next";
import Link from "next/link";
import { useParams } from "next/navigation";
import { IVideo } from "@/models/Video";
import { apiClient } from "@/lib/api-client";

export default function VideoDetailPage() {
  const { videoId } = useParams();
  const [video, setVideo] = useState<IVideo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        setLoading(true);
        const data = await apiClient.getVideo(videoId as string);
        setVideo(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching video:", err);
        setError("Failed to load video. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (videoId) {
      fetchVideo();
    }
  }, [videoId]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center min-h-[50vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (error || !video) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col justify-center items-center min-h-[50vh]">
          <h2 className="text-2xl font-bold text-error mb-4">Error</h2>
          <p className="text-base-content/70 mb-6">{error || "Video not found"}</p>
          <Link
            href="/"
            className="btn btn-primary"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-4">
        <Link
          href="/"
          className="btn btn-ghost gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
          Back to Home
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div
            className="rounded-xl overflow-hidden w-full mx-auto"
            style={{ maxWidth: "375px", aspectRatio: "9/16" }}
          >
            <IKVideo
              path={video.videoUrl}
              transformation={[
                {
                  height: video.transformation?.height || "1920",
                  width: video.transformation?.width || "1080",
                  quality: video.transformation?.quality || 100,
                },
              ]}
              controls={video.controls !== false}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="lg:col-span-1">
          <h1 className="text-3xl font-bold mb-4">{video.title}</h1>
          <div className="divider"></div>
          <h2 className="text-xl font-semibold mb-2">Description</h2>
          <p className="text-base-content/80 whitespace-pre-line">
            {video.description}
          </p>
        </div>
      </div>
    </div>
  );
}