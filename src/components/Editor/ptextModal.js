import React from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

import DragHandle from "@material-ui/icons/DragHandle";
import CreateIcon from "@material-ui/icons/Create";
import EmojiPeopleIcon from "@material-ui/icons/EmojiPeople";
import DeleteIcon from "@material-ui/icons/Delete";

import AHCard from "../Board/Card";

import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

import { useDispatch, useSelector } from "react-redux";

import { selectLayoutState } from "../../store/editor/selectors";
// import { selectUser } from "../../store/user/selectors";
import { selectUserCardIds } from "../../store/user/selectors";
import { selectCardDetail } from "../../store/card/selectors";
import { selectCards } from "../../store/card/selectors";

import { setLayoutState } from "../../store/editor/actions";
import { deleteCard } from "../../store/card/actions";

import { fetchCardDetail } from "../../store/card/actions";
import { fetchMessages } from "../../store/message/actions";
import { getHighestBid } from "../../store/card/actions";

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

const PencilIcon = styled.div`
  width: 0;
  color: white;
  position: relative;
  left: -120px;
  top: 2px;
`;
const PeopleIcon = styled.div`
  width: 0;
  color: white;
  position: relative;
  left: -60px;
  top: 2px;
`;
const GarbageIcon = styled.div`
  width: 0;
  color: white;
  position: relative;
  left: -90px;
  top: 2px;
`;

// ##################  modal
const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

function CardModal(props) {
  const layoutState = useSelector(selectLayoutState);
  const dispatch = useDispatch();

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const saveCardStateToStore = (state) => {
    dispatch(setLayoutState(state));
    handleClose();
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <CreateIcon onClick={handleOpen} fontSize="small" />
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div>
            <AHCard
              ptextId={props.ptextId}
              editDisabled={false}
              initState={layoutState}
              saveStateTo={saveCardStateToStore}
            />
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
// ##################

export default function Ptext(props) {
  // const user = useSelector(selectUser);
  // const userId = user.id;

  const userCardIds = useSelector(selectUserCardIds);
  const layoutState = useSelector(selectLayoutState);
  const cardDetail = useSelector(selectCardDetail);
  const allCards = useSelector(selectCards);
  const dispatch = useDispatch();
  const cardId = props.ptext?.id.split("-")[1];

  //###### optionals
  // set draggable to disabled
  const isDragDisabled = false;
  // const isDragDisabled = props.task.id === "task-1";
  //######

  function SwitchToolbar() {
    const userOwnsCard = userCardIds?.includes(parseInt(cardId));
    const cardOwnerId = allCards?.cards.find(
      (card) => card.id === parseInt(cardId)
    );
    function RenderPeopleIcon() {
      return (
        <>
          <PeopleIcon>
            <Link
              onClick={() => {
                dispatch(fetchCardDetail(cardId));
                // TODO  include cardOwnerId in router response
                // const cardOwnerId = cardDetail.userId;
                dispatch(getHighestBid(cardId));
                if (cardOwnerId)
                  dispatch(fetchMessages({ cardOwnerId: cardOwnerId.userId }));
              }}
              to={`/carddetail/${cardId}`}
              style={{ cursor: "default", outline: "none" }}
            >
              <EmojiPeopleIcon style={{ color: "white" }} fontSize="small" />
            </Link>
          </PeopleIcon>
        </>
      );
    }
    if (userOwnsCard) {
      return (
        <>
          <RenderPeopleIcon />
          <GarbageIcon>
            <DeleteIcon
              style={{ color: "white" }}
              fontSize="small"
              onClick={() => dispatch(deleteCard(cardId))}
            />
          </GarbageIcon>
          <PencilIcon>
            <CardModal ptextId={props.ptext?.id} />
          </PencilIcon>
        </>
      );
    }
    return (
      <>
        <RenderPeopleIcon />
      </>
    );
  }

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
          <AHCard
            ptextId={props.ptext?.id}
            editDisabled={true}
            initState={layoutState}
          />

          <SwitchToolbar />
          {/* TODO   check if card.userId === user.id*/}
          {/* {console.log("cardId in ptextModal ", cardId)} */}
          {/* {console.log("userId in ptextModal ", userId)} */}

          {/* <GarbageIcon>
            <DeleteIcon
              style={{ color: "white" }}
              fontSize="small"
              onClick={() => dispatch(deleteCard(cardId))}
            />
          </GarbageIcon>
          <PeopleIcon>
            <Link
              to={`/carddetail/${cardId}`}
              style={{ cursor: "default", outline: "none" }}
            >
              <EmojiPeopleIcon style={{ color: "white" }} fontSize="small" />
            </Link>
          </PeopleIcon>

          <PencilIcon>
            <CardModal ptextId={props.ptext?.id} />
          </PencilIcon> */}

          <Handle isDragDisabled={isDragDisabled} {...provided.dragHandleProps}>
            <DragHandle />
          </Handle>
        </Container>
      )}
    </Draggable>
  );
}
