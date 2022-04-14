import React from 'react'
import {Col, Progress, Row} from 'antd'
import {getIconChose} from '../pages/utils'
import {ReactComponent as IconCorrect} from '../../../assets/images/report/correct.svg'
import {ReactComponent as IconIncorrect} from '../../../assets/images/report/incorrect.svg'
import {RowDetail} from '../pages/ReportQuestionEntites'

const RowQuestionDetailMultiple = ({answerCorrects, type, questionDetail}) => {
    console.log('questionDetail', questionDetail)
    const answerInQuestion = questionDetail.playerAnswers.filter(item => item.answer === answerCorrects.answer).length
    return (
        <>
            {questionDetail.questionTypeId === 2
                ? <Row gutter={[10, 6]} justify='center' align='middle'>
                    <Col span={16}>
                        <Row gutter={[10, 10]} justify='start' align='middle'>
                            {type === 'correct' &&
                                answerCorrects &&
                                answerCorrects.map((i) => (
                                    <Col key={i.index} span={24}>
                                        <Row gutter={[10, 6]} justify='start' align='middle'>
                                            <Col>{getIconChose(i.index)}</Col>
                                            <Col>{i.answer}</Col>
                                        </Row>
                                    </Col>
                                ))}
                            {type === 'incorrect' && (
                                <Col span={24}>
                                    <Row gutter={[10, 6]} justify='start' align='middle'>
                                        <Col>{getIconChose(4)}</Col>
                                        <Col>Incorrect answers</Col>
                                    </Row>
                                </Col>
                            )}
                            {type === 'no_answer' && (
                                <Col span={24}>
                                    <Row gutter={[10, 6]} justify='start' align='middle'>
                                        <Col>{getIconChose(5)}</Col>
                                        <Col>No answer</Col>
                                    </Row>
                                </Col>
                            )}
                        </Row>
                    </Col>
                    <Col span={8}>
                        <Row justify='center' align='middle'>
                            <Col span={20}>
                                <Row ustify='center' align='middle'>
                                    <Col span={4}>
                                        <Row ustify='center' align='middle'>
                                            {type === 'correct' ? <IconCorrect height='26px'/> :
                                                <IconIncorrect height='26px'/>}
                                        </Row>
                                    </Col>
                                    <Col span={20}>
                                        <Progress
                                            percent={questionDetail && type === 'correct' ? questionDetail.correctTotal * 100 / questionDetail.playerAnswers.length : type === 'incorrect' ? questionDetail.incorrectTotal * 100 / questionDetail.playerAnswers.length : questionDetail.noAnswerTotal * 100 / questionDetail.playerAnswers.length}
                                            strokeColor={type === 'correct' ? 'green' : 'red'} showInfo={false}/>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={4} style={{textAlign: 'right'}}>
                                {questionDetail && type === 'correct' ? questionDetail.correctTotal : type === 'incorrect' ? questionDetail.incorrectTotal : questionDetail.noAnswerTotal}
                            </Col>
                        </Row>
                    </Col>
                </Row>
                : <Row gutter={[10, 6]} justify='center' align='middle'>
                    <Col span={16}>
                        <Row gutter={[10, 10]} justify='start' align='middle'>
                            {type === 'correct' &&
                                <Col  span={24}>
                                    <Row gutter={[10, 6]} justify='start' align='middle'>
                                        <Col>{getIconChose(answerCorrects.index)}</Col>
                                        <Col>{answerCorrects.answer}</Col>
                                    </Row>
                                </Col>
                            }
                            {type === 'incorrect' && (
                                <Col span={24}>
                                    <Row gutter={[10, 6]} justify='start' align='middle'>
                                        <Col>{getIconChose(answerCorrects.index)}</Col>
                                        <Col>{answerCorrects.answer}</Col>

                                    </Row>
                                </Col>
                            )}
                            {type === 'no_answer' && (
                                <Col span={24}>
                                    <Row gutter={[10, 6]} justify='start' align='middle'>
                                        <Col>{getIconChose(5)}</Col>
                                        <Col>No answer</Col>
                                    </Row>
                                </Col>
                            )}
                        </Row>
                    </Col>
                    <Col span={8}>
                        <Row justify='center' align='middle'>
                            <Col span={20}>
                                <Row ustify='center' align='middle'>
                                    <Col span={4}>
                                        <Row ustify='center' align='middle'>
                                            {type === 'correct' ? <IconCorrect height='26px'/> :
                                                <IconIncorrect height='26px'/>}
                                        </Row>
                                    </Col>
                                    <Col span={20}>
                                        <Progress
                                            percent={answerInQuestion * 100 /questionDetail.playerAnswers.length}
                                            strokeColor={type === 'correct' ? 'green' : 'red'} showInfo={false}/>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={4} style={{textAlign: 'right'}}>
                                {answerInQuestion}
                            </Col>
                        </Row>
                    </Col>
                </Row>}
        </>
    )
}

export default RowQuestionDetailMultiple
