import React, { Component } from 'react';
import { connect } from "dva";
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
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
                    value: '测试组',
                    label: '测试组',
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


class MyForm extends Component {
    constructor(props) {
        super(props);
        this.state={
            confirmDirty: false,
            autoCompleteResult: []
        }
    }

    handleSubmit(e){
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                $.post("/registeradmin", {
                    "values": JSON.stringify({
                        "id": values.id,
                        "name": values.name,
                        "apartment": values.apartment,
                        "phone": values.phone,
                        "email": values.email,
                        "password": values.password,
                        "sex": values.sex,
                        "icon": ""
                    })
                }, function (data) {
                    if (data.result == 1) {
                        console.log("注册成功！");
                    }
                }); 
            }
        });
    }
    handleConfirmBlur(e){
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }
    checkPassword(rule, value, callback) {

        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    }
    checkConfirm  (rule, value, callback)  {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { autoCompleteResult } = this.state;

        const formItemLayout = {
            labelCol: {
                xs: { span: 14 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 14 },
                sm: { span: 8 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };
        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '86',
        })(
            <Select style={{ width: 70 }}>
                <Option value="86">+86</Option>
                <Option value="87">+87</Option>
            </Select>
        );

        const websiteOptions = autoCompleteResult.map(website => (
            <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
        ));
        return (
            <div>
                <Form onSubmit={this.handleSubmit.bind(this)}>
                    <FormItem
                        {...formItemLayout}
                        label={(
                            <span>
                                id&nbsp;
                                    <Tooltip title="请填写1~3位的id">
                                    <Icon type="question-circle-o" />
                                </Tooltip>
                            </span>
                        )}
                    >
                        {getFieldDecorator('id', {
                            rules: [{
                                pattern: /^\d{1,3}$/, message: 'The input is not valid id!',
                            }, {
                                    required: true, message: 'Please input your id!',
                            }],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="邮箱"
                    >
                        {getFieldDecorator('email', {
                            rules: [{
                                type: 'email', message: 'The input is not valid E-mail!',
                            }, {
                                required: true, message: 'Please input your E-mail!',
                            }],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="密码"
                    >
                        {getFieldDecorator('password', {
                            rules: [{
                                required: true, message: 'Please input your password!',
                            }, {
                                    validator: this.checkConfirm.bind(this),
                            }],
                        })(
                            <Input type="password" />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="确认密码"
                    >
                        {getFieldDecorator('confirm', {
                            rules: [{
                                required: true, message: 'Please confirm your password!',
                            }, {
                                    validator: this.checkPassword.bind(this),
                            }],
                        })(
                            <Input type="password" onBlur={this.handleConfirmBlur.bind(this)} />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label={(
                            <span>
                                姓名&nbsp;
                                    <Tooltip title="请务必填写真实姓名">
                                    <Icon type="question-circle-o" />
                                </Tooltip>
                            </span>
                        )}
                    >
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: 'Please input your name!', whitespace: true }],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="性别"
                        hasFeedback
                    >
                        {getFieldDecorator('sex', {
                            rules: [
                                { required: true, message: 'Please select your sex!' },
                            ],
                        })(
                            <Select placeholder="请选择性别">
                                <Option value="女">女</Option>
                                <Option value="男">男</Option>
                            </Select>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="部门"
                    >
                        {getFieldDecorator('apartment', {
                            initialValue: ['技术中心', '开发部', '用户组'],
                            rules: [{ type: 'array', required: true, message: 'Please select your apartment!' }],
                        })(
                            <Cascader options={apartment} />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="手机号"
                    >
                        {getFieldDecorator('phone', {
                            rules: [{ required: true, message: 'Please input your phone number!' }],
                        })(
                            <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
                        )}
                    </FormItem>
                    <FormItem {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">注册管理员</Button>
                    </FormItem>
                    
                </Form>
    );
            </div>
        )
    }
}
const WrappedRegistrationForm = Form.create()(MyForm);
export default WrappedRegistrationForm;
