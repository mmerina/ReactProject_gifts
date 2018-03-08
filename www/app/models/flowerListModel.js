import _ from "lodash/fp";
import { fetchFlowerServer } from "./utils/flowerlistutil.js";

export default {
    "namespace": "flowerlist",
    "state": {
        "flowers": [],
        "nowfilters": [],
        "pagination":{
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
        addFilter(state, { k, v }) {
            var nowfilters = _.clone(state.nowfilters);
            nowfilters.push({ k, v });
            return _.set("nowfilters", nowfilters, state);
        },
        removeFilterSync(state, { k }) {
            return _.set("nowfilters", _.filter(item => item.k != k, state.nowfilters), state);
        },
        changeFilter(state, { k, v }) {
            return _.set("nowfilters", _.map(item => item.k == k ? _.set("v", v, item) : item, state.nowfilters), state);
        },
        changeFlowers(state, { flowers }) {
            return _.set("flowers", flowers, state);
        },
        changePagination(state, { total = state.pagination.total, pagesize = state.pagination.pagesize, page = state.pagination.page }) {
            return _.set("pagination", { total, pagesize, page } , state);
        },
        changeSorter(state, { sortby = state.sorter.sortby, sortdirection = state.sorter.sortdirection }) {
            return _.set("sorter", { sortby, sortdirection }, state);
        }
    },
    "effects": {
        //初始化
        *init(action, { put, select, call }) {
            yield call(fetchFlowerServer, select, put);
        },
        *addOrChangeFilter({ k, v }, { put, select, call }) {
            var { nowfilters } = yield select((state) => state.flowerlist);
            var isExit = false;		
            for (var i = 0; i < nowfilters.length; i++) {
                if (nowfilters[i].k == k) {
                    isExit = true;
                }
            }
            if (isExit) {
                yield put({ "type": "changeFilter", k, v })
            } else {
                yield put({ "type": "addFilter", k, v })
            }
            
            yield put({ "type": "changePagination", "page": 1 });
            yield call(fetchFlowerServer, select, put);
        },
        *removeFilter({ k }, { put, select, call }) {
            
            yield put({ "type": "removeFilterSync", k });
            
            yield put({ "type": "changePagination", "page": 1 });
            yield call(fetchFlowerServer, select, put);
        },
        *changePage({ page, pagesize }, { put, select, call }) {
            var { pagination } = yield select((state) => state.flowerlist);
            if (pagination.pagesize != pagesize) {
                page = 1;
            }
            yield put({ "type": "changePagination", page, pagesize });
            yield call(fetchFlowerServer, select, put);
        },
        *changeSort({ sortby, sortdirection }, { put, select, call }) {
            var { sorter } = yield select((state) => state.flowerlist);
            if (sorter.sortby != sortby || sorter.sortdirection != sortdirection) {
                yield put({ "type": "changePagination", "page": 1 });
                yield put({ "type": "changeSorter", sortby, sortdirection });

                yield call(fetchFlowerServer, select, put);
            }
        }
    }
}



