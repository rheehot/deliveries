import React, { Component } from 'react';
import styled from 'styled-components';

import Timeline from './Timeline';
import StatusIllust from './StatusIllust';

import getTrack from '../utils/getTrack';

const imageContext = require.context('../assets/carriers/', true);

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: white;
  box-shadow: 5px 5px 35px -10px rgba(36, 36, 48, 0.15);
  border-radius: 8px;
  padding: 1.5rem 1.8rem;
  position: relative;
  margin-bottom: 1rem;

  &:last-child {
    margin-bottom: 0;
  }
`;
const ImageWrap = styled.div`
  height: auto;
  width: 5.7rem;
  margin-right: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-bottom: 0.8rem;
`;
const Image = styled.img`
  height: auto;
  width: 100%;
`;

const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  /* justify-content: space-between; */
  /* width: -webkit-fill-available; */
  /* width: fit-content; */
  width: 45%;
`;
const InfoWrap = styled.div`
  display: flex;
`;
const Info = styled.div`
  display: flex;
  flex-direction: column;
  /* margin-right: 1rem; */
  margin-bottom: 0.5rem;
`;
const Name = styled.span`
  width: fit-content;
  font-size: 1.5rem;
  font-weight: 700;
  background-color: rgba(0, 0, 0, 0.9);
  color: white;
  padding: 0.2rem 0.25rem;
`;
const Track = styled.span`
  font-size: 1.2rem;
  font-family: 'Montserrat', 'Noto Sans KR', sans-serif;
`;
const RightSection = styled.div`
  flex: 1 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const AbsoluteLabel = styled.div`
  position: absolute;
  top: 1rem;
  right: -1.5rem;
  transform: rotate(25deg);
  font-size: 1.3rem;
  font-weight: 500;
  padding: 0.4rem 1.5rem;
  background-color: ${({ stateID }) => {
    if (stateID === 'delivered') {
      return '#333';
    }
    return 'rgb(212, 5, 17)';
  }};
  color: white;
  box-shadow: 2px 13px 30px -10px rgba(41, 41, 41, 0.3);
`;

export default class CardItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      delivery: {
        state: { text: '' },
      },
    };
  }

  componentDidMount() {
    const {
      delivery: { carrierID, trackID },
      timestamp,
      storedData,
      updateTimestamp,
    } = this.props;

    const prevTimestamp = new Date().getTime() - 3600000;
    if (timestamp < prevTimestamp) {
      // update
      getTrack(carrierID, trackID)
        .then((res) => {
          const { data } = res;
          this.setState({
            delivery: data,
          });
          updateTimestamp(trackID, data);
        });
    } else {
      // TODO: Check if storedData has property trackID, update if not
      this.setState({
        delivery: storedData[trackID],
      });
    }
  }

  render() {
    const { delivery: { name, carrierID, trackID } } = this.props;
    const { delivery: { from, to, state } } = this.state;
    const carrierImg = imageContext(`./${carrierID}.png`);
    return (
      <Container>
        <LeftSection>
          <InfoWrap>
            <ImageWrap>
              <Image src={carrierImg} />
            </ImageWrap>
            <Info>
              <Name>{name}</Name>
              <Track>{trackID}</Track>
            </Info>
          </InfoWrap>
          <Timeline from={from} to={to} />
        </LeftSection>
        <RightSection>
          <StatusIllust stateID={state.id} />
        </RightSection>
        <AbsoluteLabel stateID={state.id}>
          {state.text}
        </AbsoluteLabel>
      </Container>
    );
  }
}
