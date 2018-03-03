import React, { Component } from 'react';
import { connect } from "dva";
import { Table, Row, Col, Modal, Button, Icon, Select, Radio, Affix, Divider, Input} from "antd";
import cn from "classnames";

class AdminTableBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isGrid: false
        }
    }
    componentDidMount() {
       
    }
    render() {
        const { admins, pagination, sorter } = this.props;
        var columns = [
            {
                title: '员工号',
                dataIndex: 'id',
                key: 'id',
                width:130
            },
            {
                title: '姓名',
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
                title: '部门',
                dataIndex: 'apartment',
                key: 'apartment'
            }
        ];
        return (
            <div className="admintablebox">
                <h1>员工信息（内部机密）--<b>共{pagination.total}条</b></h1>
                <Input onChange={(e) => {
                    this.props.dispatch({ "type": "adminlist/changeKeyword", "keyword": e.target.value })
                }}></Input>
                <Divider></Divider>
                
                <Table
                    rowKey="id"
                    dataSource={admins}
                    columns={columns}
                    rowClassName="adminrows"
                    pagination={{
                        current: pagination.page,
                        total: pagination.total,
                        pageSize: pagination.pagesize,
                        showSizeChanger: true,
                        pageSizeOptions: ["20", "30", "40"]
                    }}
                    onChange={(pagination, filters) => {
                        this.props.dispatch({
                            "type": "adminlist/changePage",
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
    ({ adminlist }) => ({
        admins: adminlist.admins,
        pagination: adminlist.pagination,
        sorter: adminlist.sorter
    })
)(AdminTableBox);