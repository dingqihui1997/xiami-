import React, { useEffect } from 'react'
import { Card, Button, Modal, Input, Form, Upload } from 'antd';
import { UploadOutlined, LockOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'umi';
import style from '../index.css'
interface props {
    visible: boolean
    modify: () => void //关闭弹窗
    addok: (value: any) => void //点击确定添加
    data: any
}
const AddRotation = (props: props) => {
    const [flag, setflag] = React.useState(false);
    let [src, setsrc] = React.useState('')
    const [form] = Form.useForm();//
    const [title, settitle] = React.useState('')
    const [link, setlink] = React.useState('')
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
    // console.log(props.num);
    const handleOk = () => {//点击确认添加
        let value = form.getFieldsValue()
        props.addok(value)
    };
    let [initialValues, setinitialValues] = React.useState<any>({})
    useEffect(() => {
        if (props.data) {
            console.log(props.data);
            setinitialValues(props.data)
        }
    }, [props.data])
    // defaultFileList: [
    //     {
    //         uid: '1',
    //         name: 'xxx.png',
    //         status: 'done',
    //         response: 'Server Error 500', // custom error message to show
    //         url: 'http://www.baidu.com/xxx.png',
    //     },]

    let onCancel = () => {
        props.modify()
        setinitialValues({})
    }
    return (
        <div>
            <Card>
                {initialValues.url}aaa
                <Modal
                    title={props.data ? '编辑轮播图' : '添加轮播图'}
                    visible={props.visible}
                    onOk={handleOk}
                    onCancel={onCancel}
                    okText="确定" cancelText="取消"
                >
                    <Form
                        form={form}
                        initialValues={initialValues}
                    >
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
                        // initialValue={props.data ? props.data.title : title}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="图片链接"
                            name="link"
                        // initialValue={props.data ? props.data.link : link}
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
