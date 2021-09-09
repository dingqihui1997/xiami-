import { Effect, Reducer } from 'umi'
import api from '../../http/backstageApi'
import { message, Button } from 'antd';
import { Location } from 'history';
import dayjs from 'dayjs'
// 定义state的数据
export interface CategoryModelState {
    category: any,
}

export interface CategoryModelType {
    namespace: 'category'
    state: CategoryModelState
    // 等同于vuex里面的action 用来发请求的
    effects: {
        addCategory: Effect,
        getCategory: Effect,
        delCategory: Effect,
    },
    // 等同于vuex里面的mutation
    reducers: {
        setCategory: Reducer<CategoryModelState>
    }
}

const CategoryModel: CategoryModelType = {
    namespace: 'category',
    state: {
        category: {},
    },
    effects: {
        // *等同于async
        // payload请求传递的参数
        *addCategory({ payload }, { call, put }) { //增加规格
            let res = yield call(api.addSpec, payload)
            console.log(res)
            if (res.code === 200) {
                message.success(res.msg)
                yield put({
                    type: 'getCategory',
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
        *getCategory({ payload }, { call, put }) {//获取规格列表
            let res = yield call(api.getSpec, payload)
            if (res.code === 200) {
                res.data.map((item: any, index: number) => {
                    item.active = index + 1
                    item.spec_item = item.spec_item.join('，')
                })
                yield put({
                    type: 'setCategory',
                    payload: res
                })
            }
            console.log(res)
        },
        *delCategory({ payload }, { call, put }) {//删除规格
            let res = yield call(api.delSpec, payload)
            console.log(res)
            if (res.code === 200) {
                message.success(res.msg)
                yield put({
                    type: 'getCategory',
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
        setcategory(state, action) {
            return {
                ...state,
                Category: action.payload,
            }
        },
    }
}

export default CategoryModel

