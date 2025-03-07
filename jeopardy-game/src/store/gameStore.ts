import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";
import { GameState, Question, Round } from "../types";

// Начальные данные для демонстрации
const initialRounds: Round[] = [
  {
    id: "1",
    name: "Раунд 1",
    categories: [
      {
        id: "1",
        name: "Осторожно, двери закрываются!",
        questions: [
          {
            id: "1-1-100",
            categoryId: "1",
            value: 100,
            audioPath: "/audio/1/1/1_1_100.mp3",
            answer: "Макс Корж - Тралики (Выстоять)",
            isSpecial: false,
            isPlayed: false,
          },
          {
            id: "1-1-200",
            categoryId: "1",
            value: 200,
            audioPath: "/audio/1/1/1_1_200.mp3",
            answer: "Женя Трофимов - Поезда",
            isSpecial: false,
            isPlayed: false,
          },
          {
            id: "1-1-300",
            categoryId: "1",
            value: 300,
            audioPath: "/audio/1/1/1_1_300.mp3",
            answer: "Женя Трофимов - Самолеты",
            isSpecial: false,
            isPlayed: false,
          },
          {
            id: "1-1-400",
            categoryId: "1",
            value: 400,
            audioPath: "/audio/1/1/1_1_400.mp3",
            answer: "Михаил Боярский - Зеленоглазое такси",
            isSpecial: false,
            isPlayed: false,
          },
          {
            id: "1-1-500",
            categoryId: "1",
            value: 500,
            audioPath: "/audio/1/1/1_1_500.mp3",
            answer: "МакSим - Дорога",
            isSpecial: false,
            isPlayed: false,
          },
        ],
      },
      {
        id: "2",
        name: "Как ты красива сегодня",
        questions: [
          {
            id: "1-2-100",
            categoryId: "2",
            value: 100,
            audioPath: "/audio/1/2/1_2_100.mp3",
            answer: "Фристайл - Ах, какая женщина",
            isSpecial: false,
            isPlayed: false,
          },
          {
            id: "1-2-200",
            categoryId: "2",
            value: 200,
            audioPath: "/audio/1/2/1_2_200.mp3",
            answer: "Валерий Меладзе - Как ты красива сегодня",
            isSpecial: false,
            isPlayed: false,
          },
          {
            id: "1-2-300",
            categoryId: "2",
            value: 300,
            audioPath: "/audio/1/2/1_2_300.mp3",
            answer: "Александ Серов - Я люблю тебя до слез",
            isSpecial: false,
            isPlayed: false,
          },
          {
            id: "1-2-400",
            categoryId: "2",
            value: 400,
            audioPath: "/audio/1/2/1_2_400.mp3",
            answer: "Rihanna - Diamonds",
            isSpecial: false,
            isPlayed: false,
          },
          {
            id: "1-2-500",
            categoryId: "2",
            value: 500,
            audioPath: "/audio/1/2/1_2_500.mp3",
            answer: "Katy Perry - I Kissed a Girl",
            isSpecial: false,
            isPlayed: false,
          },
        ],
      },
      {
        id: "3",
        name: "Где мои 16 лет?",
        questions: [
          {
            id: "1-3-100",
            categoryId: "3",
            value: 100,
            audioPath: "/audio/1/3/1_3_100.mp3",
            answer: "Ёлка - Прованс",
            isSpecial: false,
            isPlayed: false,
          },
          {
            id: "1-3-200",
            categoryId: "3",
            value: 200,
            audioPath: "/audio/1/3/1_3_200.mp3",
            answer: "Егор Крид - Самая самая",
            isSpecial: false,
            isPlayed: false,
          },
          {
            id: "1-3-300",
            categoryId: "3",
            value: 300,
            audioPath: "/audio/1/3/1_3_300.mp3",
            answer: "Винтаж - Знак водолея",
            isSpecial: false,
            isPlayed: false,
          },
          {
            id: "1-3-400",
            categoryId: "3",
            value: 400,
            audioPath: "/audio/1/3/1_3_400.mp3",
            answer: "Сергей Лазарев - В самое сердце",
            isSpecial: false,
            isPlayed: false,
          },
          {
            id: "1-3-500",
            categoryId: "3",
            value: 500,
            audioPath: "/audio/1/3/1_3_500.mp3",
            answer: "5sta Family - Вместе мы",
            isSpecial: false,
            isPlayed: false,
          },
        ],
      },
      {
        id: "4",
        name: "Фирмы и патчи",
        questions: [
          {
            id: "1-4-100",
            categoryId: "4",
            value: 100,
            audioPath: "/audio/1/4/1_4_100.mp3",
            answer: "Oxxxymiron - Где нас нет",
            isSpecial: false,
            isPlayed: false,
          },
          {
            id: "1-4-200",
            categoryId: "4",
            value: 200,
            audioPath: "/audio/1/4/1_4_200.mp3",
            answer: "Каста - Вокруг шум",
            isSpecial: false,
            isPlayed: false,
          },
          {
            id: "1-4-300",
            categoryId: "4",
            value: 300,
            audioPath: "/audio/1/4/1_4_300.mp3",
            answer: "ATL - Марабу",
            isSpecial: false,
            isPlayed: false,
          },
          {
            id: "1-4-400",
            categoryId: "4",
            value: 400,
            audioPath: "/audio/1/4/1_4_400.mp3",
            answer: "Oxxxymiron - Последний звонок",
            isSpecial: false,
            isPlayed: false,
          },
          {
            id: "1-4-500",
            categoryId: "4",
            value: 500,
            audioPath: "/audio/1/4/1_4_500.mp3",
            answer: "Баста - Моя игра",
            isSpecial: false,
            isPlayed: false,
          },
        ],
      },
      {
        id: "5",
        name: "Легендарный саунд",
        questions: [
          {
            id: "1-5-100",
            categoryId: "5",
            value: 100,
            audioPath: "/audio/1/5/1_5_100.mp3",
            answer: "Кино - Группа крови",
            isSpecial: false,
            isPlayed: false,
          },
          {
            id: "1-5-200",
            categoryId: "5",
            value: 200,
            audioPath: "/audio/1/5/1_5_200.mp3",
            answer: "Монеточка - Каждый раз",
            isSpecial: false,
            isPlayed: false,
          },
          {
            id: "1-5-300",
            categoryId: "5",
            value: 300,
            audioPath: "/audio/1/5/1_5_300.mp3",
            answer: "Скриптонит - Это любовь",
            isSpecial: false,
            isPlayed: false,
          },
          {
            id: "1-5-400",
            categoryId: "5",
            value: 400,
            audioPath: "/audio/1/5/1_5_400.mp3",
            answer: "Земляне - Трава у дома",
            isSpecial: false,
            isPlayed: false,
          },
          {
            id: "1-5-500",
            categoryId: "5",
            value: 500,
            audioPath: "/audio/1/5/1_5_500.mp3",
            answer: "Сплин - Мое сердце",
            isSpecial: false,
            isPlayed: false,
          },
        ],
      },
    ],
  },
  {
    id: "2",
    name: "Раунд 2",
    categories: [
      {
        id: "6",
        name: "Покатаемся по центру?",
        questions: [
          {
            id: "2-1-200",
            categoryId: "6",
            value: 200,
            audioPath: "/audio/2/1/2_1_200.mp3",
            answer: "KONSTRUKT",
            isSpecial: false,
            isPlayed: false,
          },
          {
            id: "2-1-400",
            categoryId: "6",
            value: 400,
            audioPath: "/audio/2/1/2_1_400.mp3",
            answer: "Бумбокс - Летний дождь",
            isSpecial: false,
            isPlayed: false,
          },
          {
            id: "2-1-600",
            categoryId: "6",
            value: 600,
            audioPath: "/audio/2/1/2_1_600.mp3",
            answer: "Антон Токарев - Седьмой лепесток",
            isSpecial: false,
            isPlayed: false,
          },
          {
            id: "2-1-800",
            categoryId: "6",
            value: 800,
            audioPath: "/audio/2/1/2_1_800.mp3",
            answer: "Morgenshtern - SHEIKH",
            isSpecial: false,
            isPlayed: false,
          },
          {
            id: "2-1-1000",
            categoryId: "6",
            value: 1000,
            audioPath: "/audio/2/1/2_1_1000.mp3",
            answer: "Мейби Бейби & Дора - Барбисайз",
            isSpecial: false,
            isPlayed: false,
          },
        ],
      },
      {
        id: "7",
        name: "Включи автотюн",
        questions: [
          {
            id: "2-2-200",
            categoryId: "7",
            value: 200,
            audioPath: "/audio/2/2/2_2_200.mp3",
            answer: "LIZER - Пачка сигарет",
            isSpecial: false,
            isPlayed: false,
          },
          {
            id: "2-2-400",
            categoryId: "7",
            value: 400,
            audioPath: "/audio/2/2/2_2_400.mp3",
            answer: "PHARAOH - Дико, например",
            isSpecial: false,
            isPlayed: false,
          },
          {
            id: "2-2-600",
            categoryId: "7",
            value: 600,
            audioPath: "/audio/2/2/2_2_600.mp3",
            answer: "MARKUL - Карусель",
            isSpecial: false,
            isPlayed: false,
          },
          {
            id: "2-2-800",
            categoryId: "7",
            value: 800,
            audioPath: "/audio/2/2/2_2_800.mp3",
            answer: "T-Fest - Улети",
            isSpecial: false,
            isPlayed: false,
          },
          {
            id: "2-2-1000",
            categoryId: "7",
            value: 1000,
            audioPath: "/audio/2/2/2_2_1000.mp3",
            answer: "FACE - Бургер",
            isSpecial: false,
            isPlayed: false,
          },
        ],
      },
      {
        id: "8",
        name: "Альтернативный маршрут",
        questions: [
          {
            id: "2-3-200",
            categoryId: "8",
            value: 200,
            audioPath: "/audio/2/3/2_3_200.mp3",
            answer: "Linkin Park - Numb",
            isSpecial: false,
            isPlayed: false,
          },
          {
            id: "2-3-400",
            categoryId: "8",
            value: 400,
            audioPath: "/audio/2/3/2_3_400.mp3",
            answer: "Red Hot Chili Peppers - Californication",
            isSpecial: false,
            isPlayed: false,
          },
          {
            id: "2-3-600",
            categoryId: "8",
            value: 600,
            audioPath: "/audio/2/3/2_3_600.mp3",
            answer: "Green Day - Boulevard of Broken Dreams",
            isSpecial: false,
            isPlayed: false,
          },
          {
            id: "2-3-800",
            categoryId: "8",
            value: 800,
            audioPath: "/audio/2/3/2_3_800.mp3",
            answer: "Thirty Seconds to Mars - The Kill",
            isSpecial: false,
            isPlayed: false,
          },
          {
            id: "2-3-1000",
            categoryId: "8",
            value: 1000,
            audioPath: "/audio/2/3/2_3_1000.mp3",
            answer: "Nickelback - How You Remind Me",
            isSpecial: false,
            isPlayed: false,
          },
        ],
      },
      {
        id: "9",
        name: "Майка, шорты, кеды",
        questions: [
          {
            id: "2-4-200",
            categoryId: "9",
            value: 200,
            audioPath: "/audio/2/4/2_4_200.mp3",
            answer: "Звери - Районы-кварталы",
            isSpecial: false,
            isPlayed: false,
          },
          {
            id: "2-4-400",
            categoryId: "9",
            value: 400,
            audioPath: "/audio/2/4/2_4_400.mp3",
            answer: "Иванушки International - Тополиный пух",
            isSpecial: false,
            isPlayed: false,
          },
          {
            id: "2-4-600",
            categoryId: "9",
            value: 600,
            audioPath: "/audio/2/4/2_4_600.mp3",
            answer: "Джарахов & Markul - Я в моменте",
            isSpecial: false,
            isPlayed: false,
          },
          {
            id: "2-4-800",
            categoryId: "9",
            value: 800,
            audioPath: "/audio/2/4/2_4_800.mp3",
            answer: "Блестящие -Апельсиновая песня",
            isSpecial: false,
            isPlayed: false,
          },
          {
            id: "2-4-1000",
            categoryId: "9",
            value: 1000,
            audioPath: "/audio/2/4/2_4_1000.mp3",
            answer: "Feduk & Элджей - Розовое вино",
            isSpecial: false,
            isPlayed: false,
          },
        ],
      },
      {
        id: "10",
        name: "Сос мыслом",
        questions: [
          {
            id: "2-5-200",
            categoryId: "10",
            value: 200,
            audioPath: "/audio/2/5/2_5_200.mp3",
            answer: "Сплин - Романс",
            isSpecial: false,
            isPlayed: false,
          },
          {
            id: "2-5-400",
            categoryId: "10",
            value: 400,
            audioPath: "/audio/2/5/2_5_400.mp3",
            answer: "Алексеев - Пьяное солнце",
            isSpecial: false,
            isPlayed: false,
          },
          {
            id: "2-5-600",
            categoryId: "10",
            value: 600,
            audioPath: "/audio/2/5/2_5_600.mp3",
            answer: "MIyaGI - Captain",
            isSpecial: false,
            isPlayed: false,
          },
          {
            id: "2-5-800",
            categoryId: "10",
            value: 800,
            audioPath: "/audio/2/5/2_5_800.mp3",
            answer: "Stromae - Papaoutai",
            isSpecial: false,
            isPlayed: false,
          },
          {
            id: "2-5-1000",
            categoryId: "10",
            value: 1000,
            audioPath: "/audio/2/5/2_5_1000.mp3",
            answer: "Hozier - Take Me to Church",
            isSpecial: false,
            isPlayed: false,
          },
        ],
      },
    ],
  },
];

