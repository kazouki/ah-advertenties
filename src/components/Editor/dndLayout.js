import React, { useState } from "react";
import initialData from "./initial-data";
import Column from "./column";
import styled from "styled-components";

import { DragDropContext, Droppable } from "react-beautiful-dnd";

import { useDispatch, useSelector } from "react-redux";
import { setLayoutState } from "../../store/editor/actions";

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

function DndLayout(props) {
  // const [state, setState] = useState(props.layoutState);
  const dispatch = useDispatch();
  // const state = props.layoutState;
  const state = initialData;

  const onDragStart = (start) => {
    // document.body.style.color = "orange";
    // document.body.style.transition = "background-color 0.2s ease";
    //OPTIONAL::: creating rules for -not allowed to re-drop in old location-
    // const homeIndex = state.columnOrder.indexOf(start.source.droppableId);
    // setState({
    //   ...state,
    //   homeIndex: homeIndex,
    // });
    //TODO next clear this state onDragEnd
  };

  const onDragUpdate = (update) => {
    // const { destination } = update;
    // const opacity = destination
    //   ? destination.index / Object.keys(state.tasks).length
    //   : 0;
    // document.body.style.backgroundColor = `rgba(153,141,217, ${opacity})`;
  };

  const onDragEnd = (result) => {
    // document.body.style.color = "inherit";
    // document.body.style.background = "white";

    //OPTIONAL::: clearing the rules for -not allowed to re-drop in old location-
    // setState({
    //   ...state,
    //   homeIndex: null,
    // });

    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    //Column reordering logic
    if (type === "column") {
      const newColumnOrder = Array.from(state.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      const newState = {
        ...state,
        columnOrder: newColumnOrder,
      };
      dispatch(setLayoutState(newState));
      // setState(newState);
      return;
    }

    if (state.columns) {
      const start = state.columns[source.droppableId];
      const finish = state.columns[destination.droppableId];

      if (start === finish) {
        const newPtextIds = Array.from(start.ptextIds);
        //splice (from index - remove 1 item)
        newPtextIds.splice(source.index, 1);
        //splice (on index - insert - item)
        newPtextIds.splice(destination.index, 0, draggableId);

        const newColumn = {
          ...start,
          ptextIds: newPtextIds,
        };

        const newState = {
          ...state,
          columns: {
            ...state.columns,
            [newColumn.id]: newColumn,
          },
        };
        dispatch(setLayoutState(newState));
        // setState(newState);
        return;
        //e.g.  request endpoint POST "reorder occurred"
      }

      //moving from one list to another

      const startPtextIds = Array.from(start.ptextIds);
      startPtextIds.splice(source.index, 1);
      const newStart = {
        ...start,
        ptextIds: startPtextIds,
      };

      const finishPtextIds = Array.from(finish.ptextIds);
      finishPtextIds.splice(destination.index, 0, draggableId);
      const newFinish = {
        ...finish,
        ptextIds: finishPtextIds,
      };

      const newState = {
        ...state,
        columns: {
          ...state.columns,
          [newStart.id]: newStart,
          [newFinish.id]: newFinish,
        },
      };
      dispatch(setLayoutState(newState));
      // setState(newState);
      return;
    }
  };
  return (
    <DragDropContext
      onDragStart={onDragStart}
      onDragUpdate={onDragUpdate}
      onDragEnd={onDragEnd}
    >
      <Droppable droppableId="all-columns" direction="horizontal" type="column">
        {(provided) => (
          <Container {...provided.droppableProps} ref={provided.innerRef}>
            {state.columnOrder.map((columnId, index) => {
              const column = state.columns[columnId];
              const ptexts = column.ptextIds.map(
                (ptextId) => state.ptexts[ptextId]
              );

              //creating rule: only drop in next column allowed
              // const isDropDisabled = index < state.homeIndex;

              return (
                <Column
                  key={column.id}
                  column={column}
                  ptexts={ptexts}
                  isDropDisabled={false}
                  index={index}
                />
              );
            })}
            {provided.placeholder}
          </Container>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default DndLayout;
