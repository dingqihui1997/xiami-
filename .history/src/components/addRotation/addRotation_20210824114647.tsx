import React from 'react'
import { Card, Button, Modal, Input, Form, Upload } from 'antd';
import { UploadOutlined, LockOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'umi';
import style from '../index.css'
interface props {
    visible: boolean
    modify: () => void //关闭弹窗
    addok: (value: any) => void //点击确定添加
}
const AddRotation = (props: props) => {
    let user = useSelector((state: any) => state.login.user)
    let dispatch = useDispatch()
    const { Search } = Input;
    const onSearch = (value: any) => console.log(value);
    const [visible, setVisible] = React.useState(false);
    const [flag, setflag] = React.useState(false);
    const token = localStorage.getItem('token')
    let [src, setsrc] = React.useState('')
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
    const handleOk = (e: any) => {//点击确认添加
        let value = form.getFieldsValue()
        props.addok(value)
    };
    return (
        <div>
            <Card>
                <Modal
                    title="添加轮播图"
                    visible={props.visible}
                    onOk={handleOk}
                    onCancel={() => { props.modify() }}
                >
                    <Form
                        form={form}
                    >
                        <Form.Item
                            className="mar-l15"
                            label="图片地址"
                            name="url"
                            rules={[{ required: true, message: '图片为必传项' }]}
                        >
                            <Upload name="logo" headers={{ 'Authorization': localStorage.getItem('token')! }} action="api/admin/upload" listType="picture" onPreview={onPreview}>
                                <div className={`${style.upload}`}>点击上传图片</div>
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
                </Modal>
                <Modal title="预览图片" visible={flag} footer={null} onCancel={() => { setflag(false) }}>
                    <img src={src} style={{ width: '100%' }} />
                </Modal>
            </Card>
        </div>
    )
}

export default AddRotation
