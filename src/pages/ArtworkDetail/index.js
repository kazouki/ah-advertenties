import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import Artwork from "../../components/Artwork";

import { fetchArtworkDetail } from "../../store/artwork/actions";
import { addHeart } from "../../store/artwork/actions";

import { postBid } from "../../store/artwork/actions";
import { getHighestBid } from "../../store/artwork/actions";
import { getUserWithStoredToken } from "../../store/user/actions";

import { selectArtworkDetail } from "../../store/artwork/selectors";
import { selectHighestBid } from "../../store/artwork/selectors";

import { selectToken } from "../../store/user/selectors";
import { selectUser } from "../../store/user/selectors";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Col } from "react-bootstrap";
import Row from "react-bootstrap/Row";

export default function ArtworkDetail(props) {
  const [bidValue, setBidValue] = useState("default");
  const [tooLowAlert, setTooLowAlert] = useState("");

  const dispatch = useDispatch();
  const { id } = useParams();

  const artworkDetail = useSelector(selectArtworkDetail);
  const highestBidAndId = useSelector(selectHighestBid);
  const userToken = useSelector(selectToken);
  const user = useSelector(selectUser);

  useEffect(() => {
    dispatch(fetchArtworkDetail(id));
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
            ? artworkDetail.minimumBid + 1
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
          {artworkDetail ? (
            <Artwork
              key={artworkDetail.id}
              id={artworkDetail.id}
              title={artworkDetail.title}
              imageUrl={artworkDetail.imageUrl}
              hearts={artworkDetail.hearts}
              minimumBid={artworkDetail.minimumBid}
              activeBids={artworkDetail.bids.length}
              bidders={artworkDetail.bids}
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
                              : `${artworkDetail.minimumBid}`}
                            )
                          </Form.Label>
                          <Form.Control
                            value={
                              bidValue === "default" &&
                              highestBidAndId.highestBid
                                ? highestBidAndId.highestBid + 1
                                : bidValue === "default" &&
                                  !highestBidAndId.highestBid
                                ? artworkDetail.minimumBid + 1
                                : bidValue
                            }
                            onChange={onSetBidValue}
                            type="number"
                            min={
                              highestBidAndId
                                ? highestBidAndId.highestBid + 1
                                : artworkDetail.minimumBid
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
