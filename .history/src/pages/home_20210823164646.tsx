import React, { useEffect } from 'react'
import styles from './index.less';
import { useSelector, useDispatch } from 'umi';

const Home = () => {
  let user = useSelector((state: any) => state.login.user)
  let dispatch = useDispatch()
  useEffect(() => {
    dispatch({
      type: 'login/getUser',
    })
  }, [])
  return (
    <div>
      首页
    </div>
  )
}

export default Home