const initialState: GameState = {
  rounds: initialRounds,
  currentRound: "1",
  players: [],
  currentQuestion: null,
  isQuestionModalOpen: false,
  isAnswerRevealed: false,
  isAudioPlaying: false,
  selectedPlayerId: null,
};

export const useGameStore = create<
  GameState & {
    // Действия для управления игроками
    addPlayer: (name: string) => void;
    removePlayer: (id: string) => void;
    updatePlayerScore: (id: string, isCorrect: boolean, value: number) => void;

    // Действия для управления вопросами
    selectQuestion: (question: Question) => void;
    closeQuestionModal: () => void;
    toggleAudioPlayback: () => void;
    selectPlayer: (playerId: string) => void;
    revealAnswer: () => void;
    markQuestionAsPlayed: () => void;

    // Действия для управления раундами
    setCurrentRound: (roundId: string) => void;

    // Действия для админки
    updateCategory: (roundId: string, categoryId: string, name: string) => void;
    updateQuestion: (
      roundId: string,
      categoryId: string,
      questionId: string,
      updates: Partial<Omit<Question, "id" | "categoryId">>
    ) => void;
    addCategory: (roundId: string, name: string) => void;
    addQuestion: (
      roundId: string,
      categoryId: string,
      value: number,
      answer: string,
      audioPath: string,
      isSpecial: boolean
    ) => void;
    addRound: (name: string) => void;
    resetGame: () => void;
  }
