import React, { Component } from 'react';
import {connect} from "dva";
import { Table, Row, Col, Modal, Button, Icon, Select, Radio, Affix } from "antd";
import cn from "classnames";
import Grid from "./Grid";

class FlowerTableBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isGrid:false
        }
    }
    componentDidMount(){
        var self = this;
        var sortdirection = "descend";
        var priceDescend = true;
        $(this.refs.sort).delegate("span","click",function(){
            if ($(this).data("name")=="id"){
                sortdirection = "ascend";
            }
            if ($(this).data("name") == "price"){
                priceDescend = !priceDescend;
                priceDescend ? sortdirection = "descend": sortdirection = "ascend";
                console.log(self.priceDescend);
            }
            self.props.dispatch({ "type": "flowerlist/changeSort", "sortby": $(this).data("name"), sortdirection});
        })
    }
    render() { 
        const { flowers, pagination, sorter}  = this.props;
        var columns = [
            {
                title: '缩略图',
                dataIndex: 'avatar',
                key: 'avatar',
                width:100,
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
                key: 'type',
                width:80
            },
            {
                title: '主材料',
                dataIndex: 'mainflower',
                key: 'mainflower',
                width: 80
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
                width:80
            },
            {
                title: '售价',
                dataIndex: 'price',
                key: 'price',
                width:80
            },
            {
                title: '人气',
                dataIndex: 'collect',
                key: 'collect',
                width:80
            }
        ];
        return ( 
            <div className="flowertablebox">\
            <Affix>
                <div className="viewctrl">
                    <p className="sort" ref="sort">
                            <span className={cn({ "cur": sorter.sortby == "id", "all": true })} data-name="id">综合排序</span>
                            <span className={cn({ "cur": sorter.sortby == "volume", "volume": true })} data-name="volume" data-string="销量">{sorter.sortby == "volume" ?"销量从高到低": "按销量"}</span>
                            <span className={cn({ "cur": sorter.sortby == "collect", "collect": true })} data-name="collect" data-string="人气">{sorter.sortby == "collect" ? "人气从高到低" : "按人气"}</span>
                            <span className={cn({ "cur": sorter.sortby == "price", "price": true })} data-name="price" data-string="价格">{sorter.sortby == "price" ? sorter.sortdirection == "ascend" ? "价格从低到高" : "价格从高到低" : "按价格"}</span>
                    </p>
                    <div className="changeview">
                            <Radio.Group value={this.state.isGrid} size="small" onChange={(e) => { this.setState({ "isGrid": e.target.value })}}>
                                <Radio.Button value={false}><Icon type="bars" /></Radio.Button>
                                <Radio.Button value={true}><Icon type="appstore-o" /></Radio.Button>
                            </Radio.Group>
                    </div>
                </div>
            </Affix>
            {this.state.isGrid?
                    <Grid></Grid>
                    :
                <Table
                rowKey="id"
                dataSource={flowers}
                columns={columns}
                rowClassName="flowerrows"
                pagination={{
                    current: pagination.page,
                    total: pagination.total,
                    pageSize: pagination.pagesize,
                    showSizeChanger: true,
                    pageSizeOptions: ["5", "10", "20"]
                }}
                onChange={(pagination, filters) => {
                    this.props.dispatch({
                        "type": "flowerlist/changePage", 
                        "pagesize": pagination.pageSize,	//每页条数
                        "page": pagination.current
                    })
                }}
                />
            }
        </div>
         )
    }
}
 
export default connect(
    ({ flowerlist}) => ({
        flowers: flowerlist.flowers,
        pagination: flowerlist.pagination,
        sorter: flowerlist.sorter
    })
)(FlowerTableBox);