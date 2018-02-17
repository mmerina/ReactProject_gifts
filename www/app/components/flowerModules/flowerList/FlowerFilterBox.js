import React, { Component } from 'react';
import {connect} from "dva";
import { Row, Col, Tag } from "antd";

import MyCheckbox from "./flowerFilterForm/MyCheckbox";
import MyRange from "./flowerFilterForm/MyRange";
import MyTag from "./flowerFilterForm/MyTag";


class FlowerFilterBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            "price": [0, 100000]
        }
    }
    render() { 
        var data = {
            "type": [],
            "mainflower": [],
            "color": [],
            "sendObject": [],
            "purpose": []
        }
        this.props.nowfilters.forEach(item => {
            data[item.k] = item.v
        });

        return ( 
            <div className="flowerfilterbox">
                <Row className="filters">
                    <Col span={2} className="title">类型</Col>
                    <Col span={22}>
                        <MyCheckbox
                            v={data.type}
                            options={["鲜花", "果篮", "永生花"]}
                            onChoose={(v, char) => {
                                this.props.dispatch({ "type": "flowerlist/addOrChangeFilter", "k": "type", v });
                                if (v.length == 0) {
                                    this.props.dispatch({ "type": "flowerlist/removeFilter", "k": "type" });
                                }
                            }}
                        ></MyCheckbox>
                    </Col>
                </Row>
                <Row className="filters">
                    <Col span={2} className="title">主材料</Col>
                    <Col span={22}>
                        <MyCheckbox
                            v={data.mainflower}
                            options={["白玫瑰", "红玫瑰", "蓝玫瑰","粉玫瑰","紫玫瑰","香槟玫瑰","向日葵","香水百合","混搭"]}
                            onChoose={(v, char) => {
                                this.props.dispatch({ "type": "flowerlist/addOrChangeFilter", "k": "mainflower", v });
                                if (v.length == 0) {
                                    this.props.dispatch({ "type": "flowerlist/removeFilter", "k": "mainflower" });
                                }
                            }}
                            ></MyCheckbox>
                    </Col>
                </Row>
                <Row className="filters">
                    <Col span={2} className="title">颜色</Col>
                    <Col span={22}>
                        <MyCheckbox
                            v={data.color}
                            options={["白色", "红色", "蓝色","粉色","紫色","香槟色","金色","多色"]}
                            onChoose={(v, char) => {
                                this.props.dispatch({ "type": "flowerlist/addOrChangeFilter", "k": "color", v });
                                if (v.length == 0) {
                                    this.props.dispatch({ "type": "flowerlist/removeFilter", "k": "color" });
                                }
                            }}
                        ></MyCheckbox>
                    </Col>
                </Row>
                <Row className="filters">
                    <Col span={2} className="title">送花对象</Col>
                    <Col span={22}>
                        <MyCheckbox
                            v={data.sendObject}
                            options={["朋友", "家人", "爱人","领导","病人"]}
                            onChoose={(v, char) => {
                                this.props.dispatch({ "type": "flowerlist/addOrChangeFilter", "k": "sendObject", v });
                                if (v.length == 0) {
                                    this.props.dispatch({ "type": "flowerlist/removeFilter", "k": "sendObject" });
                                }
                            }}
                        ></MyCheckbox>
                    </Col>
                </Row>
                <Row className="filters">
                    <Col span={2} className="title">鲜花用途</Col>
                    <Col span={22}>
                        <MyCheckbox
                            v={data.purpose}
                            options={["浪漫爱情", "生日祝福", "友谊万岁", "诚意致歉", "温暖亲情"]}
                            onChoose={(v, char) => {
                                this.props.dispatch({ "type": "flowerlist/addOrChangeFilter", "k": "purpose", v });
                                if (v.length == 0) {
                                    this.props.dispatch({ "type": "flowerlist/removeFilter", "k": "purpose" });
                                }
                            }}
                        ></MyCheckbox>
                    </Col>
                </Row>
                <Row className="filters">
                    <Col span={2} className="title">价格（元）</Col>
                    <Col span={12}>
                        <MyRange
                            onChoose={(v) => {
                                this.props.dispatch({ "type": "flowerlist/addOrChangeFilter", "k": "price", v });
                                console.log(v);
                                if (v[0] == 0 && v[1] == 10000) {
                                    this.props.dispatch({ "type": "flowerlist/removeFilter", "k": "price" });
                                }
                            }}
                            onChange={(v) => {
                                this.setState({ "price": v })
                            }}
                            v={this.state.price}
                            max={10000}
                            defaultV={[0, 10000]}
                        ></MyRange>
                    </Col>
                </Row>
                <Row className="filters lastRow">
                    <Col span={2} className="title">当前：</Col>
                    <Col span={22}>
                        <MyTag
                            nowfilters={this.props.nowfilters}
                            onClose={(k) => {
                                this.props.dispatch({ "type": "flowerlist/removeFilter", k });
                                //如果你删除了price，此时要恢复0~10000
                                if (k == "price") {
                                    this.setState({ "price": [0, 10000] })
                                }
                            }}
                        ></MyTag>
                    </Col>
                </Row>
            </div>
         )
    }
}
 
export default connect(
    ({ flowerlist }) => ({
        nowfilters: flowerlist.nowfilters
    })
)(FlowerFilterBox);