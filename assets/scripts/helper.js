const formatData = (questions) => {
  const results = questions.map((item) => {
    const questionObject = { question: item.question };
    const answers = [...item.incorrect_answers];
    const createAnswerIndex = Math.floor(Math.random() * 4);
    answers.splice(createAnswerIndex, 0, item.correct_answer);
    questionObject.answers = answers;
    questionObject.correctAnswerIndex = createAnswerIndex;
    return questionObject;
  });
  return results;
};

export default formatData;
