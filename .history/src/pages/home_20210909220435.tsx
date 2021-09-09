import React, { useState, useEffect } from 'react'
import styles from './index.less';
import { useSelector, useDispatch, } from 'umi';
import { Menu, Button, Card, } from 'antd';
import dayjs from 'dayjs'
import * as echarts from 'echarts';
const Home = () => {
  let user = useSelector((state: any) => state.home.home)
  let Order = useSelector((state: any) => state.Notice.Order)
  const start = new Date(new Date().toLocaleDateString()).getTime()
  let end = dayjs().endOf('day').valueOf()
  let [list, setlist] = useState<any[]>([])
  let [Price, setPrice] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
  let [orderCount, setorderCount] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
  let [time, settime] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23])
  let dispatch = useDispatch()
  useEffect(() => {
    dispatch({
      type: 'home/getHome',
    }),
      dispatch({ type: 'Notice/getOrder' })
  }, [])
  useEffect(() => {
    if (Order) {
      console.log(Order)
      let arr = Order.filter((item: any, index: number) => {
        return Number(item.pay_time) > start && Number(item.pay_time) < end
      })
      console.log(arr)
      arr.map((item: any, index: number) => {
        orderCount[dayjs(Number(item.pay_time)).hour()] += 1
        Price[dayjs(Number(item.pay_time)).hour()] += Number(item.Number)
      })
      setorderCount([...orderCount])
      setPrice([...Price])
      one()
    }
  }, [Order])

  let one = () => {
    var chartDom = document.getElementById('main');
    var myChart = echarts.init(chartDom!);
    var option;
    option = {
      title: {
        text: '今日订单',
      },
      legend: {
        data: ['订单量合计']
      },
      xAxis: {
        type: 'category',
        data: time
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        name: '订单量合计',
        data: orderCount,
        type: 'line'
      }]
    };

    option && myChart.setOption(option);
  }
  let two = () => {
    var chartDom = document.getElementById('main');
    var myChart = echarts.init(chartDom!);
    var option;
    option = {
      title: {
        text: '今日销售额',
      },
      xAxis: {
        type: 'category',
        data: time
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        name: '订单量合计',
        data: orderCount,
        type: 'line'
      }]
    };

    option && myChart.setOption(option);
  }
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
        <div className="flex">
          <div className="flex1 margin-r20" style={{ height: 500 }} id="main"></div>
          <div className="flex1"></div>
        </div>
      </Card>
    </div>
  )
}

export default Home
