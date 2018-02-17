import React, { Component } from 'react';
import { connect } from "dva";
import { Row, Col,Icon } from 'antd';
import cn from "classnames";

class PreviewPic extends Component {
    constructor(props) {
        super(props);
    }
    componentDidUpdate(){
        var self = this;
        $(this.refs.big_img).mouseenter(function(){
            $(self.refs.big_img).find(".imgbtn").each(function () {
                $(this).addClass("cur");
            });
        });
        $(this.refs.big_img).mouseleave(function () {
            $(self.refs.big_img).find(".imgbtn").each(function () {
                $(this).removeClass("cur");
            });
        });
        
        
    }
    componentWillUpdate(currentprops){
        $(this.refs.loading).show();
        const { nowid, nowidx, flowerimages } = currentprops;

        var img = new Image();
        var src = `flowers/big_pic/${nowid}/views/${flowerimages["views"][nowidx]}`;
        img.src = src;
        var self = this;

        img.onload = function () {
            //替换图片的src
            $(self.refs.bigimg).attr("src", src);
            //小菊花hide
            $(self.refs.loading).hide();
        }
    }
    render() {
        const { nowid, nowidx, flowerimages } = this.props;
        if (!flowerimages["views"]) return null;
        return (
            <div className="big_img" ref="big_img">
                <img ref="bigimg" src={`flowers/small_pic/${nowid}/${flowerimages["views"][nowidx]}`} />
                <p className="loading" ref="loading"></p>
                <div className="leftImg imgbtn" onClick={() => { this.props.dispatch({ "type": "flowershow/changeNowIdx", "nowidx": nowidx == 0 ? flowerimages["views"].length - 1 : nowidx - 1 }) }}><Icon type="left" /></div>
                <div className="rightImg imgbtn" onClick={() => { this.props.dispatch({ "type": "flowershow/changeNowIdx", "nowidx": nowidx == flowerimages["views"].length-1 ? 0 : nowidx + 1}) }}><Icon type="right" /></div>
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
)(PreviewPic);