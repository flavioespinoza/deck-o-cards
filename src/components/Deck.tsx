import React from 'react';
import wait from 'wait';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import PlayingCard from './PlayingCard';

interface PlayingCardObj {
  value: number;
  name: string;
  suite: string;
  color: string;
  index: number;
}

interface IState {
  cards: PlayingCardObj[];
  card: PlayingCardObj;
  names: string[];
  values: number[];
  suites: string[];
  selectedOne: PlayingCardObj;
  selectedTwo: PlayingCardObj;
  scoreOne: number;
  scoreTwo: number;
  count: number;
  hideCards: boolean;
  disable: boolean;
}

class Deck extends React.Component<{}, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      cards: [],
      card: { index: -1, value: 0, name: '', suite: '', color: '' },
      names: ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'],
      values: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
      suites: ['♠', '♥', '♦', '♣'],
      selectedOne: { index: -1, value: 0, name: '', suite: '', color: '' },
      selectedTwo: { index: -1, value: 0, name: '', suite: '', color: '' },
      scoreOne: 0,
      scoreTwo: 0,
      count: 0,
      hideCards: true,
      disable: false,
    };
  }

  shuffle = (array: PlayingCardObj[]) => {
    let currentIndex = array.length;
    let randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Select a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // Swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    for (let i = 0; i < array.length; i++) {
      array[i].index = i;
    }
    return array;
  };

  handleShuffle = async () => {
    let temp = [];
    for (let i = 0; i < this.state.suites.length; i++) {
      let color = 'black';
      if (this.state.suites[i] === '♥' || this.state.suites[i] === '♦') {
        color = 'red';
      }
      for (let n = 0; n < this.state.names.length; n++) {
        temp.push({
          index: -1,
          value: this.state.values[n],
          name: this.state.names[n],
          suite: this.state.suites[i],
          color: color,
        });
      }
    }
    this.shuffle(temp);
    this.setState({
      cards: [...temp],
    });
  };

  handleClear = async () => {
    this.setState({
      cards: [],
      selectedOne: { index: -1, value: 0, name: '', suite: '', color: '' },
      selectedTwo: { index: -1, value: 0, name: '', suite: '', color: '' },
      scoreOne: 0,
      scoreTwo: 0,
      count: 0,
      hideCards: true,
      disable: false,
    });
  };

  clearDisable = async () => {
    this.setState({
      disable: false,
    })
  }

  shuffleCards = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await this.handleClear();
    await this.handleShuffle();
  };

  setCard = async (card: PlayingCardObj) => {
    if (this.state.count === 0) {
      this.setState({
        selectedOne: card,
        count: 1,
      });
    } else {
      this.setState({
        selectedTwo: card,
        count: 2,
        disable: true,
      });
    }
  };

  removeCard = async (card: PlayingCardObj) => {
    this.setState({
      cards: this.state.cards.filter(function (obj: PlayingCardObj) {
        return obj.index !== card.index;
      }),
    });
  };

  calculateWinner = async () => {
    console.log('calculateWinner');
    if (this.state.selectedOne.value === this.state.selectedTwo.value) {
      this.setState({
        selectedOne: { index: -1, value: 0, name: '', suite: '', color: '' },
        selectedTwo: { index: -1, value: 0, name: '', suite: '', color: '' },
        count: 0,
      });
    } else if (this.state.selectedOne.value > this.state.selectedTwo.value) {
      this.setState((prevState, props) => ({
        selectedOne: { index: -1, value: 0, name: '', suite: '', color: '' },
        selectedTwo: { index: -1, value: 0, name: '', suite: '', color: '' },
        scoreOne: prevState.scoreOne + 1,
        count: 0,
      }));
    } else {
      this.setState((prevState, props) => ({
        selectedOne: { index: -1, value: 0, name: '', suite: '', color: '' },
        selectedTwo: { index: -1, value: 0, name: '', suite: '', color: '' },
        scoreTwo: prevState.scoreTwo + 1,
        count: 0,
      }));
    }
    await this.clearDisable();
  };

  selectCard = async (card: PlayingCardObj) => {
    await this.removeCard(card);
    await this.setCard(card);
    // wait 4 seconds so players can view cards
    await wait(4000);
    if (this.state.count === 2) {
      await this.calculateWinner();
    }
  };

  showCards = () => {
    this.setState({
      hideCards: false,
    });
  };

  hideCards = () => {
    this.setState({
      hideCards: true,
    });
  };

  render() {
    const myCards = this.state.cards.map((obj, i) => (
      <Button
        key={i}
        style={{ color: obj.color }}
        disabled={this.state.disable}
        onClick={() => this.selectCard(obj)}
      >
        <PlayingCard
          {...{
            value: obj.value,
            name: obj.name,
            suite: obj.suite,
            color: obj.color,
            hide: this.state.hideCards,
          }}
        />
      </Button>
    ));
    return (
      <Box sx={{ padding: 12 }}>
        <Box sx={{ display: 'block', textAlign: 'left', margin: 2 }}>
          <Typography variant='h3' color='black' gutterBottom>
            The game is WAR!
          </Typography>
          <Box sx={{ textAlign: 'left' }}>
            <ol className='list'>
              <li>Click the SHUFFLE CARDS button to start a new game.</li>
              <li>Aces are high Twos are low.</li>
              <li>Each player takes a turn selecting one card.</li>
              <li>
                Whichever card has the highest value that player gets 1 point.
              </li>
              <li>If each player picks a similar card such as the K♥ and the K♣ then neither player gets a point.</li>
              <li>When all the cards are gone the player with the most points wins!</li>
            </ol>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', paddingTop: 4 }}>
          <div>
            <Typography variant='h5' color='gray' gutterBottom>
              Player A: {this.state.scoreOne}
            </Typography>
            <PlayingCard
              {...{
                value: this.state.selectedOne.value,
                name: this.state.selectedOne.name,
                suite: this.state.selectedOne.suite,
                color: this.state.selectedOne.color,
                hide: false,
              }}
            />
          </div>
          <div>
            <Typography variant='h5' color='gray' gutterBottom>
              Player B: {this.state.scoreTwo}
            </Typography>
            <PlayingCard
              {...{
                value: this.state.selectedTwo.value,
                name: this.state.selectedTwo.name,
                suite: this.state.selectedTwo.suite,
                color: this.state.selectedTwo.color,
                hide: false,
              }}
            />
          </div>
        </Box>
        <Box sx={{ display: 'flex', margin: 2 }}>
          <form onSubmit={this.shuffleCards}>
            <Button type='submit'>{'Shuffle Cards'}</Button>
          </form>
          {this.state.cards.length ? (
            <div>
              {this.state.hideCards ? (
                <Button onClick={this.showCards}>{'Show Cards'}</Button>
              ) : (
                <Button onClick={this.hideCards}>{'Hide Cards'}</Button>
              )}
            </div>
          ) : null}
        </Box>
        <Box>{myCards}</Box>
      </Box>
    );
  }
}

export default Deck;
