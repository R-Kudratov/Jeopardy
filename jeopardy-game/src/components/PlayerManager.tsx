import React from "react";
import { Box, Typography, Chip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useGameStore } from "../store/gameStore";

const PlayerManager: React.FC = () => {
  const { players, removePlayer } = useGameStore();

  if (players.length === 0) {
    return null;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 1.5,
        justifyContent: "center",
      }}
    >
      {players.map((player) => (
        <Chip
          key={player.id}
          label={
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                {player.name}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: "bold",
                  color: player.score >= 0 ? "success.main" : "error.main",
                  minWidth: "0px",
                }}
              >
                {player.score >= 0 ? `+${player.score}` : player.score}
              </Typography>
            </Box>
          }
          onDelete={() => removePlayer(player.id)}
          deleteIcon={<DeleteIcon fontSize="small" />}
          sx={{
            bgcolor: "rgba(0, 32, 99, 0.15)",
            border: "1px solid",
            borderColor: "primary.dark",
            py: 2,
            pr: 1,
            height: "auto",
            "& .MuiChip-label": {
              px: 2,
            },
            "&:hover": {
              bgcolor: "rgba(0, 32, 99, 0.25)",
            },
          }}
        />
      ))}
    </Box>
  );
};

export default PlayerManager;
