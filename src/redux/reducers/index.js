import ThemeReducer from "./ThemeReducer"
import OrderReducer from "./OrderReducer"
import StatictisReducer from './StatictisReducer'
import { combineReducers } from "redux"

const rootReducer = combineReducers({ThemeReducer, OrderReducer, StatictisReducer})

export default rootReducer