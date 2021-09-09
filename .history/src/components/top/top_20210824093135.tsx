import React, { useState } from 'react'
import { UserOutlined } from '@ant-design/icons'
import style from '../index.css'
import { Menu, Dropdown, Modal, Space } from 'antd';
const Top = () => {
    let user = JSON.parse(localStorage.getItem('user')!)
    const menu = (<Menu onClick={() => { setIsModalVisible(true) }}> <Menu.Item>退出登录</Menu.Item></Menu>)
    const [isModalVisible, setIsModalVisible] = useState(false);
    const handleOk = () => {
        setIsModalVisible(false);
    };
    return (
        <div className="flex-end" style={{ height: '100%' }}>
            <div> <iframe width="235" height="18" frameBorder="0" scrolling="no" src="https://i.tianqi.com/?c=code&id=10"></iframe></div>

            <Dropdown overlay={menu} placement="bottomLeft">
                <div className="flex-ja"><div className={`${style.Outlined} flex-ja`}><UserOutlined style={{ color: '#ffffff' }} /></div>
                    <div className="mal10">{user.username}</div></div>
            </Dropdown>
            <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={() => { setIsModalVisible(false); }}>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>
        </div >
    )
}

export default Top
