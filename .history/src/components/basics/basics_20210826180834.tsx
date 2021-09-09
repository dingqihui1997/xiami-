import React from 'react'
import styles from '../index.css'
import { Card, message, Modal, Input, Form, Upload } from 'antd';
const basics = () => {
    const [form] = Form.useForm();//
    return (
        <div className={`${styles.basics}`}>
            <Form
                form={form}
                preserve={false}
            >
                <Form.Item
                    className="mar-l15"
                    label="图片地址"
                    name="url"
                    rules={[{ required: true, message: '图片为必传项' }]}
                >
                    <Upload name="logo" headers={{ Authorization: localStorage.getItem('token')! }} action="http://localhost:7001/admin/upload" listType="picture" onPreview={onPreview}>
                        <div className={`${styles.upload}`}>点击上传图片</div>
                    </Upload>
                </Form.Item>

                <Form.Item
                    label="图片标题"
                    name="title"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="图片链接"
                    name="link"
                >
                    <Input />
                </Form.Item>
            </Form>
        </div>
    )
}

export default basics
