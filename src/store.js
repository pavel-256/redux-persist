import { configureStore } from "@reduxjs/toolkit";
import localForage from "localforage";
import { combineReducers } from "redux";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  persistReducer,
  autoRehydrate,
  createMigrate
} from "redux-persist";

import counterReducer from "./features/counter/counterSlice";
import switchReducer from "./features/switch/switchSlice";
import { encryptTransform } from "redux-persist-transform-encrypt";
import expireReducer from "redux-persist-expire";
import createCompressor from "redux-persist-transform-compress";
import expireIn from "redux-persist-transform-expire-in";

const manifest = {
  0: (state) => {
    console.log("state", state);

    return {
      ...state
    };
  },
  1: (state) => {
    return {
      ...state,
      isGood: true
    };
  },
  2: (state) => {
    console.log("state", state);
    return {
      ...state,
      testObj: {
        a: state,
        b: {
          c: 111
        }
      }
    };
  },
  3: (state) => {
    console.log("state", state);
    return {
      ...state,
      testObj: {
        a: state,
        b: {
          c: 111
        }
      }
    };
  },
  4: (state) => {
    return {
      ...state,
      testObj: {
        a: 1,
        b: {
          c: 111
        },
        d: 222
      }
    };
  }
};

const compressor = createCompressor();

const counterPersistConfig = {
  key: "ecp/counter",
  storage: localForage,
  // version: 4,
  // migrate: createMigrate(manifest, { debug: true }),
  transforms: [
    expireReducer("testObj", {
      // (Optional) Key to be used for the time relative to which store is to be expired
      // (Required) Seconds after which store will be expired
      expireSeconds: 60 * 60 * 24 * 7,
      // (Optional) State to be used for resetting e.g. provide initial reducer state
      expiredState: {},
      // (Optional) Use it if you don't want to manually set the time in the reducer i.e. at `persistedAtKey`
      // and want the store to  be automatically expired if the record is not updated in the `expireSeconds` time
      autoExpire: true
    }),
    compressor,
    encryptTransform({
      secretKey: "123456",
      onError: (err) => {
        console.log("err", err);
      }
    })
  ]
};

const switchPersistConfig = {
  key: "ecp/switch",
  storage: localForage
};

const reducers = combineReducers({
  // counter: counterReducer,
  switch: switchReducer,
  counter: persistReducer(counterPersistConfig, counterReducer)
  // switch: persistReducer(switchPersistConfig, switchReducer)
});

const persistConfig = {
  key: "root",
  keyPrefix: "reduxPrefix",
  storage: localForage,
  // whitelist: ["switch",],
  transforms: [
    // compressor,
    expireReducer("counter", {
      // (Optional) Key to be used for the time relative to which store is to be expired
      // (Required) Seconds after which store will be expired
      expireSeconds: 60 * 60 * 24 * 7,
      // (Optional) State to be used for resetting e.g. provide initial reducer state
      expiredState: {},
      // (Optional) Use it if you don't want to manually set the time in the reducer i.e. at `persistedAtKey`
      // and want the store to  be automatically expired if the record is not updated in the `expireSeconds` time
      autoExpire: true
    })
    // encryptTransform({
    //   secretKey: "123456",
    //   onError: (err) => {
    //     console.log("err", err);
    //   }
    // })
  ]
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: reducers,
  // reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
  // reducer: persistedReducer
});

export default store;
