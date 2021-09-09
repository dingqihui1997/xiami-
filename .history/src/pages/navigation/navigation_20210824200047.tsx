import React, { useState } from 'react'
import { Card, Button, Switch, Input, Form, Table, Modal, Upload, Image } from 'antd';
import style from '../index.less';
const Navigation = () => {
    const { Search } = Input;
    const [value, setvalue] = React.useState('')
    const [visible, setVisible] = React.useState(false);
    const [form] = Form.useForm();//
    let [url, seturl] = useState('')//预览图
    const onSearch = (e: any) => {
    };//输入框的值
    let add = () => {//添加轮播图按钮
        setVisible(true)
    }
    let onCancel = () => {//取消按钮

    }
    let handleOk = () => {//欧克按钮

    }
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
        seturl(src1)
    }
    let onchange = (info: any) => {//图片预览
        if (info.file.status === 'done') {
            // console.log(info);
            seturl(info.file.response.data)
        }
    }

    return (
        <div>
            <Card>
                <Search placeholder="请输入" onSearch={onSearch} style={{ width: 300 }} />
                <Button type="primary" style={{ marginLeft: 20 }} onClick={add}>添加导航</Button>
                <Modal visible={visible} title="添加导航" onOk={handleOk}
                    onCancel={onCancel}
                    okText="确定" cancelText="取消">
                    <Form
                        form={form}
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
                        >
                            <Input />
                        </Form.Item>
                    </Form>
                </Modal>
            </Card>
        </div>
    )
}

export default Navigation
