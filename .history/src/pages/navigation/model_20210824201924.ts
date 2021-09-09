import { Effect, Reducer } from 'umi'
import api from '../../http/backstageApi'
import { message, Button } from 'antd';
import { Location } from 'history';

// 定义state的数据
export interface LoginModelState {
    Nav: any,
}

export interface LoginModelType {
    namespace: 'Nav'
    state: LoginModelState
    // 等同于vuex里面的action 用来发请求的
    effects: {
        addNav: Effect,
    },
    // 等同于vuex里面的mutation
    reducers: {
        setNav: Reducer<LoginModelState>
    }
}

const LoginModel: LoginModelType = {
    namespace: 'Nav',
    state: {
        Nav: {},
    },
    effects: {
        // *等同于async
        // payload请求传递的参数
        *addNav({ payload }, { call, put }) {
            let res = yield call(api.login, payload)
            if (res.code === 200) {
                yield put({
                    type: 'setNav',
                    payload: res.data.data,
                })
                message.success('登录成功')

            } else {
                message.error(res.msg)
            }
        },
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

export default LoginModel