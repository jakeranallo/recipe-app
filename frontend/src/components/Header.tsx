import React from 'react';
import styled from 'styled-components/native'
import { SvgXml } from 'react-native-svg';
import { useFonts } from '@use-expo/font';
import fonts from '../theme/fonts'
import { NavigationInjectedProps } from 'react-navigation'

const HeaderContainer = styled.View`
  display: flex;
  flex-direction: row;
  padding: 52px 8px 8px 8px;
`

const Title = styled.Text`
  color: white;
  font-size: 30px;
  line-height: 26px;
  text-align: center;
  width: 80%;
  padding: 0 16px;
`

const ActionContainer = styled.TouchableOpacity`
  width: 10%;
  height: 50px;
  display: flex;
  align-items: center;
  flex:1;
`

interface HeaderProps {
  title: string,
  renderLeft?: React.ReactChild,
  renderRight?: React.ReactChild,
}

export const Header = (
  { title,
    renderLeft,
    renderRight
  }: HeaderProps) => {

  // Get Fonts

  const [fontsLoaded] = useFonts({
    'Neuton-Bold': require('../../assets/fonts/Neuton-Bold.ttf'),
    'Metropolis-Regular': require('../../assets/fonts/Metropolis-Regular.otf'),
    'Metropolis-SemiBold': require('../../assets/fonts/Metropolis-SemiBold.otf'),
  });

  return (
    <HeaderContainer>
      {renderLeft}
      <Title style={fontsLoaded && { fontFamily: fonts.primary }}>{title}</Title>
      {renderRight}
    </HeaderContainer>
  );
}

export const HeaderAction = (icon: string, action: React.SyntheticEvent) => {
  return (
    <ActionContainer onPress={() => { action }}>
      <SvgXml xml={icon} />
    </ActionContainer>
  );
}