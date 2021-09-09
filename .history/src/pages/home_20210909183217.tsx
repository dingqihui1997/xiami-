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
        <div className="flex wi100">
          <div className="flex1">{user && user.orderCount}</div>
          <div className="flex1"></div>
          <div className="flex1"></div>
        </div>
      </Card>
    </div>
  )
}

export default Home
