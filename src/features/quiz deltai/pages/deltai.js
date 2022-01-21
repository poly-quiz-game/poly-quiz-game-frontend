import React, { useState } from "react";
import MainLayout from "../../../layouts/main.layout";
import { Layout } from "antd";

const { Header, Footer, Sider, Content } = Layout;
import "../index.scss";
const arr = [
  {
    question: "chào bạn ngày hôm nay của bạn thế nào?",
    answer: ["đúng", "sai", "sai", "sai"],
    correctAnswer: 0,
    time: 20,
    list: {
      question: "chào bạn ngày hôm nay của bạn thế nào?",
      answer: ["đúng", "sai", "sai", "sai"],
      correctAnswer: 0,
      time: 20,
    },
  },
];
const deleteQuestion = (index) => {
  const remote = state.filter((i, v) => index == !v);
  setState(remote);
};
const Deltai = (props) => {
  const [state, setState] = useState(arr);
  console.log(state);
  return (
    <div>
      <MainLayout>
        <Layout className="container row">
          <form>
            <div className="header">
              <div className="title-top-deltai">
                <span>Tiêu đề</span>
              </div>
              {/* <input type="text" placeholder='mời bạn nhập'/> */}
              <h2>ngày hôm nay đẹp trời</h2>
              <div className="time-played">
                <i class="fas fa-play"></i>
                <p>10 lần chơi</p>
              </div>
              <div className="list-bottun">
                <div className="button-submit-next">
                  <i class="far fa-play-circle"></i>
                  <h5 className="text-submit">Bắt đầu kiểm tra</h5>
                </div>
                <div className="button-submit-edit">
                  <i class="far fa-edit"></i>
                  <h5>Chỉnh sửa</h5>
                </div>
                <button
                  onClick={() => deleteQuestion(index)}
                  className="button-submit-edit"
                >
                  <i class="far fa-trash-alt"></i>
                  <h5>Xóa</h5>
                </button>
                <div className="button-submit-edit">
                  <i class="fas fa-book-open"></i>
                  <h5>Báo cáo</h5>
                </div>
              </div>
            </div>
            <div className="content-deltai">
              <div className="nav-title-question">
                <i class="fas fa-bars"></i>
                <span>3</span>
              </div>
              {state.map((item, index) => (
                <div className="nav-list-question" key={index}>
                  <div className="box-question">
                    <h4>{item.question}</h4>
                    <p></p>
                    {item.answer.map((i, v) => (
                      <div className="question" key={v}>
                        <ul>
                          <li>
                            <input type="checkbox" width="60px" />
                            <h5>{i}</h5>
                          </li>
                        </ul>
                      </div>
                    ))}
                    <button onClick={() => deleteQuestion(index)}>
                      <i class="fas fa-history">
                        {" "}
                        <span>{item.time} giây</span>
                      </i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </form>
        </Layout>
      </MainLayout>
    </div>
  );
};

export default Deltai;
