import React from 'react';
import wait from 'wait';
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
      count: 0,
    });
  };

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
      });
    }
    await wait(1500);
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
  };

  selectCard = async (card: PlayingCardObj) => {
    console.log(card);
    await this.removeCard(card);
    await this.setCard(card);
    console.log(this.state.count);
    if (this.state.count === 2) {
      await this.calculateWinner();
    }
  };

  render() {
    const myCards = this.state.cards.map((obj, i) => (
      <div
        key={i}
        style={{ color: obj.color }}
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
      </div>
    ));
    return (
      <div>
        <div>
          <div>
            <h3>Player A: {this.state.scoreOne}</h3>
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
            <h3>Player B: {this.state.scoreTwo}</h3>
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
        </div>
        <form onSubmit={this.shuffleCards}>
          <button type='submit'>{'Shuffle'}</button>
        </form>
        {myCards}
      </div>
    );
  }
}

export default Deck;
