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
        <div className="flex wi100" style={{ background: '#E64241' }}>
          <div className="flex1 margin-r20">
            <div>{user && user.orderCount}</div>
            <div>订单总数</div>
          </div>
          <div className="flex1 margin-r20">
            <div>{user && user.goodsCount}</div>
            <div>商品总数</div>
          </div>
          <div className="flex1">
            <div>{user && user.userCount}</div>
            <div>用户总数</div>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default Home
