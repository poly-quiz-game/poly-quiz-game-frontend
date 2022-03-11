import React from "react";
import { getToken } from "../../api/axiosClient";
import { Link } from "react-router-dom";
import "./styles.scss";
import logo from "../../assets/logo.png";
import { Tabs } from "antd";
import MainLayout from "../../layouts/main.layout";
const HomeFeature = () => {
  const { TabPane } = Tabs;
  const token = getToken();
  return (
    <MainLayout>
      <div className="home__screen">
        <div className="home">
          <div className="header-banner">
            <div className="title">
              <h1>Dự án của sinh viên FPT Polytechnich</h1>
              <p>
                Tìm và tạo các câu đố được đánh dấu miễn phí và các bài học
                tương tác để thu hút bất kỳ người học nào.
              </p>
              <button className="started-btn">
                {token ? (
                  <Link to="/quiz">Bắt đầu</Link>
                ) : (
                  <Link to="/auth/login">Bắt đầu</Link>
                )}
              </button>
            </div>
            <div className="banner">
              <img
                src="https://cf.quizizz.com/img/mkt/1-HERO-Digital_Collage.png"
                className="banner-img"
              />
            </div>
          </div>

          <div className="testimonials">
            <div className="title">
              <h2>Đã được yêu thích bởi các chuyên gia Fpoly!!!</h2>
              <p>Dưới đây là một số bình luận...</p>
            </div>
            <div className="content">
              <div className="content-title">
                {'"'}Tôi đã được trải nghiệm PolyQuizzGame và nó không bao giờ
                khiến bạn thất vọng!{'"'}
              </div>
              <div className="author">
                <img src="https://scontent.fhan2-2.fna.fbcdn.net/v/t1.6435-9/120931967_4533919993316474_476842443670207113_n.jpg?_nc_cat=110&ccb=1-5&_nc_sid=174925&_nc_ohc=Ks8J7XfxN_MAX83mZk8&_nc_ht=scontent.fhan2-2.fna&oh=00_AT_qpwuigao2QJMGodnD-sEmem1VjA2aJC1LX2SB6ktGPQ&oe=623F71B9" />
                <p>Mrs. ThiệnTH </p>
                <span>Giảng viên hướng dẫn</span>
              </div>
            </div>

            <div className="author-small">
              Chúng tôi cũng được sử dụng trong Fpoly...
            </div>

            <div className="logo-company">
              <div>
                <img
                  src="https://cf.quizizz.com/img/mkt/2-SOCIAL_PROOF-Logo_1.png"
                  className="logo-company-img"
                />
              </div>
              <div>
                <img
                  src="https://cf.quizizz.com/img/mkt/2-SOCIAL_PROOF-Logo_2.png"
                  className="logo-company-img"
                />
              </div>
              <div>
                <img
                  src="https://cf.quizizz.com/img/mkt/2-SOCIAL_PROOF-Logo_1.png"
                  className="logo-company-img"
                />
              </div>
              <div>
                <img
                  src="https://cf.quizizz.com/img/mkt/2-SOCIAL_PROOF-Logo_4.png"
                  className="logo-company-img"
                />
              </div>
              <div>
                <img
                  src="https://cf.quizizz.com/img/mkt/2-SOCIAL_PROOF-Logo_3.png"
                  className="logo-company-img"
                />
              </div>
              <div>
                <img
                  src="https://cf.quizizz.com/img/mkt/2-SOCIAL_PROOF-Logo_6.png"
                  className="logo-company-img"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="product-demo">
          <div className="title">
            <h2>
              Được tham gia vào bằng bất kỳ thiết bị nào. Và nhận được phản hồi
              ngay lập tức!
            </h2>
            <p>
              Những người tham gia xem các câu hỏi trên thiết bị của riêng họ và
              bạn nhận được dữ liệu tuyệt vời — không cần chấm điểm..
            </p>
            <button>
              {token ? (
                <Link to="/quiz">Chơi trò chơi</Link>
              ) : (
                <Link to="/auth/login">Chơi trò chơi</Link>
              )}
            </button>
          </div>
          <div className="image-wrapper">
            <img src="https://blog.trello.com/hs-fs/How_to_Use_Trello_s_Mobile_Device_Management_Program_to_Secure_Corporate_Data_on_Any_Device.png" />
          </div>
        </div>
        <div className="product-overview">
          <div className="title">
            <h2>Mọi thứ bạn cần để làm chủ và tham gia</h2>
            <p>
              Giới thiệu các khái niệm, kiểm tra sự hiểu biết, nhận thông tin
              chi tiết tức thì và hơn thế nữa.
            </p>
          </div>
          <div className="product-details">
            <div className="slider-content">
              <Tabs type="card">
                <TabPane
                  tab={
                    <p>
                      {""}
                      <i class="fas fa-chalkboard-teacher icons-slider"></i>
                      <br />
                      Tương tác trực tiếp
                    </p>
                  }
                  key="1"
                >
                  <div className="slider-content__quizz">
                    <div className="slider-content-left">
                      <h3>Các câu đố, cuộc thăm dò và bài học được đánh dấu</h3>
                      <ul>
                        <li>
                          Chọn giữa trải nghiệm học tập trực tiếp do người dẫn
                          dắt và trải nghiệm học tập trực tiếp theo nhịp độ của
                          bản thân.
                        </li>
                        <li>
                          Sử dụng cạnh tranh thân thiện, phát lại, tăng sức mạnh
                          và hơn thế nữa để giữ mọi học sinh tham gia vào việc
                          thành thạo.
                        </li>
                        <li>
                          Thân thiện từ xa — không cần người tham gia phải sắp
                          xếp các tab. Họ xem các câu hỏi trên thiết bị của
                          riêng họ
                        </li>
                      </ul>
                      <div className="slide-link">
                        {token ? (
                          <Link to="/quiz" className="slide-link-to">
                            Sáng tạo của riêng bạn
                          </Link>
                        ) : (
                          <Link to="/auth/login" className="slide-link-to">
                            Sáng tạo của riêng bạn
                          </Link>
                        )}
                      </div>
                    </div>

                    <div className="slider-content-right">
                      <img src="https://cf.quizizz.com/img/mkt/4-PRODUCT_OVERVIEW-1.jpg" />
                    </div>
                  </div>
                </TabPane>
                <TabPane
                  tab={
                    <p>
                      <i className="fas fa-chart-bar icons-slider"></i>
                      <br />
                      Hiệu quả
                    </p>
                  }
                  key="2"
                >
                  <div className="slider-content__quizz">
                    <div className="slider-content-left">
                      <h3>Instantly know what’s working and what isn’t</h3>
                      <ul>
                        <li>
                          Choose between presenter-led and self-paced live
                          learning experiences.
                        </li>
                        <li>
                          Use friendly competition, replays, powerups, and more
                          to keep every student engaged in mastery.
                        </li>
                        <li>
                          Remote friendly—no need for participants to juggle
                          tabs. They see questions on their own device.
                        </li>
                      </ul>
                      <div className="slide-link">
                        <Link to="/" className="slide-link-to">
                          Try it out
                        </Link>
                      </div>
                    </div>

                    <div className="slider-content-right">
                      <img src="https://cf.quizizz.com/img/mkt/4-PRODUCT_OVERVIEW-3.jpg" />
                    </div>
                  </div>
                </TabPane>
              </Tabs>
            </div>
          </div>
        </div>
        <footer className="footer">
          <div className="content-left">
            <div className="content-image">
              <img src={logo} />
            </div>
            <div className="content-follow">
              <h3>THÔNG TIN LIÊN HỆ</h3>
              <p>Điện thoại: (024) 7300 1955</p>
              <span>Email: caodang@fpt.edu.vn</span>
            </div>
          </div>

          <div className="content-center">
            <ul>
              <li>
                <Link to="/" className="content-link">
                  Blog Quizizz
                </Link>
              </li>
              <li>
                <Link to="/" className="content-link">
                  Tài nguyên cho Giáo viên
                </Link>
              </li>
              <li>
                <Link to="/" className="content-link">
                  Trung tâm trợ giúp
                </Link>
              </li>
              <li>
                <Link to="/" className="content-link">
                  Khả năng tiếp cận và bao gồm
                </Link>
              </li>
            </ul>
          </div>
          <div className="content-center">
            <ul>
              <li>
                <Link to="/" className="content-link">
                  Điều khoản dịch vụ
                </Link>
              </li>
              <li>
                <Link to="/" className="content-link">
                  Chính sách bảo mật
                </Link>
              </li>
              <li>
                <Link to="/" className="content-link">
                  Nghề nghiệp
                </Link>
              </li>
              <li>
                <Link to="/" className="content-link">
                  Về chúng tôi
                </Link>
              </li>
            </ul>
          </div>
          <div className="content-center">
            <ul>
              <li>
                <Link to="/" className="content-link">
                  Blog Quizizz
                </Link>
              </li>
              <li>
                <Link to="/" className="content-link">
                  Tài nguyên cho Giáo viên
                </Link>
              </li>
              <li>
                <Link to="/" className="content-link">
                  Trung tâm trợ giúp
                </Link>
              </li>
              <li>
                <Link to="/" className="content-link">
                  Khả năng tiếp cận và bao gồm
                </Link>
              </li>
            </ul>
          </div>
        </footer>
      </div>
    </MainLayout>
  );
};

export default HomeFeature;