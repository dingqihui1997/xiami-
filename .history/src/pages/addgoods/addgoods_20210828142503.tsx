import React, { useState, useEffect } from 'react'
import { Card, Button, Tabs, message, Select, Input, Form, Table, DatePicker, Modal, Upload, Image, Pagination, Popconfirm } from 'antd';
import Basics from './../../components/basics/basics';
import { useSelector, useDispatch, useHistory, } from 'umi';
import Media from '@/components/media/media';
import Specifi from '@/components/specifi/specifi';
import Details from '@/components/details/details';

const Addgoods = () => {
    let Norms = useSelector((state: any) => state.category.category)
    // let goos = useSelector((state: any) => state.Goods.Goods)
    let dispatch = useDispatch()
    const { TabPane } = Tabs;
    const { Search } = Input;
    let [activekey, setactivekey] = useState('1')
    let [query, setquery] = useState('')
    let [show, setshow] = useState(true)//添加商品
    let [flag, setflag] = useState(true)
    let [flag1, setflag1] = useState(true)
    let [flag2, setflag2] = useState(true)
    let [basics, setbasics] = useState<any>()//基础信息
    let [pic, setpic] = useState<string[]>([])//媒体信息
    let [spec, setSpec] = useState<any>()//商品规格
    let [details, setdetails] = useState<any>()//商品详情
    let [current, setcurrent] = useState(1)
    let [pageSize, setpageSize] = useState(5)
    const onSearch = (e: any) => {//搜索
    };
    let add = () => {//添加商品按钮
        setshow(false)
    }
    let onChange = (e: string) => {//切换tab
        setactivekey(e)
    }
    useEffect(() => {
        dispatch({//获取分类数据
            type: 'category/getCategory',
            payload: ''
        })
        getgoods()
    }, [])
    let getgoods = () => {//获取商品列表
        dispatch({
            type: 'Goods/getGoods',
            payload: { current: current, pageSize: pageSize, query: query }
        })
    }
    let confirm = (val: any) => {//基础设置表单验证成功
        setactivekey('2')
        setbasics(val)
        setflag(false)
        console.log(val);
    }
    let back = () => {//基础设置取消按钮
        setshow(true)
        setflag(true)
    }
    let media = (val: []) => {//媒体信息确定按钮
        setactivekey('3')
        setflag1(false)
        console.log(val);
    }
    let specifi = (val: any) => {//规格参数确定
        setSpec(val)
        setactivekey('4')
    }
    let detail = (val: string) => {//详情确定
        setdetails(val)
        addgoods()
        setshow(true)
    }
    let addgoods = () => {
        dispatch({
            type: 'Goods/addGoods',
            payload: {
                name: basics.name, category: basics.category[length - 1], pic: pic, cover: basics.cover[0].response.data, originalPrice: basics.originalPrice, presentPrice: basics.presentPrice, discount: '', detail: details, spec: spec, introduction: basics.introduction, company: basics.company, stock: basics.stock, isNewGood: basics.isNewGood, isHot: basics.isHot, isRecommend: basics.isRecommend, comment: [], isShow: true, sellDesc: basics.sellDesc, productionDesc: ""
            }
        })
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
                            <Basics back={back} confirm={confirm} data={Norms && Norms.data}></Basics>
                        </TabPane>
                        <TabPane tab="媒体信息" key="2" disabled={flag}>
                            <Media media={media}></Media>
                        </TabPane>
                        <TabPane tab="商品规格" disabled={flag1} key="3">
                            <Specifi specifi={specifi}></Specifi>
                        </TabPane>
                        <TabPane tab="商品详情" key="4" disabled={flag2}>
                            <Details detail={detail} ></Details>
                        </TabPane>
                    </Tabs>
                </Card>
            }
        </div>
    )
}

export default Addgoods
