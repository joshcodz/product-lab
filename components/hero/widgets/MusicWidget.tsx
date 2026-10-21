"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Music, Disc, Volume2 } from "lucide-react";

interface SongData {
  title: string;
  artist: string;
  album: string;
  artwork: string;
  previewUrl: string;
}

const DEFAULT_SONG: SongData = {
  title: "KALYANI (Remix)",
  artist: "ARJN, KDS, FIFTY4 & Shreya Ghoshal",
  album: "KALYANI (Remix) - Single",
  artwork:
    "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/5f/f8/a5/5ff8a59a-5b12-b177-9fe0-295345e93765/26UMGIM78044.rgb.jpg/200x200bb.jpg",
  previewUrl:
    "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/7c/17/15/7c1715aa-5d66-3c35-98b9-0db43c64ac8b/mzaf_11793396216235174547.plus.aac.p.m4a",
};

export default function MusicWidget() {
  const [song, setSong] = useState<SongData>(DEFAULT_SONG);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Attempt to fetch 30s preview from iTunes Search API
    const fetchTrack = async () => {
      try {
        const res = await fetch(
          "https://itunes.apple.com/search?term=kalyani+remix+shreya+ghoshal&country=IN&entity=song&limit=1"
        );
        const data = await res.json();
        if (data.results && data.results.length > 0) {
          const item = data.results[0];
          setSong({
            title: item.trackName || DEFAULT_SONG.title,
            artist: item.artistName || DEFAULT_SONG.artist,
            album: item.collectionName || DEFAULT_SONG.album,
            artwork:
              item.artworkUrl100?.replace("100x100bb", "200x200bb") ||
              DEFAULT_SONG.artwork,
            previewUrl: item.previewUrl || DEFAULT_SONG.previewUrl,
          });
        }
      } catch (err) {
        // Fallback to default
      }
    };

    fetchTrack();
  }, []);

  useEffect(() => {
    if (!song.previewUrl) return;

    const audio = new Audio(song.previewUrl);
    audioRef.current = audio;

    const updateProgress = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / Math.min(audio.duration, 30)) * 100);
      }
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
    };

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.pause();
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("ended", handleEnded);
      audioRef.current = null;
    };
  }, [song.previewUrl]);

  const togglePlay = () => {
    setHasInteracted(true);
    if (!audioRef.current) {
      // Simulate visual playback
      setIsPlaying((prev) => !prev);
      return;
    }

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          setIsPlaying(true);
        });
    }
  };

  // Progress simulation if no audio preview url
  useEffect(() => {
    if (!song.previewUrl && isPlaying) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 100 / 30; // 30 seconds
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isPlaying, song.previewUrl]);

  const currentSeconds = Math.floor((progress / 100) * 30);
  const formattedTime = `0:${currentSeconds.toString().padStart(2, "0")}`;

  return (
    <motion.div
      drag
      dragConstraints={{ left: -100, right: 100, top: -80, bottom: 80 }}
      dragElastic={0.15}
      whileHover={{ scale: 1.02, cursor: "grab" }}
      whileDrag={{ scale: 1.05, cursor: "grabbing" }}
      className="glass-heavy rounded-3xl p-3.5 w-60 shadow-lg select-none border border-border-glass group relative"
      tabIndex={0}
      aria-label="Music player widget"
    >
      {/* Header with Now Playing and Equalizer */}
      <div className="flex items-center justify-between text-xs text-text-tertiary mb-2.5 font-mono">
        <span className="flex items-center gap-1.5 font-bold tracking-wider uppercase text-text-secondary">
          <Music size={12} className="text-accent" />
          NOW PLAYING
        </span>

        {/* 5 Equalizer bars that animate only while playing */}
        <div className="flex items-end gap-0.5 h-3.5 px-1">
          {[0.6, 1, 0.4, 0.8, 0.5].map((h, i) => (
            <motion.span
              key={i}
              className="w-0.5 rounded-full bg-accent"
              animate={
                isPlaying
                  ? {
                      height: ["20%", `${h * 100}%`, "30%"],
                    }
                  : { height: "20%" }
              }
              transition={
                isPlaying
                  ? {
                      repeat: Infinity,
                      repeatType: "reverse",
                      duration: 0.4 + i * 0.1,
                      ease: "easeInOut",
                    }
                  : { duration: 0.2 }
              }
            />
          ))}
        </div>
      </div>

      {/* Main Track Row: Album Art + Beside Play Button + Track Info */}
      <div className="flex items-center gap-3 mb-2.5">
        {/* Album Artwork with 12s linear rotation ONLY while playing */}
        <div className="relative w-12 h-12 flex-shrink-0">
          <motion.img
            src={song.artwork}
            alt={song.album}
            className="w-12 h-12 rounded-full object-cover shadow-sm border border-border-glass"
            animate={{ rotate: isPlaying ? 360 : 0 }}
            transition={{
              repeat: isPlaying ? Infinity : 0,
              duration: 12,
              ease: "linear",
            }}
          />
          {/* Vinyl center dot */}
          <div className="absolute inset-0 m-auto w-3.5 h-3.5 rounded-full bg-surface border border-border-glass shadow-xs" />
        </div>

        {/* Play/Pause Button beside Album Art */}
        <button
          onClick={togglePlay}
          className="w-9 h-9 rounded-full bg-accent text-white flex items-center justify-center shadow-md hover:bg-accent-hover active:scale-95 transition-all flex-shrink-0"
          aria-label={isPlaying ? "Pause music" : "Play music"}
        >
          {isPlaying ? <Pause size={14} /> : <Play size={14} className="ml-0.5" />}
        </button>

        {/* Track info */}
        <div className="min-w-0 flex-1">
          <h4 className="font-display font-bold text-xs text-text-primary truncate">
            {song.title}
          </h4>
          <p className="text-[11px] text-text-secondary truncate">{song.artist}</p>
        </div>
      </div>

      {/* Thin Progress Bar (fills while playing) */}
      <div className="space-y-1">
        <div className="w-full h-1 bg-surface/80 rounded-full overflow-hidden border border-border-glass/60">
          <motion.div
            className="h-full bg-accent rounded-full"
            style={{ width: `${progress}%` }}
            transition={{ ease: "linear" }}
          />
        </div>
        <div className="flex justify-between text-[9px] font-mono text-text-tertiary">
          <span>{formattedTime}</span>
          <span>0:30</span>
        </div>
      </div>

      {/* Tap to play hint until first interaction */}
      <AnimatePresence>
        {!hasInteracted && !isPlaying && (
          <motion.div
            initial={{ opacity: 0, y: 3 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-1 text-center text-[10px] font-mono text-accent font-medium tracking-tight animate-pulse"
          >
            Tap to play
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute top-1 right-2 text-[9px] text-text-tertiary opacity-0 group-hover:opacity-60 transition-opacity">
        drag me
      </div>
    </motion.div>
  );
}
