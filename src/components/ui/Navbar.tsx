import { useState, useRef, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Modal,
  SafeAreaView,
  ScrollView,
  Platform,
  Animated,
  Dimensions,
  Pressable,
} from "react-native";
import { Menu, X, Sun, Moon } from "lucide-react-native";
import { useThemeStore } from "../../stores/themeStore";
import { Text } from "./Text";

const DRAWER_WIDTH = 280;
const { width: SCREEN_WIDTH } = Dimensions.get("window");

const navLinks = [
  { name: "Home", href: "#" },
  { name: "Prayer Times", href: "#prayer-times" },
  { name: "Live Radio", href: "#live" },
  { name: "Donate", href: "#donate" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, colors, toggleTheme } = useThemeStore();

  // Animation values
  const slideAnim = useRef(new Animated.Value(DRAWER_WIDTH)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isOpen) {
      // Slide in from right
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // Slide out to right
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: DRAWER_WIDTH,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isOpen]);

  const closeDrawer = () => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: DRAWER_WIDTH,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start(() => setIsOpen(false));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.logoContainer}
            onPress={() => console.log("Navigate Home")}>
            <Text
              variant='heading'
              weight='semibold'
              style={[styles.logoText, { color: colors.foreground }]}>
              Minaret Live
            </Text>
          </TouchableOpacity>

          <View style={styles.rightSection}>
            {/* Live Badge */}
            <View
              style={[
                styles.liveBadge,
                {
                  backgroundColor: `${colors.primary}15`,
                  borderColor: `${colors.primary}30`,
                },
              ]}>
              <View style={[styles.dot, { backgroundColor: colors.primary }]} />
              <Text
                weight='semibold'
                style={[styles.liveText, { color: colors.primary }]}>
                LIVE
              </Text>
            </View>

            {/* Mobile Menu Button */}
            <TouchableOpacity
              onPress={() => setIsOpen(true)}
              style={styles.menuButton}>
              <Menu color={colors.foreground} size={24} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Mobile Menu Modal */}
      <Modal
        visible={isOpen}
        animationType='none'
        transparent={true}
        onRequestClose={closeDrawer}>
        <View style={styles.modalOverlay}>
          {/* Backdrop - tap to close */}
          <Pressable style={styles.backdrop} onPress={closeDrawer}>
            <Animated.View
              style={[styles.backdropInner, { opacity: fadeAnim }]}
            />
          </Pressable>

          {/* Drawer with slide animation */}
          <Animated.View
            style={[
              styles.drawer,
              {
                backgroundColor: colors.background,
                transform: [{ translateX: slideAnim }],
              },
            ]}>
            <View style={styles.drawerHeader}>
              <TouchableOpacity onPress={closeDrawer}>
                <X color={colors.foreground} size={24} />
              </TouchableOpacity>
            </View>

            <View
              style={[
                styles.mobileLiveBadge,
                {
                  backgroundColor: `${colors.primary}15`,
                },
              ]}>
              <View style={[styles.dot, { backgroundColor: colors.primary }]} />
              <Text
                weight='semibold'
                style={[styles.liveText, { color: colors.primary }]}>
                LIVE NOW
              </Text>
            </View>

            <ScrollView style={styles.navLinks}>
              <View style={styles.navLinksInner}>
                {navLinks.map((link) => (
                  <TouchableOpacity
                    key={link.name}
                    style={styles.navLink}
                    onPress={closeDrawer}>
                    <Text
                      weight='medium'
                      style={[
                        styles.navLinkText,
                        { color: colors.foreground },
                      ]}>
                      {link.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>

            {/* Theme Toggle */}
            <TouchableOpacity
              onPress={toggleTheme}
              style={[styles.themeToggle, { backgroundColor: colors.muted }]}>
              {theme === "dark" ? (
                <Sun size={20} color={colors.foreground} />
              ) : (
                <Moon size={20} color={colors.foreground} />
              )}
              {/* <Text
                weight='medium'
                style={{ color: colors.foreground, marginLeft: 12 }}>
                {theme === "dark" ? "Light Mode" : "Dark Mode"}
              </Text> */}
            </TouchableOpacity>

            {/* <TouchableOpacity
              style={[
                styles.sponsorButton,
                { backgroundColor: colors.accent },
              ]}>
              <Text
                style={[
                  styles.sponsorButtonText,
                  { color: colors.accentForeground },
                ]}>
                Want to sponsor a program?
              </Text>
            </TouchableOpacity> */}
          </Animated.View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "transparent",
    zIndex: 50,
    paddingTop: Platform.OS === "android" ? 28 : 0,
  },
  header: {
    borderBottomWidth: 1,
    backgroundColor: "transparent",
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    height: 64,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  logoText: {
    fontSize: 20,
    fontWeight: "600",
  },
  rightSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  liveBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 9999,
    borderWidth: 1,
  },
  mobileLiveBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    alignSelf: "flex-start",
    marginBottom: 24,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  liveText: {
    fontSize: 12,
    fontWeight: "600",
  },
  menuButton: {
    padding: 8,
  },
  modalOverlay: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  backdropInner: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  drawer: {
    width: 280,
    paddingHorizontal: 24,
    paddingVertical: 8,
    height: "100%",
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
  },
  drawerHeader: {
    alignItems: "flex-end",
    marginBottom: 24,
  },
  navLinks: {
    flex: 1,
  },
  navLinksInner: {
    flexDirection: "column",
    gap: 10,
  },
  navLink: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  navLinkText: {
    fontSize: 16,
    fontWeight: "500",
  },
  sponsorButton: {
    marginTop: 24,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  sponsorButtonText: {
    fontWeight: "600",
  },
  themeToggle: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
  },
});
