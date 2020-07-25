import { combineReducers } from "redux";
import appState from "./appState/reducer";
import user from "./user/reducer";
import lookupSliceReducer from "./lookup/reducer";
import editorSliceReducer from "./editor/reducer";
import cardsSliceReducer from "./card/reducer";
import messagesSliceReducer from "./message/reducer";

export default combineReducers({
  appState,
  user,
  lookupSliceReducer,
  editorSliceReducer,
  cardsSliceReducer,
  messagesSliceReducer,
});
