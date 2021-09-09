import React, { useEffect } from 'react'
import style from '../index.less'
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'umi';
const login = () => {
    let user = useSelector((state: any) => state.login.user)
    let dispatch = useDispatch()
    let onFinish = (e: any) => {//表单验证
        console.log(e);
        dispatch({
            type: 'login/getUser',
            payload: e
        })
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
            >
                <Form.Item
                    name="username"
                    rules={[{ required: true, message: '用户名不能为空' }]}
                >
                    <Input placeholder="请输入用户名" prefix={<UserOutlined />} style={{ width: 450, }} />
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[{ required: true, message: '密码不能为空' }]}
                >
                    <Input.Password placeholder="请输入密码" prefix={<LockOutlined />} style={{ width: 450, }} />
                </Form.Item >
                <Button type="primary" style={{ width: 450 }} htmlType="submit" onClick={onFinish}>登录</Button>
            </Form>

        </div >
    )
}

export default login
