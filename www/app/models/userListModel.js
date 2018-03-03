import _ from "lodash/fp";
import { fetchUserServer } from "./utils/userlistutil.js";

export default {
    "namespace": "userlist",
    "state": {
        "users": [],
        "keyword": "",
        "pagination": {
            "total": 0,
            "pagesize": 10,	
            "page": 1,			
        },
        "sorter": {
            "sortby": "id",			
            "sortdirection": "ascend"	
        }
    },
    "reducers": {
        changeUsers(state, { users }) {
            return _.set("users", users, state);
        },
        changePagination(state, { total = state.pagination.total, pagesize = state.pagination.pagesize, page = state.pagination.page }) {
            return _.set("pagination", { total, pagesize, page }, state);
        },
        changeSorter(state, { sortby = state.sorter.sortby, sortdirection = state.sorter.sortdirection }) {
            return _.set("sorter", { sortby, sortdirection }, state);
        },
        changeKeywordSync(state, { keyword }) {
            return _.set("keyword", keyword, state);
        }
    },
    "effects": {
        //初始化
        *init(action, { put, select, call }) {
            yield call(fetchUserServer, select, put);
        },
        *changePage({ page, pagesize }, { put, select, call }) {
            var { pagination } = yield select((state) => state.userlist);
            if (pagination.pagesize != pagesize) {
                page = 1;
            }
            yield put({ "type": "changePagination", page, pagesize });

            yield call(fetchUserServer, select, put);
        },
        *changeSort({ sortby, sortdirection }, { put, select, call }) {
            var { sorter } = yield select((state) => state.userlist);
            //判断用户的排序是否不一样
            if (sorter.sortby != sortby || sorter.sortdirection != sortdirection) {
                yield put({ "type": "changePagination", "page": 1 });
                yield put({ "type": "changeSorter", sortby, sortdirection });

                yield call(fetchUserServer, select, put);
            }
        },
        *changeKeyword({ keyword }, { put, select, call }) {
            yield put({ "type": "changePagination", "page": 1 });
            yield put({ "type": "changeKeywordSync", keyword });

            yield call(fetchUserServer, select, put);
        }
    }
}



