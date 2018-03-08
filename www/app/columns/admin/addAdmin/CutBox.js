import React from 'react';
import { Button } from "antd";

export default class CutBox extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isUpDone: false
        }

        this.cutFangLeft = 0;
        this.cutFangTop = 0;
        this.cutFangWidth = 100;
        this.cutFangHeight = 100;
    }

    componentDidMount() {
        var i = 0;
        var self = this;
        this.timer = setInterval(function () {
            i++;
            if (i > 3) i = 0;
            $(self.refs.diandianem).html(".".repeat(i));
        }, 400);
    }

    componentWillReceiveProps(nextProps) {
        var img = new Image();
        img.src = "/uploads/adminicons/" + nextProps.picurl;
        var self = this;
        img.onload = function () {
            clearInterval(self.timer);
            self.setState({
                isUpDone: true
            });

            //允许拖拽
            $(self.refs.cut_fang).draggable({
                containment: $(self.refs.imgbox_wrap),
                drag: function (event, ui) {
                    self.cutFangLeft = ui.position.left;
                    self.cutFangTop = ui.position.top;

                    $(self.refs.maoniimg).css({
                        "left": -self.cutFangLeft,
                        "top": -self.cutFangTop
                    });

                    self.setPreviews();
                }
            });

            //允许改变尺寸
            $(self.refs.cut_fang).resizable({
                containment: $(self.refs.imgbox_wrap),
                aspectRatio: 1 / 1,
                resize: function (event, ui) {
                    self.cutFangHeight = ui.size.height;
                    self.cutFangWidth = ui.size.width;

                    self.setPreviews();
                }
            });
        }
    }

    doCut() {
        var rate = this.props.realW / this.props.imgW;
        var w = this.cutFangWidth * rate;
        var h = this.cutFangHeight * rate;
        var l = this.cutFangLeft * rate;
        var t = this.cutFangTop * rate;

        $.post("/docut", {
            w,
            h,
            l,
            t,
            picurl: this.props.picurl
        }, function (data) {
            if (data.result == 1) {
                window.closeCutIcon();
            }
        });
    }

    setPreviews() {
       
        var self = this;
        $(this.refs.previewZone).find(".p").each(function () {
            var w = $(this).data("w");

            $(this).find("img").css({
                width: self.props.imgW / self.cutFangWidth * w,
                top: -self.cutFangTop / self.cutFangHeight * w,
                left: -self.cutFangLeft / self.cutFangWidth * w
            });
        });
    }

    render() {
        return (
            <div className="cutbox">
                {
                    !this.state.isUpDone
                        ?
                        <span className="loadingtip">图片正在上传<em ref="diandianem">...</em></span>
                        :
                        <div className="cutbox" style={{
                            "width": this.props.boxW + "px",
                            "height": this.props.boxH + "px",
                            "padding": this.props.padding + "px"
                        }}>
                            <div className="imgbox_wrap" ref="imgbox_wrap" style={{
                                "width": this.props.imgW + "px",
                                "height": this.props.imgH + "px"
                            }}>
                                <img src={`/uploads/adminicons/${this.props.picurl}`} style={{
                                    "width": this.props.imgW + "px",
                                    "height": this.props.imgH + "px"
                                }} />

                                <div className="cut_fang" ref="cut_fang">
                                    <img ref="maoniimg" src={`/uploads/adminicons/${this.props.picurl}`} style={{
                                        "width": this.props.imgW + "px",
                                        "height": this.props.imgH + "px"
                                    }} />
                                </div>

                                <div className="mask"></div>
                            </div>
                            <div className="previewZone" ref="previewZone">
                                <div className="big_p p" data-w="160">
                                    <img src={`/uploads/adminicons/${this.props.picurl}`} />
                                </div>
                                <div className="mid_p p" data-w="100">
                                    <img src={`/uploads/adminicons/${this.props.picurl}`} />
                                </div>
                                <div className="small_p p" data-w="60">
                                    <img src={`/uploads/adminicons/${this.props.picurl}`} />
                                </div>

                                <Button type="primary" onClick={() => { this.doCut() }}>确定</Button>
                                {" "}
                                <Button>取消</Button>
                            </div>
                        </div>
                }
            </div>
        )
    }
}
