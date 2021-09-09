import React from 'react'
import { Card, Input } from 'antd';
import style from '../index.less'
import emoji from '../../static/emoji.png'
const News = () => {
    return (
        <Card style={{ height: 800 }}>

            <div className="flex">
                <div className={`${style.inputi}`}>
                    <Input placeholder="请输入聊天内容" size="large" />
                </div>
                <div className="flex-ja">
                    <img src={emoji} alt="" className={`${style.emoji}`} />
                </div>
                <div className="flex-ja">
                    <div className={`${style.send} font14`}>发送</div>
                </div>
            </div>
        </Card >
    )
}

export default News
