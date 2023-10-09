"use client";

import { useState } from "react";
import { useEdgeStore } from "@/lib/edgestore";
import Link from "next/link";
import { SingleImageDropzone } from "@/components/SingleImageDropzone";
import { useSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function Page() {
  const [file, setFile] = useState<File>();
  const { edgestore } = useEdgeStore();
  const [progress, setProgress] = useState(0);
  const [urls, setUrls] = useState<{
    url: string;
    thumbnailUrl: string | null;
  }>();

  return (
    <div className="flex flex-col items-center m-6 gap-2">
      <SingleImageDropzone
        width={200}
        height={200}
        value={file}
        dropzoneOptions={{
          maxSize: 1024 * 1024 * 3, //3MB
        }}
        onChange={(file) => {
          setFile(file);
        }}
      />
      <div className="h-[6px] w-44 border rounded overflow-hidden">
        <div
          className="h-full bg-white transition-all duration-150"
          style={{
            width: `${progress}%`,
          }}
        ></div>
      </div>
      <button
        className="bg-white text-black rounded px-2 hover:opacity-80"
        onClick={async () => {
          if (file) {
            const res = await edgestore.myPublicImages.upload({
              file,
              input: { type: "post" },
              onProgressChange: (progress) => {
                setProgress(progress);
              },
            });

            setUrls({
              url: res.url,
              thumbnailUrl: res.thumbnailUrl,
            });
          }
        }}
      >
        Upload
      </button>
      {urls?.url && (
        <Link href={urls.url} target="_blank">
          URL
        </Link>
      )}
      {urls?.thumbnailUrl && (
        <Link href={urls.thumbnailUrl} target="_blank">
          THUMBNAIL_URL
        </Link>
      )}
    </div>
  );
}
