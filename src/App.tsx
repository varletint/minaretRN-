import { useCallback } from "react";
import { StatusBar } from "expo-status-bar";
import { View, ScrollView, StyleSheet, ActivityIndicator } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { Radio, MapPin, Clock, Heart } from "lucide-react-native";

import { useThemeStore } from "./stores/themeStore";
import { usePlayerStore } from "./stores/playerStore";
import { QueryProvider } from "./providers/QueryProvider";
import { useStations } from "./hooks/useStations";
import type { StationListItem } from "./types/station";
import { Navbar } from "./components/ui/Navbar";
import { Text } from "./components/ui/Text";
import { FeatureCard, type GradientName } from "./components/ui/FeatureCard";
import { MosqueCard } from "./components/ui/MosquesCardF";
import { AudioPlayer } from "./components/ui/AudioPlayer";

// Keep the splash screen visible while loading fonts
SplashScreen.preventAutoHideAsync();

// Feature cards data
const features: {
  title: string;
  description: string;
  icon: any;
  gradient: GradientName;
}[] = [
  {
    title: "Live Broadcasts",
    description: "Listen to live lectures, prayers and sermons from mosques",
    icon: Radio,
    gradient: "primary",
  },
  {
    title: "Find Mosques",
    description: "Discover mosques in your area with prayer times",
    icon: MapPin,
    gradient: "blue",
  },
  {
    title: "Prayer Times",
    description: "Accurate prayer times based on your location",
    icon: Clock,
    gradient: "purple",
  },
  {
    title: "Community",
    description: "Connect with your local mosque community",
    icon: Heart,
    gradient: "accent",
  },
];

function AppContent() {
  const { theme, colors } = useThemeStore();
  const {
    currentMosque,
    isPlaying,
    volume,
    setCurrentMosque,
    setIsPlaying,
    setVolume,
    togglePlay,
  } = usePlayerStore();

  // Fetch stations from API
  const { data: stations, isLoading, error } = useStations();

  const [fontsLoaded] = useFonts({
    Inter_400Regular: require("@expo-google-fonts/inter/400Regular/Inter_400Regular.ttf"),
    Inter_500Medium: require("@expo-google-fonts/inter/500Medium/Inter_500Medium.ttf"),
    Inter_600SemiBold: require("@expo-google-fonts/inter/600SemiBold/Inter_600SemiBold.ttf"),
    Inter_700Bold: require("@expo-google-fonts/inter/700Bold/Inter_700Bold.ttf"),
    Outfit_400Regular: require("@expo-google-fonts/outfit/400Regular/Outfit_400Regular.ttf"),
    Outfit_500Medium: require("@expo-google-fonts/outfit/500Medium/Outfit_500Medium.ttf"),
    Outfit_600SemiBold: require("@expo-google-fonts/outfit/600SemiBold/Outfit_600SemiBold.ttf"),
    Outfit_700Bold: require("@expo-google-fonts/outfit/700Bold/Outfit_700Bold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  const handlePlay = (station: StationListItem) => {
    if (currentMosque?.id === station._id) {
      togglePlay();
    } else {
      setCurrentMosque({
        id: station._id,
        name: station.name,
        location: station.mosqueId?.location || "Unknown location",
        mountPoint: station.mountPoint,
      });
      setIsPlaying(true);
    }
  };

  const handleClose = () => {
    setCurrentMosque(null);
    setIsPlaying(false);
  };

  return (
    <SafeAreaProvider>
      <View
        style={[styles.container, { backgroundColor: colors.background }]}
        onLayout={onLayoutRootView}>
        <Navbar />

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}>
          {/* Hero Section */}
          <View style={styles.hero}>
            <Text
              variant='heading'
              weight='bold'
              style={[styles.heroTitle, { color: colors.foreground }]}>
              Welcome to Minaret Live
            </Text>
            <Text
              style={[styles.heroSubtitle, { color: colors.mutedForeground }]}>
              Your mosque community hub
            </Text>
          </View>

          {/* Features Section */}
          <View style={styles.section}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.featuresScroll}>
              {features.map((feature, index) => (
                <View key={index} style={styles.featureItem}>
                  <FeatureCard
                    title={feature.title}
                    description={feature.description}
                    icon={feature.icon}
                    gradient={feature.gradient}
                  />
                </View>
              ))}
            </ScrollView>
          </View>

          {/* Stations Section */}
          <View style={styles.section}>
            <Text
              variant='heading'
              weight='bold'
              style={[styles.sectionTitle, { color: colors.foreground }]}>
              Popular Stations
            </Text>

            {isLoading && (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size='large' color={colors.primary} />
                <Text
                  style={[
                    styles.loadingText,
                    { color: colors.mutedForeground },
                  ]}>
                  Loading stations...
                </Text>
              </View>
            )}

            {error && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>
                  Failed to load stations. Please try again.
                </Text>
              </View>
            )}

            {stations && stations.length > 0 && (
              <View style={styles.mosqueList}>
                {stations.map((station) => (
                  <View key={station._id} style={styles.mosqueItem}>
                    <MosqueCard
                      name={station.name}
                      location={station.mosqueId?.location || "Unknown"}
                      listeners={station.stats?.totalListeners}
                      isLive={station.isLive}
                      streamUrl={station.streamUrl}
                      currentTrack={station.currentTrack}
                      isPlaying={currentMosque?.id === station._id && isPlaying}
                      onPlay={() => handlePlay(station)}
                    />
                  </View>
                ))}
              </View>
            )}
          </View>

          {/* Bottom padding for audio player */}
          <View style={{ height: 100 }} />
        </ScrollView>

        {/* Fixed Audio Player */}
        {currentMosque && (
          <AudioPlayer
            mosqueName={currentMosque.name}
            location={currentMosque.location}
            isLive={true}
            isPlaying={isPlaying}
            volume={volume}
            onPlayPause={togglePlay}
            onClose={handleClose}
            onVolumeChange={setVolume}
          />
        )}

        <StatusBar style={theme === "dark" ? "light" : "dark"} />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  hero: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 8,
  },
  heroTitle: {
    fontSize: 28,
  },
  heroSubtitle: {
    fontSize: 16,
    marginTop: 8,
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 22,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  featuresScroll: {
    paddingHorizontal: 16,
    gap: 12,
  },
  featureItem: {
    width: 260,
    marginRight: 12,
  },
  mosqueList: {
    paddingHorizontal: 16,
    gap: 16,
  },
  mosqueItem: {
    marginBottom: 16,
  },
  loadingContainer: {
    paddingVertical: 40,
    alignItems: "center",
    gap: 12,
  },
  loadingText: {
    fontSize: 14,
  },
  errorContainer: {
    paddingVertical: 40,
    paddingHorizontal: 16,
    alignItems: "center",
  },
  errorText: {
    fontSize: 14,
    color: "#EF4444",
    textAlign: "center",
  },
});

// Wrap AppContent with QueryProvider
export default function App() {
  return (
    <QueryProvider>
      <AppContent />
    </QueryProvider>
  );
}
