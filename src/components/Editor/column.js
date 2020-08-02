import React from "react";
import styled from "styled-components";
import Ptext from "./ptextModal";

import Paper from "@material-ui/core/Paper";

import { Droppable } from "react-beautiful-dnd";

//##### optionals
// import { Draggable } from "react-beautiful-dnd";
//#####

//flex-direction / flex-grow / min-height   are essential
const Container = styled.div`
  margin: 8px;
  /* border: 1px solid lightgrey; */

  border-radius: 6px;
  // width: 800px;
  background-color: white;

  display: flex;
  flex-direction: column;
`;

//##### optionals
// const Title = styled.h3`
//   padding: 8px;
// `;
//#####

const PtextList = styled.div`
  padding: 8px;
  transition: background-color 0.3s ease;
  background-color: ${(props) => (props.isDraggingOver ? "white" : "inherit")};
  // flex-grow: 1;
  min-height: 280px;

  display: flex;
`;

export default function Column(props) {
  return (
    /*
    ### optional draggable droppables
     <Draggable draggableId={props.column.id} index={props.index}>
     {(provided) => (
     <Container {...provided.draggableProps} ref={provided.innerRef}>
    */
    <Container>
      <Paper>
        {/* ### provide drag handle for draggable droppable */}
        {/* <Title {...provided.dragHandleProps}>{props.column.title}</Title> */}
        <span>{props.column.title}</span>

        <Droppable
          droppableId={props.column?.id}
          type="active"
          //create droppable rules based on 'type' assignment
          //  type={props.column.id === "column-3" ? "done" : "active"}
          //disable the dropping draggables on this droppable

          isDropDisabled={props.isDropDisabled}
          direction="horizontal"
        >
          {(provided, snapshot) => (
            <PtextList
              ref={provided.innerRef}
              {...provided.droppableProps}
              isDraggingOver={snapshot.isDraggingOver}
            >
              {props.ptexts
                ? props.ptexts.map((ptext, index) => (
                    <Ptext key={ptext?.id} ptext={ptext} index={index} />
                  ))
                : null}
              {provided.placeholder}
            </PtextList>
          )}
        </Droppable>
      </Paper>
    </Container>
    /*
    // ### closing for draggable droppables
     )}
     </Draggable>
    */
  );
}
