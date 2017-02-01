"use strict"

export const ActionTypes = {
  CHANGE_PAGE_NUMBER: '@@redux-pagination/CHANGE_PAGE_NUMBER',
  GET_PAGE: '@@redux-pagination/GET_PAGE',
  GET_PAGE_SUCCESS: '@@redux-pagination/GET_PAGE_SUCCESS',
  GET_PAGE_FAIL: '@@redux-pagination/GET_PAGE_FAIL'
}

export const initActionCreators = (config) => {
  const path = config.path
  const limit = config.limit || 50

  return {
    getPage(pageNumber) {
      return (dispatch) => {
        // Change the page number
        dispatch({
          type: ActionTypes.CHANGE_PAGE_NUMBER,
          result: pageNumber
        })

        // Get the page
        return dispatch({
          types: [ActionTypes.GET_PAGE, ActionTypes.GET_PAGE_SUCCESS, ActionTypes.GET_PAGE_FAIL],
          promise: (client) => client.get(path, {
            params: {
              page: pageNumber,
              limit: limit
            }
          })
        })
      }
    }
  }
}

// higher order reducer
export default function paginate (reducer) {
  const initialState = {
    ...reducer(undefined, {}),
    loadingPage: false,
    initialLoad: false,
    currentPage: 1,
    totalPages: 1,
    fail: {},
    list: []
  }

  return (state = initialState, action = {}) => {
    switch (action.type) {
      case ActionTypes.CHANGE_PAGE_NUMBER:
        return {
          ...state,
          fail: {},
          currentPage: action.result
        }
      case ActionTypes.GET_PAGE:
        return {
          ...state,
          fail: {},
          loadingPage: true
        }
      case ActionTypes.GET_PAGE_SUCCESS:
        return {
          ...state,
          fail: {},
          loadingPage: false,
          initialLoad: true,
          list: action.result.list,
          totalPages: action.result.totalPages
        }
      case ActionTypes.GET_PAGE_FAIL:
        return {
          ...state,
          initialLoad: true,
          fail: action.result
        }
      default:
        return reducer(state, action)
    }
  }
}
