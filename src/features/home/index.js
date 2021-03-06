import { Avatar, Card, Col, List, Row, Tabs } from "antd";
import homeApi from "api/homeApi";
import React, { useEffect, useState } from "react";
import GoogleLogin from "react-google-login";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import io from "socket.io-client";
import { getToken } from "../../api/axiosClient";
import logo from "../../assets/logo.png";
import { login } from "./authSlice";
import "./styles.scss";

const port = process.env.ENDPOINT || "ws://localhost:3005";

const HomeFeature = () => {
  const [socket, setSocket] = useState(null);
  const [homeData, setHomeData] = useState({
    gamesPlaying: 0,
    countQuiz: 0,
    countReport: 0,
    countPlayer: 0,
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const newSocket = io(port);
    setSocket(newSocket);

    return () => newSocket.close();
  }, [setSocket]);

  useEffect(() => {
    if (socket) {
      socket.emit("get-game-playing");

      socket.on("game-playing", (gamesPlaying) => {
        setHomeData((prev) => ({
          ...prev,
          gamesPlaying,
        }));
      });
    }
  }, [socket]);

  useEffect(() => {
    const fetchHomeData = async () => {
      const response = await homeApi.getHomeData();
      console.log(response);
      setHomeData((prev) => ({
        ...prev,
        ...response.data,
      }));
    };
    fetchHomeData();
  }, []);

  const responseGoogle = async ({ tokenId }) => {
    try {
      if (tokenId) {
        await dispatch(login({ tokenId }));
        navigate("/quiz");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const { TabPane } = Tabs;
  const token = getToken();
  if (token && token.length > 0) {
    return <Navigate to="/quiz" />;
  }

  return (
    <div className="home__screen">
      <div className="home">
        <div className="header-banner">
          <div className="title">
            <h1>D???? a??n cu??a sinh vi??n FPT Polytechnich</h1>
            <p>
              T??m v?? t???o c??c c??u ????? ???????c ????nh d????u mi???n ph?? v?? c??c b??i h???c t????ng
              t??c ????? thu h??t b???t k??? ng?????i h???c n??o.
            </p>
            {/* <button className="started-btn"> */}
            <GoogleLogin
              clientId={process.env.REACT_APP_O2AUTH_CLIENT_ID}
              buttonText="Login with google"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={"single_host_origin"}
              hostedDomain="fpt.edu.vn"
            />
            {/* </button> */}
          </div>
          <div className="banner">
            <img
              src="https://cf.quizizz.com/img/mkt/1-HERO-Digital_Collage.png"
              className="banner-img"
            />
          </div>
        </div>
        <br />
        <div>
          <Row gutter={16}>
            <Col span={6}>
              <Card style={{ position: "relative" }}>
                <h1
                  style={{
                    fontSize: "45px",
                    color: "#461a42",
                    fontWeight: "bold",
                  }}
                >
                  {homeData.gamesPlaying}
                </h1>
                <div>Game ??ang ch??i</div>
                <div
                  style={{
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                    backgroundColor: "#17c150",
                    position: "absolute",
                    top: "20px",
                    right: "20px",
                  }}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <h1
                  style={{
                    fontSize: "45px",
                    color: "#461a42",
                    fontWeight: "bold",
                  }}
                >
                  {homeData.countQuiz}
                </h1>
                <div>T???ng quiz ???? t???o</div>
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <h1
                  style={{
                    fontSize: "45px",
                    color: "#461a42",
                    fontWeight: "bold",
                  }}
                >
                  {homeData.countReport}
                </h1>
                <div>T???ng game ???? ch??i</div>
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <h1
                  style={{
                    fontSize: "45px",
                    color: "#461a42",
                    fontWeight: "bold",
                  }}
                >
                  {homeData.countPlayer}
                </h1>
                <div>T???ng s??? ng?????i ???? tham gia</div>
              </Card>
            </Col>
          </Row>
        </div>
        <div>
          <ListTopMaster />
        </div>
        <div className="testimonials">
          <div className="title">
            <h2>??a?? ????????c y??u thi??ch b????i ca??c chuy??n gia Fpoly!!!</h2>
            <p>D??????i ????y la?? m????t s???? bi??nh lu????n...</p>
          </div>
          <div className="content">
            <div className="content-title">
              {'"'}T??i ???? ????????c tra??i nghi????m PolyQuizzGame v?? n?? kh??ng bao gi???
              khi???n b???n th???t v???ng!{'"'}
            </div>
            <div className="author">
              <img src="https://scontent.fhan2-2.fna.fbcdn.net/v/t1.6435-9/120931967_4533919993316474_476842443670207113_n.jpg?_nc_cat=110&ccb=1-5&_nc_sid=174925&_nc_ohc=Ks8J7XfxN_MAX83mZk8&_nc_ht=scontent.fhan2-2.fna&oh=00_AT_qpwuigao2QJMGodnD-sEmem1VjA2aJC1LX2SB6ktGPQ&oe=623F71B9" />
              <p>Mrs. Thi????nTH </p>
              <span>Gia??ng vi??n h??????ng d????n</span>
            </div>
          </div>

          <div className="author-small">
            Ch??ng t??i c??ng ???????c s??? d???ng trong Fpoly...
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
            ????????c tham gia va??o b????ng b????t ky?? thi????t bi?? na??o. Va?? nh????n ????????c pha??n h????i
            ngay l????p t????c!
          </h2>
          <p>
            Nh???ng ng?????i tham gia xem c??c c??u h???i tr??n thi???t b??? c???a ri??ng h??? v??
            b???n nh???n ???????c d??? li???u tuy???t v???i ??? kh??ng c???n ch???m ??i???m..
          </p>
          <button>
            {token ? (
              <Link to="/quiz">Ch??i tro?? ch??i</Link>
            ) : (
              <Link to="/auth/login">Ch??i tro?? ch??i</Link>
            )}
          </button>
        </div>
        <div className="image-wrapper">
          <img src="https://blog.trello.com/hs-fs/How_to_Use_Trello_s_Mobile_Device_Management_Program_to_Secure_Corporate_Data_on_Any_Device.png" />
        </div>
      </div>
      <div className="product-overview">
        <div className="title">
          <h2>M???i th??? b???n c???n ????? l??m ch??? v?? tham gia</h2>
          <p>
            Gi???i thi???u c??c kh??i ni???m, ki???m tra s??? hi???u bi???t, nh???n th??ng tin chi
            ti???t t???c th?? v?? h??n th??? n???a.
          </p>
        </div>
        <div className="product-details">
          <div className="slider-content">
            <Tabs type="card">
              <TabPane
                tab={
                  <p>
                    <i className="fas fa-chalkboard-teacher icons-slider"></i>
                    <br />
                    T????ng ta??c tr????c ti????p
                  </p>
                }
                key="1"
              >
                <div className="slider-content__quizz">
                  <div className="slider-content-left">
                    <h3>C??c c??u ?????, cu???c th??m d?? v?? b??i h???c ???????c ????nh d????u</h3>
                    <ul>
                      <li>
                        Ch???n gi???a tr???i nghi???m h???c t???p tr???c ti???p do ng?????i d???n d???t
                        v?? tr???i nghi???m h???c t???p tr???c ti???p theo nh???p ????? c???a b???n
                        th??n.
                      </li>
                      <li>
                        S??? d???ng c???nh tranh th??n thi???n, ph??t l???i, t??ng s???c m???nh
                        v?? h??n th??? n???a ????? gi??? m???i h???c sinh tham gia v??o vi???c
                        th??nh th???o.
                      </li>
                      <li>
                        Th??n thi???n t??? xa ??? kh??ng c???n ng?????i tham gia ph???i s???p x???p
                        c??c tab. H??? xem c??c c??u h???i tr??n thi???t b??? c???a ri??ng h???
                      </li>
                    </ul>
                    <div className="slide-link">
                      {token ? (
                        <Link to="/quiz" className="slide-link-to">
                          Sa??ng ta??o cu??a ri??ng ba??n
                        </Link>
                      ) : (
                        <Link to="/auth/login" className="slide-link-to">
                          Sa??ng ta??o cu??a ri??ng ba??n
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
                    Hi????u qua??
                  </p>
                }
                key="2"
              >
                <div className="slider-content__quizz">
                  <div className="slider-content-left">
                    <h3>Instantly know what???s working and what isn???t</h3>
                    <ul>
                      <li>
                        Choose between presenter-led and self-paced live
                        learning experiences.
                      </li>
                      <li>
                        Use friendly competition, replays, powerups, and more to
                        keep every student engaged in mastery.
                      </li>
                      <li>
                        Remote friendly???no need for participants to juggle tabs.
                        They see questions on their own device.
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
            <h3>TH??NG TIN LI??N H???</h3>
            <p>??i???n tho???i: (024) 7300 1955</p>
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
                T??i nguy??n cho Gi??o vi??n
              </Link>
            </li>
            <li>
              <Link to="/" className="content-link">
                Trung t??m tr??? gi??p
              </Link>
            </li>
            <li>
              <Link to="/" className="content-link">
                Kh??? n??ng ti???p c???n v?? bao g???m
              </Link>
            </li>
          </ul>
        </div>
        <div className="content-center">
          <ul>
            <li>
              <Link to="/" className="content-link">
                ??i???u kho???n d???ch v???
              </Link>
            </li>
            <li>
              <Link to="/" className="content-link">
                Chi??nh sa??ch ba??o m????t
              </Link>
            </li>
            <li>
              <Link to="/" className="content-link">
                Ngh???? nghi????p
              </Link>
            </li>
            <li>
              <Link to="/" className="content-link">
                V???? chu??ng t??i
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
                T??i nguy??n cho Gi??o vi??n
              </Link>
            </li>
            <li>
              <Link to="/" className="content-link">
                Trung t??m tr??? gi??p
              </Link>
            </li>
            <li>
              <Link to="/" className="content-link">
                Kh??? n??ng ti???p c???n v?? bao g???m
              </Link>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
};

const ListTopMaster = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { topMaster } = await homeApi.getTopMaster();
      console.log(topMaster);
      setData(topMaster);
    };

    fetchData();
  }, []);
  return (
    <div style={{margin: "25px 0 0 0"}}>
      <h2 style={{textAlign: 'center', fontSize: '30px'}}><b>Top 5 cao th???</b></h2>
      <div
        id="scrollableDiv"
        style={{
          overflow: "auto",
          padding: "0 16px",
          border: "1px solid rgba(140, 140, 140, 0.35)",          
        }}
      >
        <InfiniteScroll dataLength={data.length}>
          <List
            dataSource={data}
            renderItem={(item) => (
              <List.Item key={item.key}>
                <div style={{ marginRight: "20px" }}>
                  <h2>{item.key}</h2>
                </div>
                <List.Item.Meta
                  avatar={<Avatar src={!item.avatar ? 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fchiase24.com%2Favatar-hai-huoc.html&psig=AOvVaw14EHhmbf58voT4DOsubNU-&ust=1648740083402000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCOiH5s2R7vYCFQAAAAAdAAAAABAE' : item.avatar} />}
                  title={<div href="https://ant.design">{item.name}</div>}
                  description={item.email}
                />
                <div>T???ng ??i???m: {item.score}</div>
              </List.Item>
            )}
          />
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default HomeFeature;
