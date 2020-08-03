import api from "../../api";
import { setLayoutState } from "../editor/actions.js";

// temp
export function populatePtexts() {
  return (dispatch, getState) => {
    const layoutState = getState().editorSliceReducer.layoutState;
    const columns = layoutState.columns;
    const sentences = getState().lookupSliceReducer.sentences;
    let newPtexts = {};
    let newPtextIds = [];

    sentences.forEach((sentence, index) => {
      newPtextIds.push(`ptext-${index}`);
      newPtexts[`ptext-${index}`] = { id: `ptext-${index}`, content: sentence };
    });

    const newState = {
      ...layoutState,
      columns: {
        ...columns,
        "column-1": { id: "column-1", title: "part 1", ptextIds: newPtextIds },
      },
      ptexts: newPtexts,
    };

    dispatch(setLayoutState(newState));
  };
}
