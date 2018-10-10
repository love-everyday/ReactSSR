export const REQUEST_APPS = 'REQUEST_APPS'
export const RECEIVE_APPS = 'RECEIVE_APPS'


function requestApps() {
  return {
    type: REQUEST_APPS
  }
}

function receiveApps(json) {
  return {
    type: RECEIVE_APPS,
    apps: json
  }
}

function fetchApps() {
  return dispatch => {
    dispatch(requestApps())
    return fetch('http://search.video.iqiyi.com/o?if=pc&site=iqiyi&access_play_control_platform=17&showDate&ispurchase=&mode=11&ctgName=%E7%94%B5%E5%BD%B1&type=list&three_category_id=&p=11&p1=115&pos=1&pageSize=10&pageNum=1')
      .then(response => response.json())
      .then(json => dispatch(receiveApps(json)))
  }
}

function shouldFetchApps(state) {
  const apps = state.apps
  if (apps.length==0) {
    return true
  } else if (state.isFetching) {
    return false
  }
}

export function fetchAppsIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchApps(getState())) {
      return dispatch(fetchApps())
    }
  }
}
