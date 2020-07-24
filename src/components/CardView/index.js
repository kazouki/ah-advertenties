import React from "react";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import ListGroup from "react-bootstrap/ListGroup";
import { BsFillHeartFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { Col } from "react-bootstrap";
import Row from "react-bootstrap/Row";

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
    <Card>
      cardview card is rendered ...
      {props.detailMode ? (
        <span style={{ display: "inline-block" }}>
          <Card.Img
            style={{ width: "50%" }}
            variant="top"
            src={props.imageUrl}
            alt=""
          />
        </span>
      ) : (
        <span>
          <Card.Img variant="top" src={props.imageUrl} alt="" />
        </span>
      )}
      <Card.Body>
        <Row>
          <Col>
            <Card.Title>{props.title}</Card.Title>
          </Col>
          <Col md={props.heartGrid}>
            {props.giveHeartParent ? (
              <Button
                size="sm"
                variant="outline-primary"
                onClick={props.giveHeart}
              >
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
          </Col>
        </Row>
        <Card.Text></Card.Text>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <b>bidding start amount is </b> {props.minimumBid}
            {props.minimumBid === 1 ? <b> dollar</b> : <b> dollars</b>}
          </ListGroup.Item>
        </ListGroup>

        <ListGroup variant="flush">
          {props.bidders ? (
            <>
              {props.bidders.map((bidder) => (
                <span key={bidder.id}>
                  <ListGroup.Item>
                    <i>{bidder.email}</i> <b>has placed a bid of $</b>
                    {bidder.amount}
                  </ListGroup.Item>
                </span>
              ))}
            </>
          ) : (
            <span>
              <ListGroup.Item>
                <b>active bids</b> {props.activeBids}
              </ListGroup.Item>
            </span>
          )}
          {props.showLink ? (
            <Link to={`/artworks/${props.id}`}>
              <Button variant="outline-secondary">View Card Details</Button>
            </Link>
          ) : null}
        </ListGroup>
      </Card.Body>
    </Card>
  );
}
