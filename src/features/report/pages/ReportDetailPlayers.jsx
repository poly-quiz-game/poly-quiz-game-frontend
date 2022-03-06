import React, { useEffect, useState } from 'react'
import { Menu, Row, Table, Input, Modal } from 'antd'
import { Link, useParams } from 'react-router-dom'
import ReportDetail from './ReportDetail'
import styled from 'styled-components'
import reportApi from 'api/reportApi'
import ReportPlayerEntities from './ReportPlayerEntities'
import { ReactComponent as UserIcon } from '../../../assets/images/UserIcon.svg'

const WrapSearch = styled.div`
  display: flex;
  border-radius: 0.2rem 0.2rem 0px 0px;
  border: 1px solid rgb(204, 204, 204);
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
const ReportDetailPlayers = ({ report }) => {
  const [state, setState] = useState({
    data: [],
    pagination: {
      current: 1,
      pageSize: 10,
    },
    loading: false,
  })
  const { id } = useParams()

  const [isModalVisible, setIsModalVisible] = useState(false)

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleOk = () => {
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }
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
        </TableWrapper>
        {isModalVisible && (
          <Modal title='Name user' width={1080} visible={true} onOk={handleOk} onCancel={handleCancel}>
            <ReportPlayerEntities />
          </Modal>
        )}
      </ReportDetail>
    </>
  )
}

export default ReportDetailPlayers
