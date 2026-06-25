"use client";

import { useEffect, useRef } from "react";

type StreamVideoProps = {
  /** bunny.net Stream URL — HLS playlist (.m3u8) or direct .mp4 */
  src?: string;
  poster?: string;
  /** Only the active slide plays; others are paused to save CPU/bandwidth. */
  active: boolean;
  muted?: boolean;
  /** Loop playback. Backgrounds set false so they fly in once and hold the
   *  last frame on the location instead of jumping back on loop. */
  loop?: boolean;
  className?: string;
};

/**
 * Plays bunny.net Stream sources. HLS (.m3u8) is handled natively on Safari and
 * via a lazy-loaded hls.js elsewhere; plain .mp4 is set directly on the element.
 * Playback starts only once the source is actually ready (manifest parsed / data
 * loaded) AND the slide is active — calling play() before hls.js attaches would
 * reject and leave the video black.
 */
export function StreamVideo({
  src,
  poster,
  active,
  muted = true,
  loop = true,
  className = "",
}: StreamVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  // Read latest `active` inside async/event callbacks without re-running setup.
  const activeRef = useRef(active);
  activeRef.current = active;

  // Attach the source (native vs. hls.js) and play once ready if active.
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !src) return;

    const tryPlay = () => {
      if (!activeRef.current) return;
      const p = video.play();
      if (p) p.catch(() => {});
    };

    const isHls = src.includes(".m3u8");
    const nativeHls = video.canPlayType("application/vnd.apple.mpegurl");

    if (isHls && !nativeHls) {
      let cancelled = false;
      let hls: import("hls.js").default | undefined;

      import("hls.js").then(({ default: Hls }) => {
        if (cancelled || !Hls.isSupported()) return;
        hls = new Hls({ enableWorker: true, startLevel: -1 });
        hls.attachMedia(video);
        hls.loadSource(src);
        hls.on(Hls.Events.MANIFEST_PARSED, tryPlay);
      });

      return () => {
        cancelled = true;
        hls?.destroy();
      };
    }

    video.src = src;
    video.addEventListener("loadeddata", tryPlay);
    return () => {
      video.removeEventListener("loadeddata", tryPlay);
      video.removeAttribute("src");
      video.load();
    };
  }, [src]);

  // muted is a DOM property React doesn't reliably set via attribute.
  useEffect(() => {
    if (videoRef.current) videoRef.current.muted = muted;
  }, [muted]);

  // Play/pause as the active slide changes; restart from the top on activate so
  // the fly-in replays (and non-looping backgrounds re-arrive at the location).
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (active) {
      try {
        video.currentTime = 0;
      } catch {
        /* metadata not ready yet — starts at 0 anyway */
      }
      const p = video.play();
      if (p) p.catch(() => {});
    } else {
      video.pause();
    }
  }, [active]);

  return (
    <video
      ref={videoRef}
      poster={poster}
      loop={loop}
      playsInline
      preload="auto"
      className={className}
    />
  );
}
