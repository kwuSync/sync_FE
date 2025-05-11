const theme = {
  colors: {
    primary: "#1A2B4C",      // 메인 컬러
    secondary: "#6272a4",
    background: "#F5F5F5",
    text: "#212529",
    gray: "#adb5bd",
    danger: "#e03131",
  },
  fontSize: {
    xs: "12px",
    sm: "14px",
    base: "16px",
    lg: "20px",
    xl: "24px",
    title: "32px",
  },
  spacing: (value) => `${value * 8}px`,
};

export default theme;