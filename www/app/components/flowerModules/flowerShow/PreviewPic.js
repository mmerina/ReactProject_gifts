import React, { Component } from 'react';
import { connect } from "dva";
import { Row, Col } from 'antd';
import cn from "classnames";

import SmallPic from "./SmallPic.js";
import BigPic from "./BigPic.js";

class PreviewPic extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Col span={12} className="previewpic">
                <div className="picshow">
                    <BigPic></BigPic>
                    <SmallPic></SmallPic>
                </div>
            </Col>
        )
    }
}

export default connect(
    
)(PreviewPic);