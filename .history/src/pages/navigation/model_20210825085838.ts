import { Effect, Reducer } from 'umi'
import api from '../../http/backstageApi'
import { message, Button } from 'antd';
import { Location } from 'history';

// 定义state的数据
export interface NvigationModelState {
    Nav: any,
}

export interface NvigationModelType {
    namespace: 'Nav'
    state: NvigationModelState
    // 等同于vuex里面的action 用来发请求的
    effects: {
        addNav: Effect,
        getNav: Effect
    },
    // 等同于vuex里面的mutation
    reducers: {
        setNav: Reducer<NvigationModelState>
    }
}

const NvigationModel: NvigationModelType = {
    namespace: 'Nav',
    state: {
        Nav: [],
    },
    effects: {
        // *等同于async
        // payload请求传递的参数
        *addNav({ payload }, { call, put }) { //增加导航
            let res = yield call(api.addNav, payload)
            console.log(res)
            if (res.code === 200) {
                message.success(res.msg)

            } else {
                message.error(res.msg)
            }
        },
        *getNav({ payload }, { call, put }) {
            let res = yield call(api.getNav, payload)
            console.log(res)
            if (res.code === 200) {
                yield put({
                    type: 'setNav',
                    payload: res.data
                })
            }
        }

    },
    reducers: {
        setNav(state, action) {
            return {
                ...state,
                Nav: action.payload,
            }
        },
    }
}

export default NvigationModel