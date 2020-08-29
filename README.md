<p align="center">
<img src="https://i.ibb.co/B6vDcjX/Screenshot-2020-08-08-at-20-09-31.png" alt="Screenshot-2020-08-08-at-20-09-31" width="50%" border="0">
</p>

## install & run

* $ npm i && npm run


<a href="https://suspicious-leavitt-350441.netlify.app/">Ah-advertenties</a> is a digital remake of the classic Albert Heijn goods & services bulletin board
found in their dutch supermarkets. 
This visual layout represents the first version of their board.

## feats

---- Create and move cards
* as a user you can create a new card which will appear on the next first available location on the board.
if a row already has 4 cards or more, the new card will be placed onto the next row with an empty spot.
* the user has two ways to create a new card, by filling out a form to create a pre-filled out card, or an empty one.
* the user can use the toolbar on his card to edit the contents in a modal screen.
* as a user you are able to move cards around by dragging the drag handle on the card.
* when a row contains 4 or more cards, the user is only able to remove cards from the row.

---- Place bids
* as a user you can open any card using the on-card toolbar and place a bid or open the detail menu modal by clicking the toolbar icons.
in the detail modal you are able to "like" the card. If the card has "offer" / "aangeboden"  checked, the user will be able to place a bid.
* the minimun amount of the bid has to 1 euro higher than the highest bid placed,
the user is able to see all the other users who placed bids in the detail modal.


---- Messaging
* as a user you are able to open the messaging page from the detail modal by clicking the "send message" button.
This button along with the bidding input and the like button will only be active once the user logs in.
* the mail icon in the navbar will indicate whether you as a user have any new messages and how many.
* clicking the mail icon will open the messaging page which lets you open conversations and send new messages.

---- Favorites
* as a user you are able to view your favorite (liked) cards and a users own cards by going to either of the options on the 
'Favorites'/'mijn kaarten' link in the navbar.


## stack 

---- Server
* postgreSQL
* sequelize ORM
* NodeJS
* Express

---- Client
* NodeJS
* Axios
* React
* Material-UI
* React-beautiful-dnd






