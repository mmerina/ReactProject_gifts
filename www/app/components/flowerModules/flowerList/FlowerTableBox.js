import React, { Component } from 'react';
import {connect} from "dva";
import { Table, Row, Col, Modal, Button, Icon, Select, Radio } from "antd";

class FlowerTableBox extends Component {
    constructor(props) {
        super(props);
    }
    render() { 
        var columns = [
            {
                title: '缩略图',
                dataIndex: 'avatar',
                key: 'avatar',
                render: (t, r) => {
                    return <img
                        style={{ "width": "80px" }}
                        src={`flowers/small_pic/${r.id}/${r.avatar}`}
                        data-id={r.id}
                        className="avatar"
                    />
                }
            },
            {
                title: '类型',
                dataIndex: 'type',
                key: 'type'
            },
            {
                title: '主材料',
                dataIndex: 'mainflower',
                key: 'mainflower'
            },
            {
                title: '所有材料',
                dataIndex: 'others',
                key: 'others'
            }, 
            {
                title: '销量',
                dataIndex: 'volume',
                key: 'volume',
                sorter: true
            },
            {
                title: '售价',
                dataIndex: 'price',
                key: 'price',
                sorter: true
            }
        ];
        return ( 
            <div className="flowertablebox">
            <Table
                rowKey="id"
                    dataSource={this.props.flowers}
                    columns={columns}
                    rowClassName="flowerrows"
                onChange={(pagination, filters, sorter) => {
                    
                }}
            />
        </div>
         )
    }
}
 
export default connect(
    ({ flowerlist}) => ({
        flowers: flowerlist.flowers
    })
)(FlowerTableBox);