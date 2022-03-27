import React, {useEffect, useState} from 'react'
import {Menu, Row, Table, Input, Modal} from 'antd'
import {Link, useParams} from 'react-router-dom'
import ReportDetail from './ReportDetail'
import styled from 'styled-components'
import reportApi from 'api/reportApi'
import ReportPlayerEntities from './ReportPlayerEntities'
import {ReactComponent as UserIcon} from '../../../assets/images/UserIcon.svg'

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
    {id: 1, name: 'hieupv', rank: 1, correctAnswersCount: 2, unansweredCount: 1, totalPoints: 1890},
]
const columns = [
    {
        title: 'Tên',
        dataIndex: 'name',
        // sorter: true,
        // render: (name) => `${name.first} ${name.last}`,
        width: '40%',
    },
    {
        title: 'Xếp hạng',
        sorter: true,
        dataIndex: 'rank',
        width: '15%',
    },
    {
        title: 'Số câu đúng',
        sorter: true,
        dataIndex: 'correctAnswersCount',
        width: '15%',
    },
    {
        title: 'Số câu sai',
        sorter: true,
        dataIndex: 'unansweredCount',
        width: '15%',
    },
    {
        title: 'Tổng điểm',
        sorter: true,
        dataIndex: 'totalPoints',
        width: '15%',
    },
]
function correctAnswer (user) {
    return (user?.playerAnswers || []).reduce((acc, cur) => {
        const result =  user.report.reportQuestions.filter(reportQ => reportQ.id === cur.questionId)
        return result[0].correctAnswer === cur.answer ? acc + 1 : acc
    }, 0)
}
const ReportDetailPlayers = ({report}) => {
    const [players, setPlayers] = useState({
        data: [],
        loading: false,
    })
    const [limit, setLimit] = useState(10)
    const {id} = useParams()

    const [isModalVisible, setIsModalVisible] = useState(false)
    const [player, setPlayer] = useState('')

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
        setPlayers((state) => ({
            ...state,
            loading: true
        }))
        const data = await reportApi.getPlayerInReport({id, offset: 0, limit: limit})
        setPlayers({
            data: data && data.length > 0 && data.map((user, index) => {
                return {
                    id: user.id,
                    rank: index + 1,
                    name: user.name,
                    correctAnswersCount: correctAnswer(user),
                    unansweredCount: (user.playerAnswers || []).length - correctAnswer(user),
                    totalPoints: user.score
                }
            }),
            loading: false
        })
    }
    useEffect(() => {
        fetchData && fetchData()
    }, [setPlayer])

    return (
        <>
            <ReportDetail>
                <TableWrapper>
                    <Wrapper>
                        <div style={{width: '100%'}}>
                            <WrapSearch>
                                <WrapInputSearch>
                                    <DivInput>
                                        <InputSearch placeholder='Search'/>
                                    </DivInput>
                                </WrapInputSearch>
                            </WrapSearch>
                        </div>
                        <StyledTable
                            columns={columns}
                            onRow={(record, rowIndex) => {
                                return {
                                    onClick: (event) => {
                                        setPlayer(record)
                                        setIsModalVisible(true)
                                    }, // click row
                                }
                            }}
                            rowKey={record => record.id}
                            dataSource={players?.data.length?players?.data : []}
                            pagination={false}
                            loading={players.loading}
                            // onChange={this.handleTableChange}
                        />
                    </Wrapper>
                </TableWrapper>
                {isModalVisible && (
                    <Modal title={player?.name} width={1080} visible={true} onOk={handleOk} onCancel={handleCancel}>
                        <ReportPlayerEntities id={id} player={player}/>
                    </Modal>
                )}
            </ReportDetail>
        </>
    )
}

export default ReportDetailPlayers
