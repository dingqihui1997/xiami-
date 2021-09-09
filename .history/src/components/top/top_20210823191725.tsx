import React from 'react'
import { UserOutlined } from '@ant-design/icons'
import style from '../index.css'
const Top = () => {
    let user = JSON.parse(localStorage.getItem('user')!)
    return (
        <div className="flex-end" style={{ height: '100%' }}>
            <div> <iframe width="235" height="18" frameBorder="0" scrolling="no" src="https://i.tianqi.com/?c=code&id=10"></iframe></div>
            <div className={`${style.Outlined} flex-ja`}><UserOutlined style={{ color: '#ffffff' }} /></div>
            <div className="mal10">{user.username}</div>
        </div >
    )
}

export default Top
