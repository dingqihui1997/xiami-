import React from 'react'
import { Card } from 'antd';
import { Input } from 'antd';
import style from '../index.less'
import emoji from '../../static/emoji.png'
const News = () => {
    return (
        <Card style={{ height: 800 }}>

            <div className="flex">
                <Input placeholder="请输入聊天内容" />
                <div >
                    <img src={emoji} alt="" className={`${style.emoji}`} />
                </div>
            </div>
        </Card>
    )
}

export default News
