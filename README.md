Redux Pagination
=========================

Pagination utilities (action creators, higher order reducer) for [Redux](https://github.com/rackt/redux).  

## Note!

The current implementation makes a lot of assumptions about your api, heavily 
depends on [redux-thunk](https://github.com/gaearon/redux-thunk) and this [middleware](https://github.com/erikras/react-redux-universal-hot-example/blob/master/src/redux/middleware/clientMiddleware.js)!
You should really look at the [code](https://github.com/vhpoet/redux-pagination/blob/master/src/index.js) before trying to use this.

## Installation 

```
npm install --save redux-pagination
```

## API

```js
import paginate from 'redux-pagination'
paginate(reducer)
paginate(reducer, config)
```

## Adding pagination to your reducers

`redux-pagination` is a reducer enhancer (higher-order reducer), it provides the 
paginate function, which takes an existing reducer and a configuration object 
and enhances your existing reducer with pagination functionality.

To install, firstly import `redux-pagination`

```js
// Redux utility functions
import { combineReducers } from 'redux'
// redux-pagination higher-order reducer
import paginate from 'redux-pagination';
```

Then, add `paginate` to your reducer(s) like this:

```js
combineReducers({
  history: paginate(history)
})
```

## Pagination Actions

Import the action creator init function:

```js
import { initActionCreators } from 'redux-pagination';
```

Init the Action Creators

```js
const paginationActionCreators = initActionCreators({
  limit: 30, // number of items per page
  path: '/payments' // path to the make the call to
})
```

Then, you can use `store.dispatch()` and the pagination action creators to
perform pagination operations on your state:

```js
store.dispatch(paginationActionCreators.getPage(pageNumber))
```

## TODO
- add tests
- add caching
- don't make assumptions about the api
- don't depend on a specific client
- don't depend on specific url params
- don't depend on that middleware I mentioned above

## License

MIT, see `LICENSE.md`.