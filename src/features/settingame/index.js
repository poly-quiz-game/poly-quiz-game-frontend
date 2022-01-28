import React from "react";
import { Col, Row, Button, Input, Image, Select, Radio } from "antd";

import MainLayout from "layouts/main.layout";

import "./styles.scss";

const Settingame = () => {
  const { TextArea } = Input;
  const { Option } = Select;

  return (
    <MainLayout>
      <br></br>
      <div className="setting">
        <Row>
          <Col span={12} offset={8}>
            <div className="title">
              <h2>Mời các con vk nhập</h2>
            </div>
            <div className="background">
              <div>
                <div className="box">
                  <h3>Tiêu đề</h3>
                  <Input
                    id="ip-left"
                    size="large"
                    placeholder="Nhập tiêu đề . . . "
                  />
                </div>
                <div className="box">
                  <h3>Mô tả</h3>
                  <TextArea
                    id="ip-left"
                    rows={4}
                    placeholder="Nhập mô tả . . . "
                  />
                </div>
                <div className="box">
                  <h3>Lưu</h3>
                  <Select defaultValue="My PolyQuizz" style={{ width: 420 }}>
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                    <Option value="disabled" disabled>
                      Disabled
                    </Option>
                    <Option value="Yiminghe">yiminghe</Option>
                  </Select>
                </div>
              </div>
              <div>
                <div className="box">
                  <h3>Background</h3>
                  <Image
                    width={420}
                    height={200}
                    src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                  />
                  <Button id="btn">Chọn</Button>
                </div>
                <div className="box">
                  <h3>Nhạc nền</h3>
                  <Select defaultValue="My PolyQuizz" style={{ width: 420 }}>
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                    <Option value="disabled" disabled>
                      Disabled
                    </Option>
                    <Option value="Yiminghe">yiminghe</Option>
                  </Select>
                </div>
                <div className="box">
                  <h3>HIện thị</h3>
                  <Radio>Cộng cộng</Radio>
                  <Radio>Riêng tư</Radio>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </MainLayout>
  );
};

export default Settingame;
