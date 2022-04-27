import React, {useEffect, useState} from 'react'
import {Menu, Row, Table, Input, Modal, Progress, Col} from 'antd'
import {Link, useParams} from 'react-router-dom'
import ReportDetail from './ReportDetail'
import styled from 'styled-components'
import reportApi from 'api/reportApi'
import {formatNumber, getTypeQuestion} from "../../../utils";

const Container = styled.div`
  -webkit-box-flex: 1;
  flex-grow: 1;
  overflow-y: auto;
  max-height: calc(85vh - 48px);
`
const WrapRankUser = styled.div`
  display: flex;
`

const TableWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2rem 0rem;
`
const Wrapper = styled.div`
  box-shadow: rgb(0 0 0 / 15%) 0px 1px 4px 0px;
  background-color: rgb(255, 255, 255);
  border-radius: 5px;
  margin: 2rem;
`
const StyledTable = styled((props) => <Table {...props} />)`
  && tbody > tr:hover > td {
    background: rgb(242, 242, 242);
    cursor: pointer;
  }
`
const PercentageAnswererWrap = styled.div`
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  padding: 0 2rem;
  flex: 1 1 0%;
  gap: 2rem;
  font-size: 20px;
  font-weight: bold;
`
const PercentageAnswerer = styled.div`
  -webkit-box-pack: start;
  justify-content: flex-start;
  flex-direction: row;
`
const InfoWrap = styled.div`
  display: flex;
  flex: 1 1 0%;
  flex-direction: column;
`
const InfoRankUserWrap = styled.div`
  border-bottom: 1px solid rgb(178, 178, 178);
  min-height: 50px;
  display: flex;
  margin: 0px 2rem;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: start;
  justify-content: space-between;
`
const ScoreWrap = styled.div`
`
const InfoRankUser = styled.div`
  display: flex;
  flex: 1 1 0%;
  flex-direction: column;
  margin: 2rem 0px;
`
const data = [
    {id: 1, question: 'cau hoi 1', type: 1, Answered: 3, correctIncorrect: 1},
]
const columns = [
    {
        title: 'Câu hỏi',
        dataIndex: 'blockTitle',
        // sorter: true,
        // render: (name) => `${name.first} ${name.last}`,
        width: '40%',
    },
    {
        title: 'Loại',
        sorter: true,
        dataIndex: 'type',
        width: '15%',
    },
    {
        title: 'Câu trả lời',
        sorter: true,
        dataIndex: 'displayText',
        width: '15%',
    },
    {
        title: 'Trạng thái',
        sorter: true,
        dataIndex: 'status',
        width: '15%',
    },
    {
        title: 'Thời gian',
        sorter: true,
        dataIndex: 'time',
        width: '15%',
    },
    // {
    //     title: 'Points',
    //     sorter: true,
    //     dataIndex: 'point',
    //     width: '15%',
    // },
]
const ReportPlayerEntities = ({id, player}) => {
    const [playerAnswer, setPlayerAnswer] = useState([])
    const [loading, setLoading] = useState(false)
    const fetchData = async () => {
        setLoading(true)
        const data = await reportApi.getAllAnswerOfOnePlayer(id, player?.id)
        setPlayerAnswer(data)
        // console.log('data', data)

        setLoading(false)
    }
    useEffect(() => {
        player?.id && fetchData && fetchData()
        console.log('player', player)

    }, [setPlayerAnswer]);
    return (
        <>
            <TableWrapper>
                <Container>
                    <WrapRankUser>
                        <PercentageAnswererWrap>
                            <PercentageAnswerer>
                                <Progress type="circle" width='70px' strokeWidth='15' strokeColor="rgb(38, 137, 12)"
                                          percent={player.correctAnswersCount} format={() => ``}/>
                            </PercentageAnswerer>
                            <Row gutter={[2, 2]} justify='space-between'>
                                <Col span={24}>
                                    <span>{formatNumber(player.correctAnswersCount)} </span>
                                </Col>
                                <Col span={24}>
                                    <span>Đúng</span>
                                </Col>
                            </Row>
                        </PercentageAnswererWrap>
                        <InfoWrap>
                            <InfoRankUserWrap>
                                <div>Xếp hạng</div>
                                <div>{player.rank}</div>
                            </InfoRankUserWrap>
                            <InfoRankUserWrap>
                                <div>Tổng điểm</div>
                                <div>{player.totalPoints}</div>
                            </InfoRankUserWrap>

                        </InfoWrap>
                        {/*<InfoRankUser>Questions answered</InfoRankUser>*/}
                    </WrapRankUser>

                    <Wrapper>
                        <StyledTable
                            columns={columns}
                            onRow={(record, rowIndex) => {
                                return {
                                    onClick: (event) => {
                                        // setIsModalVisible(true)
                                    }, // click row
                                }
                            }}
                            rowKey={record => record.id}
                            dataSource={playerAnswer}
                            pagination={false}
                            loading={loading}
                            // onChange={this.handleTableChange}
                        />
                    </Wrapper>
                </Container>
            </TableWrapper>
        </>
    )
}

export default ReportPlayerEntities
