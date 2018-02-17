import React, { Component } from 'react';
import { connect } from "dva";
import { Row, Col} from 'antd';
import cn from "classnames";

import "./FlowerShow.less";
import PreviewPic from "./PreviewPic.js";
import PreviewInfo from "./PreviewInfo.js";

class FlowerShow extends Component {
    constructor(props) {
        super(props);
        props.dispatch({ "type": "flowershow/init", "nowid": 10000001});
    }

    render() {
        return (
            <div className="flowershow">
                <Row className="preview">
                    <PreviewPic></PreviewPic>
                    <PreviewInfo></PreviewInfo>
                </Row>
            </div>
        )
    }
}

export default connect(
    ({ flowershow }) => ({
        "nowid": flowershow.nowid,
        "nowidx": flowershow.nowidx,
        "flowerimages": flowershow.flowerimages
    })
)(FlowerShow);