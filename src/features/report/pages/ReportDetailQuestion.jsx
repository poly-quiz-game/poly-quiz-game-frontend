import React, { useEffect, useState } from 'react'
import { Menu, Row, Table, Input, Modal, Progress, Col } from 'antd'
import { Link, useParams } from 'react-router-dom'
import ReportDetail from './ReportDetail'
import styled from 'styled-components'
import reportApi from 'api/reportApi'
import ReportQuestionEntities from './ReportQuestionEntites'
import { ReactComponent as UserIcon } from '../../../assets/images/UserIcon.svg'
import { formatNumber } from '../../../utils'

const WrapSearch = styled.div`
  display: flex;
  border-radius: 0.2rem 0.2rem 0px 0px;
  //border: 1px solid rgb(204, 204, 204);
  flex-direction: row;
  align-items: flex-end;
  padding-right: 0.3rem;
  box-shadow: none;
  box-sizing: border-box;
  margin: 0px;
  min-width: 0px;
  background-color: rgb(255, 255, 255);
`
const WrapInputSearch = styled.div`
  display: flex;
  box-sizing: border-box;
  margin: 0px 0px 0px auto;
  min-width: 0px;
  width: 100%;
  flex: 1 1 0%;
`
const DivInput = styled.div`
  position: relative;
  margin-left: auto;
  min-width: 14rem;
`
const InputSearch = styled(Input)`
  min-height: 2rem;
  margin: 5px 0px;
  line-height: 1;
`
const TableWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2rem 0rem;
`
const Wrapper = styled.div`
  background-color: rgb(255, 255, 255);
  border-radius: 5px;
`
const StyledTable = styled((props) => <Table {...props} />)`
  box-shadow: rgb(0 0 0 / 15%) 0px 1px 4px 0px;
  && tbody > tr:hover > td {
    background: rgb(242, 242, 242);
    cursor: pointer;
  }
`

const columns = [
  {
    title: 'Câu hỏi',
    dataIndex: 'question',
    sorter: true,
    // align: 'center',
    render: (question) => `${question}`,
    width: '40%',
  },
  {
    title: 'Loại câu hỏi',
    sorter: true,
    align: 'right',
    dataIndex: 'type',
    width: '15%',
  },
  {
    title: 'Tỉ lệ trả lời đúng',
    sorter: true,
    dataIndex: 'correct',
    align: 'right',
    render: (correct, reportQuestion) => {
      return (
        <>
          <Row gutter={[4, 4]} justify='end' align='middle'>
            <Col span={4}>
              <Progress
                type='circle'
                width='35px'
                strokeWidth='15'
                strokeColor='rgb(38, 137, 12)'
                percent={(correct * 100) / reportQuestion.totalReport}
                format={() => ``}
              />
            </Col>
            <Col span={4} align='center'>
              {formatNumber((correct * 0.1) / reportQuestion.totalReport)}
            </Col>
          </Row>
        </>
      )
    },
    width: '15%',
  },
]
function correctAnswer(user) {
  return user?.playerAnswers.reduce((acc, cur) => {
    const result = user.report.reportQuestions.filter((reportQ) => reportQ.id === cur.questionId)
    return result[0].correctAnswer === cur.answer ? acc + 1 : acc
  }, 0)
}
const ReportDetailPlayers = () => {
  const [reports, setReports] = useState({
    data: [],
    loading: false,
  })
  const [limit, setLimit] = useState(10)
  const { id } = useParams()

  const [isModalVisible, setIsModalVisible] = useState(false)
  const [report, setReport] = useState('')

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleOk = () => {
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }
  const fetchData = async () => {
    setReports((state) => ({
      ...state,
      loading: true,
    }))
    const data = await reportApi.getQuestionsInReport({ id, offset: 0, limit: limit })
    console.log('data', data)
    setReports({
      data: data,
      loading: false,
    })
  }
  useEffect(() => {
    fetchData && fetchData()
  }, [setReport])

  return (
    <>
      <ReportDetail>
        <TableWrapper>
          <Wrapper>
            <div style={{ width: '100%' }}>
              <WrapSearch>
                <WrapInputSearch>
                  <DivInput>
                    <InputSearch placeholder='Search' />
                  </DivInput>
                </WrapInputSearch>
              </WrapSearch>
            </div>
            <StyledTable
              columns={columns}
              onRow={(record, rowIndex) => {
                return {
                  onClick: (event) => {
                    console.log(record)
                    setReport(record)
                    setIsModalVisible(true)
                  }, // click row
                }
              }}
              rowKey={(record) => record.id}
              dataSource={reports?.data.length ? reports?.data : []}
              pagination={false}
              loading={reports.loading}
              // onChange={this.handleTableChange}
            />
          </Wrapper>
        </TableWrapper>
        {isModalVisible && (
          <Modal title={report?.question} width={1080} visible={true} footer={null} onCancel={handleCancel}>
            <ReportQuestionEntities id={id} question={report} />
          </Modal>
        )}
      </ReportDetail>
    </>
  )
}

export default ReportDetailPlayers
