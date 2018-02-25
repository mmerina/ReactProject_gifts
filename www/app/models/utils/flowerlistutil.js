function* fetchServer(select, put) {
    var { nowfilters } = yield select((state) => state.flowerlist);
    var { pagination } = yield select((state) => state.flowerlist);
    var { sorter } = yield select((state) => state.flowerlist);


    //发出Ajax请求
    var { results, total } = yield fetch(`/flowersearch`, {
        "method": 'POST',
        "headers": { 'Content-Type': 'application/json' },
        "body": JSON.stringify({
            nowfilters,
            pagination,
            sorter
        })
    }).then(data => data.json());
    //改变鲜花结果
    yield put({ "type": "changeFlowers", "flowers": results });
    //改变pagination
    yield put({ "type": "changePagination", total });
}

export const fetchFlowerServer = fetchServer;