import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

const Index = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [progress, setProgress] = useState(0);

  const tracks = [
    {
      title: "Deep Bass Frequencies",
      artist: "SubWoofer",
      src: "https://www.soundjay.com/misc/sounds/bass-drum-loop.mp3",
      image:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
    },
    {
      title: "Underground Vibes",
      artist: "Bass Master",
      src: "https://www.soundjay.com/misc/sounds/bass-drum-loop.mp3",
      image:
        "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=300&h=300&fit=crop",
    },
    {
      title: "Heavy Drop Zone",
      artist: "Beat Machine",
      src: "https://www.soundjay.com/misc/sounds/bass-drum-loop.mp3",
      image:
        "https://images.unsplash.com/photo-1511735111819-9a3f7709049c?w=300&h=300&fit=crop",
    },
  ];

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.addEventListener("timeupdate", updateProgress);
      audioRef.current.addEventListener("ended", nextTrack);

      // Автозапуск
      setTimeout(() => {
        playTrack();
      }, 1000);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("timeupdate", updateProgress);
        audioRef.current.removeEventListener("ended", nextTrack);
      }
    };
  }, []);

  const updateProgress = () => {
    if (audioRef.current) {
      const percent =
        (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(percent);
    }
  };

  const playTrack = async () => {
    if (audioRef.current) {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (error) {
        console.log("Автозапуск заблокирован браузером");
      }
    }
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const nextTrack = () => {
    const next = (currentTrack + 1) % tracks.length;
    setCurrentTrack(next);
    setTimeout(playTrack, 100);
  };

  const prevTrack = () => {
    const prev = currentTrack === 0 ? tracks.length - 1 : currentTrack - 1;
    setCurrentTrack(prev);
    setTimeout(playTrack, 100);
  };

  const changeVolume = (newVolume: number) => {
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white overflow-hidden">
      {/* Скрытый аудио элемент */}
      <audio
        ref={audioRef}
        src={tracks[currentTrack].src}
        preload="auto"
        loop={false}
      />

      {/* Анимированный фон */}
      <div className="fixed inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 animate-pulse"></div>
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 1}px`,
              height: `${Math.random() * 4 + 1}px`,
              animation: `pulse ${Math.random() * 3 + 2}s infinite`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-6 py-8">
        {/* Главный плеер */}
        <Card className="bg-black/50 border-purple-500/30 backdrop-blur-xl mb-8">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                🎵 BASS STATION 🎵
              </h1>
              <p className="text-xl text-purple-300">Жирный басс играет 24/7</p>
            </div>

            {/* Текущий трек */}
            <div className="flex items-center justify-center mb-8">
              <img
                src={tracks[currentTrack].image}
                alt={tracks[currentTrack].title}
                className="w-32 h-32 rounded-lg mr-6 shadow-2xl border-2 border-purple-500/50"
              />
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  {tracks[currentTrack].title}
                </h2>
                <p className="text-lg text-purple-300">
                  {tracks[currentTrack].artist}
                </p>
                <div className="flex items-center mt-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                  <span className="text-green-400 text-sm">ИГРАЕТ СЕЙЧАС</span>
                </div>
              </div>
            </div>

            {/* Прогресс бар */}
            <div className="mb-6">
              <div className="w-full h-3 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-blue-400 transition-all duration-100"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Управление */}
            <div className="flex items-center justify-center space-x-6 mb-6">
              <Button
                variant="ghost"
                size="lg"
                onClick={prevTrack}
                className="text-purple-400 hover:text-white"
              >
                <Icon name="SkipBack" size={28} />
              </Button>

              <Button
                size="lg"
                onClick={togglePlay}
                className="bg-purple-600 hover:bg-purple-700 rounded-full w-16 h-16"
              >
                <Icon name={isPlaying ? "Pause" : "Play"} size={32} />
              </Button>

              <Button
                variant="ghost"
                size="lg"
                onClick={nextTrack}
                className="text-purple-400 hover:text-white"
              >
                <Icon name="SkipForward" size={28} />
              </Button>
            </div>

            {/* Громкость */}
            <div className="flex items-center justify-center space-x-4">
              <Icon name="Volume2" size={24} className="text-purple-400" />
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={(e) => changeVolume(parseFloat(e.target.value))}
                className="w-32 h-2 bg-gray-700 rounded-lg appearance-none slider"
              />
              <span className="text-purple-300 text-sm">
                {Math.round(volume * 100)}%
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Список треков */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {tracks.map((track, index) => (
            <Card
              key={index}
              className={`bg-gray-800/40 border-purple-500/20 hover:border-purple-500/50 transition-all cursor-pointer ${
                currentTrack === index
                  ? "border-purple-500 bg-purple-900/30"
                  : ""
              }`}
              onClick={() => {
                setCurrentTrack(index);
                setTimeout(playTrack, 100);
              }}
            >
              <CardContent className="p-4">
                <img
                  src={track.image}
                  alt={track.title}
                  className="w-full h-32 object-cover rounded-lg mb-3"
                />
                <h3 className="text-white font-semibold mb-1">{track.title}</h3>
                <p className="text-purple-300 text-sm">{track.artist}</p>
                {currentTrack === index && (
                  <div className="flex items-center mt-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-2 animate-pulse"></div>
                    <span className="text-purple-400 text-xs">PLAYING</span>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #a855f7;
          cursor: pointer;
        }
        .slider::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #a855f7;
          cursor: pointer;
          border: none;
        }
      `}</style>
    </div>
  );
};

export default Index;
