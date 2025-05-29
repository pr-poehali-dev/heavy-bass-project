import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

const Index = () => {
  const tracks = [
    {
      title: "Cosmic Bass Drop",
      artist: "Space Beatz",
      duration: "4:20",
      image:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
    },
    {
      title: "Deep Universe",
      artist: "Nebula Sound",
      duration: "5:15",
      image:
        "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=300&h=300&fit=crop",
    },
    {
      title: "Galactic Frequencies",
      artist: "Void Bassline",
      duration: "3:45",
      image:
        "https://images.unsplash.com/photo-1511735111819-9a3f7709049c?w=300&h=300&fit=crop",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-black text-white">
      {/* Hero Section */}
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent animate-pulse">
            ЖИРНЫЙ БАСС
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Самый мощный музон во вселенной 🌌
          </p>

          {/* Bass Visualizer */}
          <div className="flex justify-center items-end space-x-2 mb-8">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className={`bg-gradient-to-t from-purple-500 to-blue-400 rounded-t-full animate-pulse`}
                style={{
                  width: "12px",
                  height: `${Math.random() * 60 + 20}px`,
                  animationDelay: `${i * 0.1}s`,
                }}
              />
            ))}
          </div>

          <div className="flex justify-center space-x-4 mb-12">
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
              <Icon name="Play" size={20} />
              Врубить басс
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-purple-500 text-purple-400 hover:bg-purple-900"
            >
              <Icon name="Volume2" size={20} />
              На максимум
            </Button>
          </div>
        </div>

        {/* Track List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {tracks.map((track, index) => (
            <Card
              key={index}
              className="bg-gray-800/50 border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 hover:scale-105"
            >
              <CardHeader className="pb-3">
                <img
                  src={track.image}
                  alt={track.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <CardTitle className="text-white text-lg">
                  {track.title}
                </CardTitle>
                <p className="text-purple-300">{track.artist}</p>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">{track.duration}</span>
                  <Button
                    size="sm"
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    <Icon name="Play" size={16} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Player Controls */}
        <Card className="bg-gray-800/30 border-purple-500/20 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <img
                  src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=60&h=60&fit=crop"
                  alt="Now playing"
                  className="w-12 h-12 rounded-lg"
                />
                <div>
                  <p className="text-white font-semibold">Cosmic Bass Drop</p>
                  <p className="text-purple-300 text-sm">Space Beatz</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="sm">
                  <Icon name="SkipBack" size={20} />
                </Button>
                <Button
                  size="lg"
                  className="bg-purple-600 hover:bg-purple-700 rounded-full"
                >
                  <Icon name="Pause" size={24} />
                </Button>
                <Button variant="ghost" size="sm">
                  <Icon name="SkipForward" size={20} />
                </Button>
              </div>

              <div className="flex items-center space-x-2">
                <Icon name="Volume2" size={20} className="text-purple-400" />
                <div className="w-24 h-2 bg-gray-600 rounded-full">
                  <div className="w-3/4 h-full bg-purple-500 rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-4">
              <div className="w-full h-2 bg-gray-600 rounded-full">
                <div className="w-1/3 h-full bg-gradient-to-r from-purple-500 to-blue-400 rounded-full"></div>
              </div>
              <div className="flex justify-between text-sm text-gray-400 mt-1">
                <span>1:25</span>
                <span>4:20</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
