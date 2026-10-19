"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Play, Pause, Music, Disc, Volume2 } from "lucide-react";

interface SongData {
  title: string;
  artist: string;
  album: string;
  artwork: string;
  previewUrl: string;
}

const DEFAULT_SONG: SongData = {
  title: "Midnight City",
  artist: "M83",
  album: "Hurry Up, We're Dreaming",
  artwork: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=160&auto=format&fit=crop&q=80",
  previewUrl: "",
};

export default function MusicWidget() {
  const [song, setSong] = useState<SongData>(DEFAULT_SONG);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Attempt to fetch 30s preview from iTunes Search API
    const fetchTrack = async () => {
      try {
        const res = await fetch(
          "https://itunes.apple.com/search?term=m83+midnight+city&entity=song&limit=1"
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
            previewUrl: item.previewUrl || "",
          });
        }
      } catch (err) {
        // Fallback to default song metadata
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
    if (!audioRef.current) {
      // Simulate playback if no previewUrl
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
          // In case browser policy blocks or fails, simulate visual playing
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
      className="glass-heavy rounded-2xl p-3.5 w-56 shadow-lg select-none border border-border-glass group relative"
      tabIndex={0}
      aria-label="Music player widget"
    >
      <div className="flex items-center justify-between text-xs text-text-tertiary mb-3 font-mono">
        <span className="flex items-center gap-1.5 font-bold tracking-wider uppercase text-text-secondary">
          <Music size={12} className="text-accent" />
          NOW PLAYING
        </span>
        {isPlaying && (
          <span className="flex items-center gap-1 text-[10px] text-accent">
            <Volume2 size={11} className="animate-pulse" />
            LIVE
          </span>
        )}
      </div>

      <div className="flex items-center gap-3 mb-3">
        {/* Album Artwork / Spinning Vinyl */}
        <div className="relative w-14 h-14 flex-shrink-0">
          <motion.img
            src={song.artwork}
            alt={song.album}
            className="w-14 h-14 rounded-xl object-cover shadow-md border border-border-glass"
            animate={{ rotate: isPlaying ? 360 : 0 }}
            transition={{
              repeat: isPlaying ? Infinity : 0,
              duration: 8,
              ease: "linear",
            }}
          />
          {isPlaying && (
            <motion.div
              className="absolute inset-0 rounded-xl bg-black/10 flex items-center justify-center pointer-events-none"
              animate={{ opacity: [0.2, 0.4, 0.2] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <Disc size={16} className="text-white drop-shadow" />
            </motion.div>
          )}
        </div>

        {/* Track info */}
        <div className="min-w-0 flex-1">
          <h4 className="font-display font-bold text-sm text-text-primary truncate">
            {song.title}
          </h4>
          <p className="text-xs text-text-secondary truncate">{song.artist}</p>
          <p className="text-[10px] text-text-tertiary font-mono truncate">
            {song.album}
          </p>
        </div>
      </div>

      {/* Progress Bar (0:00 - 0:30) */}
      <div className="space-y-1">
        <div className="w-full h-1.5 bg-surface/60 rounded-full overflow-hidden border border-border-glass">
          <motion.div
            className="h-full bg-accent rounded-full"
            style={{ width: `${progress}%` }}
            transition={{ ease: "linear" }}
          />
        </div>
        <div className="flex justify-between text-[10px] font-mono text-text-tertiary">
          <span>{formattedTime}</span>
          <span>0:30</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-3 mt-2">
        <button
          onClick={togglePlay}
          className="w-8 h-8 rounded-full bg-accent text-text-inverted flex items-center justify-center shadow-md hover:bg-accent-hover transition-colors"
          aria-label={isPlaying ? "Pause music" : "Play music"}
        >
          {isPlaying ? <Pause size={14} /> : <Play size={14} className="ml-0.5" />}
        </button>
      </div>

      <div className="absolute top-1 right-2 text-[9px] text-text-tertiary opacity-0 group-hover:opacity-60 transition-opacity">
        drag me
      </div>
    </motion.div>
  );
}
