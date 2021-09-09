import React, { useEffect, useState } from 'react'
import { Card, Input, message } from 'antd';
import style from '../index.less'
import imgs from '../../static/emoji.png'
import { emoji } from '@/lib/emoji'
import io from 'socket.io-client'
const socket = io('http://localhost:3000')
import { CaretRightOutlined, CaretLeftOutlined } from '@ant-design/icons';
const News = () => {
    let [show, setshow] = useState(false)
    let [value, setvalue] = useState('')
    let [list, setlist] = useState<any>([])
    useEffect(() => {
        socket.on('broadcast', val => {
            list.push(val)
            setlist([...list])
            console.log(list)
        })
    }, [])
    let click = () => {//打开表情弹窗
        setshow(!show)
    }
    let onChange = (e: any) => {//监听输入框
        setvalue(e.target.value)
    }
    let onPressEnter = () => {//回车发送事件
        let user = JSON.parse(localStorage.getItem('user')!)
        if (value.replace(/\s+/g, '')) {
            socket.emit('event', {
                username: user.username,
                value: value,
                platform: 'admin'
            })
        } else {
            message.error('不能发送空白信息')
        }
        setvalue('')
    }
    let clickItem = (item: any) => {//点击表情
        setvalue(value + item)
    }
    return (
        <Card style={{ height: 750 }} className={`${style.newcard}`}>
            {/* 消息 */}
            <div className={`${style.chatbox}`}>
                {list && list.map((item: any, index: number) => {
                    return <div key={index}>
                        {
                            item.username === 'admin' ? <div className={`flex-end mat10`}>
                                <div className={`${style.chatright} flex-a font16`}> {item.value}</div>
                                <div className={`${style.chaticon}`}><CaretRightOutlined style={{ color: '#1890FF' }} /></div>
                            </div> :
                                <div className={`flex mat10`}>
                                    <div className={`${style.chaticon1}`}><CaretLeftOutlined style={{ color: '#ffffff' }} /></div>
                                    <div className={`${style.chatleft} flex-a font16`}> {item.value}</div>
                                </div>
                        }

                    </div>
                })}
            </div>
            <div className={`${style.newsbox}`}>
                <div className='flex-ja'>
                    <div className={`${style.inputi} marr10`}>
                        <Input placeholder="请输入聊天内容" value={value} size="large" onInput={onChange} onPressEnter={onPressEnter} />
                    </div>
                    <div className="flex-ja marr10">
                        <img src={imgs} alt="" className={`${style.emoji}`} onClick={click} />
                    </div>
                    < div className={`${style.send} flex-ja font14`} onClick={onPressEnter}>
                        发送
                    </div>
                </div>
                {show ? <div className={`${style.emojbox} flex-w`}>
                    {emoji.map((item: any, index: number) => {
                        return <div key={index} className={`${style.emoji2} flex-ja`} onClick={() => clickItem(item)}>{item}</div>
                    })}
                </div> : ''}

            </div>
        </Card >
    )
}

export default News
