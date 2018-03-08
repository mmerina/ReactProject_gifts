import React, { Component } from 'react';
import {connect} from "dva";
import { Row, Col, Button } from 'antd';

class Step1 extends Component {
    constructor(props) {
        super(props);
        this.viewamount = 0;
    }
    componentDidMount(){
        var self = this;
        this.maps = {
            views: {},
            introductions: {}
        }

        $(this.refs.viewsfilebtn).click(function () { $(self.refs.viewsfile).trigger("click"); });
        $(this.refs.introductionsfilebtn).click(function () { $(self.refs.introductionsfile).trigger("click"); });

        this.refs.viewsfile.onchange = function (ev) { createFileArrAndUploader(this.files, "views"); }
        this.refs.introductionsfile.onchange = function (ev) { createFileArrAndUploader(this.files, "introductions"); }

        function uploadFile(formData, album, no) {
            var xhr = new XMLHttpRequest();

            xhr.upload.onprogress = function (ev) {
                var percent = 100 * ev.loaded / ev.total;
                var $span = $(".previmgbox." + album + "[data-no=" + no + "]").find("span");
                $span.removeClass("loaded");
                $span.html("图片正在上传" + parseInt(percent) + "%");

                if (percent == 100) {
                    $span.addClass("loaded");
                }
            }
            xhr.onload = function () {
                var $span = $(".previmgbox." + album + "[data-no=" + no + "]").find("span");
                $span.addClass("loaded");
                self.maps[album][no] = JSON.parse(xhr.responseText).base;

            }
            xhr.open('POST', 'http://127.0.0.1:8888/uploadflowerimages', true);
            xhr.send(formData);
        }

        function createFileArrAndUploader(files, album) {
            for (let i = 0; i < files.length; i++) {
                let no = self.viewamount++;
                let formData = new FormData();
                formData.append('viewpics', files[i]);

                uploadFile(formData, album, no);
                //读取文件
                let reader = new FileReader();
                reader.readAsDataURL(files[i]);
                reader.onload = function (e) {
                    $(".dropzone[data-album=" + album + "]").append($('<div data-no=' + no + ' class="' + album +' previmgbox" style="background-image:url(' + e.target.result + ')"><span class="loaded"></span></div>'))
                }
            }
        }

        $(".dropzone").bind("dragover", function (ev) {
            ev.preventDefault();
        });
        $(".dropzone").bind("dragleave", function (ev) {
            ev.preventDefault();
        });

        $(".dropzone").bind("drop", function (ev) {
            ev.preventDefault();
            var files = ev.originalEvent.dataTransfer.files;

            createFileArrAndUploader(files, $(this).data("album"));
        });

        $(".dropzone").sortable();
    }
    render() { 
        return ( 
            <div className="step1">
                <Row>
                    <Col span={3}></Col>
                    <Col span={10}>
                        <h3>① 请上传预览图，点击上传按钮或者拖拽到方框内</h3>
                    </Col>
                    <Col span={6} className="addzone">
                        <input hidden ref="viewsfile" type="file" multiple="multiple" />
                        <span ref="viewsfilebtn" className="addBtn">+</span>
                    </Col>
                </Row>
                <Row>
                    <Col span={3}></Col>
                    <Col span={18}>
                        <div className="dropzone" data-album="views" dropeffect="link"></div>
                    </Col>
                </Row>

                <Row>
                    <Col span={3}></Col>
                    <Col span={10}>
                        <h3>② 请上传详细介绍图，点击上传按钮或者拖拽到方框内</h3>
                    </Col>
                    <Col span={6} className="addzone">
                        <input hidden ref="introductionsfile" type="file" multiple="multiple" />
                        <span ref="introductionsfilebtn" className="addBtn">+</span>
                    </Col>
                </Row>
                <Row>
                    <Col span={3}></Col>
                    <Col span={18}>
                        <div className="dropzone" data-album="introductions" dropeffect="link"></div>
                    </Col>
                </Row>
                <Row>
                    <Col span={10}></Col>
                    <Col span={4}>
                        <Button type="primary" onClick={() => {
                            var picarrObj = {
                                "views": [],
                                "introductions": []
                            }
                            var self = this;
                            $(".dropzone[data-album=views]").find(".previmgbox").each(function () {
                                picarrObj["views"].push(self.maps["views"][$(this).data("no")]);
                            });
                            $(".dropzone[data-album=introductions]").find(".previmgbox").each(function () {
                                picarrObj["introductions"].push(self.maps["introductions"][$(this).data("no")]);
                            });
                            this.props.dispatch({ "type": "addFlower/changeForm1", "form1": picarrObj })
                            this.props.dispatch({ "type": "addFlower/changeStep", "step": 2 })
                        }}>下一步</Button>
                    </Col>                   
                </Row>
                
            </div>
         )
    }
}
 
export default connect()(Step1);