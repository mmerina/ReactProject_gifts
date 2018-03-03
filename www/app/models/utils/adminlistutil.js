function* fetchServer(select, put) {
    var { keyword } = yield select((state) => state.adminlist);
    var { pagination } = yield select((state) => state.adminlist);
    var { sorter } = yield select((state) => state.adminlist);

    var { results, total } = yield fetch(`adminsearch`, {
        "method": 'POST',
        "headers": { 'Content-Type': 'application/json' },
        "body": JSON.stringify({
            keyword,
            pagination,
            sorter
        })
    }).then(data => data.json());
    yield put({ "type": "changeAdmins", "admins": results });
    yield put({ "type": "changePagination", total });
}

export const fetchAdminsServer = fetchServer;