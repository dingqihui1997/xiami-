import React, { useEffect } from 'react'
import styles from './index.less';
import { useSelector, useDispatch, } from 'umi';
import { Menu, Button, Card } from 'antd';

const Home = () => {
  let user = useSelector((state: any) => state.home.home)
  let dispatch = useDispatch()
  useEffect(() => {
    dispatch({
      type: 'home/getHome',
    })
  }, [])
  return (
    <div>
      <Card>
        <div className="flex wi100 color3f hei60 font16" >
          <div className="flex1 margin-r20 padl20" style={{ background: '#E64241' }}>
            <div className="margin-b10 mat10 font-w7">{user && user.orderCount}</div>
            <div>订单总数</div>
          </div>
          <div className="flex1 margin-r20 padl20" style={{ background: '#30B95C' }}>
            <div className="margin-b10 mat10 font-w7">{user && user.goodsCount}</div>
            <div >商品总数</div>
          </div>
          <div className="flex1 padl20" style={{ background: "#1F2D3D" }}>
            <div className="margin-b10 mat10 font-w7">{user && user.userCount}</div>
            <div>用户总数</div>
          </div>
        </div>

      </Card>
    </div>
  )
}

export default Home
