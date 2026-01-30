import { View, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Radio, MapPin, Users, Play, Pause } from "lucide-react-native";
import { Text } from "./Text";
import { useThemeStore } from "../../stores/themeStore";

export interface MosqueCardProps {
  name: string;
  location: string;
  listeners?: number;
  isLive?: boolean;
  isPlaying?: boolean;
  imageUrl?: string;
  onPlay?: () => void;
}

export function MosqueCard({
  name,
  location,
  listeners = 0,
  isLive = false,
  isPlaying = false,
  imageUrl,
  onPlay,
}: MosqueCardProps) {
  const { colors } = useThemeStore();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.card,
          borderColor: isPlaying ? colors.primary : colors.border,
        },
      ]}>
      {/* Image / Gradient Background */}
      <View style={styles.imageContainer}>
        {imageUrl ? (
          <Image
            source={{ uri: imageUrl }}
            style={styles.image}
            resizeMode='cover'
          />
        ) : (
          <View
            style={[
              styles.gradientPlaceholder,
              { backgroundColor: `${colors.primary}20` },
            ]}
          />
        )}

        {/* Live Badge */}
        {isLive && (
          <View
            style={[
              styles.liveBadge,
              {
                backgroundColor: `${colors.background}E6`,
                borderColor: `${colors.primary}50`,
              },
            ]}>
            <View
              style={[styles.liveDot, { backgroundColor: colors.primary }]}
            />
            <Text
              weight='bold'
              style={[styles.liveText, { color: colors.primary }]}>
              LIVE
            </Text>
          </View>
        )}

        {/* Play Button Overlay */}
        <View style={styles.playOverlay}>
          <TouchableOpacity
            onPress={onPlay}
            style={[
              styles.playButton,
              {
                backgroundColor: isPlaying
                  ? colors.primary
                  : `${colors.background}E6`,
              },
            ]}>
            {isPlaying ? (
              <Pause
                size={20}
                color={colors.primaryForeground}
                fill={colors.primaryForeground}
              />
            ) : (
              <Play
                size={20}
                color={colors.foreground}
                fill={colors.foreground}
                style={{ marginLeft: 2 }}
              />
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* Mosque Name */}
        <Text
          variant='heading'
          weight='semibold'
          style={[styles.name, { color: colors.foreground }]}
          numberOfLines={1}>
          {name}
        </Text>

        {/* Location & Listeners */}
        <View style={styles.metaRow}>
          <View style={styles.metaItem}>
            <MapPin size={14} color={colors.mutedForeground} />
            <Text
              style={[styles.metaText, { color: colors.mutedForeground }]}
              numberOfLines={1}>
              {location}
            </Text>
          </View>

          {listeners > 0 && (
            <View style={styles.metaItem}>
              <Users size={14} color={colors.mutedForeground} />
              <Text
                style={[styles.metaText, { color: colors.mutedForeground }]}>
                {listeners.toLocaleString()}
              </Text>
            </View>
          )}
        </View>

        {/* Now Playing Indicator */}
        {isPlaying && (
          <View style={styles.nowPlaying}>
            <Radio size={14} color={colors.primary} />
            <Text
              weight='medium'
              style={[styles.nowPlayingText, { color: colors.primary }]}>
              Now Playing
            </Text>
            <View style={styles.soundBars}>
              <View
                style={[styles.soundBar, { backgroundColor: colors.primary }]}
              />
              <View
                style={[
                  styles.soundBar,
                  styles.soundBarDelay1,
                  { backgroundColor: colors.primary },
                ]}
              />
              <View
                style={[
                  styles.soundBar,
                  styles.soundBarDelay2,
                  { backgroundColor: colors.primary },
                ]}
              />
            </View>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    borderWidth: 1,
    overflow: "hidden",
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 4,
    // elevation: 3,
  },
  imageContainer: {
    height: 128,
    width: "100%",
    overflow: "hidden",
    position: "relative",
  },
  image: {
    height: "100%",
    width: "100%",
  },
  gradientPlaceholder: {
    height: "100%",
    width: "100%",
  },
  liveBadge: {
    position: "absolute",
    top: 12,
    left: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 9999,
    borderWidth: 1,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  liveText: {
    fontSize: 10,
    textTransform: "uppercase",
  },
  playOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  playButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  content: {
    padding: 16,
  },
  name: {
    fontSize: 16,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 8,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  metaText: {
    fontSize: 13,
  },
  nowPlaying: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 12,
  },
  nowPlayingText: {
    fontSize: 12,
  },
  soundBars: {
    flexDirection: "row",
    gap: 2,
    marginLeft: "auto",
  },
  soundBar: {
    width: 2,
    height: 12,
    borderRadius: 1,
    opacity: 0.8,
  },
  soundBarDelay1: {
    height: 8,
  },
  soundBarDelay2: {
    height: 10,
  },
});

export default MosqueCard;
