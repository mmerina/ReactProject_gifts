import React, { Component } from 'react';
import {connect} from "dva";
import { Row, Col, Button } from 'antd';
import WrappedAddFlowerForm from "./WrappedAddFlowerForm";

class Step0 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                name: {},
                type: {},
                price: {},
                amount: {},
                mainflower: {},
                color: {},
                others: {},
                words: {},
                package: {},
                sendObject: {},
                purpose: {}
            }
        }
    }
    handleFormChange(changedFields) {
        this.setState({
            form: { ...this.state.form, ...changedFields }
        });
    }
    render() { 
        const checkdisable = () => {
            for (var k in this.state.form) {
                if (this.state.form[k].value === undefined || this.state.form[k].errors) {
                    return true;
                }
            }
            return false;
        };
        return ( 
            <div className="step0">
                <Row>
                    <WrappedAddFlowerForm
                        {...this.state.form}
                        onChange={this.handleFormChange.bind(this)}
                    ></WrappedAddFlowerForm>
                </Row>
                <Row className="step0btn">
                    <Button
                        type="primary"
                        onClick={() => {
                            this.props.dispatch({ "type": "addFlower/changeStep", "step": 1 })
                            this.props.dispatch({ "type": "addFlower/changeForm0", "form0": this.state.form })
                        }}
                        disabled={checkdisable()}
                    >
                        下一步
                    </Button>
                </Row>
            </div>
         )
    }
}
export default connect()(Step0);