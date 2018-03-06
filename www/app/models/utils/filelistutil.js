function* fetchServer(select, put) {
    var { keyword } = yield select((state) => state.addFile);

    var { results, total } = yield fetch(`filesearch`, {
        "method": 'POST',
        "headers": { 'Content-Type': 'application/json' },
        "body": JSON.stringify({
            keyword
        })
    }).then(data => data.json());
    yield put({ "type": "changeForm", "form": results });
    yield put({ "type": "changeTotal", total });
}

export const fetchFilesServer = fetchServer;