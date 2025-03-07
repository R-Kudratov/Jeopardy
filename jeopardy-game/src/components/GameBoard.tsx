import React from "react";
import { Box, Grid, Typography, Paper } from "@mui/material";
import { useGameStore } from "../store/gameStore";
import { Category, Question } from "../types";
import { componentStyles, shadows, borderRadius } from "../styles/theme";

const GameBoard: React.FC = () => {
  const { rounds, currentRound, selectQuestion } = useGameStore();

  // Находим текущий раунд
  const round = rounds.find((r) => r.id === currentRound);

  if (!round) {
    return <Typography variant="h5">Раунд не найден</Typography>;
  }

  const handleQuestionClick = (question: Question) => {
    if (!question.isPlayed) {
      selectQuestion(question);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "85vh",
          maxWidth: "2000px",
          p: { xs: 0.5, sm: 1, md: 1.5 },
          display: "flex",
          flexDirection: "column",
          ...componentStyles.gameBoard,
        }}
      >
        <Grid container spacing={1} sx={{ flexGrow: 1 }}>
          {/* Заголовки категорий */}
          {round.categories.map((category: Category) => (
            <Grid item xs={12 / round.categories.length} key={category.id}>
              <Paper
                sx={{
                  p: 1.5,
                  textAlign: "center",
                  bgcolor: "primary.main",
                  color: "secondary.main",
                  fontWeight: "bold",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: borderRadius.small,
                  boxShadow: shadows.small,
                  m: "0 2px",
                  border: "1px solid",
                  borderColor: "primary.dark",
                }}
              >
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: "bold",
                    fontSize: {
                      xs: "0.8rem",
                      sm: "0.9rem",
                      md: "1rem",
                      lg: "1.2rem",
                    },
                    textTransform: "uppercase",
                    textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
                    px: 0.5,
                    lineHeight: 1.2,
                  }}
                >
                  {category.name}
                </Typography>
              </Paper>
            </Grid>
          ))}

          {/* Вопросы */}
          {[...Array(5)].map((_, rowIndex) => (
            <React.Fragment key={`row-${rowIndex}`}>
              {round.categories.map((category: Category) => {
                const question = category.questions[rowIndex];
                return (
                  <Grid
                    item
                    xs={12 / round.categories.length}
                    key={`${category.id}-${rowIndex}`}
                  >
                    {question ? (
                      <Paper
                        sx={{
                          ...componentStyles.questionCell,
                          p: 1,
                          bgcolor: question.isPlayed
                            ? "primary.dark"
                            : "primary.main",
                          color: "secondary.main",
                          cursor: question.isPlayed ? "default" : "pointer",
                          height: "100%",
                          m: "2px",
                          border: "1px solid",
                          borderColor: question.isPlayed
                            ? "primary.dark"
                            : "primary.dark",
                          opacity: question.isPlayed ? 0.6 : 1,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          "&:hover": {
                            bgcolor: question.isPlayed
                              ? "primary.dark"
                              : "primary.light",
                            transform: question.isPlayed
                              ? "none"
                              : "scale(1.02)",
                            boxShadow: question.isPlayed
                              ? shadows.small
                              : shadows.medium,
                          },
                        }}
                        onClick={() => handleQuestionClick(question)}
                      >
                        <Typography
                          variant="h5"
                          sx={{
                            fontWeight: "bold",
                            textShadow: question.isSpecial
                              ? "none"
                              : "1px 1px 2px rgba(0,0,0,0.5)",
                            fontSize: {
                              xs: "1.2rem",
                              sm: "1.5rem",
                              md: "1.8rem",
                              lg: "2.2rem",
                            },
                          }}
                        >
                          {question.value}
                        </Typography>
                      </Paper>
                    ) : (
                      <Paper
                        sx={{
                          ...componentStyles.questionCell,
                          p: 1,
                          bgcolor: "primary.dark",
                          color: "primary.contrastText",
                          height: "17%",
                          minHeight: { xs: "70px", sm: "80px" },
                          m: "2px",
                          border: "1px solid",
                          borderColor: "primary.dark",
                          opacity: 0.6,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Typography
                          variant="h5"
                          sx={{
                            fontSize: {
                              xs: "1.2rem",
                              sm: "1.5rem",
                              md: "1.8rem",
                              lg: "2.2rem",
                            },
                          }}
                        >
                          -
                        </Typography>
                      </Paper>
                    )}
                  </Grid>
                );
              })}
            </React.Fragment>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default GameBoard;
