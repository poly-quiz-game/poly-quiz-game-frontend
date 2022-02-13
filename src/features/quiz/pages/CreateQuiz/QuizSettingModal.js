import React from "react";
import { Button, Modal, Form, Input } from "antd";

const QuestionOption = ({
  isShowSetting,
  setIsShowSetting,
  submitQuestions,
  input,
  setInput,
  setQuiz,
}) => (
  <Modal
    title="Cài đặt Quiz"
    visible={isShowSetting}
    onCancel={() => setIsShowSetting(false)}
    footer={null}
  >
    <Form
      name="quiz-setting"
      initialValues={{ remember: true }}
      layout="vertical"
      autoComplete="off"
    >
      <Form.Item
        label="Tên quiz"
        name="name"
        rules={[{ required: true, message: "Vui lòng nhập tên!" }]}
      >
        <Input value={input} onChange={(e) => setInput(e.target.value)} />
      </Form.Item>
      <Button
        type="primary"
        htmlType="submit"
        onClick={() => {
          if (isShowSetting === "save") {
            submitQuestions({ name: input });
            return;
          }
          setQuiz((q) => ({ ...q, name: input }));
          setIsShowSetting(false);
        }}
      >
        Lưu
      </Button>
    </Form>
  </Modal>
);

export default QuestionOption;
