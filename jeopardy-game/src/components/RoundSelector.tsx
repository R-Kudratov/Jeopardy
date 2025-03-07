import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Box,
} from "@mui/material";
import { useGameStore } from "../store/gameStore";

const RoundSelector: React.FC = () => {
  const { rounds, currentRound, setCurrentRound } = useGameStore();

  const handleRoundChange = (event: SelectChangeEvent<string>) => {
    setCurrentRound(event.target.value);
  };

  return (
    <Box>
      <FormControl fullWidth size="small" variant="outlined">
        <InputLabel id="round-select-label" sx={{ color: "secondary.main" }}>
          Раунд
        </InputLabel>
        <Select
          labelId="round-select-label"
          id="round-select"
          value={currentRound}
          label="Раунд"
          onChange={handleRoundChange}
          sx={{
            color: "secondary.main",
            ".MuiOutlinedInput-notchedOutline": {
              borderColor: "secondary.main",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "secondary.light",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "secondary.main",
            },
            ".MuiSvgIcon-root": {
              color: "secondary.main",
            },
          }}
        >
          {rounds.map((round) => (
            <MenuItem key={round.id} value={round.id}>
              {round.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default RoundSelector;
