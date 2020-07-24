import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

// import "bootstrap/dist/css/bootstrap.min.css";

import CardView from "../../components/CardView";

import { fetchCardDetail } from "../../store/card/actions";
import { addHeart } from "../../store/card/actions";

import { postBid } from "../../store/card/actions";
import { getHighestBid } from "../../store/card/actions";
import { getUserWithStoredToken } from "../../store/user/actions";

import { selectCardDetail } from "../../store/card/selectors";
import { selectHighestBid } from "../../store/card/selectors";

import { selectToken } from "../../store/user/selectors";
import { selectUser } from "../../store/user/selectors";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Col } from "react-bootstrap";
import Row from "react-bootstrap/Row";

export default function CardDetail(props) {
  const [bidValue, setBidValue] = useState("default");
  const [tooLowAlert, setTooLowAlert] = useState("");

  const dispatch = useDispatch();
  const { id } = useParams();

  const cardDetail = useSelector(selectCardDetail);
  const highestBidAndId = useSelector(selectHighestBid);
  const userToken = useSelector(selectToken);
  const user = useSelector(selectUser);

  useEffect(() => {
    dispatch(fetchCardDetail(id));
    dispatch(getHighestBid(id));
    dispatch(getUserWithStoredToken());
  }, [dispatch, id]);

  const onGiveHeart = () => {
    dispatch(addHeart(id));
  };

  const onBidSubmitHandler = (e) => {
    e.preventDefault();

    dispatch(
      postBid({
        artworkId: id,
        amount:
          bidValue === "default" && highestBidAndId.highestBid
            ? highestBidAndId.highestBid + 1
            : bidValue === "default" && !highestBidAndId.highestBid
            ? cardDetail.minimumBid + 1
            : bidValue,
        email: user.email,
        token: user.token,
        highestBid: highestBidAndId.highestBid,
      })
    );
  };

  const onSetBidValue = (e) => {
    setBidValue(e.target.value);
    if (e.target.value < highestBidAndId.highestBid + 1) {
      setTooLowAlert(
        <b>
          <h5>The amount should be higher than the highest bid!</h5>
        </b>
      );
    } else setTooLowAlert("");
    if (!e.target.value) setTooLowAlert("");
  };

  return (
    <span>
      <Row>
        <Col>
          (CardDetail component) before CardView is rendered ...
          {cardDetail ? (
            <CardView
              key={cardDetail.id}
              id={cardDetail.id}
              title={cardDetail.title}
              imageUrl={cardDetail.imageUrl}
              hearts={cardDetail.hearts}
              minimumBid={cardDetail.minimumBid}
              activeBids={cardDetail.bids.length}
              bidders={cardDetail.bids}
              showLink={false}
              giveHeart={onGiveHeart}
              detailMode={true}
              heartGrid={10}
            />
          ) : null}
        </Col>
        {userToken ? (
          <span>
            <Col>
              <Card>
                <Card.Body>
                  <Form as={Col} md={{ span: 6, offset: 3 }} className="mt-5">
                    {highestBidAndId ? (
                      <span>
                        <Card.Title>
                          {highestBidAndId.highestBid ? (
                            <>
                              Highest bidder is{" "}
                              {highestBidAndId.highestBidEmail} with $
                              {highestBidAndId.highestBid}
                            </>
                          ) : (
                            <>be the first one to place a bid!</>
                          )}
                        </Card.Title>

                        <Form.Group controlId="formBasicNumber">
                          <Form.Label>
                            Place a bid (starting at $
                            {highestBidAndId.highestBid
                              ? `${highestBidAndId.highestBid + 1}`
                              : `${cardDetail.minimumBid}`}
                            )
                          </Form.Label>
                          <Form.Control
                            value={
                              bidValue === "default" &&
                              highestBidAndId.highestBid
                                ? highestBidAndId.highestBid + 1
                                : bidValue === "default" &&
                                  !highestBidAndId.highestBid
                                ? cardDetail.minimumBid + 1
                                : bidValue
                            }
                            onChange={onSetBidValue}
                            type="number"
                            min={
                              highestBidAndId
                                ? highestBidAndId.highestBid + 1
                                : cardDetail.minimumBid
                            }
                            placeholder="Bid"
                            required
                          />

                          <Button
                            variant="outline-secondary"
                            onClick={onBidSubmitHandler}
                          >
                            place bid
                          </Button>
                          {tooLowAlert}
                        </Form.Group>
                      </span>
                    ) : null}
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </span>
        ) : null}
      </Row>
    </span>
  );
}
