import { StyleSheet } from "react-native";
import { theme } from "./theme";

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.lg,
  },

  card: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.md,
    padding: theme.spacing.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  center: {
    justifyContent: "center",
    alignItems: "center",
  },

  // 🔘 Buttons
  buttonPrimary: {
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.md,
    borderRadius: theme.radius.md,
    alignItems: "center",
  },

  buttonPrimaryText: {
    color: "#fff",
    fontWeight: "600",
  },

  buttonOutline: {
    borderWidth: 1,
    borderColor: theme.colors.primary,
    padding: theme.spacing.md,
    borderRadius: theme.radius.md,
    alignItems: "center",
  },

  buttonOutlineText: {
    color: theme.colors.primary,
    fontWeight: "600",
  },
});