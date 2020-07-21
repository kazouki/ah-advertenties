import React from "react";
import styled from "styled-components";
// import Ptext from "./ptext";
import AHCard from "../Board/Card.js";
import Paper from "@material-ui/core/Paper";
import { Droppable, Draggable } from "react-beautiful-dnd";

//flex-direction / flex-grow / min-height   are essential
const Container = styled.div`
  margin: 40px;
`;
const Title = styled.h3`
  position: relative;
  padding: 30px;
  // background: red;
  bottom: -80px;
  color: transparent;
`;

export default function Column(props) {
  return (
    <Draggable draggableId={props.column.id} index={props.index}>
      {(provided) => (
        <Container {...provided.draggableProps} ref={provided.innerRef}>
          <Title {...provided.dragHandleProps}>
            ------------------------------------------
          </Title>
          <AHCard boxshadowdepth={props.isDragging} />
        </Container>
      )}
    </Draggable>
  );
}
