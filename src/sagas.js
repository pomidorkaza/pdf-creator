import { put, takeEvery, all, call } from 'redux-saga/effects'

const delay = (ms) => new Promise(res => setTimeout(res, ms))
// https://randomuser.me/api
function* helloSaga() {
  console.log('Hello Sagas!')
}
 
function* getData(){
  return  fetch("https://randomuser.me/api")
    .then((response)=>response.json())
    
  }   
  function* getRes(){
    const data = yield call(getData);
    const res = yield data;
    console.log(res.results[0].email)
    yield put({ type: "ADD_PERSON" ,payload:{
        value:res.results[0].email
    }});
  }
function* watchgetData(){
   yield  takeEvery("GET_DATA_ASYNC",getRes);
}



function* incrementAsync() {
  yield delay(1000)
  yield put({ type: 'INCREMENT' })
}

function* watchIncrementAsync() {
  yield takeEvery('INCREMENT_ASYNC', incrementAsync)
}

// notice how we now only export the rootSaga
// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([

    helloSaga(),
    watchIncrementAsync(),
    watchgetData()
  ])
}