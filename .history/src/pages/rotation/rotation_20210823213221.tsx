import React from 'react'
import { Card, Button, Space, Input } from 'antd';
const Rotation = () => {
    const { Search } = Input;
    const onSearch = (value: any) => console.log(value);
    return (
        <div>
            <Card>
                <Search placeholder="请输入" onSearch={onSearch} style={{ width: 300 }} />
                <Button type="primary" style={{ marginLeft: 20 }}>添加轮播图</Button>
            </Card>
        </div>
    )
}

export default Rotation
