import React from "react";
import { Button, Select } from "antd";

const QuestionOption = ({
  onChangeQuestionType,
  onChangeQuestionTime,
  question,
}) => {
  return (
    <div className="question-options">
      <div className="question-option-item">
        <div className="question-option-item-title">
          <svg
            width="21"
            height="21"
            viewBox="0 0 21 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21 10.5C21 13.2848 19.8938 15.9555 17.9246 17.9246C15.9555 19.8938 13.2848 21 10.5 21C7.71523 21 5.04451 19.8938 3.07538 17.9246C1.10625 15.9555 0 13.2848 0 10.5C0 7.71523 1.10625 5.04451 3.07538 3.07538C5.04451 1.10625 7.71523 0 10.5 0C13.2848 0 15.9555 1.10625 17.9246 3.07538C19.8938 5.04451 21 7.71523 21 10.5ZM7.2135 7.91831H8.29631C8.47744 7.91831 8.62181 7.77 8.64544 7.59019C8.76356 6.72919 9.35419 6.10181 10.4068 6.10181C11.3072 6.10181 12.1314 6.552 12.1314 7.63481C12.1314 8.46825 11.6406 8.8515 10.8649 9.43425C9.98156 10.0761 9.282 10.8255 9.33187 12.0422L9.33581 12.327C9.33719 12.4131 9.37237 12.4952 9.43375 12.5556C9.49514 12.616 9.57782 12.6499 9.66394 12.6499H10.7284C10.8154 12.6499 10.8989 12.6153 10.9604 12.5538C11.0219 12.4922 11.0565 12.4088 11.0565 12.3217V12.1839C11.0565 11.2416 11.4148 10.9672 12.3821 10.2336C13.1814 9.62587 14.0149 8.95125 14.0149 7.53506C14.0149 5.55188 12.3401 4.59375 10.5066 4.59375C8.84363 4.59375 7.02188 5.36812 6.89719 7.59412C6.89539 7.63651 6.90228 7.67882 6.91744 7.71844C6.9326 7.75806 6.9557 7.79417 6.98533 7.82453C7.01496 7.8549 7.05048 7.87888 7.08972 7.89501C7.12896 7.91114 7.17108 7.91907 7.2135 7.91831ZM10.2651 16.3748C11.0657 16.3748 11.6156 15.8576 11.6156 15.1581C11.6156 14.4336 11.0644 13.9243 10.2651 13.9243C9.49856 13.9243 8.94075 14.4336 8.94075 15.1581C8.94075 15.8576 9.49856 16.3748 10.2664 16.3748H10.2651Z"
              fill="black"
            />
          </svg>
          Loại câu hỏi
        </div>
        <div className="question-option-item-content">
          <Select
            style={{ width: "100%" }}
            onChange={onChangeQuestionType}
            value={question.type}
          >
            <Select.Option value="quiz">Quiz</Select.Option>
            <Select.Option value="true_false">Đúng/Sai</Select.Option>
          </Select>
        </div>
      </div>
      <div className="question-option-item">
        <div className="question-option-item-title">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 0C8.02219 0 6.08879 0.58649 4.4443 1.6853C2.79981 2.78412 1.51809 4.3459 0.761209 6.17317C0.00433284 8.00043 -0.193701 10.0111 0.192152 11.9509C0.578004 13.8907 1.53041 15.6725 2.92894 17.0711C4.32746 18.4696 6.10929 19.422 8.0491 19.8079C9.98891 20.1937 11.9996 19.9957 13.8268 19.2388C15.6541 18.4819 17.2159 17.2002 18.3147 15.5557C19.4135 13.9112 20 11.9778 20 10C20 8.68678 19.7413 7.38642 19.2388 6.17317C18.7363 4.95991 17.9997 3.85752 17.0711 2.92893C16.1425 2.00035 15.0401 1.26375 13.8268 0.761205C12.6136 0.258658 11.3132 0 10 0ZM14 11H10C9.73479 11 9.48043 10.8946 9.2929 10.7071C9.10536 10.5196 9 10.2652 9 10V6C9 5.73478 9.10536 5.48043 9.2929 5.29289C9.48043 5.10536 9.73479 5 10 5C10.2652 5 10.5196 5.10536 10.7071 5.29289C10.8946 5.48043 11 5.73478 11 6V9H14C14.2652 9 14.5196 9.10536 14.7071 9.29289C14.8946 9.48043 15 9.73478 15 10C15 10.2652 14.8946 10.5196 14.7071 10.7071C14.5196 10.8946 14.2652 11 14 11Z"
              fill="black"
            />
          </svg>
          Giới hạn thời gian
        </div>
        <div className="question-option-item-content">
          <Select
            defaultValue="20000"
            style={{ width: "100%" }}
            onChange={onChangeQuestionTime}
            value={question.time.toString()}
          >
            <Select.Option value="20000">20 giây</Select.Option>
            <Select.Option value="60000">1 phút</Select.Option>
            <Select.Option value="120000">2 phút</Select.Option>
          </Select>
        </div>
      </div>
      <div className="question-option-actions">
        <Button className="delete-btn" danger>
          Xóa
        </Button>
        <Button>Nhân đôi</Button>
      </div>
    </div>
  );
};

export default QuestionOption;
