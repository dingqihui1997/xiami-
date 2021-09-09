import React from 'react'
import { Card, Button, Modal, Input, Form } from 'antd';
const Rotation = () => {
    const { Search } = Input;
    const onSearch = (value: any) => console.log(value);
    const [visible, setVisible] = React.useState(false);
    const handleOk = (e: any) => {//点击确认添加
    };
    const onFinish = (values: any) => {
        console.log('Success:', values);
    };
    return (
        <div>
            <Card>
                <Search placeholder="请输入" onSearch={onSearch} style={{ width: 300 }} />
                <Button type="primary" style={{ marginLeft: 20 }} onClick={() => { setVisible(true) }}>添加轮播图</Button>
                <Modal
                    title="添加轮播图"
                    visible={visible}
                    onOk={handleOk}
                    onCancel={() => { setVisible(false) }}
                >
                    <Form
                        onFinish={onFinish}
                    >
                        <Form.Item
                            label="图片地址"
                            name="username"
                            rules={[{ required: true, message: '图片为必传项' }]}
                        >
                            点击上传图片
                        </Form.Item>

                        <Form.Item
                            label="图片标题"
                            name="password"
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
            </Card>
        </div>
    )
}

export default Rotation
