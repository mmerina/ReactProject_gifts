import _ from "lodash/fp";
import { fetchFlowerServer } from "./utils/flowerlistutil.js";

export default {
    "namespace": "flowerlist",
    "state": {
        "flowers": [],
        "nowfilters": []
    },
    "reducers": {
        //增加filter
        addFilter(state, { k, v }) {
            var nowfilters = _.clone(state.nowfilters);
            nowfilters.push({ k, v });
            return _.set("nowfilters", nowfilters, state);
        },
        //删除filter
        removeFilterSync(state, { k }) {
            return _.set("nowfilters", _.filter(item => item.k != k, state.nowfilters), state);
        },
        //改变filter
        changeFilter(state, { k, v }) {
            return _.set("nowfilters", _.map(item => item.k == k ? _.set("v", v, item) : item, state.nowfilters), state);
        },
        //改变flowers
        changeFlowers(state, { flowers }) {
            return _.set("flowers", flowers, state);
        }
    },
    "effects": {
        //初始化
        *init(action, { put, select, call }) {
            yield call(fetchFlowerServer, select, put);
        },
        *addOrChangeFilter({ k, v }, { put, select, call }) {
            //先得到当前的nowfilters
            var { nowfilters } = yield select((state) => state.flowerlist);
            //判断是否已经有k为k这项
            var isExit = false;		//flag，旗子。无罪推断，默认是没有的
            //遍历，如果有就会将flag变为true
            for (var i = 0; i < nowfilters.length; i++) {
                if (nowfilters[i].k == k) {
                    isExit = true;
                }
            }
            //如果这项已经存在
            if (isExit) {
                yield put({ "type": "changeFilter", k, v })
            } else {
                //如果这项不存在
                yield put({ "type": "addFilter", k, v })
            }

            //拉取新的过滤器和分页信息
            yield call(fetchFlowerServer, select, put);
        },
        *removeFilter({ k }, { put, select, call }) {

            yield put({ "type": "removeFilterSync", k });
            //拉取新的过滤器和分页信息
            yield call(fetchFlowerServer, select, put);
        }
    }
}



