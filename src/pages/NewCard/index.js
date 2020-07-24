import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createCard } from "../../store/artwork/actions";
import { selectUser } from "../../store/user/selectors";
import { selectToken } from "../../store/user/selectors";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import { Col } from "react-bootstrap";

export default function Auction() {
  const [state, setState] = useState({ cardFields: {} });

  const user = useSelector(selectUser);
  const userToken = useSelector(selectToken);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (!userToken) {
      history.push("/");
    }
  });

  const onCreateCard = (e) => {
    e.preventDefault();
    dispatch(
      createCard({
        aangeboden: state.cardFields.aangeboden,
        gevraagd: state.cardFields.gevraagd,
        title: state.cardFields.title,
        description: state.cardFields.description,
        name: state.cardFields.name,
        telephone: state.cardFields.telephone,
        email: state.cardFields.email,
        date: state.cardFields.date,
        userId: user.id,
        imageUrl: state.cardFields.imageUrl,
        minimumBid: state.cardFields.minimumBid,
        token: userToken,
      })
    );
  };

  const onFieldChangeHandler = (e) => {
    const newState = {
      ...state.cardFields,
      [e.target.name]:
        e.target.name !== "aangeboden" && e.target.name !== "gevraagd"
          ? e.target.value
          : e.target.checked,
    };
    setState(newState);
  };

  return (
    <div>
      <Container>
        <Form as={Col} md={{ span: 6, offset: 3 }} className="mt-5">
          <h1 className="mt-5 mb-5">Start a new auction</h1>
          <Form.Group>
            <Form.Label>Your Title</Form.Label>
            <Form.Control
              // value={formTitle}
              onChange={onFieldChangeHandler}
              type="text"
              placeholder="Enter Title"
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Minimum Bid</Form.Label>
            <Form.Control
              // value={formMinBid}
              onChange={onFieldChangeHandler}
              type="number"
              placeholder="Bid"
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Image URL</Form.Label>
            <Form.Control
              // value={formImg}
              onChange={onFieldChangeHandler}
              type="text"
              placeholder="http://"
              required
            />
          </Form.Group>

          <Form.Group className="mt-5">
            <Button variant="primary" type="submit" onClick={onCreateCard}>
              Create Auction
            </Button>
          </Form.Group>
        </Form>
      </Container>
    </div>
  );
}
