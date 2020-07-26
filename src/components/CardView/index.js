import React from "react";

import Button from "react-bootstrap/Button";

import { BsFillHeartFill } from "react-icons/bs";

/////////
import Container from "@material-ui/core/Container";

export default function CardView(props) {
  const onClickGiveHeart = (event) => {
    props.giveHeart(props.id);
  };

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
