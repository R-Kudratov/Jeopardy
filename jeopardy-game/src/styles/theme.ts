import { createTheme } from "@mui/material/styles";

// Цветовая палитра
export const colors = {
  // Основные цвета
  primary: {
    main: "#002063", // Темно-синий (основной)
    light: "#1A3A8A",
    dark: "#001345",
    contrastText: "#FFFFFF",
  },
  secondary: {
    main: "#FFC303", // Золотой (основной)
    light: "#FFD44F",
    dark: "#E6A800",
    contrastText: "#000000",
  },

  // Фоновые цвета
  background: {
    default: "#001233", // Темно-синий фон
    paper: "#001C4D", // Чуть светлее фон для карточек
    card: "rgba(0, 32, 99, 0.15)", // Полупрозрачный фон карточек
    cardHover: "rgba(0, 32, 99, 0.25)", // Фон карточек при наведении
  },

  // Текстовые цвета
  text: {
    primary: "#FFFFFF",
    secondary: "#B8C7E0",
  },

  // Цвета состояний
  state: {
    success: "#4CAF50", // Зеленый
    error: "#F44336", // Красный
    played: "rgba(0, 19, 69, 0.7)", // Цвет сыгранных вопросов
  },

  // Цвета границ
  border: {
    primary: "#001345",
    secondary: "#E6A800",
    light: "rgba(0, 32, 99, 0.3)",
  },

  // Акцентные цвета
  accent: {
    gold: "#FFC303", // Золотой (такой же как secondary.main)
    blue: "#0055FF", // Яркий синий
    lightBlue: "#4D8BFF", // Светло-синий
  },
};

// Тени
export const shadows = {
  small: "0 2px 8px rgba(0, 0, 0, 0.2)",
  medium: "0 4px 16px rgba(0, 0, 0, 0.2)",
  large: "0 8px 24px rgba(0, 0, 0, 0.3)",
};

// Скругления
export const borderRadius = {
  small: "8px",
  medium: "12px",
  large: "16px",
};

// Отступы
export const spacing = {
  small: "8px",
  medium: "16px",
  large: "24px",
};

// Переходы
export const transitions = {
  default: "all 0.2s ease",
};

// Общие стили компонентов
export const componentStyles = {
  // Стили для карточек
  card: {
    borderRadius: borderRadius.medium,
    boxShadow: shadows.small,
    border: `1px solid ${colors.border.primary}`,
    backgroundColor: colors.background.paper,
  },

  // Стили для заголовков
  title: {
    color: colors.secondary.main,
    fontWeight: "bold",
    textShadow: "1px 1px 1px rgba(0,0,0,0.3)",
    textTransform: "uppercase",
  },

  // Стили для кнопок
  button: {
    borderRadius: borderRadius.small,
    transition: transitions.default,
    fontWeight: "bold",
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: shadows.medium,
    },
  },

  // Стили для игровой доски
  gameBoard: {
    backgroundColor: colors.background.paper,
    borderRadius: borderRadius.medium,
    boxShadow: shadows.medium,
    border: `1px solid ${colors.border.primary}`,
  },

  // Стили для ячеек вопросов
  questionCell: {
    borderRadius: borderRadius.small,
    boxShadow: shadows.small,
    fontWeight: "bold",
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: transitions.default,
  },

  // Стили для карточек игроков
  playerCard: {
    borderRadius: borderRadius.small,
    backgroundColor: colors.background.card,
    border: `1px solid ${colors.border.primary}`,
    padding: spacing.small,
    display: "flex",
    alignItems: "center",
    minWidth: "180px",
    transition: transitions.default,
    "&:hover": {
      backgroundColor: colors.background.cardHover,
    },
  },

  // Стили для модальных окон
  modal: {
    borderRadius: borderRadius.medium,
    border: `1px solid ${colors.border.primary}`,
    backgroundColor: colors.background.paper,
    boxShadow: shadows.large,
  },

  // Стили для специальных вопросов
  specialQuestion: {
    backgroundColor: colors.secondary.main,
    borderColor: colors.secondary.dark,
    color: colors.secondary.contrastText,
  },
};

// Создаем тему Material UI
export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: colors.primary,
    secondary: colors.secondary,
    background: {
      default: colors.background.default,
      paper: colors.background.paper,
    },
    text: {
      primary: colors.text.primary,
      secondary: colors.text.secondary,
    },
    error: {
      main: colors.state.error,
    },
    success: {
      main: colors.state.success,
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Arial", sans-serif',
    h3: {
      fontWeight: 600,
      letterSpacing: "0.5px",
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 500,
    },
    h6: {
      fontWeight: 500,
    },
    button: {
      fontWeight: 500,
      textTransform: "none",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: borderRadius.small,
          boxShadow: "none",
          transition: transitions.default,
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: shadows.small,
          },
        },
        containedPrimary: {
          backgroundColor: colors.primary.main,
          "&:hover": {
            backgroundColor: colors.primary.light,
          },
        },
        containedSecondary: {
          backgroundColor: colors.secondary.main,
          color: colors.secondary.contrastText,
          "&:hover": {
            backgroundColor: colors.secondary.light,
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: borderRadius.small,
          boxShadow: "none",
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: borderRadius.medium,
          boxShadow: shadows.large,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: colors.border.light,
            borderWidth: 1,
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: colors.primary.light,
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: colors.secondary.main,
            borderWidth: 1,
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: colors.secondary.main,
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: colors.background.default,
          scrollbarWidth: "thin",
          "&::-webkit-scrollbar": {
            width: "6px",
            height: "6px",
          },
          "&::-webkit-scrollbar-track": {
            background: colors.background.paper,
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: colors.primary.main,
            borderRadius: "3px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: colors.primary.light,
          },
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: colors.border.light,
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          backgroundColor: colors.secondary.main,
          color: colors.secondary.contrastText,
        },
      },
    },
  },
});

export default theme;
