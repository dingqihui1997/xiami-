import { Effect, Reducer } from 'umi'
import api from '../../http/backstageApi'
import { message, Button } from 'antd';
import { Location } from 'history';
import dayjs from 'dayjs'
// 定义state的数据
export interface GoodsModelState {
    Goods: any,
}

export interface GoodsModelType {
    namespace: 'Goods'
    state: GoodsModelState
    // 等同于vuex里面的action 用来发请求的
    effects: {
        addGoods: Effect,
        getGoods: Effect,
        delGoods: Effect,
        putGoods: Effect,
    },
    // 等同于vuex里面的mutation
    reducers: {
        setGoods: Reducer<GoodsModelState>
    }
}

const GoodsModel: GoodsModelType = {
    namespace: 'Goods',
    state: {
        Goods: {},
    },
    effects: {
        // *等同于async
        // payload请求传递的参数
        *addGoods({ payload }, { call, put }) { //增加规格
            let res = yield call(api.addGoods, payload)
            console.log(res)
            if (res.code === 200) {
                message.success(res.msg)
            } else {
                message.error(res.msg)
            }
        },
        *getGoods({ payload }, { call, put }) {//获取商品列表
            let res = yield call(api.getGoods, payload)
            if (res.code === 200) {
                res.data.map((item: any, index: number) => {
                    item.active = index + 1
                })
                yield put({
                    type: 'setGoods',
                    payload: res
                })
            }
            console.log(res)
        },
        *delGoods({ payload }, { call, put }) {//删除规格
            let res = yield call(api.delGoods, payload)
            console.log(res)
            if (res.code === 200) {
                message.success(res.msg)
                yield put({
                    type: 'getGoods',
                    payload: {
                        current: payload.current, payload.pageSize: pageSize, payload.query: query
                    }
                })
            } else {
                message.error(res.msg)
            }
        },
        *putGoods({ payload }, { call, put }) {
            yield put({
                type: 'setGoods',
                payload: {}
            })
        }
    },
    reducers: {
        setGoods(state, action) {
            return {
                ...state,
                Goods: action.payload,
            }
        },
    }
}

export default GoodsModel

