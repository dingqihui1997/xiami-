import React from 'react'
import { Card, Button, Tree, message, Select, Input, Form, Table, DatePicker, Modal, Upload, Image, Pagination, Popconfirm } from 'antd';

const Addgoods = () => {
    const { Search } = Input;
    const onSearch = (e: any) => {//搜索
    };
    return (
        <div>
            <Card>
                <div className="margin-b20">
                    <Search placeholder="请输入" onSearch={onSearch} style={{ width: 300 }} />
                    <Button type="primary" style={{ marginLeft: 20 }} onClick={add}>添加用户</Button>
                </div>

            </Card>
        </div>
    )
}

export default Addgoods
