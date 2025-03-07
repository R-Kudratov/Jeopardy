import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  AppBar,
  Toolbar,
  IconButton,
} from "@mui/material";
import { Link } from "react-router-dom";
import GameBoard from "../components/GameBoard";
import PlayerManager from "../components/PlayerManager";
import RoundSelector from "../components/RoundSelector";
import QuestionModal from "../components/QuestionModal";
import SettingsIcon from "@mui/icons-material/Settings";
import AddIcon from "@mui/icons-material/Add";
import PlayerAddForm from "../components/PlayerAddForm";
import { componentStyles } from "../styles/theme";

const GamePage: React.FC = () => {
  const [isAddPlayerDialogOpen, setIsAddPlayerDialogOpen] = useState(false);

  const handleOpenAddPlayerDialog = () => {
    setIsAddPlayerDialogOpen(true);
  };

  const handleCloseAddPlayerDialog = () => {
    setIsAddPlayerDialogOpen(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
        bgcolor: "background.default",
      }}
    >
      {/* Верхняя панель с выбором раунда */}
      <AppBar
        position="static"
        color="primary"
        elevation={0}
        sx={{
          mb: { xs: 1.5, sm: 2, md: 3 },
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            px: { xs: 2.5, sm: 3, md: 4 },
            py: { xs: 1, sm: 1.5 },
            gap: 3,
            minHeight: { xs: 64, sm: 72 },
          }}
        >
          {/* Левая группа кнопок */}
          <Box sx={{ display: "flex", gap: 2.5, minWidth: "140px" }}>
            <IconButton
              color="secondary"
              onClick={handleOpenAddPlayerDialog}
              size="large"
              sx={{
                bgcolor: "secondary.main",
                color: "secondary.contrastText",
                width: { xs: 44, sm: 48 },
                height: { xs: 44, sm: 48 },
                "&:hover": {
                  bgcolor: "secondary.light",
                },
              }}
            >
              <AddIcon sx={{ fontSize: { xs: 24, sm: 28 } }} />
            </IconButton>
            <IconButton
              component={Link}
              to="/admin"
              color="inherit"
              size="large"
              sx={{
                bgcolor: "primary.dark",
                width: { xs: 44, sm: 48 },
                height: { xs: 44, sm: 48 },
                "&:hover": {
                  bgcolor: "primary.light",
                },
              }}
            >
              <SettingsIcon sx={{ fontSize: { xs: 24, sm: 28 } }} />
            </IconButton>
          </Box>

          {/* Центральный блок с игроками */}
          <Box
            sx={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              mx: { xs: 2, sm: 3, md: 4 },
            }}
          >
            <PlayerManager />
          </Box>

          {/* Правый блок с выбором раунда */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              width: "140px",
              pr: { xs: 0.5, sm: 1 },
            }}
          >
            <RoundSelector />
          </Box>
        </Toolbar>
      </AppBar>

      {/* Основной контент */}
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          px: { xs: 2, sm: 3, md: 4 },
          pb: { xs: 2, sm: 3, md: 4 },
          overflow: "auto",
        }}
      >
        <GameBoard />
      </Box>

      {/* Диалог добавления игрока */}
      <Dialog
        open={isAddPlayerDialogOpen}
        onClose={handleCloseAddPlayerDialog}
        PaperProps={{
          sx: {
            ...componentStyles.modal,
            minWidth: { xs: 320, sm: 400 },
            maxWidth: { xs: "90%", sm: 480 },
            mx: 2,
          },
        }}
      >
        <DialogTitle
          sx={{
            bgcolor: "primary.main",
            color: "primary.contrastText",
            py: 2,
            px: { xs: 2.5, sm: 3 },
            fontSize: { xs: "1.25rem", sm: "1.5rem" },
          }}
        >
          Добавить игрока
        </DialogTitle>
        <DialogContent
          sx={{
            py: { xs: 2.5, sm: 3 },
            px: { xs: 2.5, sm: 3 },
          }}
        >
          <PlayerAddForm onPlayerAdded={handleCloseAddPlayerDialog} />
        </DialogContent>
        <DialogActions
          sx={{
            px: { xs: 2.5, sm: 3 },
            py: 2,
            gap: 1.5,
          }}
        >
          <Button
            onClick={handleCloseAddPlayerDialog}
            sx={{
              minWidth: 100,
              height: 44,
            }}
          >
            Закрыть
          </Button>
        </DialogActions>
      </Dialog>

      {/* Модальное окно с вопросом */}
      <QuestionModal />
    </Box>
  );
};

export default GamePage;
