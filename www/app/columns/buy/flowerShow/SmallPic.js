import React, { Component } from 'react';
import { connect } from "dva";
import {Icon } from 'antd';
import cn from "classnames";

class SmallPic extends Component {
    constructor(props) {
        super(props);
    }

    componentDidUpdate(){
        const { nowid, nowidx, flowerimages } = this.props;
        if (!flowerimages["views"]) flowerimages["views"] = [];
        const page = Math.floor(nowidx / 5);
        const pageAmount = $(this.refs.ul).find("ul").length;
        var self = this;
        $(self.refs.ul).stop(true).animate({ "left": -486 * page }, 300);
        var i = page;
        $(this.refs.btn).delegate(".rightbtn", "mouseenter", function () {
            if (i < pageAmount-1){
                i++;
            }
            $(self.refs.ul).stop(true).animate({ "left": -486 * i}, 300);
        });
        $(this.refs.btn).delegate(".leftbtn", "mouseenter", function () {
            if (i > 0) {
                i--;
            }
            $(self.refs.ul).stop(true).animate({ "left": -486 * i }, 300);
        });

        $(this.refs.small_img).mouseleave(function () {
            $(self.refs.ul).stop(true).animate({ "left": -486 * page }, 300);
        });

        $(this.refs.ul).delegate("li", "mouseenter", function () {
            self.props.dispatch({ "type": "flowershow/changeNowIdx", "nowidx": $(this).data("i")});
            $(this).addClass("cur").siblings().removeClass("cur");
        });
    }
    render() {
        const { nowid,nowidx,flowerimages} = this.props;
        if (!flowerimages["views"]) flowerimages["views"] = [];
        const arr = flowerimages["views"];
        const pageAmount = Math.ceil(arr.length / 5);
        const page = Math.floor(nowidx/5);
        const showUlLis = () => {
            var DOMARR = [];
            for (let i = 0; i < pageAmount; i++) {
                DOMARR.push(
                    <ul key={i}>
                        {
                            arr.slice(i * 5, i * 5 + 5).map((item, index) => {
                                return <li
                                    key={index}
                                    className={cn({ "cur": i * 5 + index == nowidx })}
                                    data-i={i*5+index}
                                >
                                    <img src={`flowers/small_pic/${nowid}/${arr[i * 5 + index]}`} alt="" />
                                </li>
                            })
                        }
                    </ul>
                )
            }
            return DOMARR;
        }
        
        return (
            <div className="small_img" ref="small_img">
                <div ref="ul" className="ulbox">
                    {showUlLis()}
                </div>
                <div className={cn({ "none": pageAmount<=1,"btn":true })} ref="btn">
                    <p className="leftbtn"><Icon type="left" /></p>
                    <p className="rightbtn"><Icon type="right" /></p>
                </div>
            </div>
        )
    }
}

export default connect(
    ({ flowershow })=>({
        "nowid": flowershow.nowid,
        "nowidx": flowershow.nowidx,
        "flowerimages": flowershow.flowerimages
    })
)(SmallPic);