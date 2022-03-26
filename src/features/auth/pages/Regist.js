import { Button, Form, Input, message } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { add } from "../authSlice";
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
  },
};

const Regist = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const success = (title) => {
    message.success(`${title} user thành công!`);
  };

  const onFinish = async (values) => {
    await dispatch(add(values));
    await success("Register");
    await navigate("/auth/login");
  };

  return (
    <>
    <h2>Bạn chưa có tài khoản, Hãy nhập email để đăng ký</h2>   
      <Form
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        validateMessages={validateMessages}
      >
        <Form.Item
          name={"email"}
          label="Email"
          rules={[
            {
              type: "email",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default Regist;
