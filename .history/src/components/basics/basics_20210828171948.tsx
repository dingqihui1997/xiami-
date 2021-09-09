import React, { useState, useEffect } from 'react'
import styles from '../index.css'
import { Card, Cascader, TreeSelect, Select, Switch, Input, Form, Upload, Button, Image } from 'antd';
interface props {
    data: any,//商品分类选择数据
    confirm: (value: any) => void
    back: (num: number) => void
    record: any //编辑item
}
const basics = (props: props) => {
    const [form] = Form.useForm();//
    const { TreeNode } = TreeSelect;
    const { Option } = Select;
    const [value, setValue] = useState(undefined);
    let [src, setsrc] = useState('')
    let onPreview = async (file: any) => {//点击预览图片 
        if (file.file.status === "done") {
            let src1 = file.file.response.data;
            if (src1) {
                setsrc(src1)
            }
        }
    }
    let onFinish = () => {//表单验证成功
        let values = form.getFieldsValue()
        props.confirm(values)
    }
    let back = () => {//取消
        props.back(0)
        form.resetFields()
    }
    useEffect(() => {
        // if (props.record) {
        //     form.setFieldsValue()
        // }
    }, [])
    const normFile = (e: any) => {//图片
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };
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
                    initialValue={props.record ? props.record.name : ''}
                >
                    <Input placeholder="请输入商品名称" />
                </Form.Item>
                <Form.Item
                    label="商品分类"
                    name="category"
                    rules={[{ required: true, message: '商品分类为必传项' }]}
                >
                    <Cascader options={props.data} placeholder="Please select" />
                </Form.Item>
                <Form.Item
                    label="商品原价"
                    name="originalPrice"
                    rules={[{ required: true, message: '商品原价为必传项' }]}
                    initialValue={props.record ? props.record.originalPrice : ''}
                >
                    <Input placeholder="请输入商品原价" />
                </Form.Item>
                <Form.Item
                    label="商品现价"
                    name="presentPrice"
                    rules={[{ required: true, message: '商品现价为必传项' }]}
                    initialValue={props.record ? props.record.presentPrice : ''}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    className="mal10"
                    label="封面图"
                    name="cover"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                    rules={[{ required: true, message: '图片为必传项' }]}
                >
                    <Upload showUploadList={false} maxCount={1} className="mal20" headers={{ Authorization: localStorage.getItem('token')! }} action="http://localhost:7001/admin/upload" listType="picture" onChange={onPreview}>
                        <div className={`${styles.upload}`}>点击上传图片</div>
                        <Image src={src} width={200}></Image>
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
