import React, { Component } from 'react';
import { connect } from "dva";
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete, message, Radio} from 'antd';
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;
const AutoCompleteOption = AutoComplete.Option;

const apartment = [{
    value: '技术中心',
    label: '技术中心',
    children: [
        {
            value: '质量控制部',
            label: '质量控制部',
            children: [
                {
                    value: '测试A组',
                    label: '测试A组',
                },
                {
                    value: '测试B组',
                    label: '测试B组',
                },
                {
                    value: '信息技术组',
                    label: '信息技术组',
                }
            ]
        },
        {
            value: '开发部',
            label: '开发部',
            children: [
                {
                    value: '产品组',
                    label: '产品组',
                },
                {
                    value: '用户组',
                    label: '用户组',
                },
                {
                    value: '售后组',
                    label: '售后组',
                }
            ]
        }
    ]
}];


export default class FlowerForm extends Component {
    constructor(props) {
        super(props);
        this.state={
            confirmDirty: false,
            autoCompleteResult: [],
            isDisabaled: true
        }
    }

    handleSubmit(e, resetFields){
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                // $.post("/registeradmin", {
                //     "values": JSON.stringify({
                //         "id": values.id,
                //         "name": values.name,
                //         "apartment": values.apartment,
                //         "mobile": values.mobile,
                //         "email": values.email,
                //         "password": values.password,
                //         "sex": values.sex,
                //         "icon": ""
                //     })
                // }, function (data) {
                //     if (data.result == 1) {
                //         message.success('注册成功！');
                //         resetFields();
                        
                //     }else{
                //         message.error('id已存在！');
                //     }
                // }); 
                console.log(values);
                this.setState({ "isDisabaled": false});
            } else {
                this.setState({ "isDisabaled": true});
            }
        });
    }
    
    render() {
        const { getFieldDecorator, resetFields } = this.props.form;
        const { autoCompleteResult } = this.state;

        const formItemLayout = {
            labelCol: {
                xs: { span: 18 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 6 },
                sm: { span: 12 },
            },
        };

        return (
            <div>
                <Form onSubmit={(e) => { this.checkdisable(e,resetFields)}}>
                    <FormItem
                        {...formItemLayout}
                        label="鲜花名称"
                    >
                        {getFieldDecorator('name', {
                            rules: [
                                {
                                    pattern: /^.{2,10}$/, message: '请输入2~10位的名称！',
                                },
                                { required: true, message: 'Please input flower name!', whitespace: true }],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="类别"
                        hasFeedback
                    >
                        {getFieldDecorator('type', {
                            rules: [
                                { required: true, message: 'Please select flower type!' },
                            ],
                        })(
                            <RadioGroup>
                                <Radio value="鲜花">鲜花</Radio>
                                <Radio value="永生花">永生花</Radio>
                                <Radio value="果篮">果篮</Radio>
                            </RadioGroup>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="价格（元）"
                    >
                        {
                            getFieldDecorator('price', {
                                rules: [
                                    {
                                        pattern: /^\d+$/, message: '请输入数字！',
                                    },
                                    {
                                        required: true, message: 'Please select flower price!',
                                    }
                                ],
                            }
                            )(<Input />)
                        }
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="主材料"
                        hasFeedback
                    >
                        {getFieldDecorator('mainflower', {
                            rules: [
                                { required: true, message: 'Please select mainflower!' },
                            ],
                        })(
                            <RadioGroup>
                                <Radio value="白玫瑰">白玫瑰</Radio>
                                <Radio value="红玫瑰">红玫瑰</Radio>
                                <Radio value="蓝玫瑰">蓝玫瑰</Radio>
                                <Radio value="粉玫瑰">粉玫瑰</Radio>
                                <Radio value="紫玫瑰">紫玫瑰</Radio>
                                <Radio value="香槟玫瑰">香槟玫瑰</Radio>
                                <Radio value="向日葵">向日葵</Radio>
                                <Radio value="香水百合">香水百合</Radio>
                                <Radio value="混搭">混搭</Radio>
                            </RadioGroup>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="颜色"
                        hasFeedback
                    >
                        {getFieldDecorator('color', {
                            rules: [
                                { required: true, message: 'Please select color!' },
                            ],
                        })(
                            <RadioGroup>
                                <Radio value="白色">白色</Radio>
                                <Radio value="红色">红色</Radio>
                                <Radio value="蓝色">蓝色</Radio>
                                <Radio value="粉色">粉色</Radio>
                                <Radio value="紫色">紫色</Radio>
                                <Radio value="香槟色">香槟色</Radio>
                                <Radio value="金色">金色</Radio>
                                <Radio value="多色">多色</Radio>
                            </RadioGroup>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="其他材料"
                    >
                        {getFieldDecorator('others', {
                            rules: [{
                                pattern: /^.{1,100}$/, message: '请输入小于100个字的材料描述！',
                            },
                                { required: true, message: 'Please input other materials!', whitespace: true }],
                        })(
                            <TextArea rows={2} />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="花语"
                    >
                        {getFieldDecorator('words', {
                            rules: [{
                                pattern: /^.{1,100}$/, message: '请输入小于100个字的花语描述！',
                            },
                                { required: true, message: 'Please input flower words!', whitespace: true }],
                        })(
                            <TextArea rows={2} />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="包装"
                    >
                        {getFieldDecorator('package', {
                            rules: [{
                                pattern: /^.{1,100}$/, message: '请输入小于100个字的包装描述！',
                            },
                                { required: true, message: 'Please input flower package!', whitespace: true }],
                        })(
                            <TextArea rows={2} />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="送花对象"
                        hasFeedback
                    >
                        {getFieldDecorator('sendObject', {
                            rules: [
                                { required: true, message: 'Please select sendObject!' },
                            ],
                        })(
                            < Select mode = "multiple" placeholder = "请选择送花对象（可多选）" >
                                <Option value="朋友">朋友</Option>
                                <Option value="家人">家人</Option>
                                <Option value="爱人">爱人</Option>
                                <Option value="领导">领导</Option>
                                <Option value="病人">病人</Option>
                            </Select>
                                    )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="鲜花用途"
                        hasFeedback
                    >
                        {getFieldDecorator('purpose', {
                            rules: [
                                { required: true, message: 'Please select color!' },
                            ],
                        })(
                            < Select mode="multiple" placeholder="请选择鲜花用途（可多选）" >
                                <Option value="浪漫爱情">浪漫爱情</Option>
                                <Option value="生日祝福">生日祝福</Option>
                                <Option value="友谊万岁">友谊万岁</Option>
                                <Option value="诚意致歉">诚意致歉</Option>
                                <Option value="温暖亲情">温暖亲情</Option>
                            </Select>
                        )}
                    </FormItem>                                      
                </Form>
            </div>
        )
    }
}

