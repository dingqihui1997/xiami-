import React from 'react'
import { UserOutlined } from '@ant-design/icons'
import style from '../index.css'
import { Menu, Dropdown, Button, Space } from 'antd';
const Top = () => {
    let user = JSON.parse(localStorage.getItem('user')!)
    const menu = (<Menu> <Menu.Item>退出登录</Menu.Item></Menu>)
    return (
        <div className="flex-end" style={{ height: '100%' }}>
            <div> <iframe width="235" height="18" frameBorder="0" scrolling="no" src="https://i.tianqi.com/?c=code&id=10"></iframe></div>
            <Space wrap>
                <Dropdown overlay={menu} placement="bottomLeft">
                    <div><div className={`${style.Outlined} flex-ja`}><UserOutlined style={{ color: '#ffffff' }} /></div>
                        <div className="mal10">{user.username}</div></div>
                </Dropdown>
            </Space>
        </div >
    )
}

export default Top
