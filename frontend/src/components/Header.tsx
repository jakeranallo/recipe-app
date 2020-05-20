import React from 'react';
import styled from 'styled-components/native'
import { SvgXml } from 'react-native-svg';
import { useFonts } from '@use-expo/font';
import fonts from '../theme/fonts'
import { GestureResponderEvent } from 'react-native'

const HeaderWrapper = styled.View`
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

const HeaderAction = styled.TouchableOpacity`
  width: 10%;
  height: 50px;
  display: flex;
  align-items: center;
  flex:1;
`

interface IHeader {
  title: string,
  leftAction?: (event: GestureResponderEvent) => void,
  leftIcon?: string | null,
  rightAction?: (event: GestureResponderEvent) => void
  rightIcon?: string | null
}

export const Header = (
  { title,
    leftAction,
    leftIcon,
    rightAction,
    rightIcon,
  }: IHeader) => {

  // Get Fonts

  const [fontsLoaded] = useFonts({
    'Neuton-Bold': require('../../assets/fonts/Neuton-Bold.ttf'),
    'Metropolis-Regular': require('../../assets/fonts/Metropolis-Regular.otf'),
    'Metropolis-SemiBold': require('../../assets/fonts/Metropolis-SemiBold.otf'),
  });

  return (
    <HeaderWrapper>
      <HeaderAction onPress={leftAction}>
        <SvgXml xml={leftIcon ? leftIcon : null} />
      </HeaderAction>
      <Title style={fontsLoaded && { fontFamily: fonts.primary }}>{title}</Title>
      <HeaderAction onPress={rightAction}>
        <SvgXml xml={rightIcon ? rightIcon : null} />
      </HeaderAction>
    </HeaderWrapper>
  );
}