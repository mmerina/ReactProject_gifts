import React, { Component } from 'react';
import { connect } from "dva";
import { Row, Col} from 'antd';
import MyForm from "./MyForm";
import CutBox from "./CutBox";

import "./AddAdmin.less";

class AddAdmin extends Component {
    constructor(props) {
        super(props);
        this.state={
            isCut :false,
            imgW: 0,
            imgH: 0,
            boxW: 0,
            boxH: 0,
            padding: 0,
            picurl: "",
            realW: 0,
            realH: 0
        }
        var self = this;

        window.cutIcon = function () {
            self.setState({ isCut: true });
        }
        window.closeCutIcon = function () {
            self.setState({ isCut: false });
            $(self.refs.icon).attr("src", "/pages/adminiconform.html")
        }

        //图片上传后
        window.onUpDone = function (picurl, realW, realH) {

            realW = parseInt(realW);
            realH = parseInt(realH);
            var wrateh = realW / realH;

            const maxBoxWidth = 700;
            const minBoxWidth = 450;
            const maxBoxHeight = 500;
            const minBoxHeight = 400;
            const padding = 10;
            const rightPart = 180;

            var imgW = realW;
            var imgH = realH;
            var boxW;
            var boxH;

            //计算盒子真实宽高
            if (realW > maxBoxWidth - rightPart - 2 * padding) {
                imgW = maxBoxWidth - rightPart - 2 * padding;
                imgH = imgW / wrateh;
            }
            if (imgH > maxBoxHeight - 2 * padding) {
                imgH = maxBoxHeight - 2 * padding;
                imgW = imgH * wrateh;
            }

            boxW = imgW + 180 + 2 * padding;
            boxH = imgH + 2 * padding;

            if (boxW < minBoxWidth) {
                boxW = minBoxWidth;
            }

            if (boxH < minBoxHeight) {
                boxH = minBoxHeight;
            }

            self.setState({
                imgW,
                imgH,
                boxW,
                boxH,
                padding,
                picurl,
                realW,
                realH
            });
        }

    }

    register(value){
        console.log(value);
    }
    
    render() {
        return (
            <div className = "addadmin">
                <Row>
                    <Col span={10}>
                        <div className="adminicon">
                            <p>个人头像：</p>
                            <iframe ref="icon" className="upicon" src="/pages/adminiconform.html" frameBorder="0" width="300" height="300"></iframe>  
                        </div>
                    </Col>
                    <Col span={14}>
                        <MyForm ></MyForm> 
                    </Col>
                </Row>
                {
                    this.state.isCut
                        ?
                        <div className="cuticonbox">
                            <CutBox
                                imgH={this.state.imgH}
                                imgW={this.state.imgW}
                                boxW={this.state.boxW}
                                boxH={this.state.boxH}
                                padding={this.state.padding}
                                realW={this.state.realW}
                                realH={this.state.realH}
                                picurl={this.state.picurl}
                            ></CutBox>
                        </div>
                        :
                        null
                }
            </div>
        )
    }
}

export default connect()(AddAdmin);