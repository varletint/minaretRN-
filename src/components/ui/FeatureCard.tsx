import { View, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import type { LucideIcon } from "lucide-react-native";
import { Text } from "./Text";

// Predefined gradient colors for React Native
export const GRADIENT_COLORS = {
  primary: ["#059669", "#10B981"] as const, // green
  accent: ["#D97706", "#F59E0B"] as const, // orange/amber
  purple: ["#7C3AED", "#A78BFA"] as const, // purple
  blue: ["#2563EB", "#60A5FA"] as const, // blue
  rose: ["#E11D48", "#FB7185"] as const, // rose
  teal: ["#0D9488", "#2DD4BF"] as const, // teal
  indigo: ["#4F46E5", "#818CF8"] as const, // indigo
};

export type GradientName = keyof typeof GRADIENT_COLORS;

export interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  gradient?: GradientName;
  colors?: readonly [string, string]; // Custom gradient colors
}

export function FeatureCard({
  title,
  description,
  icon: Icon,
  gradient = "primary",
  colors,
}: FeatureCardProps) {
  // Use custom colors or predefined gradient
  const gradientColors = colors || GRADIENT_COLORS[gradient];

  return (
    <View style={styles.card}>
      <LinearGradient
        colors={[...gradientColors]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}>
        <View style={styles.content}>
          <Icon size={48} color='rgba(255,255,255,0.9)' />
          <Text variant='heading' weight='bold' style={styles.title}>
            {title}
          </Text>
          <Text style={styles.description}>{description}</Text>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  gradient: {
    width: "100%",
  },
  content: {
    aspectRatio: 4 / 3,
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    color: "#FFFFFF",
    textAlign: "center",
    marginTop: 16,
  },
  description: {
    marginTop: 8,
    fontSize: 14,
    color: "rgba(255,255,255,0.8)",
    textAlign: "center",
  },
});

export default FeatureCard;
