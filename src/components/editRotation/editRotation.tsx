import React, { useEffect, useState } from 'react'
import { Card, Button, Modal, Input, Form, Upload, Image } from 'antd';
import { UploadOutlined, LockOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'umi';
import style from '../index.css'
interface props {
    visible1: boolean
    modify1: () => void //关闭弹窗
    editok: (value: any, url: string) => void //点击确定编辑
    data: any
}
const EditRotation = (props: props) => {
    const [flag, setflag] = React.useState(false);
    let [src, setsrc] = React.useState('')
    const [title, settitle] = React.useState('')
    const [link, setlink] = React.useState('')
    const [form] = Form.useForm();//
    let [url, seturl] = useState('')//预览图
    // console.log(url);
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
        props.editok(value, url)
        console.log(value);
    };
    useEffect(() => {
        if (props.data) {
            seturl(props.data.url)
        }
    }, [props.data])
    let onCancel = () => {//点击取消
        props.modify1()
    }
    let onchange = (info: any) => {
        if (info.file.status === 'done') {
            // console.log(info);
            seturl(info.file.response.data)
        }
    }
    return (
        <div>
            <Modal
                title={'编辑轮播图'}
                visible={props.visible1}
                onOk={handleOk}
                onCancel={onCancel}
                okText="确定" cancelText="取消"
                destroyOnClose={true}
            >
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
                        <Upload onChange={onchange} showUploadList={false} name="logo" headers={{ Authorization: localStorage.getItem('token')! }} action="http://localhost:7001/admin/upload" listType="picture" onPreview={onPreview}>
                            <div className={`${style.upload}`}>点击上传图片</div>
                        </Upload>
                        <div>
                            <Image
                                width="200"
                                src={url}
                            />
                        </div>
                    </Form.Item>
                    <Form.Item
                        label="图片标题"
                        name="title"
                        initialValue={props.data ? props.data.title : title}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="图片链接"
                        name="link"
                        initialValue={props.data ? props.data.link : link}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
            <Modal title="预览图片" visible={flag} footer={null} onCancel={() => { setflag(false) }}>
                <img src={src} style={{ width: '100%' }} />
            </Modal>
        </div>
    )
}

export default EditRotation
