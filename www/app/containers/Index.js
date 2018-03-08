import React, { Component } from 'react';
import { connect } from "dva";
import { Layout, Menu, Breadcrumb, Row, Col, Carousel  } from 'antd';
const { Header, Content, Footer } = Layout;

import App from "./App";
import SaleNum from "../columns/index/SaleNum";
import SaleRate from "../columns/index/SaleRate";

import "./Index.less";

class Index extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <App k="index">
                <Content style={{ padding: '0 50px' }}>
                    <div style={{ padding: 24, minHeight: 480 }}>
                        <Row gutter={16}>
                            <Col span={8} className="w">
                                <Row style={{ "height": "280px" }}>
                                <h4>热销礼品</h4>
                                    <Carousel autoplay>
                                        <div><img src="./flowers/big_pic/10000001/views/201708170958283125267975.jpg" /></div>
                                        <div><img src="./flowers/big_pic/10000023/views/9010917.jpg" /></div>
                                        <div><img src="./flowers/big_pic/10000025/views/201507171445155781.jpg" /></div>
                                        <div><img src="./flowers/big_pic/10000005/views/9010966.jpg" /></div>
                                    </Carousel>
                                </Row>
                                <Row style={{ "height": "280px" }}>
                                <h4>礼品前六月销售情况</h4>
                                    <SaleRate></SaleRate>
                                </Row>
							</Col>
                            <Col span={16} className="w" style={{ "height": "560px" }}>
                                <h4>礼品上月销售情况</h4>
                                <SaleNum></SaleNum>
                            </Col>
                        </Row>
                    </div>
                </Content>
            </App>
        )
    }
}
export default connect(

)(Index);