import React, { Component } from 'react';
import {connect} from "dva";
import { Row, Col, List, Avatar, Button, Modal, Progress, Input, message, Divider} from 'antd';
const confirm = Modal.confirm;

import "./FileList.less";

class FileList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            percent: 0,
            upstep: 0,  //0表示没有上传，1正在上传，2上传完毕
            ext: "",
            filename: "",
            real: ""
        }
        props.dispatch({ "type":"addFile/init"});
    }

    componentDidMount() {
        var self = this;
        $(this.refs.filebtn).bind("change", function () {
            self.setState({
                upstep: 1,
                filename: this.files[0].name
            });
            let formData = new FormData();
            formData.append('files', this.files[0]);
            uploadFile(formData);
        })

        function uploadFile(formData) {
            var xhr = new XMLHttpRequest();

            xhr.upload.onprogress = function (ev) {
                var percent = 100 * ev.loaded / ev.total;
                self.setState({ percent: Math.ceil(percent) })
            }

            xhr.onload = function () {
                var base = JSON.parse(xhr.responseText).base;
                var ext = JSON.parse(xhr.responseText).ext;
                self.setState({
                    upstep: 2,
                    ext,
                    real: base
                });
            }

            xhr.open('POST', 'http://127.0.0.1:8888/uploadfiles', true);
            xhr.send(formData);
        }
    }

    uploadFile2(){
        var self = this;
        $.post("/uploadfiletodatabase", {
            "fileinfo": JSON.stringify({
                "filename": self.state.filename,
                "real": self.state.real,
                "ext": self.state.ext
            })
        }, function (data) {
            if (data.result == 1) {
                message.success('文件上传成功！');
                self.props.dispatch({ "type": "addFile/init" });
            } else {
                message.error('文件上传失败！');
                self.props.dispatch({ "type": "addFile/init" });
            }
        });
    }
    
    showDeleteConfirm(file) {
        var self = this;
        function deleteFile(){
            $.post("/deletefile", {
                "fileinfo": JSON.stringify({
                    "filename": file.title,
                    "real": file.real,
                    "ext": file.ext
                })
            }, function (data) {
                if (data.result == 1) {
                    message.success('文件删除成功！');
                    self.props.dispatch({ "type": "addFile/init" });
                } else {
                    message.error('文件删除失败！');
                    self.props.dispatch({ "type": "addFile/init" });
                }
            });
        }
        confirm({
            title: '确定删除  ' + file.title +'？',
            okText: '是',
            okType: 'danger',
            cancelText: '否',
            onOk() {
                deleteFile();
            }
        });
    }

    render() { 
        var { form } = this.props;
        var data = form.map((item)=>{
            var fileObj = {};
            fileObj.title = item.filename || "";
            fileObj.real = item.real || "";
            fileObj.ext = item.ext || "";
            return fileObj;
        })
        const getImageUrl = (ext) => {
            if (ext == ".pdf") {
                return "/images/pdf.jpg";
            } else if (ext == ".docx" || ext == ".doc") {
                return "/images/docx.jpg";
            } else if (ext == ".zip" || ext == ".rar") {
                return "/images/zip.jpg";
            } else if (ext == ".xls" || ext == ".xlsx") {
                return "/images/excel.jpg";
            } else if (ext == ".ppt" || ext == ".pptx") {
                return "/images/ppt.png";
            } else if (ext == ".js") {
                return "/images/js.png";
            }else{
                return "/images/txt.jpg";
            }
        }
        return ( 
            <div className="filelist">
                <Row>
                    <Col span={4}></Col>
                    <Col span={2}><h4>文件搜索：</h4></Col>
                    <Col span={8}>
                        <Input onChange={(e) => {
                            this.props.dispatch({ "type": "addFile/changeKeyword", "keyword": e.target.value })
                        }}></Input>
                    </Col>
                    <Col span={6}></Col>
                    <Col span={4}>
                        <Button onClick={()=>{
                            $(this.refs.filebtn).trigger("click");
                        }}>上传文件</Button>
                        <input type="file" hidden ref="filebtn"/>
                    </Col>
                </Row>
                    <Divider><h3>文件列表</h3></Divider>
                <Row>
                    <Col span={5}></Col>
                    <Col span={14}>
                        <List
                            itemLayout="horizontal"
                            size="small"
                            dataSource={data}
                            renderItem={item => (
                                <List.Item actions={[<a href={`./files/${item.real}`}>下载</a>, <a onClick={() => { this.showDeleteConfirm(item)}}>删除</a>]}>
                                    <List.Item.Meta
                                        avatar={<Avatar src={getImageUrl(item.ext)} />}
                                        title={item.title}
                                    />
                                </List.Item>
                            )}
                        />
                    </Col>
                </Row>
                <Modal
                    title="正在上传"
                    visible={this.state.upstep == 1}
                    closable={false}
                    >
                    <div>
                        <Progress percent={this.state.percent} status="active" />
                    </div>
                </Modal>

                <Modal
                    title="请确认文件名字"
                    visible={this.state.upstep == 2}
                    closable={false}
                    destroyOnClose={true}
                    onOk={() => {
                        this.setState({
                            upstep: 0
                        });
                        this.uploadFile2();                 
                    }}
                >
                    <div style={{ "textAlign": "center" }}>
                        <img width="60" src={getImageUrl(this.state.ext)} alt="" />
                        <Input type="text" value={this.state.filename} onChange={(e)=>{this.setState({"filename":e.target.value})}}/>

                    </div>
                </Modal>
            </div>
         )
    }
}
export default connect(
    ({ addFile }) => ({
        form: addFile.form
    })
)(FileList);