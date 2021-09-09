import React from 'react'
import { Card } from 'antd';
import { Input } from 'antd';
const News = () => {
    return (
        <Card style={{ height: 800 }}>

            <div className="flex">
                <Input placeholder="请输入聊天内容" />
            </div>
        </Card>
    )
}

export default News
