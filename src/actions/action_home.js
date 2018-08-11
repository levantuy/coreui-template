import { RSAA } from 'redux-api-middleware';
import { withAuth } from '../reducers'
//Notices list
export const FETCH_NOTICES = 'FETCH_NOTICES';
export const FETCH_NOTICES_SUCCESS = 'FETCH_NOTICES_SUCCESS';
export const FETCH_NOTICES_FAILURE = 'FETCH_NOTICES_FAILURE';
export const RESET_NOTICES = 'RESET_NOTICES';

//Notice item
export const CREATE_NOTICE = 'CREATE_NOTICE';
export const CREATE_NOTICE_SUCCESS = 'CREATE_NOTICE_SUCCESS';
export const CREATE_NOTICE_FAILURE = 'CREATE_NOTICE_FAILURE';
export const RESET_NOTICE_CREATE = 'RESET_NOTICE_CREATE';

//Notice item
export const DELETE_NOTICE = 'DELETE_NOTICE';
export const DELETE_NOTICE_SUCCESS = 'DELETE_NOTICE_SUCCESS';
export const DELETE_NOTICE_FAILURE = 'DELETE_NOTICE_FAILURE';
export const RESET_NOTICE_DELETE = 'RESET_NOTICE_DELETE';

//Search
export const SEARCH_NOTICE = 'SEARCH_NOTICE';
export const SEARCH_NOTICE_SUCCESS = 'SEARCH_NOTICE_SUCCESS';
export const SEARCH_NOTICE_FAILURE = 'SEARCH_NOTICE_FAILURE';

//#region NOTICES

const ROOT_URL = 'https://obscure-atoll-39265.herokuapp.com';
export const fetchNotices = () => ({
  [RSAA]: {
    endpoint: `${ROOT_URL}/Tasks`,    
    method: 'GET',
    headers: withAuth({ 'Content-Type': 'application/json' }),
    types: [
      FETCH_NOTICES, FETCH_NOTICES_SUCCESS, FETCH_NOTICES_FAILURE
    ]
  }
})

export const addNotice = (item) => ({
  [RSAA]: {
    endpoint: `${ROOT_URL}/Tasks`,    
    method: 'POST',
    body: JSON.stringify(item),
    headers: withAuth({ 'Content-Type': 'application/json' }),
    types: [
      CREATE_NOTICE, CREATE_NOTICE_SUCCESS, CREATE_NOTICE_FAILURE
    ]
  }
})

export const updateNotice = (item) => ({
  [RSAA]: {
    endpoint: `${ROOT_URL}/Tasks/` + item.NoticeId,    
    method: 'PUT',
    body: JSON.stringify(item),
    headers: withAuth({ 'Content-Type': 'application/json' }),
    types: [
      CREATE_NOTICE, CREATE_NOTICE_SUCCESS, CREATE_NOTICE_FAILURE
    ]
  }
})

export const deleteNotice = (noticeId) => ({
  [RSAA]: {
    endpoint: `${ROOT_URL}/Tasks/` + noticeId,    
    method: 'DELETE',
    // body: JSON.stringify(item),
    headers: withAuth({ 'Content-Type': 'application/json' }),
    types: [
      DELETE_NOTICE, DELETE_NOTICE_SUCCESS, DELETE_NOTICE_FAILURE
    ]
  }
})

export const searchNotice = (searchText) => ({
  [RSAA]: {
    endpoint: `${ROOT_URL}/Tasks/search/` + searchText,    
    method: 'GET',
    headers: withAuth({ 'Content-Type': 'application/json' }),
    types: [
      SEARCH_NOTICE, SEARCH_NOTICE_SUCCESS, SEARCH_NOTICE_FAILURE
    ]
  }
})

//#endregion

