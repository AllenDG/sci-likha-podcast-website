import { useRef, useState, useEffect, useCallback } from "react";
import { Play, Pause, Music, Volume2, VolumeX } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface AudioPlayerProps {
  src: string;
  title: string;
  onError?: (error: string) => void;
}

export default function AudioPlayer({ src, title, onError }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isMobile = useIsMobile();

  const handleError = useCallback((errorMessage: string): void => {
    setError(errorMessage);
    setIsPlaying(false);
    setIsLoading(false);
    onError?.(errorMessage);
  }, [onError]);

  const togglePlay = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio || error) return;

    try {
      setIsLoading(true);
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        await audio.play();
        setIsPlaying(true);
      }
    } catch (err) {
      handleError("Failed to play audio. Please check your connection.");
    } finally {
      setIsLoading(false);
    }
  }, [isPlaying, error, handleError]);

  const toggleMute = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    
    audio.muted = !audio.muted;
    setIsMuted(audio.muted);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadStart = () => setIsLoading(true);
    const handleCanPlay = () => setIsLoading(false);
    const handleEnded = () => setIsPlaying(false);
    const handleAudioError = () => handleError("Audio failed to load");
    const handlePause = () => setIsPlaying(false);
    const handlePlay = () => setIsPlaying(true);

    audio.addEventListener('loadstart', handleLoadStart);
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleAudioError);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('play', handlePlay);

    return () => {
      audio.removeEventListener('loadstart', handleLoadStart);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleAudioError);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('play', handlePlay);
    };
  }, [handleError]);

  if (error) {
    return (
      <div className="flex items-center gap-4 p-4 bg-red-50 border border-red-200 rounded-2xl shadow-sm w-full">
        <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-full">
          <VolumeX className="text-red-600" size={isMobile ? 20 : 24} />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-red-800 text-sm">Audio Error</h4>
          <p className="text-red-600 text-xs truncate">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-3 p-4 bg-white rounded-2xl shadow-sm w-full ${isMobile ? 'gap-2 p-3' : ''}`}>
      <div className={`flex items-center justify-center bg-blue-100 rounded-full ${isMobile ? 'w-10 h-10' : 'w-12 h-12'}`}>
        <Music className="text-blue-600" size={isMobile ? 20 : 24} />
      </div>
      
      <div className="flex-1 min-w-0">
        <h4 className={`font-semibold text-gray-800 ${isMobile ? 'text-xs' : 'text-sm'}`}>
          Now Playing
        </h4>
        <p className={`text-gray-600 truncate ${isMobile ? 'text-xs' : 'text-sm'}`}>
          {title}
        </p>
      </div>
      
      <div className="flex items-center gap-2">
        {!isMobile && (
          <button
            onClick={toggleMute}
            className="p-2 text-gray-600 hover:text-gray-800 transition-colors"
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>
        )}
        
        <button
          onClick={togglePlay}
          disabled={isLoading}
          className={`flex items-center justify-center bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed ${isMobile ? 'p-2 w-10 h-10' : 'p-3 w-12 h-12'}`}
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isLoading ? (
            <div className="animate-spin rounded-full border-2 border-white border-t-transparent w-4 h-4" />
          ) : isPlaying ? (
            <Pause size={isMobile ? 16 : 20} />
          ) : (
            <Play size={isMobile ? 16 : 20} />
          )}
        </button>
      </div>
      
      <audio 
        ref={audioRef} 
        src={src} 
        preload="metadata"
        playsInline
        muted={isMuted}
      />
    </div>
  );
}
