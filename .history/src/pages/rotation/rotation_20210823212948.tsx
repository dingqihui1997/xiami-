import React from 'react'
import { Card, Button, Space, Input } from 'antd';
const Rotation = () => {
    const onSearch = (value: any) => console.log(value);
    return (
        <div>
            <Card>
                <Search placeholder="input search text" onSearch={onSearch} style={{ width: 200 }} />
            </Card>
        </div>
    )
}

export default Rotation
