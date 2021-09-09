import React from 'react'
import styles from '../index.css'
import { Card, message, Modal, Input, Form, Upload } from 'antd';
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
                    name="title"
                    rules={[{ required: true, message: '图片为必传项' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="商品分类"
                    name="title"
                    rules={[{ required: true, message: '图片为必传项' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="商品原价"
                    name="title"
                    rules={[{ required: true, message: '图片为必传项' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="商品现价"
                    name="title"
                    rules={[{ required: true, message: '图片为必传项' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    className="mar-l15"
                    label="封面图"
                    name="url"
                    rules={[{ required: true, message: '图片为必传项' }]}
                >
                    <Upload name="logo" headers={{ Authorization: localStorage.getItem('token')! }} action="http://localhost:7001/admin/upload" listType="picture" onPreview={onPreview}>
                        <div className={`${styles.upload}`}>点击上传图片</div>
                    </Upload>
                </Form.Item>

                <Form.Item
                    label="商品单位"
                    name="title"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="商品库存"
                    name="link"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="商品简介"
                    name="link"
                >
                    <Input.TextArea />
                </Form.Item>
                <Form.Item
                    label="推荐介绍"
                    name="link"
                >
                    <Input.TextArea />
                </Form.Item>
            </Form>
        </div>
    )
}

export default basics