>((set) => ({
  ...initialState,

  // Действия для управления игроками
  addPlayer: (name) =>
    set((state) => ({
      players: [...state.players, { id: uuidv4(), name, score: 0 }],
    })),

  removePlayer: (id) =>
    set((state) => ({
      players: state.players.filter((player) => player.id !== id),
    })),

  updatePlayerScore: (id, isCorrect, value) =>
    set((state) => ({
      players: state.players.map((player) =>
        player.id === id
          ? { ...player, score: player.score + (isCorrect ? value : -value) }
          : player
      ),
    })),

  // Действия для управления вопросами
  selectQuestion: (question) =>
    set({
      currentQuestion: question,
      isQuestionModalOpen: true,
      isAnswerRevealed: false,
      isAudioPlaying: true,
      selectedPlayerId: null,
    }),

  closeQuestionModal: () =>
    set({
      isQuestionModalOpen: false,
      currentQuestion: null,
      isAudioPlaying: false,
      isAnswerRevealed: false,
      selectedPlayerId: null,
    }),

  toggleAudioPlayback: () =>
    set((state) => ({
      isAudioPlaying: !state.isAudioPlaying,
    })),

  selectPlayer: (playerId) =>
    set({
      selectedPlayerId: playerId,
      isAudioPlaying: false,
    }),

  revealAnswer: () =>
    set({
      isAnswerRevealed: true,
    }),

  markQuestionAsPlayed: () =>
    set((state) => {
      if (!state.currentQuestion) return state;

      const updatedRounds = state.rounds.map((round) => {
        if (round.id === state.currentRound) {
          return {
            ...round,
            categories: round.categories.map((category) => {
              if (category.id === state.currentQuestion?.categoryId) {
                return {
                  ...category,
                  questions: category.questions.map((question) =>
                    question.id === state.currentQuestion?.id
                      ? { ...question, isPlayed: true }
                      : question
                  ),
                };
              }
              return category;
            }),
          };
        }
        return round;
      });

      return {
        rounds: updatedRounds,
      };
    }),

  // Действия для управления раундами
  setCurrentRound: (roundId) =>
    set({
      currentRound: roundId,
    }),

  // Действия для админки
  updateCategory: (roundId, categoryId, name) =>
    set((state) => ({
      rounds: state.rounds.map((round) =>
        round.id === roundId
          ? {
              ...round,
              categories: round.categories.map((category) =>
                category.id === categoryId ? { ...category, name } : category
              ),
            }
          : round
      ),
    })),

  updateQuestion: (roundId, categoryId, questionId, updates) =>
    set((state) => ({
      rounds: state.rounds.map((round) =>
        round.id === roundId
          ? {
              ...round,
              categories: round.categories.map((category) =>
                category.id === categoryId
                  ? {
                      ...category,
                      questions: category.questions.map((question) =>
                        question.id === questionId
                          ? { ...question, ...updates }
                          : question
                      ),
                    }
                  : category
              ),
            }
          : round
      ),
    })),

  addCategory: (roundId, name) =>
    set((state) => ({
      rounds: state.rounds.map((round) =>
        round.id === roundId
          ? {
              ...round,
              categories: [
                ...round.categories,
                {
                  id: uuidv4(),
                  name,
                  questions: [],
                },
              ],
            }
          : round
      ),
    })),

  addQuestion: (roundId, categoryId, value, answer, audioPath, isSpecial) =>
    set((state) => ({
      rounds: state.rounds.map((round) =>
        round.id === roundId
          ? {
              ...round,
              categories: round.categories.map((category) =>
                category.id === categoryId
                  ? {
                      ...category,
                      questions: [
                        ...category.questions,
                        {
                          id: uuidv4(),
                          categoryId,
                          value,
                          answer,
                          audioPath,
                          isSpecial,
                          isPlayed: false,
                        },
                      ],
                    }
                  : category
              ),
            }
          : round
      ),
    })),

  addRound: (name) =>
    set((state) => ({
      rounds: [
        ...state.rounds,
        {
          id: uuidv4(),
          name,
          categories: [],
        },
      ],
    })),

  resetGame: () => set(initialState),
}));
