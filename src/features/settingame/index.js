import React from "react";
import { Col, Row, Button, Input, Image, Select,Radio} from "antd";

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
          <Col span={16} offset={6}>
            <div className="setting">
              <h2>CÀI ĐẶT</h2>
              <br></br>
              <div className="box-setting">
                <div className="left">
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
                    <Select
                      defaultValue="My PolyQuizz"
                      style={{ width: 400 }}
                      
                    >
                      <Option value="jack">Jack</Option>
                      <Option value="lucy">Lucy</Option>
                      <Option value="disabled" disabled>
                        Disabled
                      </Option>
                      <Option value="Yiminghe">yiminghe</Option>
                    </Select>
                    
                  </div>
                </div>
                <div className="right">
                  <div className="box">
                    <h3>Background</h3>
                    <Image
                      width={400}
                      height={200}
                      src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                    />
                    <Button id="btn">Chọn</Button>
                  </div>
                  <div className="box">
                    <h3>Nhạc nền</h3>
                    <Select
                      defaultValue="My PolyQuizz"
                      style={{ width: 400 }}
                      
                    >
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
                      <Radio>Rieeng Tư</Radio>
                  </div>
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
