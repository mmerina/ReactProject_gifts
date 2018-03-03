function* fetchServer(select, put) {
    var { nowfilters } = yield select((state) => state.flowerlist);
    var { pagination } = yield select((state) => state.flowerlist);
    var { sorter } = yield select((state) => state.flowerlist);


    var { results, total } = yield fetch(`/flowersearch`, {
        "method": 'POST',
        "headers": { 'Content-Type': 'application/json' },
        "body": JSON.stringify({
            nowfilters,
            pagination,
            sorter
        })
    }).then(data => data.json());
    yield put({ "type": "changeFlowers", "flowers": results });
    yield put({ "type": "changePagination", total });
}

export const fetchFlowerServer = fetchServer;