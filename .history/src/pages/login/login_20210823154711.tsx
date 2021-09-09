import React from 'react'
import style from '../index.less'
import { Form, Input, Button, Checkbox } from 'antd';
const login = () => {
    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div className={`middlecenter ${style.homebox} flex-di`}>
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
                <div className={`${style.fromname}`}> <Form.Item
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item></div>

                <div className={`${style.fromname}`}>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>
                </div>
            </Form>
        </div>
    )
}

export default login
