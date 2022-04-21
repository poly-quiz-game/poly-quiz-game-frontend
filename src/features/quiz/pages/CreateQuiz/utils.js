import { questionTypes } from "consts";

export const validateQuestion = (question) => {
  const err = {};
  const correctAnswer = question.correctAnswer.split("|").filter((a) => a);
  if (question?.type?.name === questionTypes.SINGLE_CORRECT_ANSWER) {
    if (question.question.trim() === "") {
      err.question = "Câu hỏi không được để trống";
    }
    if (question.answers.filter((a) => a && a.trim() !== "").length < 2) {
      err.answers = "Câu hỏi phải có đầy đủ 4 đáp án";
    }
    if (question.answers.filter((a) => a && a.trim() !== "").length > 4) {
      err.answers = "Câu hỏi không được vượt quá 4 đáp án";
    }
    if (correctAnswer.length === 0) {
      err.correctAnswer = "Câu hỏi phải có đáp án đúng";
    }
    if (correctAnswer.length > 1) {
      err.correctAnswer = "Câu hỏi chỉ được chọn 1 đáp án đúng";
    }
  }
  if (question?.type?.name === questionTypes.MULTIPLE_CORRECT_ANSWER) {
    if (question.question.trim() === "") {
      err.question = "Câu hỏi không được để trống";
    }
    if (question.answers.filter((a) => a && a.trim() !== "").length < 2) {
      err.answers = "Câu hỏi phải có đầy đủ 4 đáp án";
    }
    if (question.answers.filter((a) => a && a.trim() !== "").length > 4) {
      err.answers = "Câu hỏi không được vượt quá 4 đáp án";
    }
    if (correctAnswer.length < 2) {
      err.correctAnswer = "Câu hỏi phải có ít nhất 2 đáp án đúng";
    }
    if (correctAnswer.length > 4) {
      err.correctAnswer = "Câu hỏi không được vượt quá 4 đáp án đúng";
    }
  }
  if (question?.type?.name === questionTypes.TRUE_FALSE_ANSWER) {
    if (question.question.trim() === "") {
      err.question = "Câu hỏi không được để trống";
    }
    if (correctAnswer.length === 0) {
      err.correctAnswer = "Câu hỏi phải có đáp án đúng";
    }
    if (correctAnswer.length > 1) {
      err.correctAnswer = "Câu hỏi chỉ được chọn 1 đáp án đúng";
    }
    if (question.answers.filter((a) => a && a.trim() !== "").length < 2) {
      err.answers = "Câu hỏi phải có đầy đủ 2 đáp án";
    }
    if (question.answers.filter((a) => a && a.trim() !== "").length > 4) {
      err.answers = "Câu hỏi không được vượt quá 2 đáp án";
    }
  }
  if (question?.type?.name === questionTypes.TYPE_ANSWER) {
    if (question.question.trim() === "") {
      err.question = "Câu hỏi không được để trống";
    }
    if (question.answers[0].trim() === "") {
      err.correctAnswer = "Câu hỏi phải có đáp án đúng";
    }
  }
  return err;
};
