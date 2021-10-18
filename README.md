# deck-o-cards

## Homework

The purpose of this assignment is to figure a few things: your architecture and coding style, interpretation of requirements, and your creativity. We expect that this homework assignment will become a major conversation for our in-person interview.

Please create a javascript class that represents a deck of cards. Please include any methods or properties on the class that you think might be applicable to using a deck of cards. Create the UI for one game that will use this deck of cards. This game can be any game you like, even a game that you created just for this assignment

## Requirements

1. Create class that represents a deck of cards
1. Create an HTML/CSS UI for a game that interacts with this deck of cards class
1. Feel free to use a frontend framework :)
1. Please make sure there is a valid package.json file in the root of the repo
1. Upload this homework to a github repository

## Getting Started

Clone repository:

```shell
git clone https://github.com/flavioespinoza/deck-o-cards.git
```

Install dependencies:

```shell
yarn install
```

Start application:

```shell
yarn start
```

The app should be running on http://localhost:3000

## The game is WAR

1. Click the SHUFFLE CARDS button to start a new game.
1. Aces are high Twos are low.
1. Each player takes a turn selecting one card.
1. Whichever card has the highest value that player gets 1 point.
1. If each player picks a similar card such as the K♥ and the K♣ then neither player gets a point.
1. When all the cards are gone the player with the most points wins.
1. After you shuffle the cards you can click the SHOW CARDS button to view all the cards and verify they are shuffled sufficiently.
