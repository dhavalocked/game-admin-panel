import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

const middleware = getDefaultMiddleware({ serializableCheck: false });
const { createLogger } = require('redux-logger');
middleware.push(createLogger({ diff: true, collapsed: true }));

export default function makeStore(reducer) {
  return configureStore({
    middleware,
    reducer
  });
}
