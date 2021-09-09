import React, { useState, useEffect } from 'react'
import { Card, Button, message, Switch, Input, Form, Table, Modal, Upload, Image } from 'antd';
import style from '../index.less';
import { useSelector, useDispatch, } from 'umi';

const Navigation = () => {
    let Nav = useSelector((state: any) => state.Nav.Nav)
    let dispatch = useDispatch()
    const { Search } = Input;
    const [value, setvalue] = React.useState('')
    const [visible, setVisible] = React.useState(false);
    const [form] = Form.useForm();//
    let [url, seturl] = useState('')//预览图
    const [current, setcurrent] = React.useState(1)
    const [pageSize, setpageSize] = React.useState(5)
    const onSearch = (e: any) => {
    };//输入框的值
    let add = () => {//添加轮播图按钮
        setVisible(true)
    }
    let onCancel = () => {//取消按钮
        setVisible(false)
    }
    let handleOk = () => {//欧克按钮
        let values = form.getFieldsValue()
        if (values && url) {
            dispatch({
                type: 'Nav/addNav',
                payload: { title: values.title, url: url }
            })
            setVisible(false)
        } else {
            message.error('请上传完整信息')
        }

    }
    let onPreview = async (file: any) => {//点击预览图片 
        // let src1 = file.url;
        // if (!src1) {
        //     src1 = await new Promise(resolve => {
        //         const reader = new FileReader();
        //         reader.readAsDataURL(file.originFileObj);
        //         reader.onload = () => resolve(reader.result);
        //     });
        // }
        // // setflag(true)
        // seturl(src1)
    }
    let onchange = (info: any) => {//图片预览
        if (info.file.status === 'done') {
            console.log(info);
            seturl(info.file.response.data)
        }
    }
    useEffect(() => {
        getdata()
        console.log(Nav);
    }, [Nav])
    let getdata = () => {
        dispatch({
            type: 'Nav/getNav',
            payload: { current: current, pageSize: pageSize, query: value }
        })
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
                            rules={[{ required: true, message: '标题不能为空' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Form>
                </Modal>
                {/* <Table columns={columns} dataSource={list.data && list.data} rowKey="_id" /> */}
            </Card>
        </div>
    )
}

export default Navigation
