import React from 'react';
import {Col, Progress, Row} from "antd";
import {getIconChose} from "../pages/utils";
import {ReactComponent as IconCorrect} from "../../../assets/images/report/correct.svg";
import {ReactComponent as IconIncorrect} from "../../../assets/images/report/incorrect.svg";
import {RowDetail} from "../pages/ReportQuestionEntites";

const RowQuestionDetailMultiple = ({answerCorrects, correct, count, questionTypeId}) => {
    return (
        <>
            <Row gutter={[10, 6]} justify='center' align='middle'>
                <Col span={16}>
                    <Row gutter={[10, 10]} justify='start' align='middle'>
                        {answerCorrects && answerCorrects.map(i =>
                            <Col key={i.index} span={24}>
                                <Row gutter={[10, 6]} justify='start' align='middle'>
                                    <Col>{getIconChose(i.index)}</Col>
                                    <Col>{i.answer}</Col>
                                </Row>
                            </Col>)}
                    </Row>
                </Col>
                <Col span={8}>
                    <Row justify='center' align='middle'>
                        <Col span={20}>
                            <Row ustify='center' align='middle'>
                                <Col span={4}>
                                    <Row ustify='center' align='middle'>
                                        {correct ? <IconCorrect height='26px'/> : <IconIncorrect height='26px'/>}
                                    </Row>
                                </Col>
                                <Col span={20}>
                                    <Progress percent={33} strokeColor='green' showInfo={false}/>
                                </Col>
                            </Row>

                        </Col>
                        <Col span={4} style={{textAlign: 'right'}}> {count || 0}</Col>
                    </Row>
                </Col>
            </Row>
        </>
    );
};

export default RowQuestionDetailMultiple;