import React, { Component } from 'react';
import { connect } from "dva";
import { Row, Col, Divider} from 'antd';
import cn from "classnames";
import solarLunar from 'solarLunar';

import "./FlowerShow.less";

class PreviewInfo extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount(){
        //公立
        const today = new Date() - 0;
        const todayDate = new Date(today + 86400000);

        const year = new Date().getFullYear();
        const valentine = new Date(year, 1, 14) - 0; //情人节
        const christmas = new Date(year, 12, 25) - 0; //圣诞节
        //农历
        const magpieDate = solarLunar.lunar2solar(year, 7, 7);
        const magpie = new Date(year, magpieDate.cMonth, magpieDate.cDay) - 0; //七夕

        var holiday = { "string": "", "name": "" };
        if (todayDate >= valentine - 86400000 * 6 && todayDate <= valentine + 86400000 * 4) {
            holiday.string = `2.${new Date(valentine - 86400000 * 6).getDate()}-2.${new Date(valentine + 86400000 * 4).getDate()}`;
            holiday.name = "情人节";
            $(".holiday_price").addClass("cur");
            $(".normal_price").removeClass("cur");
        } else if (todayDate >= christmas - 86400000 * 6 && todayDate <= christmas + 86400000 * 4) {
            holiday.string = `12.${new Date(valentine - 86400000 * 6).getDate()}-12.${new Date(valentine + 86400000 * 4).getDate()}`;
            holiday.name = "圣诞节";
            $(".holiday_price").addClass("cur");
            $(".normal_price").removeClass("cur");
        } else if (todayDate >= magpie - 86400000 * 6 && todayDate <= magpie + 86400000 * 4) {
            holiday.string = `${new Date(magpie - 86400000 * 6).getMonth()}.${new Date(magpie - 86400000 * 6).getDate()}-${new Date(magpie + 86400000 * 4).getMonth()}.${new Date(magpie + 86400000 * 4).getDate()}`;
            holiday.name = "圣诞节";
            $(".holiday_price").addClass("cur");
            $(".normal_price").removeClass("cur");
        }else{
            $(".normal_price").addClass("cur");
            $(".holiday_price").removeClass("cur");
        }
    }

    render() {
        const { nowid, nowidx, flowerinfo } = this.props;
        if (!flowerinfo) return null;
        
        return (
            <Col span={12} className="previewinfo">
                <h3 className="title">{flowerinfo.name}----{flowerinfo.others}</h3>
                <Divider />
                <table className="flowercolums">
                    <tbody>
                        <tr>
                            <td>类 别：</td>
                            <td>{flowerinfo.type}</td>
                        </tr>
                        <tr>
                            <td>编 号：</td>
                            <td>{flowerinfo.id}</td>
                        </tr>
                        <tr>
                            <td>材 料：</td>
                            <td>{flowerinfo.others}</td>
                        </tr>
                        <tr>
                            <td>包 装：</td>
                            <td>{flowerinfo.package}</td>
                        </tr>
                        <tr>
                            <td>花 语：</td>
                            <td>{flowerinfo.words}</td>
                        </tr>
                        <tr>
                            <td>附 送：</td>
                            <td>下单填写留言，即免费赠送精美贺卡！</td>
                        </tr>
                        <tr>
                            <td>配 送：</td>
                            <td>全国 （可配送至全国1000多城市，市区免配送费）</td>
                        </tr>
                    </tbody>
                </table>
                <Divider />
                <div className="pricebox">
                    <p className="holiday_price">平日配送：<span>￥{flowerinfo.price}</span></p>
                    <p className="normal_price">平日配送：<span>￥{flowerinfo.price}</span></p>
                </div>
            </Col>
        )
    }
}

export default connect(
    ({ flowershow }) => ({
        "nowid": flowershow.nowid,
        "nowidx": flowershow.nowidx,
        "flowerinfo": flowershow.flowerinfo
    })
)(PreviewInfo);