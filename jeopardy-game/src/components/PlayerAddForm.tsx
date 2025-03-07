import React, { useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useGameStore } from "../store/gameStore";

interface PlayerAddFormProps {
  onPlayerAdded?: () => void;
}

const PlayerAddForm: React.FC<PlayerAddFormProps> = ({ onPlayerAdded }) => {
  const { addPlayer } = useGameStore();
  const [newPlayerName, setNewPlayerName] = useState("");

  const handleAddPlayer = () => {
    if (newPlayerName.trim()) {
      addPlayer(newPlayerName.trim());
      setNewPlayerName("");
      if (onPlayerAdded) {
        onPlayerAdded();
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAddPlayer();
    }
  };

  return (
    <Box sx={{ display: "flex", width: "100%", minWidth: "300px", p: 1 }}>
      <TextField
        label="Имя игрока"
        variant="outlined"
        fullWidth
        value={newPlayerName}
        onChange={(e) => setNewPlayerName(e.target.value)}
        onKeyPress={handleKeyPress}
        autoFocus
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddPlayer}
        sx={{ ml: 1 }}
        disabled={!newPlayerName.trim()}
        startIcon={<PersonAddIcon />}
      >
        Добавить
      </Button>
    </Box>
  );
};

export default PlayerAddForm;
