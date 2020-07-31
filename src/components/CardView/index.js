import React from "react";

import { useSelector } from "react-redux";
import { selectUserFavs } from "../../store/card/selectors";
// import selectUser from "../../store/user/selectors"

import Button from "@material-ui/core/Button";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

/////////
import Container from "@material-ui/core/Container";

export default function CardView(props) {
  const userFavs = useSelector(selectUserFavs);
  // const user = useSelector(selectUser)

  const onClickAddToFavs = (event) => {
    props.giveHeart(props.id);
  };

  return (
    <Container>
      {/* <Container>
        <img variant="top" src={props.imageUrl} alt="" />
      </Container> */}
      <Container
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
        }}
      >
        <Button onClick={onClickAddToFavs}>
          {userFavs ? (
            <>
              {userFavs.map((e) => e.cardId).includes(props.id) ? (
                <div>
                  <FavoriteIcon color="primary" />
                </div>
              ) : (
                <div>
                  <FavoriteBorderIcon color="disabled" />
                </div>
              )}
            </>
          ) : (
            <FavoriteBorderIcon color="disabled" />
          )}
        </Button>
      </Container>
      <Container
        style={{ width: "90%", border: "1px solid royalblue", borderRadius: 5 }}
      >
        {props.title}
      </Container>
      <Container
        style={{
          marginTop: 5,
          width: "90%",
          border: "1px solid royalblue",
          borderRadius: 5,
        }}
      >
        {props.description ? (
          props.description
        ) : (
          <>
            <i>geen beschrijving</i>
          </>
        )}
      </Container>

      <Container style={{ marginTop: 10, marginBottom: 10 }}>
        <b>De minimum vraagprijs is </b> {props.minimumBid}
        <b> euro! </b>
      </Container>

      <Container>
        {props.bidders ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {props.bidders.map((bidder) => (
              <span key={bidder.id}>
                <i>{bidder.email}</i> <b>heeft een bod gedaan van </b>
                {bidder.amount}
                <b> euro</b>
              </span>
            ))}
          </div>
        ) : (
          <span>
            <b>active bids</b> {props.activeBids}
          </span>
        )}
      </Container>
    </Container>
  );
}
