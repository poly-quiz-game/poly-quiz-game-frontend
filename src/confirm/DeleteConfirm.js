import { ExclamationCircleOutlined } from "@ant-design/icons";
import { message, Modal } from "antd";
import React from "react";

const { confirm } = Modal;

export const showDeleteConfirm = (content, callback) => {
  confirm({
    icon: <ExclamationCircleOutlined />,
    content: `Bạn có chắc muốn xóa: ${content}`,
    okText: "Xoá",
    okType: "danger",
    cancelText: "Huỷ",
    async onOk() {
      await callback();
      message.success(`Xóa ${content} thành công`);
    },
  });
};
