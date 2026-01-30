import { View, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { Play, Pause, X, Radio, Volume2, VolumeX } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Text } from "./Text";
import { useThemeStore } from "../../stores/themeStore";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export interface AudioPlayerProps {
  mosqueName: string;
  location: string;
  isPlaying: boolean;
  isLive?: boolean;
  volume?: number;
  onPlayPause: () => void;
  onClose: () => void;
  onVolumeChange?: (value: number) => void;
}

export function AudioPlayer({
  mosqueName,
  location,
  isPlaying,
  isLive = false,
  volume = 0.8,
  onPlayPause,
  onClose,
  onVolumeChange,
}: AudioPlayerProps) {
  const { colors } = useThemeStore();
  const insets = useSafeAreaInsets();

  const toggleMute = () => {
    if (onVolumeChange) {
      onVolumeChange(volume > 0 ? 0 : 0.8);
    }
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: `${colors.background}F2`,
          borderTopColor: colors.border,
          paddingBottom: insets.bottom,
        },
      ]}>
      <View style={styles.content}>
        {/* Play/Pause Button */}
        <TouchableOpacity
          onPress={onPlayPause}
          style={[styles.playButton, { backgroundColor: colors.primary }]}>
          {isPlaying ? (
            <Pause
              size={20}
              color={colors.primaryForeground}
              fill={colors.primaryForeground}
            />
          ) : (
            <Play
              size={20}
              color={colors.primaryForeground}
              fill={colors.primaryForeground}
              style={{ marginLeft: 2 }}
            />
          )}
        </TouchableOpacity>

        {/* Mosque Info */}
        <View style={styles.info}>
          <View style={styles.titleRow}>
            <Text
              variant='heading'
              weight='semibold'
              style={[styles.mosqueName, { color: colors.foreground }]}
              numberOfLines={1}>
              {mosqueName}
            </Text>
            {isLive && (
              <View
                style={[
                  styles.liveBadge,
                  {
                    backgroundColor: `${colors.primary}15`,
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
          </View>
          <Text
            style={[styles.location, { color: colors.mutedForeground }]}
            numberOfLines={1}>
            {location}
          </Text>
        </View>

        {/* Audio Visualizer (when playing) */}
        {isPlaying && (
          <View style={styles.visualizer}>
            <Radio size={16} color={colors.primary} />
            <View style={styles.soundBars}>
              <View
                style={[
                  styles.soundBar,
                  { height: 16, backgroundColor: colors.primary },
                ]}
              />
              <View
                style={[
                  styles.soundBar,
                  { height: 24, backgroundColor: colors.primary },
                ]}
              />
              <View
                style={[
                  styles.soundBar,
                  { height: 12, backgroundColor: colors.primary },
                ]}
              />
              <View
                style={[
                  styles.soundBar,
                  { height: 20, backgroundColor: colors.primary },
                ]}
              />
            </View>
          </View>
        )}

        {/* Volume Toggle */}
        <TouchableOpacity onPress={toggleMute} style={styles.volumeButton}>
          {volume > 0 ? (
            <Volume2 size={20} color={colors.mutedForeground} />
          ) : (
            <VolumeX size={20} color={colors.mutedForeground} />
          )}
        </TouchableOpacity>

        {/* Close Button */}
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <X size={18} color={colors.mutedForeground} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  playButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  info: {
    flex: 1,
    minWidth: 0,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  mosqueName: {
    fontSize: 15,
    flexShrink: 1,
  },
  liveBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 9999,
    borderWidth: 1,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  liveText: {
    fontSize: 9,
    textTransform: "uppercase",
  },
  location: {
    fontSize: 13,
    marginTop: 2,
  },
  visualizer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 8,
  },
  soundBars: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 2,
    height: 24,
  },
  soundBar: {
    width: 2,
    borderRadius: 1,
    opacity: 0.8,
  },
  volumeControl: {
    flexDirection: "row",
    alignItems: "center",
    width: 100,
    gap: 4,
  },
  slider: {
    flex: 1,
    height: 40,
  },
  volumeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AudioPlayer;
