import React from 'react'
import { Card, Button, Switch, Input, Form, Table, Modal } from 'antd';

const Navigation = () => {
    const { Search } = Input;
    const [value, setvalue] = React.useState('')
    const [visible, setVisible] = React.useState(false);
    const onSearch = (e: any) => {
    };//输入框的值
    let add = () => {//添加轮播图按钮
        //   
    }
    let onCancel = () => {//取消按钮

    }
    let handleOk = () => {//欧克按钮

    }
    return (
        <div>
            <Card>
                <Search placeholder="请输入" onSearch={onSearch} style={{ width: 300 }} />
                <Button type="primary" style={{ marginLeft: 20 }} onClick={add}>添加导航</Button>
                <Modal visible={visible} title="添加导航" onOk={handleOk}
                    onCancel={onCancel}
                    okText="确定" cancelText="取消">

                </Modal>
            </Card>
        </div>
    )
}

export default Navigation
