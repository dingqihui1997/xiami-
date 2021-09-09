import React from 'react'
import styles from '../index.css'
import { Card, message, Switch, Input, Form, Upload, Button } from 'antd';
import { type } from './../../.umi/plugin-model/Provider';
const basics = () => {
    const [form] = Form.useForm();//
    let onPreview = async (file: any) => {//点击预览图片 
        let src1 = file.url;
        if (!src1) {
            src1 = await new Promise(resolve => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);
                reader.onload = () => resolve(reader.result);
            });
        }
        // setflag(true)
        // setsrc(src1)
    }
    return (
        <div className={`${styles.basics}`}>
            <Form
                form={form}
                preserve={false}
            >
                <Form.Item
                    label="商品名称"
                    name="name"
                    rules={[{ required: true, message: '商品名称为必传项' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="商品分类"
                    name="category"
                    rules={[{ required: true, message: '商品分类为必传项' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="商品原价"
                    name="originalPrice"
                    rules={[{ required: true, message: '商品原价为必传项' }]}
                >
                    <Input />
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
                    <Upload className="mal20" name="logo" headers={{ Authorization: localStorage.getItem('token')! }} action="http://localhost:7001/admin/upload" listType="picture" onPreview={onPreview}>
                        <div className={`${styles.upload}`}>点击上传图片</div>
                    </Upload>
                </Form.Item>

                <Form.Item
                    label="商品单位"
                    name="company"
                    rules={[{ required: true, message: '商品单位为必传项' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="商品库存"
                    name="stock"
                    rules={[{ required: true, message: '商品库存为必传项' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="商品简介"
                    name="introduction"
                    rules={[{ required: true, message: '商品简介为必传项' }]}
                >
                    <Input.TextArea />
                </Form.Item>
                <Form.Item
                    label="推荐介绍"
                    name="sellDesc"
                    rules={[{ required: true, message: '推荐介绍为必传项' }]}
                >
                    <Input.TextArea />
                </Form.Item>
                <Form.Item
                    className="mal10"
                    label="是否新品"
                    name="isNewGood"
                >
                    <Switch defaultChecked></Switch>
                </Form.Item>
                <Form.Item
                    className="mal10"
                    label="是否热销"
                    name="isHot"
                >
                    <Switch defaultChecked={true}></Switch>
                </Form.Item>
                <Form.Item
                    className="mal10"
                    label="是否推荐"
                    name="isRecommend"
                >
                    <Switch defaultChecked></Switch>
                </Form.Item>
                <Form.Item>
                    <Button className="mar15">取消</Button>
                    <Button type="primary">确认</Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default basics