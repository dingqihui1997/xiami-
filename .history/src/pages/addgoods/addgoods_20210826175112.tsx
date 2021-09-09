import React, { useState } from 'react'
import { Card, Button, Tabs, message, Select, Input, Form, Table, DatePicker, Modal, Upload, Image, Pagination, Popconfirm } from 'antd';

const Addgoods = () => {
    const { TabPane } = Tabs;
    const { Search } = Input;
    let [show, setshow] = useState(true)
    const onSearch = (e: any) => {//搜索
    };
    let add = () => {//添加商品按钮
        setshow(false)
    }
    return (
        <div>
            {show ?
                <Card>
                    <div className="margin-b20">
                        <Search placeholder="请输入" onSearch={onSearch} style={{ width: 300 }} />
                        <Button type="primary" style={{ marginLeft: 20 }} onClick={add}>添加商品</Button>
                    </div>
                </Card> :
                <Card>
                    <div className='font20 '>添加商品</div>
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="Tab 1" key="1">
                            Tab 1
                        </TabPane>
                        <TabPane tab="Tab 2" disabled key="2">
                            Tab 2
                        </TabPane>
                        <TabPane tab="Tab 3" disabled key="3">
                            Tab 3
                        </TabPane>
                    </Tabs>,
                </Card>
            }


        </div>
    )
}

export default Addgoods
