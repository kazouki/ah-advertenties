import React from "react";
import Column from "./column";
import styled from "styled-components";

import { RowMax } from "../../config/constants";

import { DragDropContext, Droppable } from "react-beautiful-dnd";

import { useDispatch, useSelector } from "react-redux";
import { selectLayoutState } from "../../store/editor/selectors";
import { selectCards } from "../../store/card/selectors";
import { selectPtextIdsPerColumn } from "../../store/editor/selectors";
// import { selectUser } from "../../store/user/selectors";

import { setLayoutState } from "../../store/editor/actions";
// import { updateCard } from "../../store/card/actions";
import { updateCardIndex } from "../../store/card/actions";
import { updatePtextCounts } from "../../store/editor/actions";

import { AH_BLUE } from "../../config/constants.js";

// import { RemoveScrollBar } from "react-remove-scroll-bar";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

function DndLayout(props) {
  const dispatch = useDispatch();
  const state = useSelector(selectLayoutState);
  const ptextIdsPerColumn = useSelector(selectPtextIdsPerColumn);
  const cards = useSelector(selectCards);
  // const user = useSelector(selectUser);

  // const cards = useSelector(selectCards);
  // console.log("cards :::", cards);
  // console.log("state :::", state);

  const onDragStart = (start) => {
    dispatch(updatePtextCounts(cards.cards));
    //###### optionals
    // document.body.style.color = "orange";
    // document.body.style.transition = "background-color 0.2s ease";
    //OPTIONAL::: creating rules for -not allowed to re-drop in old location-
    // const homeIndex = state.columnOrder.indexOf(start.source.droppableId);
    // setState({
    //   ...state,
    //   homeIndex: homeIndex,
    // });
    //TODO next clear this state onDragEnd
    //######
  };

  const onDragUpdate = (update) => {
    //###### optionals
    // const { destination } = update;
    // const opacity = destination
    //   ? destination.index / Object.keys(state.tasks).length
    //   : 0;
    // document.body.style.backgroundColor = `rgba(153,141,217, ${opacity})`;
    //######
  };

  const onDragEnd = (result) => {
    const cardToUpdate = cards?.cards.find(
      (obj) => obj.id === parseInt(result["draggableId"].split("-")[1])
    );
    if (result.destination) {
      const newDestination = parseInt(
        result.destination["droppableId"].split("-")[1]
      );
      const updatedCard = {
        ...cardToUpdate,
        cardId: cardToUpdate.id,
        columnIndex: newDestination,
      };

      // if (user.token)
      // dispatch(updateCard(updatedCard));
      dispatch(updateCardIndex(updatedCard));

      dispatch(updatePtextCounts(cards?.cards));
    }

    //###### optionals
    // document.body.style.color = "inherit";
    // document.body.style.background = "white";

    //OPTIONAL::: clearing the rules for -not allowed to re-drop in old location-
    // setState({
    //   ...state,
    //   homeIndex: null,
    // });
    //######

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
        return;

        //###### optionals
        //e.g.  request endpoint POST "reorder occurred"
        //######
      }

      // Moving from one list to another
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
      return;
    }
  };
  return (
    <div
      style={{ background: "linear-gradient(45deg, #989898 30%, #BEBEBE 90%)" }}
    >
      <DragDropContext
        onDragStart={onDragStart}
        onDragUpdate={onDragUpdate}
        onDragEnd={onDragEnd}
      >
        <Droppable
          droppableId="all-columns"
          direction="horizontal"
          type="column"
        >
          {(provided) => (
            <Container {...provided.droppableProps} ref={provided.innerRef}>
              {state.columnOrder.map((columnId, index) => {
                const column = state.columns[columnId];
                const ptexts = column.ptextIds.map(
                  (ptextId) => state.ptexts[ptextId]
                );

                //###### optionals
                // creating rule: only drop in next column allowed
                // const isDropDisabled = index < state.homeIndex;
                //######

                return (
                  <span
                    id="cardBackgroundPlate"
                    key={column.id}
                    style={{
                      margin: -20,
                      marginTop: -60,
                      border: `40px solid ${AH_BLUE}`,
                      height: "100%",
                    }}
                  >
                    <Column
                      column={column}
                      ptexts={ptexts}
                      isDropDisabled={
                        ptextIdsPerColumn
                          ? ptextIdsPerColumn[columnId] >= RowMax
                          : false
                      }
                      index={index}
                    />
                    <span
                      id="glueStrip"
                      style={{
                        overflow: "hidden",
                        position: "relative",
                        top: -38,
                        left: -70,
                      }}
                    >
                      <hr
                        style={{
                          border: 0,
                          width: "110%",
                          color: "white",
                          background:
                            "linear-gradient(to bottom right, #E8E8E8, white)",
                          height: "50px",
                        }}
                      ></hr>
                      <hr
                        style={{
                          border: 0,
                          width: "110%",
                          color: "grey",
                          background:
                            "linear-gradient(to bottom right, #DCDCDC, white)",
                          height: "50px",
                          marginTop: -10,
                        }}
                      ></hr>
                    </span>
                  </span>
                );
              })}
              {provided.placeholder}
            </Container>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default DndLayout;
