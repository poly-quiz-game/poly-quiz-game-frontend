import React from "react";
import _ from "lodash";
import { Button, Modal } from "antd";
import {
  FileImageOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";

const ValidateQuizModal = ({
  isShowValidateModal,
  setIsShowValidateModal,
  questions,
  errors,
  setActiveQuestion,
}) => (
  <Modal
    title="Chưa thể tạo quiz"
    visible={isShowValidateModal}
    onCancel={() => setIsShowValidateModal(false)}
    footer={null}
  >
    <div className="question-errors">
      {errors.map((err, index) =>
        !_.isEmpty(err) ? (
          <div className="question-error-item" key={`error-${index}`}>
            <div className="question-error-header">
              <div className="question-error-content">
                <div className="question-error-index">Câu hỏi {index + 1}</div>
                <div className="question-error-title">
                  {(questions[index] && questions[index].question) ||
                    "Chưa nhập câu hỏi"}
                </div>
              </div>
              <Button
                onClick={() => {
                  setActiveQuestion(index);
                  setIsShowValidateModal(false);
                }}
                type="primary"
                size="small"
              >
                Mở
              </Button>
            </div>
            <div className="question-error-list">
              {Object.keys(err).map((key) => (
                <div className="question-error" key={`error-item-${key}`}>
                  <ExclamationCircleOutlined /> {err[key]}
                </div>
              ))}
            </div>
          </div>
        ) : null
      )}
    </div>
  </Modal>
);

export default ValidateQuizModal;
