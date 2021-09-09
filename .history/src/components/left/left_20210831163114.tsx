import React, { useEffect, useState } from 'react'
import styles from './index.less';
import { useSelector, useDispatch, useHistory } from 'umi';
import { useLocation } from 'react-router-dom'
import { Menu, Button, } from 'antd';
import { useIntl } from 'umi';
import {
    BankOutlined, IdcardOutlined, BarsOutlined, ContactsOutlined, UserOutlined, TableOutlined, HistoryOutlined, AccountBookOutlined,
    NotificationOutlined, MessageOutlined, AlignCenterOutlined, FileOutlined, PartitionOutlined, GatewayOutlined
} from '@ant-design/icons';

const left = () => {
    const intl = useIntl();
    let collapsed = useState<boolean>(false)
    const location = useLocation().pathname; //当前路由
    let history = useHistory()
    let data = [
        {
            name: '首页',
            url: '/',
            icon: BankOutlined,
            t: "home"
        },
        {
            name: '轮播图管理',
            url: '/rotation',
            icon: IdcardOutlined,
            t: "Carousel_management"
        },
        {
            name: '导航管理',
            url: '/navigation',
            icon: BarsOutlined,
            t: "Navigation_management"
        },
        {
            name: '推荐导航',
            url: '/recommend',
            icon: ContactsOutlined,
            t: "Recommended_navigation"
        },
        {
            name: '用户管理',
            url: '/user',
            icon: UserOutlined,
            t: 'User_Management'
        },
        {
            name: '商品管理',
            url: '/goods',
            icon: TableOutlined,
            t: 'Goods_Management',
            children: [
                {
                    name: '添加商品',
                    url: '/addgoods',
                    icon: TableOutlined,
                    t: "Adding_goods"
                },
                {
                    name: '商品分类',
                    url: '/categories',
                    icon: BarsOutlined,
                    t: "Categories"
                },
                {
                    name: '商品模型',
                    url: '/pattern',
                    icon: AlignCenterOutlined,
                    t: "Commodity_model"
                },
                {
                    name: '商品规格',
                    url: '/norms',
                    icon: FileOutlined,
                    t: 'Product_specifications'
                },
                {
                    name: '商品参数',
                    url: '/parameter',
                    icon: PartitionOutlined,
                    t: "Product_parameters"
                },
                {
                    name: '规格参数',
                    url: '/specifications',
                    icon: GatewayOutlined,
                    t: "Specifications"
                },
            ]
        },
        {
            name: '秒杀管理',
            url: '/seckill',
            icon: HistoryOutlined,
            t: 'Spike_management'
        },
        {
            name: '优惠券管理',
            url: '/coupon',
            icon: AccountBookOutlined,
            t: "Coupon_management"
        },
        {
            name: '订单管理',
            url: '/order',
            icon: BarsOutlined,
            t: "Order_management"
        },
        {
            name: '通知管理',
            url: '/notice',
            icon: NotificationOutlined,
            t: "Notification_management"
        },
        {
            name: '客服管理',
            url: '/news',
            icon: MessageOutlined,
            t: "Customer_Service_Management"
        }

    ]
    let onSelect = (e: any) => {
        // console.log(e);
        history.push(e.key)
    }
    const { SubMenu } = Menu;
    return (
        <div>
            <Menu
                defaultSelectedKeys={[location]}
                defaultOpenKeys={['sub1']}
                mode="inline"
                theme="dark"
                onSelect={onSelect}
            >
                {data.map((item: any, index: number) => {
                    if (index === 5) {
                        return <SubMenu key="sub2" title={item.t} icon={<item.icon />}>
                            {item.children && item.children.map((item1: any, index: number) => {
                                return <Menu.Item key={item1.url} icon={<item1.icon />} >{intl.formatMessage(item1.t)}</Menu.Item>
                            })}

                        </SubMenu>
                    } else {
                        return <Menu.Item key={item.url} icon={<item.icon />} >
                            {item.t}
                        </Menu.Item>
                    }
                })}
            </Menu>
        </div>
    )
}

export default left
