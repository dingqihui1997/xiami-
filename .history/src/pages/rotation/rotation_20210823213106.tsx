import React from 'react'
import { Card, Button, Space, Input } from 'antd';
const Rotation = () => {
    const { Search } = Input;
    const onSearch = (value: any) => console.log(value);
    return (
        <div>
            <Card>
                <Search placeholder="请输入" onSearch={onSearch} style={{ width: 500 }} />
            </Card>
        </div>
    )
}

export default Rotation
