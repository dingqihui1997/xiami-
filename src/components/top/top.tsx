import React, { useState } from 'react'
import {
    UserOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
} from '@ant-design/icons'
import style from '../index.css'
import { Menu, Dropdown, Modal, Space } from 'antd';
import { useHistory } from 'umi';
import { setLocale } from 'umi';
const Top = () => {
    let history = useHistory()
    let user = JSON.parse(localStorage.getItem('user')!)
    const menu = (<Menu > <Menu.Item onClick={() => { setIsModalVisible(true) }}>退出登录</Menu.Item></Menu>)
    const menu2 = (<Menu > <Menu.Item>
        <div onClick={() => { locales(1) }}>简体中文</div>
        <div onClick={() => { locales(2) }}>繁体</div>
        <div onClick={() => { locales(3) }}>英文</div>
    </Menu.Item></Menu>)
    const [isModalVisible, setIsModalVisible] = useState(false);
    const handleOk = () => {
        setIsModalVisible(false);
        history.push('/login')
        // localStorage.clear()
    };
    let locales = (e: any) => {//切换语言
        if (e === 1) {
            setLocale('zh-CN', false);
        } else if (e === 2) {
            setLocale('zh-TW', false);
        } else {
            setLocale('en-US', false);
        }
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
                <div className="flex-ja">
                    <div className="mal10">切换语言</div></div>
            </Dropdown>
        </div >
    )
}

export default Top
