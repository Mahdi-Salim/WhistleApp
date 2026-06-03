export const theme = {
  colors: {
    // 🟢 Primary (IFAB style)
    primary: "#0B3D2E",
    primaryLight: "#145A43",

    // ⚪ Backgrounds
    background: "#F4F6F6",
    card: "#FFFFFF",

    // 🔲 Borders
    border: "#E5E7EB",

    // ⚫ Text
    textPrimary: "#111827",
    textSecondary: "#6B7280",

    // 🟢 Status
    success: "#1E7F4F",
    danger: "#D64545",
  },

  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
  },

  radius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
  },

  typography: {
    title: {
      fontSize: 22,
      fontWeight: "700" as const,
      color: "#111827",
    },
    subtitle: {
      fontSize: 16,
      fontWeight: "600" as const,
      color: "#111827",
    },
    body: {
      fontSize: 14,
      color: "#6B7280",
    },
    caption: {
      fontSize: 12,
      color: "#6B7280",
    },
  },

  shadow: {
    light: {
      shadowColor: "#000",
      shadowOpacity: 0.04,
      shadowRadius: 6,
      elevation: 2,
    },
  },
};