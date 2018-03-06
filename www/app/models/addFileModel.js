import _ from "lodash/fp";
import { fetchFilesServer } from "./utils/filelistutil.js";

export default {
    "namespace": "addFile",
    "state": {
        form: [],
        keyword: "",
        total:0
    },
    "reducers": {
        changeKeywordSync(state, { keyword }) {
            return _.set("keyword", keyword, state);
        },
        changeForm(state, { form }) {
            return _.set("form", form, state);
        },
        changeTotal(state, { total }) {
            return _.set("total", total, state);
        }
    },
    "effects": {
        //初始化
        *init(action, { put, select, call }) {
            yield call(fetchFilesServer, select, put);
        },
        *changeKeyword({ keyword }, { put, select, call }) {
            yield put({ "type": "changeKeywordSync", keyword });
            yield call(fetchFilesServer, select, put);
        }
    }
}