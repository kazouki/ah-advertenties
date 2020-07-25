import React from "react";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import ListGroup from "react-bootstrap/ListGroup";
import { BsFillHeartFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { Col } from "react-bootstrap";
import Row from "react-bootstrap/Row";

/////////
import Container from "@material-ui/core/Container";
import context from "react-bootstrap/esm/AccordionContext";

export default function CardView(props) {
  const onClickGiveHeart = (event) => {
    props.giveHeart(props.id);
  };

  // aangeboden,
  // gevraagd,
  // title,
  // description,
  // name,
  // telephone,
  // email,
  // date,
  // userId,
  // imageUrl,
  // minimumBid,

  return (
    <Container>
      <Container>
        <img variant="top" src={props.imageUrl} alt="" />
      </Container>
      <Container>{props.title}</Container>

      <Container>
        {props.giveHeartParent ? (
          <Button size="sm" variant="primary" onClick={props.giveHeart}>
            <BsFillHeartFill /> {props.hearts}
          </Button>
        ) : (
          <>
            <Button
              size="sm"
              variant="outline-primary"
              onClick={onClickGiveHeart}
            >
              <BsFillHeartFill /> {props.hearts}
            </Button>
          </>
        )}
      </Container>

      <Container>
        <b>bidding start amount is </b> {props.minimumBid}
        {props.minimumBid === 1 ? <b> dollar</b> : <b> dollars</b>}
      </Container>

      <Container>
        {props.bidders ? (
          <>
            {props.bidders.map((bidder) => (
              <span key={bidder.id}>
                <i>{bidder.email}</i> <b>has placed a bid of $</b>
                {bidder.amount}
              </span>
            ))}
          </>
        ) : (
          <span>
            <b>active bids</b> {props.activeBids}
          </span>
        )}
      </Container>
    </Container>
  );
}
