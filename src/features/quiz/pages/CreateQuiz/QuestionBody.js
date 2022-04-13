import React, { useState, useRef, useEffect } from "react";
import { Button, Radio, Input } from "antd";
import {
  FileImageOutlined,
  PlayCircleOutlined,
  SoundOutlined,
} from "@ant-design/icons";
import { questionTypes } from "consts";
import questionTimeApi from "api/questionTimeApi";
import { handleUploadImage } from "../../../../utils";
import QuestionOption from "./QuestionOption";
import Audio from "./Audio";
import Video from "./Video";
import SelectYoutubeVideoModal from "./SelectYoutubeVideoModal";
import {
  MultipleAnswer,
  SingleAnswer,
  TrueFalseAnswer,
  TypeAnswer,
} from "./components";
import { baseURL } from "../../../../api/axiosClient";
import axios from "axios";

const QuestionAnswers = ({ question, onChangeQuestion }) => {
  switch (question?.type?.name) {
    case questionTypes.SINGLE_CORRECT_ANSWER:
      return (
        <SingleAnswer onChangeQuestion={onChangeQuestion} question={question} />
      );
    case questionTypes.MULTIPLE_CORRECT_ANSWER:
      return (
        <MultipleAnswer
          onChangeQuestion={onChangeQuestion}
          question={question}
        />
      );
    case questionTypes.TRUE_FALSE_ANSWER:
      return (
        <TrueFalseAnswer
          onChangeQuestion={onChangeQuestion}
          question={question}
        />
      );
    case questionTypes.TYPE_ANSWER:
      return (
        <TypeAnswer onChangeQuestion={onChangeQuestion} question={question} />
      );
  }
};

function uploadAudioAsync(file) {
  console.log("Uploading " + file);
  const apiUrl = `${baseURL}/audio/upload`;

  const formData = new FormData();
  formData.append("file", file);

  return axios.post(apiUrl, formData);
}

const Media = ({ media, setQuestionMedia, setQuestionMediaTime }) => {
  switch (media.type) {
    case "image":
      return (
        <div className="image-container">
          <div className="image">
            <img src={media.url} />
            <div className="image-actions">
              <Button onClick={() => setQuestionMedia()}>Xoá</Button>
            </div>
          </div>
        </div>
      );
    case "audio":
      return (
        <div className="image-container">
          <Audio
            media={media}
            setQuestionMedia={setQuestionMedia}
            setQuestionMediaTime={setQuestionMediaTime}
          />
        </div>
      );
    case "video":
      return (
        <div className="video-container">
          <Video
            media={media}
            setQuestionMedia={setQuestionMedia}
            setQuestionMediaTime={setQuestionMediaTime}
          />
        </div>
      );
    default:
      return null;
  }
};

const QuestionBody = ({ question, onChangeQuestion, deleteQuestion }) => {
  const [loading, setLoading] = useState(false);
  const [showSelectYoutubVideoModal, setShowSelectYoutubVideoModal] =
    useState(false);
  const [questionTimes, setQuestionTimes] = useState([]);

  useEffect(() => {
    const getQuestionTimes = async () => {
      const questionTimes = await questionTimeApi.getAll();
      setQuestionTimes(questionTimes.data.sort((a, b) => a.value - b.value));
    };
    getQuestionTimes();
  }, []);

  const handleSubmitImage = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    const fileType = e.target.name;
    try {
      setLoading(true);
      const url = await handleUploadImage(file);
      setQuestionMedia({ url, fileType });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleSubmitAudio = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    const fileType = e.target.name;
    try {
      setLoading(true);
      const {
        data: {
          file: { url },
        },
      } = await uploadAudioAsync(file);
      console.log({ url });
      setQuestionMedia({ url, fileType });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const setQuestionMedia = ({ url, fileType } = {}) => {
    let media = {};
    if (url && fileType) {
      media = {
        url,
        type: fileType,
        startTime: 0,
        endTime: question.timeLimit / 1000,
      };
    }
    onChangeQuestion({
      ...question,
      media,
    });
  };

  const setQuestionMediaTime = ({ startTime, endTime }) => {
    const duration = (endTime - startTime) * 1000;
    const newQuestion = {
      ...question,

      media: {
        ...question.media,
        startTime,
        endTime,
      },
    };
    if (duration > question.timeLimit) {
      const minHigher = questionTimes.find(
        (questionTime) => questionTime.value > duration
      );
      newQuestion.timeLimit = minHigher.value;
    }
    onChangeQuestion(newQuestion);
  };

  const onChangeQuestionType = (type) => {
    const newQuestion = { ...question };
    if (type.name === questionTypes.TYPE_ANSWER) {
      newQuestion.correctAnswer = "0";
    } else {
      newQuestion.correctAnswer = "";
    }
    onChangeQuestion({ ...newQuestion, type });
  };

  const onChangeQuestionTime = (timeLimit) => {
    onChangeQuestion({ ...question, timeLimit });
  };

  const inputImageRef = useRef(null);
  const inputAudioRef = useRef(null);

  return (
    <>
      <div className="question-body-container">
        <div className="question-body">
          <div className="question-body-question">
            <Input
              value={question.question}
              onChange={(e) =>
                onChangeQuestion({ ...question, question: e.target.value })
              }
            />
          </div>
          <div className="question-body-image">
            {question.media && question.media.url ? (
              <Media
                media={question.media}
                setQuestionMedia={setQuestionMedia}
                setQuestionMediaTime={setQuestionMediaTime}
              />
            ) : (
              <div className="image-container">
                <div className="image-upload-buttons">
                  <img src="/soundtrack.png" width={60} />
                  <div style={{ marginBottom: "12px" }}>
                    Thêm ảnh, video, âm thanh
                  </div>
                  <div>
                    <Button onClick={() => inputImageRef.current.click()}>
                      <FileImageOutlined /> Hình ảnh
                    </Button>
                    <Button onClick={() => setShowSelectYoutubVideoModal(true)}>
                      <PlayCircleOutlined /> Video
                    </Button>
                    <Button onClick={() => inputAudioRef.current.click()}>
                      <SoundOutlined /> Âm thanh
                    </Button>
                  </div>
                  <input
                    type="file"
                    name="image"
                    onChange={handleSubmitImage}
                    className="form-input"
                    accept="image/*"
                    style={{ display: "none" }}
                    ref={inputImageRef}
                  />
                  <input
                    type="file"
                    name="audio"
                    onChange={handleSubmitAudio}
                    className="form-input"
                    accept="audio/*"
                    style={{ display: "none" }}
                    ref={inputAudioRef}
                  />
                  <SelectYoutubeVideoModal
                    visible={showSelectYoutubVideoModal}
                    setVisible={setShowSelectYoutubVideoModal}
                    setQuestionMedia={setQuestionMedia}
                    setQuestionMediaTime={setQuestionMediaTime}
                  />
                </div>
              </div>
            )}
          </div>
          <QuestionAnswers
            onChangeQuestion={onChangeQuestion}
            question={question}
          />
        </div>
      </div>
      <QuestionOption
        onChangeQuestionType={onChangeQuestionType}
        onChangeQuestionTime={onChangeQuestionTime}
        question={question}
        deleteQuestion={deleteQuestion}
      />
    </>
  );
};

export default QuestionBody;
