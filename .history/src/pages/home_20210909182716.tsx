import React, { useEffect } from 'react'
import styles from './index.less';
import { useSelector, useDispatch, } from 'umi';
import { Menu, Button } from 'antd';

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

    </div>
  )
}

export default Home
