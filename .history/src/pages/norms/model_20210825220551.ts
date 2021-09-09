import { Effect, Reducer } from 'umi'
import api from '../../http/backstageApi'
import { message, Button } from 'antd';
import { Location } from 'history';
import dayjs from 'dayjs'
// 定义state的数据
export interface NormsModelState {
    Norms: any,
}

export interface NormsModelType {
    namespace: 'Norms'
    state: NormsModelState
    // 等同于vuex里面的action 用来发请求的
    effects: {
        addNorms: Effect,
        getNorms: Effect,
        delNorms: Effect,
    },
    // 等同于vuex里面的mutation
    reducers: {
        setNorms: Reducer<NormsModelState>
    }
}

const NormsModel: NormsModelType = {
    namespace: 'Norms',
    state: {
        Norms: {},
    },
    effects: {
        // *等同于async
        // payload请求传递的参数
        *addNorms({ payload }, { call, put }) { //增加规格
            let res = yield call(api.addSpec, payload)
            console.log(res)
            if (res.code === 200) {
                message.success(res.msg)
                yield put({
                    type: 'getNorms',
                    payload: {
                        // current: 1,
                        // pageSize: 5,
                        parentId: payload.parentId
                    }
                })
            } else {
                message.error(res.msg)
            }
        },
        *getNorms({ payload }, { call, put }) {//获取规格列表
            let res = yield call(api.getSpec, payload)
            if (res.code === 200) {
                res.data.map((item: any, index: number) => {
                    item.active = index + 1
                    item.spec_item = item.spec_item.join('，')
                })
                yield put({
                    type: 'setNorms',
                    payload: res
                })
            }
            console.log(res)
        },
        *delNorms({ payload }, { call, put }) {//删除规格
            let res = yield call(api.delSpec, payload)
            console.log(res)
            if (res.code === 200) {
                message.success(res.msg)
                yield put({
                    type: 'getNorms',
                    payload: {
                        parentId: payload.parentId,
                    }
                })
            } else {
                message.error(res.msg)
            }
        },
    },
    reducers: {
        setNorms(state, action) {
            return {
                ...state,
                Norms: action.payload,
            }
        },
    }
}

export default NormsModel

