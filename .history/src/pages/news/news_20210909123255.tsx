import React, { useEffect, useState } from 'react'
import { Card, Input } from 'antd';
import style from '../index.less'
import imgs from '../../static/emoji.png'
import { emoji } from '@/lib/emoji'
import io from 'socket.io-client'
const socket = io('http://localhost:3000')
const News = () => {
    let [show, setshow] = useState(false)
    let [value, setvalue] = useState('')
    useEffect(() => {

    }, [])
    let click = () => {//打开表情弹窗
        setshow(!show)
    }
    let onChange = (e: any) => {//监听输入框
        console.log(e.target.value)
        setvalue(e.target.value)
        console.log(value)
    }
    let onPressEnter = () => {//回车事件

    }
    let clickItem = (item: any) => {//点击表情
        console.log(item)
    }
    return (
        <Card style={{ height: 750 }} className={`${style.newcard}`}>


            <div className={`${style.newsbox}`}>
                <div className='flex-ja'>
                    <div className={`${style.inputi} marr10`}>
                        <Input placeholder="请输入聊天内容" value={value} size="large" onInput={onChange} onPressEnter={onPressEnter} />
                    </div>
                    <div className="flex-ja marr10">
                        <img src={imgs} alt="" className={`${style.emoji}`} onClick={click} />
                    </div>
                    < div className={`${style.send} flex-ja font14`} >
                        发送
                    </div>
                </div>
                {show ? <div className={`${style.emojbox} flex-w`}>
                    {emoji.map((item: any, index: number) => {
                        return <div key={index} className={`${style.emoji2} flex-ja`} onClick={(item: any) => clickItem(item)}>{item}</div>
                    })}
                </div> : ''}

            </div>
        </Card >
    )
}

export default News
