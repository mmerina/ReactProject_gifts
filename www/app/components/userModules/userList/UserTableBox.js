import React, { Component } from 'react';
import { connect } from "dva";
import { Table, Row, Col, Modal, Button, Icon, Select, Radio, Affix, Divider, Input} from "antd";
import cn from "classnames";

class UserTableBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isGrid: false
        }
    }
    componentDidMount() {
       
    }
    render() {
        const { users, pagination, sorter } = this.props;
        var columns = [
            {
                title: '编号',
                dataIndex: 'id',
                key: 'id',
                width:130
            },
            {
                title: '登录账号',
                dataIndex: 'loginname',
                key: 'loginname',
                width: 120
            },
            {
                title: '昵称',
                dataIndex: 'name',
                key: 'name',
                width: 130
            },
            {
                title: '性别',
                dataIndex: 'sex',
                key: 'sex',
                width: 60
            },
            {
                title: '邮箱',
                dataIndex: 'email',
                key: 'email'
            },
            {
                title: '手机',
                dataIndex: 'mobile',
                key: 'mobile',
                width: 120
            },
            {
                title: '更多',
                width:80,
                render: (t, r) => {
                    return <Button>查看更多</Button>
                }
            }
        ];
        return (
            <div className="usertablebox">
                <h1>用户信息（内部机密）--<b>共{pagination.total}条</b></h1>
                <Input onChange={(e) => {
                    this.props.dispatch({ "type": "userlist/changeKeyword", "keyword": e.target.value })
                }}></Input>
                <Divider></Divider>
                
                <Table
                    rowKey="id"
                    dataSource={users}
                    columns={columns}
                    rowClassName="userrows"
                    pagination={{
                        current: pagination.page,
                        total: pagination.total,
                        pageSize: pagination.pagesize,
                        showSizeChanger: true,
                        pageSizeOptions: ["20", "30", "40"]
                    }}
                    onChange={(pagination, filters) => {
                        this.props.dispatch({
                            "type": "userlist/changePage",
                            "pagesize": pagination.pageSize,	//每页条数
                            "page": pagination.current
                        })
                    }}
                />

            </div>
        )
    }
}

export default connect(
    ({ userlist }) => ({
        users: userlist.users,
        pagination: userlist.pagination,
        sorter: userlist.sorter
    })
)(UserTableBox);