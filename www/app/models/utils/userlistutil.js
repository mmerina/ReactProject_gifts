function* fetchServer(select, put) {
    var { keyword } = yield select((state) => state.userlist);
    var { pagination } = yield select((state) => state.userlist);
    var { sorter } = yield select((state) => state.userlist);

    var { results, total } = yield fetch(`/usersearch`, {
        "method": 'POST',
        "headers": { 'Content-Type': 'application/json' },
        "body": JSON.stringify({
            keyword,
            pagination,
            sorter
        })
    }).then(data => data.json());
    yield put({ "type": "changeUsers", "users": results });
    yield put({ "type": "changePagination", total });
}

export const fetchUserServer = fetchServer;