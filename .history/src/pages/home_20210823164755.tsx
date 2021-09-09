import React, { useEffect } from 'react'
import styles from './index.less';
import { useSelector, useDispatch } from 'umi';

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
      首页
    </div>
  )
}

export default Home
