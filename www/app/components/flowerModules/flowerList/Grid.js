import React from 'react';
import { Select, Radio, Row, Col, Pagination } from 'antd';
const Option = Select.Option;
import { connect } from "dva";

class Grid extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            "value": "A",
            "col": 4,
            "row": 3   //网格形式
        }


        //直接派遣一个更改页面pagesize的动作
        props.dispatch({ "type": "flowerlist/changePage", pagesize: this.state.col * this.state.row })
    }

    render() {
        //显示小格内容
        const showGridContent = (n) => {
            const theflower = this.props.flowers[n];
            if (!theflower) return null;
            return <div>
                <Row>
                    <Col span={18} offset={3}>
                        <img className="zhongtu" src={`/flowers/big_pic/${theflower.id}/views/${theflower.avatar}`} alt="" />
                    </Col>
                </Row>
                <Row>
                    <Col span={18} offset={3}>
                        <h4>{theflower.type}</h4>
                        <h4>{theflower.name}</h4>
                        <h4>{theflower.price}</h4>
                    </Col>
                </Row>
            </div>
        }

        //放二维数组
        var ARR = [];
        for (var i = 0; i < this.state.row; i++) {
            var temp = [];
            for (var j = 0; j < this.state.col; j++) {
                temp.push(
                    <Col key={j} className="grid" span={24 / this.state.col}>
                        {showGridContent(i * this.state.col + j)}
                    </Col>
                )
            }
            ARR.push(<Row key={i}>{temp}</Row>)
        }



        return (
            <div className="grid">
                <Radio.Group value={this.state.value} size="small" className="gridpagesize" onChange={(e) => {
                    this.setState({
                        col: e.target.col,
                        row: e.target.row,
                        value: e.target.value
                    });

                    //派遣一个action
                    this.props.dispatch({ "type": "flowerlist/changePage", pagesize: e.target.col * e.target.row })
                }}>
                    <Radio.Button value="B" col="4" row="3">3 * 4</Radio.Button>
                    <Radio.Button value="C" col="3" row="2">3 * 2</Radio.Button>
                </Radio.Group>

                {ARR}

                <Pagination
                    className="gridpagination"
                    current={this.props.pagination.page}
                    total={this.props.pagination.total}
                    pageSize={this.props.pagination.pagesize}
                    onChange={(page) => {
                        this.props.dispatch({ "type": "flowerlist/changePage", page: page, pagesize: this.state.row * this.state.col })
                    }}
                />
            </div>
        );
    }
}

export default connect(
    ({ flowerlist }) => ({
        "pagination": flowerlist.pagination,
        "flowers": flowerlist.flowers
    })
)(Grid);