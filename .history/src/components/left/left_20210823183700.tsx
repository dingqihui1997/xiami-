import React, { useEffect, useState } from 'react'
import styles from './index.less';
import { useSelector, useDispatch, } from 'umi';
import { Menu, Button, } from 'antd';
import {
    BankOutlined, IdcardOutlined, BarsOutlined, ContactsOutlined, UserOutlined, TableOutlined, HistoryOutlined, AccountBookOutlined,
    NotificationOutlined, MessageOutlined, AlignCenterOutlined, FileOutlined, PartitionOutlined, GatewayOutlined
} from '@ant-design/icons';

const left = () => {
    let collapsed = useState<boolean>(false)
    let data = [
        {
            name: '首页',
            url: '/',
            icon: BankOutlined
        },
        {
            name: '轮播图管理',
            url: '/rotation',
            icon: IdcardOutlined
        },
        {
            name: '导航管理',
            url: '/navigation',
            icon: BarsOutlined
        },
        {
            name: '推荐导航',
            url: '/recommend',
            icon: ContactsOutlined
        },
        {
            name: '用户管理',
            url: '/user',
            icon: UserOutlined
        },
        {
            name: '商品管理',
            url: '/goods',
            icon: TableOutlined,
            children: [
                {
                    name: '添加商品',
                    url: '/addgoods',
                    icon: TableOutlined,
                },
                {
                    name: '商品分类',
                    url: '/categories',
                    icon: BarsOutlined,
                },
                {
                    name: '商品模型',
                    url: '/pattern',
                    icon: AlignCenterOutlined,
                },
                {
                    name: '商品规格',
                    url: '/norms',
                    icon: FileOutlined,
                },
                {
                    name: '商品参数',
                    url: '/parameter',
                    icon: PartitionOutlined,
                },
                {
                    name: '规格参数',
                    url: '/specifications',
                    icon: GatewayOutlined,
                },
            ]
        },
        {
            name: '秒杀管理',
            url: '/seckill',
            icon: HistoryOutlined
        },
        {
            name: '优惠券管理',
            url: '/coupon',
            icon: AccountBookOutlined
        },
        {
            name: '订单管理',
            url: '/order',
            icon: BarsOutlined
        },
        {
            name: '通知管理',
            url: '/notice',
            icon: NotificationOutlined
        },
        {
            name: '客服消息',
            url: '/news',
            icon: MessageOutlined
        }

    ]
    const { SubMenu } = Menu;
    return (
        <div>
            <Menu
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
                theme="dark"
            >
                {data.map((item, index) => {
                    if (index === 5) {
                        return <SubMenu key="sub2" title="Navigation Two">
                            {item.children && item.children.map((item, index) => {
                                <Menu.Item key="9"></Menu.Item>
                            })}

                        </SubMenu>
                    }
                    return <Menu.Item key={item.url} icon={<item.icon />} >
                        {item.name}
                    </Menu.Item>


                })}
                {/* <Menu.Item key="1" icon={<PieChartOutlined />} >
                    首页
                </Menu.Item> */}
                {/* <Menu.Item key="2" icon={<DesktopOutlined />}>
                    Option 2
                </Menu.Item>
                <Menu.Item key="3" icon={<ContainerOutlined />}>
                    Option 3
                </Menu.Item> */}
                {/* <SubMenu key="sub1" icon={<MailOutlined />} title="Navigation One">
                    <Menu.Item key="5">Option 5</Menu.Item>
                    <Menu.Item key="6">Option 6</Menu.Item>
                    <Menu.Item key="7">Option 7</Menu.Item>
                    <Menu.Item key="8">Option 8</Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Navigation Two">
                    <Menu.Item key="9">Option 9</Menu.Item>
                    <Menu.Item key="10">Option 10</Menu.Item>
                    <SubMenu key="sub3" title="Submenu">
                        <Menu.Item key="11">Option 11</Menu.Item>
                        <Menu.Item key="12">Option 12</Menu.Item>
                    </SubMenu>
                </SubMenu> */}
            </Menu>
        </div>
    )
}

export default left
