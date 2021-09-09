import React from 'react'
import { Card, Button, Radio, Divider, message, Switch, Input, Form, Table, DatePicker, Modal, Upload, Image, Pagination, Popconfirm } from 'antd';
const Categories = () => {
    const { Search } = Input;
    const onSearch = (e: any) => {

    };//输入框的值
    return (
        <div>
            <Card>
                <Search placeholder="请输入分类名称，" onSearch={onSearch} style={{ width: 300 }} />
                <div className="flex">
                    <div className="flex1"></div>
                    <div className="flex1">
                        <div className="flex-sb">
                            <div>新增分类</div>
                            <div>确定</div>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    )
}

export default Categories
