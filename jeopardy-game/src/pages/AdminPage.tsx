import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Tabs,
  Tab,
  Paper,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import { useGameStore } from "../store/gameStore";
import { Category, Question, Round } from "../types";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`admin-tabpanel-${index}`}
      aria-labelledby={`admin-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

const AdminPage: React.FC = () => {
  const {
    rounds,
    addRound,
    addCategory,
    updateCategory,
    addQuestion,
    updateQuestion,
  } = useGameStore();
  const [tabValue, setTabValue] = useState(0);
  const [selectedRound, setSelectedRound] = useState<string>(
    rounds[0]?.id || ""
  );
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [newRoundName, setNewRoundName] = useState("");
  const [newCategoryName, setNewCategoryName] = useState("");
  const [questionForm, setQuestionForm] = useState({
    value: 100,
    answer: "",
    audioPath: "",
    isSpecial: false,
  });
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleRoundChange = (event: SelectChangeEvent<string>) => {
    setSelectedRound(event.target.value);
    setSelectedCategory("");
  };

  const handleCategoryChange = (event: SelectChangeEvent<string>) => {
    setSelectedCategory(event.target.value);
  };

  const handleAddRound = () => {
    if (newRoundName.trim()) {
      addRound(newRoundName);
      setNewRoundName("");
    }
  };

  const handleAddCategory = () => {
    if (selectedRound && newCategoryName.trim()) {
      addCategory(selectedRound, newCategoryName);
      setNewCategoryName("");
    }
  };

  const handleQuestionFormChange = (
    field: keyof typeof questionForm,
    value: string | number | boolean
  ) => {
    setQuestionForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddQuestion = () => {
    if (selectedRound && selectedCategory) {
      addQuestion(
        selectedRound,
        selectedCategory,
        questionForm.value,
        questionForm.answer,
        questionForm.audioPath,
        questionForm.isSpecial
      );

      // Сброс формы
      setQuestionForm({
        value: 100,
        answer: "",
        audioPath: "",
        isSpecial: false,
      });
    }
  };

  const handleUpdateQuestion = () => {
    if (selectedRound && selectedCategory && editingQuestion) {
      updateQuestion(selectedRound, selectedCategory, editingQuestion.id, {
        value: questionForm.value,
        answer: questionForm.answer,
        audioPath: questionForm.audioPath,
        isSpecial: questionForm.isSpecial,
      });

      setEditingQuestion(null);
      setQuestionForm({
        value: 100,
        answer: "",
        audioPath: "",
        isSpecial: false,
      });
    }
  };

  const startEditingQuestion = (question: Question) => {
    setEditingQuestion(question);
    setQuestionForm({
      value: question.value,
      answer: question.answer,
      audioPath: question.audioPath,
      isSpecial: question.isSpecial,
    });
  };

  const cancelEditingQuestion = () => {
    setEditingQuestion(null);
    setQuestionForm({
      value: 100,
      answer: "",
      audioPath: "",
      isSpecial: false,
    });
  };

  // Получаем текущий раунд и категорию
  const currentRound = rounds.find((r) => r.id === selectedRound);
  const currentCategory = currentRound?.categories.find(
    (c) => c.id === selectedCategory
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <IconButton component={Link} to="/" sx={{ mr: 2 }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4">Панель администратора</Typography>
      </Box>

      <Paper sx={{ width: "100%" }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Раунды" />
          <Tab label="Категории" />
          <Tab label="Вопросы" />
        </Tabs>

        {/* Управление раундами */}
        <TabPanel value={tabValue} index={0}>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Добавить новый раунд
            </Typography>
            <Box sx={{ display: "flex", gap: 2 }}>
              <TextField
                label="Название раунда"
                variant="outlined"
                fullWidth
                value={newRoundName}
                onChange={(e) => setNewRoundName(e.target.value)}
              />
              <Button
                variant="contained"
                onClick={handleAddRound}
                disabled={!newRoundName.trim()}
              >
                Добавить
              </Button>
            </Box>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h6" gutterBottom>
            Существующие раунды
          </Typography>
          <List>
            {rounds.map((round) => (
              <ListItem key={round.id}>
                <ListItemText
                  primary={round.name}
                  secondary={`Категорий: ${round.categories.length}`}
                />
              </ListItem>
            ))}
          </List>
        </TabPanel>

        {/* Управление категориями */}
        <TabPanel value={tabValue} index={1}>
          <Box sx={{ mb: 3 }}>
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel>Выберите раунд</InputLabel>
              <Select
                value={selectedRound}
                onChange={handleRoundChange}
                label="Выберите раунд"
              >
                {rounds.map((round) => (
                  <MenuItem key={round.id} value={round.id}>
                    {round.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {selectedRound && (
              <>
                <Typography variant="h6" gutterBottom>
                  Добавить новую категорию
                </Typography>
                <Box sx={{ display: "flex", gap: 2 }}>
                  <TextField
                    label="Название категории"
                    variant="outlined"
                    fullWidth
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                  />
                  <Button
                    variant="contained"
                    onClick={handleAddCategory}
                    disabled={!newCategoryName.trim()}
                  >
                    Добавить
                  </Button>
                </Box>
              </>
            )}
          </Box>

          {selectedRound && (
            <>
              <Divider sx={{ my: 3 }} />

              <Typography variant="h6" gutterBottom>
                Категории в раунде {currentRound?.name}
              </Typography>
              <List>
                {currentRound?.categories.map((category) => (
                  <ListItem
                    key={category.id}
                    secondaryAction={
                      <IconButton edge="end" onClick={() => {}}>
                        <EditIcon />
                      </IconButton>
                    }
                  >
                    <ListItemText
                      primary={category.name}
                      secondary={`Вопросов: ${category.questions.length}`}
                    />
                  </ListItem>
                ))}
              </List>
            </>
          )}
        </TabPanel>

        {/* Управление вопросами */}
        <TabPanel value={tabValue} index={2}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel>Выберите раунд</InputLabel>
                <Select
                  value={selectedRound}
                  onChange={handleRoundChange}
                  label="Выберите раунд"
                >
                  {rounds.map((round) => (
                    <MenuItem key={round.id} value={round.id}>
                      {round.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {selectedRound && (
                <FormControl fullWidth sx={{ mb: 3 }}>
                  <InputLabel>Выберите категорию</InputLabel>
                  <Select
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                    label="Выберите категорию"
                  >
                    {currentRound?.categories.map((category) => (
                      <MenuItem key={category.id} value={category.id}>
                        {category.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}

              {selectedRound && selectedCategory && (
                <Paper sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    {editingQuestion
                      ? "Редактировать вопрос"
                      : "Добавить новый вопрос"}
                  </Typography>

                  <TextField
                    label="Стоимость"
                    type="number"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={questionForm.value}
                    onChange={(e) =>
                      handleQuestionFormChange(
                        "value",
                        parseInt(e.target.value)
                      )
                    }
                  />

                  <TextField
                    label="Ответ"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={questionForm.answer}
                    onChange={(e) =>
                      handleQuestionFormChange("answer", e.target.value)
                    }
                  />

                  <TextField
                    label="Путь к аудиофайлу"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={questionForm.audioPath}
                    onChange={(e) =>
                      handleQuestionFormChange("audioPath", e.target.value)
                    }
                    helperText="Например: /audio/sample1.mp3"
                  />

                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={questionForm.isSpecial}
                        onChange={(e) =>
                          handleQuestionFormChange(
                            "isSpecial",
                            e.target.checked
                          )
                        }
                      />
                    }
                    label="Особый вопрос"
                    sx={{ mt: 2 }}
                  />

                  <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
                    {editingQuestion ? (
                      <>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={handleUpdateQuestion}
                          disabled={
                            !questionForm.answer || !questionForm.audioPath
                          }
                        >
                          Обновить
                        </Button>
                        <Button
                          variant="outlined"
                          onClick={cancelEditingQuestion}
                        >
                          Отмена
                        </Button>
                      </>
                    ) : (
                      <Button
                        variant="contained"
                        onClick={handleAddQuestion}
                        disabled={
                          !questionForm.answer || !questionForm.audioPath
                        }
                      >
                        Добавить
                      </Button>
                    )}
                  </Box>
                </Paper>
              )}
            </Grid>

            <Grid item xs={12} md={6}>
              {selectedRound && selectedCategory && (
                <>
                  <Typography variant="h6" gutterBottom>
                    Вопросы в категории {currentCategory?.name}
                  </Typography>

                  {currentCategory?.questions.length ? (
                    <List>
                      {currentCategory?.questions.map((question) => (
                        <ListItem
                          key={question.id}
                          secondaryAction={
                            <Box>
                              <IconButton
                                edge="end"
                                onClick={() => startEditingQuestion(question)}
                              >
                                <EditIcon />
                              </IconButton>
                              <IconButton edge="end">
                                <DeleteIcon />
                              </IconButton>
                            </Box>
                          }
                        >
                          <ListItemText
                            primary={`${question.value} - ${question.answer}`}
                            secondary={
                              <>
                                {question.audioPath}
                                {question.isSpecial && " (Особый вопрос)"}
                                {question.isPlayed && " (Сыгран)"}
                              </>
                            }
                          />
                        </ListItem>
                      ))}
                    </List>
                  ) : (
                    <Typography variant="body2" sx={{ fontStyle: "italic" }}>
                      В этой категории пока нет вопросов
                    </Typography>
                  )}
                </>
              )}
            </Grid>
          </Grid>
        </TabPanel>
      </Paper>
    </Container>
  );
};

export default AdminPage;
