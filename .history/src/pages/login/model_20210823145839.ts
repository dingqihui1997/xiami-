import { Effect, Reducer } from 'umi'
import api from '../../http/backstageApi'
// 定义state的数据
export interface LoginModelState {
    user: any[],
}

export interface LoginModelType {
    namespace: 'login'
    state: LoginModelState
    // 等同于vuex里面的action 用来发请求的
    effects: {
        getUser: Effect,
    },
    // 等同于vuex里面的mutation
    reducers: {
        setUser: Reducer<LoginModelState>
    }
}

const DetailModel: LoginModelType = {
    namespace: 'login',
    state: {
        user: [],
    },
    effects: {
        // *等同于async
        // payload请求传递的参数
        *getUser({ payload }, { call, put }) {
            let res = yield call(api.login)
            if (res.data.success) {
                yield put({
                    type: 'setUser',
                    payload: res.data.data
                })
            }
        },
    },
    reducers: {
        setUser(state, action) {
            return {
                ...state,
                user: action.payload,
            }
        },
    }
}

export default DetailModel