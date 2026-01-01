"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Video from "yet-another-react-lightbox/plugins/video";
import Download from "yet-another-react-lightbox/plugins/download";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import DeleteButton from "./DeleteButton";

interface MediaItem {
  id: string;
  url: string;
  name: string;
  type: string;
  createdAt: string;
}

export default function MediaGallery({
  media,
  groupId,
}: {
  media: MediaItem[];
  groupId: string;
}) {
  const [index, setIndex] = useState(-1);

  const slides = media.map((item) => {
    const isVideo = item.type.startsWith("video");

    if (isVideo) {
      return {
        type: "video" as const,
        width: 1280,
        height: 720,
        poster: "",
        sources: [
          {
            src: item.url,
            type: item.type,
          },
        ],
      };
    }

    return {
      src: item.url,
      type: "image" as const,
    };
  });

  return (
    <>
      <div className="mt-12 grid w-full max-w-5xl grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {media.map((item, i) => (
          <div
            key={item.id}
            className="group relative aspect-square cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-2xl transition-all hover:scale-[1.02] hover:border-white/20"
            onClick={() => setIndex(i)}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative z-10 flex gap-2"
            >
              {/* Download Button */}
              <a
                href={`/api/download?url=${encodeURIComponent(item.url)}&name=${encodeURIComponent(item.name)}`}
                download={item.name}
                // target="_blank"
                // rel="noopener noreferrer"
                className="absolute top-2 left-2 rounded-md bg-black/50 p-2 text-white opacity-0 backdrop-blur-md transition transition-opacity group-hover:opacity-100 hover:bg-white/40"
                title="Download"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                  <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
                </svg>
              </a>

              <DeleteButton id={item.id} groupId={groupId} />
            </div>

            {item.type.startsWith("image") ? (
              <Image
                src={item.url}
                alt={item.name}
                width={400}
                height={400}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-black/40">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                  <div className="ml-1 h-0 w-0 border-y-[10px] border-l-[15px] border-y-transparent border-l-white" />
                </div>
                <video
                  src={item.url}
                  className="absolute h-full w-full object-cover opacity-30"
                />
              </div>
            )}
            <div className="absolute right-0 bottom-0 left-0 translate-y-full bg-black/40 p-3 backdrop-blur-md transition-transform group-hover:translate-y-0">
              <p className="truncate text-xs font-medium text-white">
                {item.name}
              </p>
              <p className="text-[10px] text-gray-300">
                {new Date(item.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>

      <Lightbox
        index={index}
        open={index >= 0}
        close={() => setIndex(-1)}
        slides={slides}
        plugins={[Thumbnails, Zoom, Video, Download]}
        video={{
          controls: true,
          autoPlay: false,
          loop: false,
        }}
        carousel={{ finite: false }}
      />
    </>
  );
}
