import React from 'react'
import style from '../index.less'
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
const login = () => {
    const onFinish = (values: any) => {
        console.log(values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div className={`middlecenter ${style.homebox} flex-dji`}>
            <div className="flex-ja font22 font-w7">小米Life</div>
            <div className="a0a0 mart20">欢迎来到小米lite后台管理系统</div>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input placeholder="请输入用户名" prefix={<UserOutlined />} style={{ width: 450, }} />
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password placeholder="请输入密码" prefix={<LockOutlined />} style={{ width: 450, }} />
                </Form.Item >

            </Form>
            <Button type="primary" style={{ width: 450 }} onClick={onFinish}>登录</Button>
        </div >
    )
}

export default login
