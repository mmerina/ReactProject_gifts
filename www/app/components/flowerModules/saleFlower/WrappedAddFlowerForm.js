import React from 'react';
import { Form } from "antd";
import FlowerForm from "./FlowerForm";

export default Form.create({
    onFieldsChange(props, changedFields) {
        props.onChange(changedFields);
    },
    mapPropsToFields(props) {
        return {
            name: Form.createFormField({
                ...props.name,
                value: props.name.value
            }),
            type: Form.createFormField({
                ...props.type,
                value: props.type.value
            }),
            price: Form.createFormField({
                ...props.price,
                value: props.price.value
            }),
            amount: Form.createFormField({
                ...props.amount,
                value: props.amount.value
            }),
            mainflower: Form.createFormField({
                ...props.mainflower,
                value: props.mainflower.value
            }),
            color: Form.createFormField({
                ...props.color,
                value: props.color.value
            }),
            others: Form.createFormField({
                ...props.others,
                value: props.others.value
            }),
            words: Form.createFormField({
                ...props.words,
                value: props.words.value
            }),
            package: Form.createFormField({
                ...props.package,
                value: props.package.value
            }),
            sendObject: Form.createFormField({
                ...props.sendObject,
                value: props.sendObject.value
            }),
            purpose: Form.createFormField({
                ...props.purpose,
                value: props.purpose.value
            })
        };
    }
})(FlowerForm);