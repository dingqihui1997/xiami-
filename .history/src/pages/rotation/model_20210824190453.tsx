import { Effect, Reducer } from 'umi'
import api from '../../http/backstageApi'
import { message, } from 'antd';

// 定义state的数据
export interface RatationModelState {
    topics: any[],
    data: any[]
}

export interface RatationModelType {
    namespace: 'ratation'
    state: RatationModelState
    // 等同于vuex里面的action 用来发请求的
    effects: {
        getTopics: Effect,
        getdata: Effect,
        delBanner: Effect,
        showBanner: Effect,
        updateBanner: Effect
    },
    // 等同于vuex里面的mutation
    reducers: {
        setTopics: Reducer<RatationModelState>
        setdata: Reducer<RatationModelState>
    }
}

const RatationModel: RatationModelType = {
    namespace: 'ratation',
    state: {
        topics: [],
        data: []
    },
    effects: {
        // *等同于async
        // payload请求传递的参数
        *getTopics({ payload }, { call, put }) { //添加
            let res = yield call(api.addBanner, payload)
            // console.log(res);
            if (res.code === 200) {
                yield put({
                    type: 'setTopics',
                    payload: res.data.data
                })
                message.success(res.msg)
            }
        },
        *getdata({ payload }, { call, put }) { //获取
            let res = yield call(api.getBanner, payload)
            res.data.map((item: any, index: number) => {
                item.active = index + 1
            })
            // console.log(res);
            yield put({
                type: 'setdata',
                payload: res
            })
        },
        *delBanner({ payload }, { call, put }) {//删除
            let res = yield call(api.delBanner, payload)
            console.log(res);
            if (res.code === 200) {
                message.success(res.msg)
            }
        },
        *showBanner({ payload }, { call, put }) {//修改轮播图状态
            let res = yield call(api.showBanner, payload)
            console.log(res);
            if (res.code === 200) {
                message.success(res.msg)
            }
        },
        *updateBanner({ payload }, { call, put }) {
            let res = yield call(api.updateBanner, payload)
            console.log(res);
            if (res.code === 200) {
                message.success(res.msg)
            }
        }
    },
    reducers: {
        setTopics(state, action) {
            return {
                data: state!.data,
                topics: action.payload,
            }
        },
        setdata(state, action) {
            return {
                topics: state!.topics,
                data: action.payload,
            }
        },
    }
}

export default RatationModel