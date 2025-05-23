import { useState } from "react";
import { IVideo } from "@/models/Video";
import VideoComponent from "./VideoComponent";

interface VideoFeedProps {
  videos: IVideo[];
}

const VIDEOS_PER_PAGE = 8;

export default function VideoFeed({ videos }: VideoFeedProps) {
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(videos.length / VIDEOS_PER_PAGE);
  const startIdx = (page - 1) * VIDEOS_PER_PAGE;
  const paginatedVideos = videos.slice(startIdx, startIdx + VIDEOS_PER_PAGE);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {paginatedVideos.map((video) => (
          <VideoComponent key={video._id?.toString()} video={video} />
        ))}

        {videos.length === 0 && (
          <div className="col-span-full text-center py-12">
            <p className="text-base-content/70">No videos found</p>
          </div>
        )}
      </div>
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-2">
          <button
            className="btn btn-sm"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            Prev
          </button>
          <span className="px-2 py-1">
            Page {page} of {totalPages}
          </span>
          <button
            className="btn btn-sm"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </>
  );
}
