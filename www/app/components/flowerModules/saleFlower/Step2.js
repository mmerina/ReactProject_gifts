import React, { Component } from 'react';
import {connect} from "dva";
import { Row, Col, List, Avatar, Carousel, Button, Divider, message } from 'antd';

class Step2 extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { form0,form1} = this.props; 
        const data = [
            '鲜花名称：' + form0.name.value,
            '类别：' + form0.type.value,
            '价格（元）：' + form0.price.value,
            '花枝数量：' + form0.amount.value,
            '主材料：' + form0.mainflower.value,
            '颜色：' + form0.color.value,
            '其他材料：' + form0.others.value,
            '花语：' + form0.words.value,
            '包装：' + form0.package.value,
            '送花对象：' + form0.sendObject.value,
            '鲜花用途：' + form0.purpose.value
        ];
        
        function imgDiv(album){
            var imgDivs = [];
            for (var i=0;i<form1[album].length;i++){
                imgDivs.push(<div key={i} style={{ "backgroundImage": "url(/uploads/flowerimages/" + form1[album][i] + ")" }}></div>);
            }
            return imgDivs;
        }
        return ( 
            <div className="step2">
                <Row>
                    <Col span={2}></Col>
                    <Col span={3}><h3>基本信息</h3></Col>
                    <Col span={14}>
                        <List
                            size="small"
                            bordered
                            className="flowerInfo"
                            dataSource={data}
                            renderItem={item => (<List.Item>{item}</List.Item>)}
                            />
                    </Col>
                </Row>
                <Row>
                    <Col span={2}></Col>
                    <Col span={3}><h3>图片信息</h3></Col>
                </Row>
                <Row>
                    <Col span={6}></Col>
                    <Col span={5}><h4>预览图</h4></Col>
                    <Col span={5}></Col>
                    <Col span={5}><h4>详细介绍图</h4></Col>
                </Row>
                <Row>
                    <Col span={3}></Col>
                    <Col span={8}>
                        <Carousel>
                            {imgDiv("views")}
                        </Carousel>
                    </Col>
                    <Col span={2}></Col>
                    <Col span={8}>
                        <Carousel>
                            {imgDiv("introductions")}
                        </Carousel>
                    </Col>
                </Row>
                <Divider />
                <Row>
                    <Col span={11}></Col>
                    <Col span={2}>
                        <Button type="primary"
                        onClick={()=>{
                            var self = this;
                            $.post("/registerflower", {
                                "values": JSON.stringify({
                                    form0,
                                    form1
                                })
                            }, function (data) {
                                if (data.result == 1) {
                                    self.props.dispatch({ "type": "addFlower/changeIsModal", "isModal": true })                                    
                                } else {
                                    message.error('注册失败！');
                                }
                            });
                        }}
                        >鲜花录入</Button>
                    </Col>
                </Row>
            </div>
         )
    }
}
export default connect(
    ({ addFlower }) => ({
        "form0": addFlower.form0,
        "form1": addFlower.form1
    })
)(Step2);