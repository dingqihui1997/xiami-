import React from 'react'
import { Card, Input } from 'antd';
import style from '../index.less'
import emoji from '../../static/emoji.png'
const News = () => {
    return (
        <Card style={{ height: 800 }}>
            <div className={`${style.newsbox} flex-ja`}>
                <div className={`${style.inputi} marr10`}>
                    <Input placeholder="请输入聊天内容" size="large" />
                </div>
                <div className="flex-ja marr10">
                    <img src={emoji} alt="" className={`${style.emoji}`} />
                </div>
                < div className={`${style.send} flex-ja font14`}>
                    发送
                </div>
            </div>
        </Card >
    )
}

export default News
