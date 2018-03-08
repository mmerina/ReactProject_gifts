import React from 'react';
import { connect } from "dva";
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
import {push} from "react-router-redux";

import "./App.less";

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Layout>
                    <Header className="header">
                        <div className="logo"></div>
                        <Menu
                            theme="dark"
                            mode="horizontal"
                            defaultSelectedKeys={[this.props.k]}
                            style={{ lineHeight: '64px' }}
                            onClick={(e)=>{
                                this.props.dispatch(push(e.item.props.root));
                            }}
                        >
                            <Menu.Item key="index" root="/">首页</Menu.Item>
                            <Menu.Item key="buy" root="/buy/flowerlist">买礼品</Menu.Item>
                            <Menu.Item key="publish" root="/publish/saleflower">礼品录入</Menu.Item>
                            <Menu.Item key="admin" root="/admin/adminlist">管理员</Menu.Item>
                            <Menu.Item key="user" root="/user/userlist">用户</Menu.Item>
                            <Menu.Item key="file" root="/file/filelist">文件</Menu.Item>
                        </Menu>
                    </Header>
                    {this.props.children}
                </Layout>
            </div>
        );
    }
}

export default connect()(App);