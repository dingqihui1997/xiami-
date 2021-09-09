import React from 'react'
import { Card, Button, Modal, Input } from 'antd';
const Rotation = () => {
    const { Search } = Input;
    const onSearch = (value: any) => console.log(value);
    const [visible, setVisible] = React.useState(false);
    const handleOk = (e: any) => {

    };
    return (
        <div>
            <Card>
                <Search placeholder="请输入" onSearch={onSearch} style={{ width: 300 }} />
                <Button type="primary" style={{ marginLeft: 20 }} onClick={() => { setVisible(true) }}>添加轮播图</Button>
                <Modal
                    title="添加轮播图"
                    visible={visible}
                    onOk={handleOk}
                    onCancel={() => { setVisible(false) }}
                >
                </Modal>
            </Card>
        </div>
    )
}

export default Rotation
