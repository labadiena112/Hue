import { Platform } from "react-native";
import { applyMiddleware, compose, createStore } from "redux";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
import devTools from "remote-redux-devtools";
import rootReducer from "./reducers";

const ENABLE_LOGGER = false;

const logger = createLogger({
    predicate: (getState, action) => {
        return true;
    },
    collapsed: (getState, action, logEntry) => !logEntry.error
});
const middlewareStack = __DEV__ && ENABLE_LOGGER ? [logger, thunk] : [thunk];

const middleware = applyMiddleware(...middlewareStack);

const composeStack = __DEV__
    ? [
        middleware,
        devTools({
            name: Platform.OS,
            hostname: "192.168.1.207",
            port: 5678
        })
    ]
    : [middleware];

const store = createStore(rootReducer, compose(...composeStack));

export default store;
