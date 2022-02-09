import React from "react";
import { Form, Input, Button,Select } from 'antd';

import MainLayout from "layouts/main.layout";

import "./styles.scss";

const Settingame = () => {
  
  const onFinish = (values) => {
    console.log('Success:', values);
  };
  
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <MainLayout>
      <br></br><br></br><br></br>
    <Form
      name="basic"
      labelCol={{
        span: 6,
      }}
      wrapperCol={{
        span: 12,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Tên Quizz"
        name="title"
        rules={[
          {
            required: true,
            message: 'Mời nhập tên quizz!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item name="type" label="Chế độ" rules={[{ required: true }]}>
        <Select
          placeholder="Chọn chế độ"
          allowClear
        >
          <Option value="public">Công khai</Option>
          <Option value="private">Riêng tư</Option>
        </Select>
      </Form.Item>
      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
    </MainLayout>
  );
};

export default Settingame;
