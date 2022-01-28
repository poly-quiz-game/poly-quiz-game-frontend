import React, {useState} from "react";

import MainLayout from "layouts/main.layout";

import "./styles1.scss";
import { Button,Modal,Col, Row , Input, Image, Select,Radio} from "antd";
const Settingquizz = [
  {
    name: "Quiz1",
    detail: "jaskdjalskdjlaksjdlkasjdlk",
    save: "Tất cả"
  }
];
const state = {
  setting: Settingquizz,
};


const Settingame2 = () => {
  const [visible, setVisible] = useState(false);
  const [setting, Settingcd] = React.useState(Settingquizz);
  const { TextArea } = Input;
  const { Option } = Select;
  return (
    <MainLayout>
      <br></br>
      <Button type="primary" onClick={() => setVisible(true)}>
        CÀI ĐẶT
      </Button>
      <Modal
        title="CÀI ĐẶT"
        centered
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        width={1000}
      >
     
    
    {setting.map((tt) => (
              <div className="setting">
              <Row>
                <Col span={16} offset={0.5}>
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
                            defaultValue="My Quizz Poly"
                            style={{ width: 420 }}
                            
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
                            width={420}
                            height={200}
                            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                          />
                          <Button id="btn" onClick={()=>{showanh()}}>Chọn</Button>
                        </div>
                        <div className="box">
                          <h3>Nhạc nền</h3>
                          <Select
                            defaultValue="My PolyQuizz"
                            style={{ width: 420 }}
                            
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
                            <Radio>Riêng tư</Radio>
                        </div>
                      </div>
                </Col>
              </Row>
          </div>
            ))}
      </Modal>
    </MainLayout>
  );
};

export default Settingame2;
