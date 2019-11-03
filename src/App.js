import React from 'react';
import Normalize from 'react-normalize';
import styled from 'styled-components';

import CardItem from './components/CardItem';
import CardList from './components/CardList';
import Header from './components/Header';
import Home from './components/Home';

const deliveryData = [
  {
    name: '맥북 케이스',
    carrier: 'kr.cjlogistics',
    track: 626295097001,
  },
];

function App() {
  function Footer({ children }) {
    const Container = styled.div`
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 1rem 0;
    `;
    const Text = styled.p`
      color: rgba(0, 0, 0, 0.9);
      font-size: 0.7rem;
      font-weight: 700;

      a {
        cursor: pointer;
        color: rgba(212, 5, 17, 0.8);
      }

      &:last-child {
        color: rgba(0, 0, 0, 0.8);
        font-style: italic;
        font-size: 0.6rem;
        font-weight: 500;
        margin-top: 3px;
      }
    `;
    return (
      <Container>
        <Text>
          Developed by&nbsp;
          <a
            href="https://github.com/junhoyeo"
            target="_blank"
            rel="noopener noreferrer"
          >
            @junhoyeo
          </a>
        </Text>
        <Text>{children}</Text>
      </Container>
    );
  }

  return (
    <>
      <Normalize />
      <Home>
        <Header />
        <CardList>
          {deliveryData.map((delivery, idx) => <CardItem delivery={delivery} key={`delivery-${idx + 1}`} />)}
        </CardList>
        <Footer>
          Icons made by&nbsp;
          <a href="https://www.flaticon.com/authors/monkik" title="monkik">monkik</a>
          &nbsp;from&nbsp;
          <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
        </Footer>
      </Home>
    </>
  );
}

export default App;
