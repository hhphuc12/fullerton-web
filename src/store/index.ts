import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { logger } from 'redux-logger';
import recuders from './reducers';
import sagas from './sagas';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  recuders,
  applyMiddleware(sagaMiddleware, logger)
);

sagaMiddleware.run(sagas);

export default store;
