import React from 'react'
import { Card, Button, Switch, Input, Form, Table, Modal, Upload } from 'antd';
import style from '../index.less';
const Navigation = () => {
    const { Search } = Input;
    const [value, setvalue] = React.useState('')
    const [visible, setVisible] = React.useState(false);
    const [form] = Form.useForm();//
    const onSearch = (e: any) => {
    };//输入框的值
    let add = () => {//添加轮播图按钮
        setVisible(true)
    }
    let onCancel = () => {//取消按钮

    }
    let handleOk = () => {//欧克按钮

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
                            <Upload name="logo" headers={{ Authorization: localStorage.getItem('token')! }} action="http://localhost:7001/admin/upload" listType="picture" onPreview={onPreview}>
                                <div className={`${style.upload}`}>点击上传图片</div>
                            </Upload>
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
