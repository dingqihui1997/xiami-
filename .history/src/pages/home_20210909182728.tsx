import React, { useEffect } from 'react'
import styles from './index.less';
import { useSelector, useDispatch, } from 'umi';
import { Menu, Button, Card } from 'antd';

const Home = () => {
  let user = useSelector((state: any) => state.home.home)
  let dispatch = useDispatch()
  useEffect(() => {
    // dispatch({
    //   type: 'home/getHome',
    // })
  }, [])
  return (
    <div>
      <Card></Card>
    </div>
  )
}

export default Home
