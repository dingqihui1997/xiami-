import React, { useState } from 'react'
import styles from '../index.css'
import { Card, Cascader, TreeSelect, Select, Switch, Input, Form, Upload, Button, Image } from 'antd';
interface props {
    data: any,
    confirm: (value: any) => void
    back: (num: number) => void
}
const basics = (props: props) => {
    const [form] = Form.useForm();//
    const { TreeNode } = TreeSelect;
    const { Option } = Select;
    const [value, setValue] = useState(undefined);
    let [src, setsrc] = useState('')
    let onPreview = async (file: any) => {//点击预览图片 
        // if (file.file.status === "done") {
        //     let src1 = file.file.response.data;
        //     if (src1) {
        //         setsrc(src1)
        //     }
        // }
        console.log(file);
    }
    let onFinish = () => {//表单验证成功
        let values = form.getFieldsValue()
        props.confirm(values)
    }
    let back = () => {
        props.back(0)
        form.resetFields()
    }
    let onChange = (e: any) => {
        console.log(e);
    }
    return (
        <div className={`${styles.basics}`}>
            <Form
                form={form}
                preserve={false}
                onFinish={onFinish}
            >
                <Form.Item
                    label="商品名称"
                    name="name"
                    rules={[{ required: true, message: '商品名称为必传项' }]}
                >
                    <Input placeholder="请输入商品名称" />
                </Form.Item>
                <Form.Item
                    label="商品分类"
                    name="category"
                    rules={[{ required: true, message: '商品分类为必传项' }]}
                >
                    <Cascader options={props.data} onChange={onChange} placeholder="Please select" />
                </Form.Item>
                <Form.Item
                    label="商品原价"
                    name="originalPrice"
                    rules={[{ required: true, message: '商品原价为必传项' }]}
                >
                    <Input placeholder="请输入商品原价" />
                </Form.Item>
                <Form.Item
                    label="商品现价"
                    name="presentPrice"
                    rules={[{ required: true, message: '商品现价为必传项' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    className="mal10"
                    label="封面图"
                    name="cover"
                    rules={[{ required: true, message: '图片为必传项' }]}
                >
                    <Upload maxCount={1} className="mal20" headers={{ Authorization: localStorage.getItem('token')! }} action="http://localhost:7001/admin/upload" listType="picture" onChange={onPreview}>
                        <div className={`${styles.upload}`}>点击上传图片</div>

                    </Upload>
                </Form.Item>

                <Form.Item
                    label="商品单位"
                    name="company"
                    rules={[{ required: true, message: '商品单位为必传项' }]}
                >
                    <Input placeholder="请输入商品单位" />
                </Form.Item>
                <Form.Item
                    label="商品库存"
                    name="stock"
                    rules={[{ required: true, message: '商品库存为必传项' }]}
                >
                    <Input placeholder="请输入商品库存" />
                </Form.Item>
                <Form.Item
                    label="商品简介"
                    name="introduction"
                    rules={[{ required: true, message: '商品简介为必传项' }]}
                >
                    <Input.TextArea rows={5} placeholder="请输入商品简介" />
                </Form.Item>
                <Form.Item
                    label="推荐介绍"
                    name="sellDesc"
                    rules={[{ required: true, message: '推荐介绍为必传项' }]}
                >
                    <Input.TextArea rows={5} placeholder="请输入推荐介绍" />
                </Form.Item>
                <Form.Item
                    className="mal10"
                    label="是否新品"
                    name="isNewGood"
                    valuePropName="checked"
                    initialValue
                >
                    <Switch defaultChecked></Switch>
                </Form.Item>
                <Form.Item
                    className="mal10"
                    label="是否热销"
                    name="isHot"
                    valuePropName="checked"
                    initialValue
                >
                    <Switch defaultChecked></Switch>
                </Form.Item>
                <Form.Item
                    className="mal10"
                    label="是否推荐"
                    name="isRecommend"
                    valuePropName="checked"
                    initialValue
                >
                    <Switch defaultChecked></Switch>
                </Form.Item>
                <Form.Item>
                    <Button className="mar15" onClick={back}>取消</Button>
                    <Button type="primary" htmlType="submit">确认</Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default basics
