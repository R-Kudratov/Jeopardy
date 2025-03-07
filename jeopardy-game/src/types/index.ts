export interface Player {
  id: string;
  name: string;
  score: number;
}

export interface Question {
  id: string;
  categoryId: string;
  value: number;
  audioPath: string;
  answer: string;
  isSpecial: boolean;
  isPlayed: boolean;
}

export interface Category {
  id: string;
  name: string;
  questions: Question[];
}

export interface Round {
  id: string;
  name: string;
  categories: Category[];
}

export interface GameState {
  rounds: Round[];
  currentRound: string;
  players: Player[];
  currentQuestion: Question | null;
  isQuestionModalOpen: boolean;
  isAnswerRevealed: boolean;
  isAudioPlaying: boolean;
  selectedPlayerId: string | null;
}
