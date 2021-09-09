import { Effect, Reducer } from 'umi'
import api from '../../http/backstageApi'
import { message, Button } from 'antd';
import { Location } from 'history';

// 定义state的数据
export interface RecommendrecommendModelState {
    recommend: any,
}

export interface RecommendrecommendModelType {
    namespace: 'recommend'
    state: RecommendrecommendModelState
    // 等同于vuex里面的action 用来发请求的
    effects: {
        addrecommend: Effect,
        getrecommend: Effect,
        showrecommend: Effect,
        delrecommend: Effect,
        updaterecommend: Effect
    },
    // 等同于vuex里面的mutation
    reducers: {
        setrecommend: Reducer<RecommendrecommendModelState>
    }
}

const RecommendrecommendModel: RecommendrecommendModelType = {
    namespace: 'recommend',
    state: {
        recommend: {},
    },
    effects: {
        // *等同于async
        // payload请求传递的参数
        *addrecommend({ payload }, { call, put }) { //增加导航
            let res = yield call(api.addRecommendNav, payload)
            console.log(res)
            if (res.code === 200) {
                message.success(res.msg)
                yield put({
                    type: 'getrecommend',
                    payload: {
                        current: 1,
                        pageSize: 5,
                        query: ''
                    }
                })
            } else {
                message.error(res.msg)
            }
        },
        *getrecommend({ payload }, { call, put }) {//获取列表
            let res = yield call(api.getRecommendNav, payload)
            if (res.code === 200) {
                yield put({
                    type: 'setrecommend',
                    payload: res
                })
            }
        },
        *showrecommend({ payload }, { call, put }) {//是否显示
            let res = yield call(api.showRecommendNav, payload)
            if (res.code === 200) {
                message.success(res.msg)
            }
        },
        *delrecommend({ payload }, { call, put }) {
            let res = yield call(api.delRecommendNav, payload)
            console.log(res)
            if (res.code === 200) {
                message.success(res.msg)
                yield put({
                    type: 'getrecommend',
                    payload: {
                        current: 1,
                        pageSize: 5,
                        query: ''
                    }
                })
            }
        },
        *updaterecommend({ payload }, { call, put }) {
            let res = yield call(api.updateRecommendNav, payload)
            console.log(res)
            if (res.code === 200) {
                message.success(res.msg)
                yield put({
                    type: 'getrecommend',
                    payload: {
                        current: 1,
                        pageSize: 5,
                        query: ''
                    }
                })
            }
        }

    },
    reducers: {
        setrecommend(state, action) {
            return {
                ...state,
                recommend: action.payload,
            }
        },
    }
}

export default RecommendrecommendModel