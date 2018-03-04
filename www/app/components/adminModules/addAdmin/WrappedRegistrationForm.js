import React from 'react';
import { Form } from "antd";
import MyForm from "./MyForm";

export default Form.create({
    onFieldsChange(props, changedFields) {
        props.onChange(changedFields);
    },
    mapPropsToFields(props) {
        return {
            id: Form.createFormField({
                ...props.id,
                value: props.id.value
            }),
            password: Form.createFormField({
                ...props.password,
                value: props.password.value
            }),
            confirm: Form.createFormField({
                ...props.confirm,
                value: props.confirm.value
            }),
            sex: Form.createFormField({
                ...props.sex,
                value: props.sex.value
            }),
            apartment: Form.createFormField({
                ...props.apartment,
                value: props.apartment.value
            }),
            mobile: Form.createFormField({
                ...props.mobile,
                value: props.mobile.value
            }),
            email: Form.createFormField({
                ...props.email,
                value: props.email.value
            }),
            name: Form.createFormField({
                ...props.name,
                value: props.name.value
            })
        };
    }
})(MyForm);