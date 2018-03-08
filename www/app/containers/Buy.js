import React, { Component } from 'react';
import { connect } from "dva";
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import {push} from "react-router-redux";
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

import App from "./App";

class Buy extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <App k="buy">
            <Layout>
                <Sider width={200} style={{ background: '#fff' }}>
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={[this.props.columnKey]}
                        defaultOpenKeys={['sub1']}
                        style={{ height: '100%', borderRight: 0 }}
                        onClick={(item)=>{
                            this.props.dispatch(push("/buy/" + item.key));
                        }}
                    >                       
                        <Menu.Item key="flowerlist">鲜花</Menu.Item>
                        <Menu.Item key="cakelist">蛋糕</Menu.Item>
                        <Menu.Item key="chocolatelist">巧克力</Menu.Item>

                    </Menu>
                </Sider>
                <Layout style={{ padding: '0 24px 24px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>首页</Breadcrumb.Item>
                        <Breadcrumb.Item>买礼品</Breadcrumb.Item>
                        <Breadcrumb.Item>{this.props.columnName}</Breadcrumb.Item>
                    </Breadcrumb>
                    <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280, width: 1100 }}>
                        {this.props.children}
                    </Content>
                </Layout>
            </Layout>
            </App>
        )
    }
}
export default connect(

)(Buy);