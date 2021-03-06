import React from 'react';
import styled from 'styled-components/native'
import { colours } from '../theme'

const TileImage = styled.ImageBackground`
  position: absolute;
  border-radius: 2px;
  margin: 4px;
  background-color: ${colours.strokeGrey};
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  overflow: hidden;
`

const MainTile = styled.View`
  position: relative;
  width: 66.6%;
  padding-top: 66.6%;
  height: 0px;
`

const SideContainer = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 33.3%;
`
const SideTileContainer = styled.View`
  position: relative;
  height:50%;
`

const HeroContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex: 1;
`

interface IHero {
  imgOne: string | undefined,
  imgTwo: string | undefined,
  imgThree: string | undefined
}

export const Hero = ({ imgOne, imgTwo, imgThree }: IHero) => {
  return (
    <HeroContainer>
      <MainTile>
        <TileImage source={{ uri: imgOne }} />
      </MainTile>
      <SideContainer>
        <SideTileContainer>
          <TileImage source={{ uri: imgTwo }} />
        </SideTileContainer>
        <SideTileContainer>
          <TileImage source={{ uri: imgThree }} />
        </SideTileContainer>
      </SideContainer>
    </HeroContainer>
  );
}



