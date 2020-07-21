import React, { useState } from "react";
import DndLayout from "./dndLayout";
import styled from "styled-components";

import TextField from "@material-ui/core/TextField";
import AddIcon from "@material-ui/icons/Add";

import { useDispatch, useSelector } from "react-redux";
import { selectLayoutState } from "../../store/editor/selectors";
import { selectContentDescription } from "../../store/editor/selectors";

import { nlpRequest } from "../../store/lookup/actions";
import { populatePtexts } from "../../store/lookup/actions";
import { addNewColumn } from "../../store/editor/actions";
import { setContentDescription } from "../../store/editor/actions";

const EditorContainer = styled.div`
  display: flex;
  // flex-direction: column;
  justify-content: center;
`;
const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  // justify-content: center;
  // background-color: lightblue;
  width: 800px;
`;
const DescriptionContainer = styled.div`
  // display: flex;
  // justify-content: center;
  width: 300px;
  margin-right: 80px;
  // background-color: royalblue;
`;
const AddContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
`;

export default function Editor() {
  const [editMode, setEditMode] = useState(false);
  const layoutState = useSelector(selectLayoutState);
  const contentDescription = useSelector(selectContentDescription);

  const dispatch = useDispatch();

  const onNlpRequest = () => {
    dispatch(nlpRequest(contentDescription));
  };

  const onPopulatePtexts = () => {
    dispatch(populatePtexts());
  };

  const onAddNewColumn = () => {
    dispatch(addNewColumn());
  };

  // function timeOutLatch() {

  //   setTimeout(() => {
  //     console.log("delayed!");

  //   }, 1000);
  // }

  const onChangeContentDescription = (e) => {
    dispatch(setContentDescription(e.target.value));
    setTimeout(() => {
      console.log("delayed!");
    }, 2000);
    // onNlpRequest();
  };

  return (
    <div>
      {/* <button onClick={onAddNewColumn}> */}
      {/* </button> */}
      <button onClick={onNlpRequest}>req</button>
      <button onClick={onPopulatePtexts}>pop</button>
      <EditorContainer>
        <DescriptionContainer>
          <TextField
            label="what are you thinking? ... "
            fullWidth={true}
            value={contentDescription}
            onChange={onChangeContentDescription}
            multiline
          />
        </DescriptionContainer>
        <LayoutContainer>
          <DndLayout layoutState={layoutState} />
          <AddContainer>
            <AddIcon onClick={onAddNewColumn} />
          </AddContainer>
        </LayoutContainer>
      </EditorContainer>

      {/* <AddContainer {...props}>
        <AddIcon onClick={onAddNewColumn} />
      </AddContainer> */}
    </div>
  );
}
