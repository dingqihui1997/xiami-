import React from 'react'
import { Card, Button, Switch, Input, Form, Table, Modal } from 'antd';

const Navigation = () => {
    const { Search } = Input;
    const [value, setvalue] = React.useState('')
    const onSearch = (e: any) => {
    };//输入框的值
    let add = () => {//添加轮播图按钮
        //   
    }
    return (
        <div>
            <Card>
                <Search placeholder="请输入" onSearch={onSearch} style={{ width: 300 }} />
                <Button type="primary" style={{ marginLeft: 20 }} onClick={add}>添加轮播图</Button>
            </Card>
        </div>
    )
}

export default Navigation
