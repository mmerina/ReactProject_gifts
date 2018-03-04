import React, { Component } from 'react';
import {connect} from "dva";
import { Divider, Steps, Button } from "antd";
const Step = Steps.Step;

import Step0 from "./Step0";
import Step1 from "./Step1";
import Step2 from "./Step2";
import "./AddFlower.less";

class AddFlower extends Component {
    constructor(props) {
        super(props);
    }
    render() { 
        const showStep = (n) => {
            var arr = [
                <Step0></Step0>,
                <Step1></Step1>,
                <Step2></Step2>
            ];
            return arr[n];
        }
        return ( 
            <div className="saleflower">
                <Steps current={this.props.step} className="steplist">
                    <Step title="鲜花基本信息" description="材料、类型、花语等" />
                    <Step title="鲜花的图片" description="鲜花的细节图片" />
                    <Step title="完成" description="是否完成鲜花的录入" />
                </Steps>
                <div className="steps-content">
                    {showStep(this.props.step)}
                </div>
        </div>
         )
    }
}
export default connect(
    ({ addFlower }) => ({
        step: addFlower.step
    })
)(AddFlower);