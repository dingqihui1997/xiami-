import React, { useEffect } from 'react'
import { Card, Button, Modal, Input, Form, Upload } from 'antd';
import { UploadOutlined, LockOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'umi';
import style from '../index.css'
interface props {
    visible1: boolean
    modify1: () => void //关闭弹窗
    editok: (value: any) => void //点击确定添加
    data: any
}
const EditRotation = (props: props) => {
    const [flag, setflag] = React.useState(false);
    let [src, setsrc] = React.useState('')
    const [title, settitle] = React.useState('')
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
        setflag(true)
        setsrc(src1)
    }
    const handleOk = () => {//点击确认添加
        let value = form.getFieldsValue()
        props.editok(value)
    };

    let onCancel = () => {
        props.modify1()
    }
    return (
        <div>
            <Card>
                <Modal
                    title={'编辑轮播图'}
                    visible={props.visible1}
                    onOk={handleOk}
                    onCancel={onCancel}
                    okText="确定" cancelText="取消"
                >
                    <Form
                        form={form}
                    >
                        {props.data}
                        <Form.Item
                            className="mar-l15"
                            label="图片地址"
                            name="url"
                            rules={[{ required: true, message: '图片为必传项' }]}
                        >
                            <Upload name="logo" headers={{ Authorization: localStorage.getItem('token')! }} action="http://localhost:7001/admin/upload" listType="picture" onPreview={onPreview}>
                                <div className={`${style.upload}`}>点击上传图片</div>
                            </Upload>
                        </Form.Item>
                        <Form.Item
                            label="图片标题"
                            name="title"
                            initialValue={props.data && props.data.title}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="图片链接"
                            name="link"
                            initialValue={props.data && props.data.link}
                        >
                            <Input />
                        </Form.Item>
                    </Form>
                </Modal>
                <Modal title="预览图片" visible={flag} footer={null} onCancel={() => { setflag(false) }}>
                    <img src={src} style={{ width: '100%' }} />
                </Modal>
            </Card>
        </div>
    )
}

export default EditRotation
