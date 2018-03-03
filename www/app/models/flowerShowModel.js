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
        *init({ nowid }, { put, call }) {
            yield put({ "type": "changeNowId", nowid });
            yield put({ "type": "changeNowIdx", "nowidx": 0 });
            yield put({ "type": "changeNowAlbum", "nowalbum": "view" });

            const flowerinfo = yield call(fetchFlowerInfo, nowid);
            yield put({ "type": "changeFlowerinfo", flowerinfo });
            const flowerlikes = yield call(fetchFlowerLikes, nowid);
            yield put({ "type": "changeFlowerLikes", flowerlikes });
            const flowerimages = yield call(fetchFlowerImages, nowid);
            yield put({ "type": "changeFlowerImages", flowerimages });
        },
        *changeNowAlbum(action, { put}){
            yield put({ "type": "changeNowIdx", "nowidx": 0 });
            yield put({ "type": "changeNowAlbumSync", "nowalbum": action.nowalbum });
        }
    }
}