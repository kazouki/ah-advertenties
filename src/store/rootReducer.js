import { combineReducers } from "redux";
// import appState from "./appState/reducer";
// import user from "./user/reducer";
import lookupSliceReducer from "./lookup/reducer";
import editorSliceReducer from "./editor/reducer";

export default combineReducers({
  //   appState,
  //   user,
  lookupSliceReducer,
  editorSliceReducer,
});
