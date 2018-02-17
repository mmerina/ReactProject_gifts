import React, { Component } from 'react';
import { connect } from "dva";
import { Row, Col, Divider, Icon, DatePicker,TimePicker} from 'antd';
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
import moment from 'moment';

import cn from "classnames";
import solarLunar from 'solarLunar';

import "./FlowerShow.less";

class PreviewInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            "checked":false,
            "chooseDate": moment(new Date())
        }
        this.holiday = { "string": "", "name": "" };
    }


    render() {
        const { nowid, nowidx, flowerinfo } = this.props;
        if (!flowerinfo) return null;
        const format = 'HH:mm';
        
        //判断配送日期是否是节日价
        const chooseDay = this.state.chooseDate.unix()*1000;

        const year = this.state.chooseDate.year();
        const valentine = new Date(year, 1, 14) - 0; //情人节
        const christmas = new Date(year, 11, 25) - 0; //圣诞节
        //农历
        const magpieDate = solarLunar.lunar2solar(year, 6, 7);
        const magpie = new Date(year, magpieDate.cMonth, magpieDate.cDay) - 0; //七夕

        if (chooseDay >= valentine - 86400000 * 6 && chooseDay < valentine + 86400000 * 5) {
            this.holiday.string = `2.${new Date(valentine - 86400000 * 6).getDate()}-2.${new Date(valentine + 86400000 * 4).getDate()}`;
            this.holiday.name = "情人节";
        } else if (chooseDay >= christmas - 86400000 * 6 && chooseDay < christmas + 86400000 * 5) {
            this.holiday.string = `12.${new Date(valentine - 86400000 * 6).getDate()}-12.${new Date(valentine + 86400000 * 4).getDate()}`;
            this.holiday.name = "圣诞节";
        } else if (chooseDay >= magpie - 86400000 * 6 && chooseDay < magpie + 86400000 * 5) {
            this.holiday.string = `${new Date(magpie - 86400000 * 6).getMonth() + 1}.${new Date(magpie - 86400000 * 4).getDate()}-${new Date(magpie + 86400000 * 4).getMonth() + 1}.${new Date(magpie + 86400000 * 4).getDate()}`;
            this.holiday.name = "七夕节";
        } else {
            this.holiday.string = "";
            this.holiday.name = "节日";
        }
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
                <div className="dateChoose">
                    <div className="choosePicker">配送日期：<DatePicker defaultValue={this.state.chooseDate} onChange={(data) => { this.setState({ "chooseDate": data }) }} allowClear={false}/></div>
                    <div className="choosePicker">配送时间：<TimePicker defaultValue={this.state.chooseDate} format={format} allowEmpty={false}/></div>
                </div>
                <div className="pricebox">
                    <p className={cn({ "holiday_price": true, "cur": this.holiday.name != "节日" })}>{this.holiday.string}{this.holiday.name}配送：<span>￥{flowerinfo.price}</span></p>
                    <p className={cn({ "normal_price": true, "cur": this.holiday.name == "节日" })}>平日配送：<span>￥{flowerinfo.price}</span></p>
                </div>
                <div className="buybox">
                    <p className="buynow"><span><Icon type="shopping-cart" style={{ fontSize: 20, color: '#fff',fontWeight:"normal" }} /></span>  立即购买</p>
                    <p className="volume">销量：<span>{flowerinfo.volume}</span></p>
                    <p className="collect" onClick={() => { this.setState({ "checked": !this.state.checked})}}><span>{this.state.checked ? <Icon type="heart" /> : <Icon type="heart-o" />}</span>收藏</p>
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