import React from 'react'
import { Card, Input } from 'antd';
import style from '../index.less'
import imgs from '../../static/emoji.png'
import { emoji } from '@/lib/emoji'
const News = () => {
    return (
        <Card style={{ height: 800 }} className={`${style.newcard}`}>
            <div className={`${style.newsbox}`}>
                <div className='flex-ja'>
                    <div className={`${style.inputi} marr10`}>
                        <Input placeholder="请输入聊天内容" size="large" />
                    </div>
                    <div className="flex-ja marr10">
                        <img src={imgs} alt="" className={`${style.emoji}`} />
                    </div>
                    < div className={`${style.send} flex-ja font14`}>
                        发送
                    </div>
                </div>
                <div className="flex-w">
                    {emoji.map((item: string, index: number) => {
                        return <div>{item}</div>
                    })}
                </div>
            </div>
        </Card >
    )
}

export default News
