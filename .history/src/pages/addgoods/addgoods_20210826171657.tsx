import React from 'react'
import { Card, Button, Tree, message, Select, Input, Form, Table, DatePicker, Modal, Upload, Image, Pagination, Popconfirm } from 'antd';

const Addgoods = () => {
    const { Search } = Input;

    return (
        <div>
            <Card>
                <Search placeholder="请输入" onSearch={onSearch} style={{ width: 300 }} />

            </Card>
        </div>
    )
}

export default Addgoods
