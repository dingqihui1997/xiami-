import React from 'react'
import { Card, Input } from 'antd';
import style from '../index.less'
import emoji from '../../static/emoji.png'
const News = () => {
    return (
        <Card style={{ height: 800 }}>

            <div className="flex">
                <div>
                    <Input placeholder="请输入聊天内容" />

                </div>
                <div >
                    <img src={emoji} alt="" className={`${style.emoji}`} />
                </div>
            </div>
        </Card>
    )
}

export default News
