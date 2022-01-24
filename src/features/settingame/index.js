import React from "react";
import { Col, Row,Button} from "antd";

import { Link } from "react-router-dom";
import MainLayout from "layouts/main.layout";

import "./styles.scss";

const ShowSetingame = () => {
  constSetting = () =>{
      
  }
 
  return (
    <MainLayout>
      <br></br>
      <Button onClick={()=>Setting()}></Button>
      <div className="setting">
        <Row>
          <Col span={16} offset={4}>
                <div className="test">
                    <h2>Back ground</h2>
                    <select id="sl-box">
                        <option>
                            ádasjdklasjdl
                        </option>
                        <option>
                            test
                        </option>
                    </select>
                </div>
                <div className="test">
                    <h2>Nhạc nền</h2>
                    <select id="sl-box">
                        <option>
                            ádasjdklasjdl
                        </option>
                        <option>
                            test
                        </option>
                    </select>
                </div>
                <div className="test">
                    <h2>logo</h2>
                    <select id="sl-box">
                        <option>
                            ádasjdklasjdl
                        </option>
                        <option>
                            test
                        </option>
                    </select>
                </div>
          </Col>
        </Row>
      </div>
    </MainLayout>
  );
};

export default ShowSetingame;
