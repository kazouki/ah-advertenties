import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import Artwork from "../../components/Artwork";

import { fetchArtworks } from "../../store/artwork/actions";
import { fetchArtworkDetail } from "../../store/artwork/actions";

import { addHeart } from "../../store/artwork/actions";
import { selectArtworks } from "../../store/artwork/selectors";
import { CardColumns } from "react-bootstrap";

export default function Homepage() {
  const dispatch = useDispatch();
  const selectedArtworks = useSelector(selectArtworks);

  useEffect(() => {
    dispatch(fetchArtworks());
  }, [dispatch]);

  const onGiveHeart = (id) => {
    dispatch(addHeart(id));
    dispatch(fetchArtworkDetail(id));
  };

  return (
    <>
      <Jumbotron>
        <span style={{ color: "royalblue" }}>
          <h1>Welcome to Heart Works</h1>
          create your own auctions or place bids on your favorite items!
        </span>
      </Jumbotron>
      <Container>
        <CardColumns>
          {selectedArtworks
            ? selectedArtworks.artworks.map((artwork) => {
                return (
                  <Artwork
                    key={artwork.id}
                    id={artwork.id}
                    title={artwork.title}
                    imageUrl={artwork.imageUrl}
                    hearts={artwork.hearts}
                    minimumBid={artwork.minimumBid}
                    activeBids={artwork.bids.length}
                    bidders={false}
                    showLink={true}
                    giveHeartParent={false}
                    giveHeart={onGiveHeart}
                    detailMode={false}
                  />
                );
              })
            : null}
        </CardColumns>
      </Container>
    </>
  );
}
