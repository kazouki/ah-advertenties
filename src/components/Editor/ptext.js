import React from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

import DragHandle from "@material-ui/icons/DragHandle";

import AHCard from "../Board/Card";

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
  // OPTIONAL ::: set draggable to disabled
  const isDragDisabled = false;
  // const isDragDisabled = props.task.id === "task-1";

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
          <AHCard ptextId={props.ptext?.id} />

          <Handle isDragDisabled={isDragDisabled} {...provided.dragHandleProps}>
            <DragHandle />
          </Handle>
        </Container>
      )}
    </Draggable>
  );
}
