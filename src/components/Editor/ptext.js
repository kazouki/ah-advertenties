import React from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

import DragHandle from "@material-ui/icons/DragHandle";

import AHCard from "../Board/Card";

import { setLayoutState } from "../../store/editor/actions";
import { useDispatch, useSelector } from "react-redux";
import { selectLayoutState } from "../../store/editor/selectors";

const Container = styled.div`
  /* border: 1px solid lightgrey; */
  border-radius: 5px;
  padding: 8px;
  margin-bottom: 10px;
  // background-color: ${(props) => (props.isDragging ? "white" : "white")};

  display: flex;
`;

const Handle = styled.div`
  width: 25px;
  height: 20px;
  /* background-color: ${(props) =>
    props.isDragDisabled ? "grey" : "orange"}; */
  //  background-color: white;
  color: white; 
  position: relative;
  left: -30px;
`;

export default function Ptext(props) {
  const dispatch = useDispatch();
  const layoutState = useSelector(selectLayoutState);

  // OPTIONAL ::: set draggable to disabled
  const isDragDisabled = false;
  // const isDragDisabled = props.task.id === "task-1";

  const onTextChangeHandler = (e) => {
    const newState = {
      ...layoutState,
      ptexts: {
        ...layoutState.ptexts,
        [props.ptext?.id]: {
          ...layoutState.ptexts[props.ptext?.id],
          content: e.target.value,
        },
      },
    };
    dispatch(setLayoutState(newState));
  };

  return (
    <Draggable
      isDragDisabled={isDragDisabled}
      draggableId={props.ptext?.id}
      index={props.index}
    >
      {(provided, snapshot) => (
        <Container
          isDragDisabled={isDragDisabled}
          {...provided.draggableProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          <div>
            <AHCard ptextId={props.ptext?.id} />
          </div>
          <Handle isDragDisabled={isDragDisabled} {...provided.dragHandleProps}>
            <DragHandle />
          </Handle>
          {/* {props.ptext?.content} */}
          {/* <TextField
            id="standard-multiline-flexible"
            label=""
            multiline
            fullWidth={true}
            // rowsMax={4}
            // value={layoutState.ptexts[props.ptext?.id].content}
            onChange={onTextChangeHandler}
          /> */}
        </Container>
      )}
    </Draggable>
  );
}
