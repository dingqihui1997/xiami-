import React from 'react'
import { UserOutlined } from '@ant-design/icons'

const Top = () => {
    return (
        <div className="flex-end" style={{ height: '100%' }}>
            <div> <iframe width="235" height="18" frameBorder="0" scrolling="no" src="https://i.tianqi.com/?c=code&id=10"></iframe></div>
            <div icon={<UserOutlined />}></div>
        </div>
    )
}

export default Top
