import React, { useState, useEffect } from 'react'
import { Card, Button, Tabs, message, Select, Input, Form, Table, DatePicker, Modal, Upload, Image, Pagination, Popconfirm } from 'antd';
import Basics from './../../components/basics/basics';
import { useSelector, useDispatch, useHistory, } from 'umi';

const Addgoods = () => {
    let Norms = useSelector((state: any) => state.category.category)
    let dispatch = useDispatch()
    const { TabPane } = Tabs;
    const { Search } = Input;
    let [activekey, setactivekey] = useState('1')
    let [show, setshow] = useState(true)
    const onSearch = (e: any) => {//搜索
    };
    let add = () => {//添加商品按钮
        setshow(false)
    }
    useEffect(() => {
        dispatch({//获取分类数据
            type: 'category/getCategory',
            payload: ''
        })
    }, [])
    let confirm = (val: any) => {
        console.log(val);
        activekey = '2'
        setactivekey(activekey)
    }
    let onChange = (e: any) => {
        console.log(e);
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
                    <Tabs activeKey={activekey} onChange={onChange}>
                        <TabPane tab="基础设置" key="1">
                            <Basics confirm={confirm} data={Norms && Norms.data}></Basics>
                        </TabPane>
                        <TabPane tab="媒体信息" key="2">
                            媒体信息                        </TabPane>
                        <TabPane tab="商品规格" disabled key="3">
                            商品规格
                        </TabPane>
                        <TabPane tab="商品详情" disabled key="4">
                            商品详情
                        </TabPane>
                    </Tabs>,
                </Card>
            }
        </div>
    )
}

export default Addgoods
