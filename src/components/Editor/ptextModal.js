import React from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

import DragHandle from "@material-ui/icons/DragHandle";
import CreateIcon from "@material-ui/icons/Create";

import AHCard from "../Board/Card";

// ##################  modal config
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

function CardModal(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

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
            <AHCard ptextId={props.ptextId} />
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
// ##################

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
  left: -60px;
  top: 2px;
`;

export default function Ptext(props) {
  //###### optionals
  // set draggable to disabled
  const isDragDisabled = false;
  // const isDragDisabled = props.task.id === "task-1";
  //######

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
          <PencilIcon>
            <CardModal ptextId={props.ptext?.id} />
          </PencilIcon>

          <Handle isDragDisabled={isDragDisabled} {...provided.dragHandleProps}>
            <DragHandle />
          </Handle>
        </Container>
      )}
    </Draggable>
  );
}
