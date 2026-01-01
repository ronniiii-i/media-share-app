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

function DownloadIcon() {
  return (
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
  );
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
      <div className="mt-12 grid w-full grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
        {media.map((item, i) => (
          <div
            key={item.id}
            className="group border-border bg-secondary hover:border-primary/50 relative aspect-square cursor-pointer overflow-hidden rounded-xl border shadow-sm transition-all"
            onClick={() => setIndex(i)}
          >
            {/* Hover Actions (Download/Delete) */}
            <div onClick={(e) => e.stopPropagation()} className="relative z-10">
              <a
                href={`/api/download?url=${encodeURIComponent(item.url)}&name=${encodeURIComponent(item.name)}`}
                download={item.name}
                className="bg-background/60 text-foreground hover:bg-primary hover:text-primary-foreground absolute top-2 left-2 rounded-lg p-2 opacity-0 backdrop-blur-md transition group-hover:opacity-100"
              >
                <DownloadIcon />
              </a>
              <DeleteButton id={item.id} groupId={groupId} />
            </div>

            {/* Image/Video Rendering */}
            {item.type.startsWith("image") ? (
              <Image
                src={item.url}
                alt={item.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-stone-900/40">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                  <div className="ml-1 h-0 w-0 border-y-[10px] border-l-[15px] border-y-transparent border-l-white" />
                </div>
                <video
                  src={item.url}
                  className="absolute h-full w-full object-cover opacity-30"
                />
              </div>
            )}
            <div className="from-background/90 absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t to-transparent p-4 transition-transform group-hover:translate-y-0">
              <p className="truncate text-xs font-bold">{item.name}</p>
              <p className="text-muted-foreground text-[10px]">
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
