import { useEffect, useState } from "react";
import {
  getWallpaperDataUrl,
  WALLPAPER_UPDATED_EVENT,
} from "@/lib/utils/wallpaper";

export default function Wallpaper() {
  const [dataUrl, setDataUrl] = useState<string | null>(null);

  useEffect(() => {
    let isCancelled = false;

    (async () => {
      const url = await getWallpaperDataUrl();
      if (!isCancelled) setDataUrl(url);
    })();

    const handler = async () => {
      const url = await getWallpaperDataUrl();
      if (!isCancelled) setDataUrl(url);
    };

    window.addEventListener(WALLPAPER_UPDATED_EVENT, handler);

    return () => {
      isCancelled = true;
      window.removeEventListener(WALLPAPER_UPDATED_EVENT, handler);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="absolute inset-0 pointer-events-none select-none"
      style={{
        opacity: dataUrl ? 1 : 0,
        transition: "opacity 300ms ease-out",
      }}
    >
      {dataUrl && (
        <img
          src={dataUrl}
          alt=""
          draggable={false}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
    </div>
  );
}
