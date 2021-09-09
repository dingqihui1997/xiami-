import { Effect, Reducer } from 'umi'
import api from '../../http/backstageApi'
import { message, Button } from 'antd';
import { Location } from 'history';
import dayjs from 'dayjs'
// 定义state的数据
export interface GoosModelState {
    Goos: any,
}

export interface GoosModelType {
    namespace: 'Goos'
    state: GoosModelState
    // 等同于vuex里面的action 用来发请求的
    effects: {
        addGoos: Effect,
        getGoos: Effect,
        delGoos: Effect,
        putGoos: Effect,
    },
    // 等同于vuex里面的mutation
    reducers: {
        setGoos: Reducer<GoosModelState>
    }
}

const GoosModel: GoosModelType = {
    namespace: 'Goos',
    state: {
        Goos: {},
    },
    effects: {
        // *等同于async
        // payload请求传递的参数
        *addGoos({ payload }, { call, put }) { //增加规格
            let res = yield call(api.addGoods, payload)
            console.log(res)
            if (res.code === 200) {
                message.success(res.msg)
            } else {
                message.error(res.msg)
            }
        },
        *getGoos({ payload }, { call, put }) {//获取规格列表
            let res = yield call(api.getGoods, payload)
            if (res.code === 200) {
                // res.data.map((item: any, index: number) => {
                //     item.active = index + 1
                //     item.spec_item = item.spec_item.join('，')
                //     item.checkList = []
                // })
                yield put({
                    type: 'setGoos',
                    payload: res
                })
            }
            console.log(res)
        },
        *delGoos({ payload }, { call, put }) {//删除规格
            let res = yield call(api.delGoods, payload)
            console.log(res)
            if (res.code === 200) {
                message.success(res.msg)
                // yield put({
                //     type: 'getGoos',
                //     payload: {
                //         parentId: payload.parentId,
                //     }
                // })
            } else {
                message.error(res.msg)
            }
        },
        *putGoos({ payload }, { call, put }) {
            yield put({
                type: 'setGoos',
                payload: {}
            })
        }
    },
    reducers: {
        setGoos(state, action) {
            return {
                ...state,
                Goos: action.payload,
            }
        },
    }
}

export default GoosModel

