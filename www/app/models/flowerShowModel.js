import _ from "lodash/fp";

import { fetchFlowerInfo, fetchFlowerLikes, fetchFlowerImages} from "./utils/flowershowutil.js";

export default {
    "namespace": "flowershow",
    "state": {
        nowid: 0,
        nowidx: 0,
        nowalbum:"view",
        flowerimages: {},
        flowerinfo: {},
        flowerlikes: []
    },
    "reducers": {
        changeNowId(state, action) {
            return _.set("nowid", action.nowid, state);
        },
        changeNowIdx(state, action) {
            return _.set("nowidx", action.nowidx, state);
        },
        changeNowAlbumSync(state, action) {
            return _.set("nowalbum", action.nowalbum, state);
        },
        changeFlowerImages(state, action) {
            return _.set("flowerimages", action.flowerimages, state);
        },
        changeFlowerinfo(state, action) {
            return _.set("flowerinfo", action.flowerinfo, state);
        },
        changeFlowerLikes(state, action) {
            return _.set("flowerlikes", action.flowerlikes, state);
        }
    },
    "effects": {
        //初始化，会传入一个nowid参数
        *init({ nowid }, { put, call }) {
            //改变nowid为action的载荷
            yield put({ "type": "changeNowId", nowid });
            //改变nowidx为0
            yield put({ "type": "changeNowIdx", "nowidx": 0 });
            //改变nowalbum为view
            yield put({ "type": "changeNowAlbum", "nowalbum": "view" });
            //发出请求，请求鲜花信息
            const flowerinfo = yield call(fetchFlowerInfo, nowid);
            //改变flowerinfo
            yield put({ "type": "changeFlowerinfo", flowerinfo });
            //发出请求，请求相似鲜花
            const flowerlikes = yield call(fetchFlowerLikes, nowid);
            //改变flowerlikes
            yield put({ "type": "changeFlowerLikes", flowerlikes });
            //发出请求，请求鲜花的图集
            const flowerimages = yield call(fetchFlowerImages, nowid);
            //改变flowerlikes
            yield put({ "type": "changeFlowerImages", flowerimages });
        },
        *changeNowAlbum(action, { put}){
            //改变nowidx为0
            yield put({ "type": "changeNowIdx", "nowidx": 0 });
            //改变nowalbum为view
            yield put({ "type": "changeNowAlbumSync", "nowalbum": action.nowalbum });
        }
    }
}