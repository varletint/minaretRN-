import { useState } from "react";
import { QueryProvider } from "@/providers/QueryProvider";
import ThemeProvider from "@/components/ui/theme-provider";
import { Navbar } from "@/components/ui/Navbar";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  FeatureCard,
  type FeatureCardProps,
} from "@/components/ui/FeatureCard";
import { MosqueCard } from "@/components/ui/MosquesCardF";
import { AudioPlayer } from "@/components/ui/AudioPlayer";
import Footer from "@/components/ui/Footer";
import { Radio, MapPin, Clock, Heart } from "lucide-react-native";
import { useStations } from "@/hooks/useStations";
import type { StationListItem } from "@/types/station";

const features: FeatureCardProps[] = [
  {
    title: "Live Broadcasts",
    description:
      "Listen to live lectures, prayers and sermons from mosques around the world",
    icon: Radio,
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    title: "Find Mosques",
    description:
      "Discover mosques in your area with prayer times and directions",
    icon: MapPin,
    gradient: "from-blue-500 to-indigo-600",
  },
  {
    title: "Prayer Times",
    description: "Accurate prayer times based on your location",
    icon: Clock,
    gradient: "from-purple-500 to-pink-600",
  },
  {
    title: "Donation",
    description: "Connect with your local mosque community",
    icon: Heart,
    gradient: "from-orange-500 to-red-600",
  },
];

interface NowPlaying {
  name: string;
  location: string;
  isLive: boolean;
  streamUrl?: string;
}

function App() {
  const [nowPlaying, setNowPlaying] = useState<NowPlaying | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Fetch stations from API
  const { data: stations, isLoading, error } = useStations();

  const handlePlay = (station: StationListItem) => {
    if (nowPlaying?.name === station.name) {
      setIsPlaying(!isPlaying);
    } else {
      setNowPlaying({
        name: station.name,
        location: station.mosqueId?.location || "Unknown location",
        isLive: station.isLive ?? false,
        streamUrl: station.streamUrl,
      });
      setIsPlaying(true);
    }
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleClose = () => {
    setNowPlaying(null);
    setIsPlaying(false);
  };

  return (
    <QueryProvider>
      <ThemeProvider defaultTheme='dark' storageKey='minaret-theme'>
        <div className='min-h-screen bg-background text-foreground'>
          <Navbar />
          <main className='container mx-auto px-4 py-8 pb-24'>
            <h1 className='text-4xl font-bold font-heading'>
              Welcome to Minaret Live
            </h1>
            <p className='mt-4 text-muted-foreground'>
              Your mosque community hub
            </p>

            <div className='mt-8 px-0'>
              <Carousel
                opts={{
                  align: "start",
                  loop: true,
                }}
                className='w-full'>
                <CarouselContent className='-ml-2 md:-ml-4'>
                  {features.map((feature, index) => (
                    <CarouselItem
                      key={index}
                      className='pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3'>
                      <FeatureCard {...feature} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className='left-2 bg-background/80 backdrop-blur-sm shadow-lg border-muted-foreground/30 hover:bg-background' />
                <CarouselNext className='right-2 bg-background/80 backdrop-blur-sm shadow-lg border-muted-foreground/30 hover:bg-background' />
              </Carousel>
            </div>

            <section className='mt-12'>
              <h2 className='text-2xl font-bold font-heading mb-6'>
                Popular Stations
              </h2>
              {isLoading && (
                <div className='text-center py-8 text-muted-foreground'>
                  Loading stations...
                </div>
              )}
              {error && (
                <div className='text-center py-8 text-red-500'>
                  Failed to load stations. Please try again.
                </div>
              )}
              {stations && stations.length > 0 && (
                <>
                  <Carousel className='w-full md:hidden'>
                    <CarouselContent>
                      {stations.map((station) => (
                        <CarouselItem key={station._id}>
                          <MosqueCard
                            name={station.name}
                            location={station.mosqueId?.location || "Unknown"}
                            listeners={station.stats?.totalListeners}
                            isLive={station.isLive}
                            streamUrl={station.streamUrl}
                            currentTrack={station.currentTrack}
                            isPlaying={
                              nowPlaying?.name === station.name && isPlaying
                            }
                            onPlay={() => handlePlay(station)}
                          />
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className='left-2 bg-background/80 backdrop-blur-sm shadow-lg border-muted-foreground/30 hover:bg-background' />
                    <CarouselNext className='right-2 bg-background/80 backdrop-blur-sm shadow-lg border-muted-foreground/30 hover:bg-background' />
                  </Carousel>
                  <div className='md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 hidden'>
                    {stations.map((station) => (
                      <MosqueCard
                        key={station._id}
                        name={station.name}
                        location={station.mosqueId?.location || "Unknown"}
                        listeners={station.stats?.totalListeners}
                        isLive={station.isLive}
                        streamUrl={station.streamUrl}
                        currentTrack={station.currentTrack}
                        isPlaying={
                          nowPlaying?.name === station.name && isPlaying
                        }
                        onPlay={() => handlePlay(station)}
                      />
                    ))}
                  </div>
                </>
              )}
            </section>
          </main>

          {/* Footer */}
          <Footer />

          {/* Fixed Audio Player */}
          {nowPlaying && (
            <AudioPlayer
              mosqueName={nowPlaying.name}
              location={nowPlaying.location}
              isLive={nowPlaying.isLive}
              isPlaying={isPlaying}
              onPlayPause={handlePlayPause}
              onClose={handleClose}
            />
          )}
        </div>
      </ThemeProvider>
    </QueryProvider>
  );
}

export default App;
