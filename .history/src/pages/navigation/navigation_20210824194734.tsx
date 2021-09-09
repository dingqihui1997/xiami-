import React from 'react'
import { Card, Button, Switch, Input, Form, Table, Modal } from 'antd';

const Navigation = () => {
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
