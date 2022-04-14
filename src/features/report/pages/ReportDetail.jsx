import React, {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useParams, useNavigate, Routes, Route, NavLink} from 'react-router-dom'
import {Button, Col, Dropdown, Input, Menu, Row, Skeleton, Tabs} from 'antd'
import styled from 'styled-components'
import {ReactComponent as DotVertical} from '../../../assets/images/DotsVertical.svg'

import {Link, Outlet} from 'react-router-dom'
import MainLayout from 'layouts/main.layout'
import {fetchReport, selectReport} from '../reportSlice'
import {selectLoading} from '../../hostScreen/quizSlice'

import {ButtonTab} from './../components/Button'
import reportApi from "../../../api/reportApi";
import moment from "moment";
import {selectUser} from "../../auth/authSlice";

const Main = styled.div`
  display: block;
  width: 100%;
  height: 100%;
  min-height: calc(100vh - 3.5rem);
  overflow: hidden;
`
const Wrapper = styled.div`
  display: flex;
  box-sizing: border-box;
  min-width: 0px;
  width: 100%;
  background-color: rgb(255, 255, 255);
  flex-wrap: wrap;
  margin: 0px auto;
`

const Flex = styled.div`
  width: 100%;
  display: flex;
`
const HeaderLeft = styled.section`
  width: 100%;
  display: flex;
  flex: 5 1 0%;
  min-height: 12rem;
  flex-direction: column;
  -webkit-box-pack: start;
  justify-content: flex-start;
  position: relative;
  z-index: 1;
`
const HeaderRight = styled.section`
  flex: 2 1 0%;
  flex-direction: column;
  padding-top: 1rem;
  align-items: flex-end;
  //display: none;
  position: relative;
  background: rgb(242, 242, 242);
`
const Container = styled.div`
  box-sizing: border-box;
  min-width: 0px;
  margin: 0px auto;
  width: 100%;
  max-width: 1280px;
  flex-wrap: nowrap;
  height: fit-content;
`
const TitleTop = styled.div`
  display: flex;
  align-items: center;
  margin: 1.5rem 2rem 0.2rem 0px;
`
const H5 = styled.h5`
  color: rgb(51, 51, 51);
  font-size: 1rem;
  font-weight: bold;
  line-height: 1.5;
  letter-spacing: 0.2px;
  margin: 0;
`
const ReportOption = styled.div`
  margin-left: auto;
  margin-right: 0.5rem;
  color: rgb(51, 51, 51);
`
const InfoReport = styled.div`
  border-bottom: 1px solid rgb(178, 178, 178);
  padding: 0.9rem;
  color: rgb(51, 51, 51);
  font-size: 0.875rem;
  letter-spacing: 0.2px;
  position: relative;
  z-index: 1;
`
const TitleWrapper = styled.div`
  display: flex;
  box-sizing: border-box;
  margin: 0px;
  min-width: 0px;
  max-width: 93%;
  -webkit-box-align: center;
  align-items: center;
`
const TitleH2 = styled.h2`
  align-items: center;
  color: rgb(51, 51, 51);
  font-size: 32px;
  font-weight: 600;
  line-height: 1.25;
`
const List = styled.ul`
  margin-top: auto;
  display: flex;
  box-shadow: none;
  padding: 0px;
  list-style: none;
`
const ListItem = styled.li`
  margin: 0px;
  padding: 0px;
  border: 0px;
  font: inherit;
`
const WrapperTable = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0;
`

const menu = (
    <Menu>
        <Menu.Item key='0'>
            <a>Download report</a>
        </Menu.Item>
        <Menu.Item key='1'>
            <a>Move trash</a>
        </Menu.Item>
    </Menu>
)
const ReportDetail = ({children}) => {
    const {id} = useParams()
    const user = useSelector(selectUser);

    const [info, setInfo] = useState()
    const fetchData = async () => {
        const data = await reportApi.getOne(id)
        setInfo({createdAt: data.createdAt, name: data.name, players: data.players, reportQuestions: data.reportQuestions})
        console.log('data', data)

    }
    useEffect(() => {
        fetchData && fetchData()
    }, [])

    return (
        <MainLayout>
            <Main>
                <Wrapper>
                    <Container>
                        <Flex>
                            <HeaderLeft>
                                <TitleTop>
                                    <H5>Report</H5>
                                    <ReportOption>Report option</ReportOption>
                                    <Dropdown overlay={menu} placement='bottomRight' trigger={['click']}>
                                        <Button icon={<DotVertical/>} type='text'/>
                                    </Dropdown>
                                </TitleTop>
                                <TitleWrapper>
                                    <TitleH2>{info?.name || ''}</TitleH2>
                                </TitleWrapper>
                                <List>
                                    <ListItem>
                                        {/* <NavLink
                      to={`/report/detail/${params.id}/players`}
                      style={({ isActive }) => {
                        return {
                          color: isActive ? 'red' : '',
                        }
                      }}
                    > */}
                                        <ButtonTab to={`/report/detail/${id}/players`}>Người chơi ({info ? info?.players?.length : ''})</ButtonTab>
                                        {/* </NavLink> */}
                                        {/* <Link to={`/report/detail/${params.id}/questions`}> */}
                                        <ButtonTab to={`/report/detail/${id}/questions`}>Câu hỏi ({info ? info?.reportQuestions?.length : ''})</ButtonTab>
                                        {/* </Link> */}
                                    </ListItem>
                                </List>
                            </HeaderLeft>
                            <HeaderRight>
                                <InfoReport>{moment(info?.createdAt).format("DD/MM/YYYY - HH:mm")}</InfoReport>
                                <InfoReport>{`Hosted by ${user.name}`}</InfoReport>
                            </HeaderRight>
                        </Flex>
                    </Container>
                </Wrapper>
                <Wrapper>
                    <Container>
                        <WrapperTable>
                            {children}
                            <Outlet/>
                        </WrapperTable>
                    </Container>
                </Wrapper>
            </Main>
        </MainLayout>
    )
}

export default ReportDetail
