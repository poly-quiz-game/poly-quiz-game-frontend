import React, { useEffect, useState } from 'react'
import { Menu, Row, Table, Input, Modal } from 'antd'
import { Link, useParams } from 'react-router-dom'
import ReportDetail from './ReportDetail'
import styled from 'styled-components'
import reportApi from 'api/reportApi'

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
  padding: 0px 2rem;
  flex: 1 1 0%;
`
const PercentageAnswerer = styled.div`
  -webkit-box-pack: start;
  justify-content: flex-start;
  flex-direction: column;
`
const InfoRankUserWrap = styled.div`
  display: flex;
  flex: 2 1 0%;
`
const InfoRankUser = styled.div`
  display: flex;
  flex: 1 1 0%;
  flex-direction: column;
  margin: 2rem 0px;
`
const data = [
  { name: 'hieupv', rank: 1, correctAnswersCount: 2, answersCount: 3, unansweredCount: 1, totalPoints: 1890 },
]
const columns = [
  {
    title: 'Nick name',
    dataIndex: 'name',
    // sorter: true,
    // render: (name) => `${name.first} ${name.last}`,
    width: '40%',
  },
  {
    title: 'Rank',
    sorter: true,
    dataIndex: 'rank',
    width: '15%',
  },
  {
    title: 'Correct answers',
    sorter: true,
    dataIndex: 'correctAnswersCount',
    width: '15%',
  },
  {
    title: 'Unanswered',
    sorter: true,
    dataIndex: 'unansweredCount',
    width: '15%',
  },
  {
    title: 'Final score',
    sorter: true,
    dataIndex: 'totalPoints',
    width: '15%',
  },
]
const ReportPlayerEntities = ({ report }) => {
  const [state, setState] = useState({
    data: [],
    pagination: {
      current: 1,
      pageSize: 10,
    },
    loading: false,
  })
  const { id } = useParams()

  return (
    <>
      <TableWrapper>
        <Container>
          <WrapRankUser>
            <PercentageAnswererWrap>
              <PercentageAnswerer>
                <span>50%</span>
                <span>correct</span>
              </PercentageAnswerer>
            </PercentageAnswererWrap>
            <InfoRankUserWrap>
              <InfoRankUser>Rank</InfoRankUser>
              <InfoRankUser>Rank</InfoRankUser>
            </InfoRankUserWrap>
          </WrapRankUser>

          <Wrapper>
            <StyledTable
              columns={columns}
              onRow={(record, rowIndex) => {
                return {
                  onClick: (event) => {
                    setIsModalVisible(true)
                  }, // click row
                }
              }}
              // rowKey={record => record.login.uuid}
              dataSource={data}
              // pagination={pagination}
              // loading={loading}
              // onChange={this.handleTableChange}
            />
          </Wrapper>
        </Container>
      </TableWrapper>
    </>
  )
}

export default ReportPlayerEntities
