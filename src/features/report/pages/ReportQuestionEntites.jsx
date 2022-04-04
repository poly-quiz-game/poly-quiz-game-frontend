import React, {useEffect, useState} from 'react'
import {Menu, Row, Table, Input, Modal, Progress, Col} from 'antd'
import {Link, useParams} from 'react-router-dom'
import ReportDetail from './ReportDetail'
import styled from 'styled-components'
import reportApi from 'api/reportApi'
import {getIconChose} from './utils'
import {ReactComponent as IconNoImg} from '../../../assets/images/report/no-image.svg'
import {ReactComponent as IconCorrect} from '../../../assets/images/report/correct.svg'
import {ReactComponent as IconIncorrect} from '../../../assets/images/report/incorrect.svg'
import RowQuestionDetail from "../components/RowQuestionDetail";

const Container = styled.div`
  -webkit-box-flex: 1;
  flex-grow: 1;
  overflow-y: auto;
  max-height: calc(85vh - 48px);
`
const QuestionDetail = styled.div`
  display: flex;
  background-color: rgb(248, 248, 248);
  border-bottom-left-radius: 0.25rem;
  border-bottom-right-radius: 0.25rem;
  box-shadow: rgb(0 0 0 / 15%) 0px 2px 4px 0px;
`

const TableWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0;
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
const DetailCorrectALl = styled.div`
  min-height: 220px;
  flex: 2 1 0%;
  padding: 0.1rem 0px;
  width: calc(100% - 21rem);
`
const DetailLeft = styled.div`
  margin: 0px;
  min-width: 0px;
  flex-direction: column;
`
const InfoWrap = styled.div`
  display: flex;
  flex: 1 1 0%;
  flex-direction: column;
`
const RowDetail = styled.div`
  border-bottom: 1px solid rgb(178, 178, 178);
  margin: 0 15px;
  padding: 0.5rem 1rem;
`
const ImageWrap = styled.div`
  display: block;
  background-image: url((unknown));
  max-height: 320px;
  background-position: center center;
  background-repeat: no-repeat;
  height: 13.5rem;
  width: 18rem;
  background-color: rgb(204, 204, 204);
  background-size: cover;
  border: 0.5px dashed rgb(178, 178, 178);
  position: relative;
`
const FlexImg = styled.div`
  display: flex;
  height: 100%;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
`
const InfoRankUser = styled.div`
  display: flex;
  flex: 1 1 0%;
  flex-direction: column;
  margin: 2rem 0px;
`
const columns = [
    {
        title: 'Người chơi',
        dataIndex: 'name',
        // sorter: true,
        // render: (name) => `${name.first} ${name.last}`,
        width: '30%',
    },
    {
        title: 'Câu trả lời',
        sorter: true,
        dataIndex: 'answer',
        width: '25%',
    },
    {
        title: 'Kết quả',
        sorter: true,
        dataIndex: 'correct',
        render: (correct) => `${correct ? 'dung' : 'sai'}`,
        width: '25%',
    },
    {
        title: 'Thời gian',
        sorter: true,
        dataIndex: 'time',
        width: '20%',
    },
    // {
    //     title: 'Points',
    //     sorter: true,
    //     dataIndex: 'point',
    //     width: '15%',
    // },
]
const ReportPlayerEntities = ({id, question}) => {
    const [questionDetail, setQuestionDetail] = useState([])
    const [loading, setLoading] = useState(false)
    const fetchData = async () => {
        setLoading(true)
        const data = await reportApi.getAllAnswerOfOneQuestion(id, question?.id)
        setQuestionDetail(data)
        console.log('questionDetail', data)

        setLoading(false)
    }
    useEffect(() => {
        question?.id && fetchData && fetchData()
    }, [setQuestionDetail])
    return (
        <>
            <TableWrapper>
                <Container>
                    <QuestionDetail>
                        <DetailLeft>
                            <ImageWrap>
                                <FlexImg>
                                    {questionDetail ? <img src={questionDetail.image} width='100%' alt={questionDetail.question}/> : <IconNoImg width='32px'/>}
                                </FlexImg>
                            </ImageWrap>
                            <p>a</p>
                        </DetailLeft>

                        <DetailCorrectALl>
                            <InfoWrap>
                                <RowDetail>
                                    <RowQuestionDetail answerCorrects={questionDetail.correct} questionTypeId={questionDetail.questionTypeId} correct={true}/>
                                </RowDetail>

                                <RowDetail>
                                    <div>Final score</div>
                                    {/* <div>{player.totalPoints}</div> */}
                                </RowDetail>
                            </InfoWrap>
                        </DetailCorrectALl>
                    </QuestionDetail>

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
                            rowKey={(record) => record.id}
                            dataSource={questionDetail.playerAnswers}
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
