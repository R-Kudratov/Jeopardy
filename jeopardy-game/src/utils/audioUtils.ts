/**
 * Проверяет, существует ли аудиофайл по указанному пути
 * @param path Путь к аудиофайлу
 * @returns Promise, который разрешается в true, если файл существует, и в false в противном случае
 */
export const checkAudioExists = async (path: string): Promise<boolean> => {
  try {
    const response = await fetch(path, { method: "HEAD" });
    return response.ok;
  } catch (error) {
    console.error("Ошибка при проверке аудиофайла:", error);
    return false;
  }
};

/**
 * Форматирует время в секундах в формат MM:SS
 * @param seconds Время в секундах
 * @returns Отформатированное время в формате MM:SS
 */
export const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(remainingSeconds).padStart(2, "0");

  return `${formattedMinutes}:${formattedSeconds}`;
};

/**
 * Загружает аудиофайл и возвращает его URL
 * @param file Файл для загрузки
 * @returns URL загруженного файла
 */
export const uploadAudio = (file: File): string => {
  // В реальном приложении здесь был бы код для загрузки файла на сервер
  // Для демонстрации просто создаем URL объекта File
  return URL.createObjectURL(file);
};

/**
 * Предзагружает аудиофайл для более быстрого воспроизведения
 * @param path Путь к аудиофайлу
 */
export const preloadAudio = (path: string): void => {
  const audio = new Audio();
  audio.src = path;
  audio.preload = "auto";
};

/**
 * Воспроизводит звуковой эффект
 * @param effectName Название звукового эффекта
 */
export const playSound = (
  effectName: "correct" | "wrong" | "timeout"
): void => {
  const soundMap = {
    correct: "/audio/effects/correct.mp3",
    wrong: "/audio/effects/wrong.mp3",
    timeout: "/audio/effects/timeout.mp3",
  };

  const audio = new Audio(soundMap[effectName]);
  audio.play().catch((error) => {
    console.error("Ошибка воспроизведения звукового эффекта:", error);
  });
};
