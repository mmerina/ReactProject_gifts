import React, { Component } from 'react';
import {connect} from "dva";
import { Modal, Button, Alert, Row, Col, Divider } from 'antd';

class MyModal extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return ( 
            <div className="mymodal">
                <Modal
                    title=""
                    width={420}
                    visible={this.props.isModal}
                    closable={false}
                    maskClosable={false}
                    okText="查看鲜花列表"
                    cancelText="录入新商品"
                    onOk={()=>{
                        this.props.dispatch({ "type": "addFlower/changeIsModal","isModal":false})
                    }}
                    onCancel={()=>{
                        this.props.dispatch({ "type": "addFlower/changeIsModal","isModal":false})
                        this.props.dispatch({ "type": "addFlower/changeStep","step":0})
                        this.props.dispatch({ "type": "addFlower/changeForm0","form0":{}})
                        this.props.dispatch({ "type": "addFlower/changeForm1","form1":{}})
                    }}
                    
                >
                    <Row>
                        <Col span={4}></Col>
                        <Col span={16}>
                            <Alert
                                message="Success!"
                                description="鲜花商品信息录入成功！接下来您要："
                                type="success"
                                showIcon
                            />
                        </Col>
                    </Row>
                </Modal>
            </div>
         )
    }
}
export default connect(
    ({ addFlower }) => ({
        isModal: addFlower.isModal
    })
)(MyModal);