import { useRef, useState } from "react";
import { Play, Pause, Music } from "lucide-react";

interface AudioPlayerProps {
  src: string;
  title: string;
}

export default function AudioPlayer({ src, title }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-sm w-full">
      <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full">
        <Music className="text-blue-600" size={24} />
      </div>
      <div className="flex-1">
        <h4 className="font-semibold text-gray-800 text-sm">Now Playing</h4>
        <p className="text-gray-600 text-sm truncate">{title}</p>
      </div>
      <button
        onClick={togglePlay}
        className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
      >
        {isPlaying ? <Pause size={20} /> : <Play size={20} />}
      </button>
      <audio ref={audioRef} src={src} onEnded={() => setIsPlaying(false)} />
    </div>
  );
}
