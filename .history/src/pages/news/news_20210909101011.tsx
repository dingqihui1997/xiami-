import React from 'react'
import { Card } from 'antd';
import { Input } from 'antd';
import style from '../index.less'

const News = () => {
    return (
        <Card style={{ height: 800 }}>

            <div className="flex">
                <Input placeholder="请输入聊天内容" />
                <div className="">
                    <img src="../../static/emoji.png" alt="" />
                </div>
            </div>
        </Card>
    )
}

export default News
