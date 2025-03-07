import React, { useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  Box,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { useGameStore } from "../store/gameStore";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import PauseIcon from "@mui/icons-material/Pause";
import { formatTime } from "../utils/audioUtils";
import { componentStyles, borderRadius } from "../styles/theme";

const QuestionModal: React.FC = () => {
  const {
    isQuestionModalOpen,
    currentQuestion,
    players,
    selectedPlayerId,
    isAnswerRevealed,
    isAudioPlaying,
    closeQuestionModal,
    toggleAudioPlayback,
    selectPlayer,
    revealAnswer,
    updatePlayerScore,
    markQuestionAsPlayed,
  } = useGameStore();

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [audioTime, setAudioTime] = React.useState(0);
  const [audioDuration, setAudioDuration] = React.useState(0);

  // Обработка нажатия клавиши пробел для паузы/воспроизведения аудио
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === "Space" && isQuestionModalOpen && !isAnswerRevealed) {
        event.preventDefault();
        toggleAudioPlayback();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isQuestionModalOpen, isAnswerRevealed, toggleAudioPlayback]);

  // Управление воспроизведением аудио
  useEffect(() => {
    if (audioRef.current) {
      if (isAudioPlaying) {
        audioRef.current.play().catch((error) => {
          console.error("Ошибка воспроизведения аудио:", error);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isAudioPlaying]);

  // Обновление времени аудио
  useEffect(() => {
    const updateTime = () => {
      if (audioRef.current) {
        setAudioTime(audioRef.current.currentTime);
      }
    };

    const handleLoadedMetadata = () => {
      if (audioRef.current) {
        setAudioDuration(audioRef.current.duration);
      }
    };

    if (audioRef.current) {
      audioRef.current.addEventListener("timeupdate", updateTime);
      audioRef.current.addEventListener("loadedmetadata", handleLoadedMetadata);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("timeupdate", updateTime);
        audioRef.current.removeEventListener(
          "loadedmetadata",
          handleLoadedMetadata
        );
      }
    };
  }, [currentQuestion]);

  if (!currentQuestion) {
    return null;
  }

  const handlePlayerSelect = (event: SelectChangeEvent<string>) => {
    selectPlayer(event.target.value);
  };

  const handleAnswerResult = (isCorrect: boolean) => {
    if (selectedPlayerId) {
      updatePlayerScore(selectedPlayerId, isCorrect, currentQuestion.value);
      markQuestionAsPlayed();
      closeQuestionModal();
    }
  };

  const isSpecialQuestion = currentQuestion.isSpecial;

  return (
    <Dialog
      open={isQuestionModalOpen}
      onClose={closeQuestionModal}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          ...componentStyles.modal,
        },
      }}
    >
      <DialogTitle
        sx={{
          bgcolor: isSpecialQuestion ? "secondary.main" : "primary.main",
          color: isSpecialQuestion
            ? "secondary.contrastText"
            : "primary.contrastText",
          textAlign: "center",
          borderBottom: "1px solid",
          borderColor: isSpecialQuestion ? "secondary.dark" : "primary.dark",
          py: 1.5,
        }}
      >
        <Typography
          sx={{
            fontWeight: "bold",
            fontSize: "2rem",
            textShadow: isSpecialQuestion
              ? "none"
              : "1px 1px 2px rgba(0,0,0,0.4)",
          }}
        >
          {`ВОПРОС ЗА ${currentQuestion.value}`}
        </Typography>
      </DialogTitle>
      <DialogContent
        sx={{
          p: 3,
          minHeight: "350px",
          bgcolor: "background.paper",
          color: "text.primary",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 3,
          }}
        >
          {/* Аудио плеер (скрытый) */}
          <audio
            ref={audioRef}
            src={currentQuestion.audioPath}
            autoPlay={true}
            preload="auto"
          />

          {/* Статус воспроизведения */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              bgcolor: "rgba(0, 0, 0, 0.15)",
              p: 3,
              borderRadius: borderRadius.small,
              width: "100%",
              maxWidth: "500px",
              border: "1px solid",
              borderColor: "primary.dark",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 2,
              }}
            >
              {isAudioPlaying ? (
                <MusicNoteIcon
                  sx={{
                    fontSize: 36,
                    color: "secondary.main",
                    animation: "pulse 1s infinite",
                  }}
                />
              ) : (
                <PauseIcon sx={{ fontSize: 36, color: "secondary.main" }} />
              )}
              <Typography
                variant="h6"
                sx={{ ml: 2, fontWeight: "bold", color: "secondary.main" }}
              >
                {isAudioPlaying ? "Воспроизведение..." : "Пауза"}
              </Typography>
            </Box>

            {/* Прогресс аудио */}
            <Box
              sx={{
                width: "100%",
                height: "6px",
                bgcolor: "primary.dark",
                borderRadius: "3px",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  height: "100%",
                  width: `${(audioTime / audioDuration) * 100}%`,
                  bgcolor: "secondary.main",
                  transition: "width 0.1s linear",
                }}
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                mt: 1,
              }}
            >
              <Typography variant="body2" sx={{ color: "secondary.main" }}>
                {formatTime(audioTime)}
              </Typography>
              <Typography variant="body2" sx={{ color: "secondary.main" }}>
                {formatTime(audioDuration)}
              </Typography>
            </Box>
          </Box>

          <Typography
            variant="body1"
            sx={{ fontStyle: "italic", color: "secondary.main", opacity: 0.9 }}
          >
            {!selectedPlayerId &&
              "Нажмите пробел, чтобы поставить на паузу и выбрать игрока"}
          </Typography>

          {/* Выбор игрока (появляется после паузы) */}
          {!isAudioPlaying && !isAnswerRevealed && (
            <FormControl
              fullWidth
              sx={{
                mt: 2,
                maxWidth: "500px",
              }}
            >
              <InputLabel>Выберите игрока</InputLabel>
              <Select
                value={selectedPlayerId || ""}
                onChange={handlePlayerSelect}
                label="Выберите игрока"
              >
                {players.map((player) => (
                  <MenuItem key={player.id} value={player.id}>
                    {player.name} ({player.score})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

          {/* Кнопка для показа ответа */}
          {selectedPlayerId && !isAnswerRevealed && (
            <Button
              variant="contained"
              color="primary"
              onClick={revealAnswer}
              sx={{ mt: 2 }}
            >
              Показать ответ
            </Button>
          )}

          {/* Правильный ответ и кнопки оценки */}
          {isAnswerRevealed && (
            <>
              <Box
                sx={{
                  bgcolor: "rgba(0, 0, 0, 0.15)",
                  p: 3,
                  borderRadius: borderRadius.small,
                  width: "100%",
                  textAlign: "center",
                  border: "1px solid",
                  borderColor: "secondary.main",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", color: "secondary.main" }}
                >
                  Правильный ответ:
                </Typography>
                <Typography
                  variant="h5"
                  sx={{ mt: 2, fontWeight: "bold", color: "text.primary" }}
                >
                  {currentQuestion.answer}
                </Typography>
              </Box>

              <Box sx={{ display: "flex", gap: 3, mt: 3 }}>
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => handleAnswerResult(true)}
                  sx={{ fontSize: "1rem", px: 3 }}
                >
                  Правильно (+{currentQuestion.value})
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleAnswerResult(false)}
                  sx={{ fontSize: "1rem", px: 3 }}
                >
                  Неправильно (-{currentQuestion.value})
                </Button>
              </Box>
            </>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default QuestionModal;
