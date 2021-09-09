import React, { useEffect, useState } from 'react'
import { Card, Input } from 'antd';
import style from '../index.less'
import imgs from '../../static/emoji.png'
import { emoji } from '@/lib/emoji'
import io from 'socket.io-client'
const socket = io('http://localhost:3000')
const News = () => {
    const [show, setshow] = useState(false)
    useEffect(() => {

    }, [])
    return (
        <Card style={{ height: 750 }} className={`${style.newcard}`}>


            <div className={`${style.newsbox}`}>
                <div className='flex-ja'>
                    <div className={`${style.inputi} marr10`}>
                        <Input placeholder="请输入聊天内容" size="large" />
                    </div>
                    <div className="flex-ja marr10">
                        <img src={imgs} alt="" className={`${style.emoji}`} />
                    </div>
                    < div className={`${style.send} flex-ja font14`} >
                        发送
                    </div>
                </div>
                {show ? <div className={`${style.emojbox} flex-w`}>
                    {emoji.map((item: string, index: number) => {
                        return <div className={`${style.emoji2} flex-ja`}>{item}</div>
                    })}
                </div> : ''}

            </div>
        </Card >
    )
}

export default News
