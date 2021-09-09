import React, { useEffect } from 'react'
import { Card, Button, Modal, Input, Form, Upload } from 'antd';
import { UploadOutlined, LockOutlined } from '@ant-design/icons';
import { useSelector, useDispatch, } from 'umi';
import AddRotation from '../../components/addRotation/addRotation';
const Rotation = () => {
    // let user = useSelector((state: any) => state.login.user)
    let dispatch = useDispatch()
    const { Search } = Input;
    const [value, setvalue] = React.useState('')
    const onSearch = (e: any) => { console.log(e) };//输入框的值
    const [visible, setVisible] = React.useState(false);
    const [form] = Form.useForm();//
    let modify = () => { //关闭子组件弹框
        setVisible(false)
    }
    let addok = (e: any) => { //添加轮播图
        dispatch({
            type: 'ratation/getTopics',
            payload: { url: e.url.file.response.data, title: e.title, link: e.link }
        })
        setVisible(false)
    }
    useEffect(() => {
        dispatch({
            type: 'ratation/getTopics',
            payload: {}
        })
    }, [])
    return (
        <div>
            <Card>
                <Search placeholder="请输入" onSearch={onSearch} style={{ width: 300 }} />
                <Button type="primary" style={{ marginLeft: 20 }} onClick={() => { setVisible(true) }} >添加轮播图</Button>
                <AddRotation visible={visible} modify={modify} addok={addok}></AddRotation>
                {/* <Modal
                    title="添加轮播图"
                    visible={visible}
                    onOk={handleOk}
                    onCancel={() => { setVisible(false) }}
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
                </Modal> */}
            </Card>
        </div>
    )
}

export default Rotation
