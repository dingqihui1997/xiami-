import React, { useState } from 'react'
import {
    UserOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
} from '@ant-design/icons'
import style from '../index.css'
import { Menu, Dropdown, Modal, Space } from 'antd';
import { useHistory } from 'umi';
const Top = () => {
    let history = useHistory()
    let user = JSON.parse(localStorage.getItem('user')!)
    const menu = (<Menu > <Menu.Item onClick={() => { setIsModalVisible(true) }}>退出登录</Menu.Item></Menu>)
    const menu2 = (<Menu > <Menu.Item onClick={() => { locales }}>
        <div>简体中文</div>
        <div>繁体</div>
        <div>英文</div>
    </Menu.Item></Menu>)
    const [isModalVisible, setIsModalVisible] = useState(false);
    const handleOk = () => {
        setIsModalVisible(false);
        history.push('/login')
        // localStorage.clear()
    };
    let locales = () => {//切换语言

    }
    return (
        <div className="flex-end" style={{ height: '100%' }}>
            <div> <iframe width="235" height="18" frameBorder="0" scrolling="no" src="https://i.tianqi.com/?c=code&id=10"></iframe></div>
            <Dropdown overlay={menu} placement="bottomLeft">
                <div className="flex-ja"><div className={`${style.Outlined} flex-ja`}><UserOutlined style={{ color: '#ffffff' }} /></div>
                    <div className="mal10">{user.username}</div></div>
            </Dropdown>
            <Modal title="退出系统" visible={isModalVisible} okText="确定" cancelText="取消" onOk={handleOk} onCancel={() => { setIsModalVisible(false); }}>
                <p>确定退出系统吗？</p>
            </Modal>
            <Dropdown overlay={menu2} placement="bottomLeft">
                <div className="flex-ja"><div className={`${style.Outlined} flex-ja`}><UserOutlined style={{ color: '#ffffff' }} /></div>
                    <div className="mal10">切换语言</div></div>
            </Dropdown>
        </div >
    )
}

export default Top
