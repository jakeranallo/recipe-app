import React from 'react';
import styled from 'styled-components/native'
import { useFonts } from '@use-expo/font';
import { colours, fonts } from '../theme'
import { GestureResponderEvent } from 'react-native'

const ButtonWrapper = styled.TouchableOpacity`
  background-color: ${colours.primary};
  padding: 8px 64px;
  border-radius: 50px;
`

const ButtonText = styled.Text`
  font-size: 24px;
  text-align: center;
  line-height: 0;
  margin-bottom: 8px;
`

interface IButton {
  label: string
  onPress: (event: GestureResponderEvent) => void
}

export const Button = ({ label, onPress }: IButton) => {

  // Get Fonts

  const [fontsLoaded] = useFonts({
    'Neuton-Bold': require('../../assets/fonts/Neuton-Bold.ttf'),
    'Metropolis-Regular': require('../../assets/fonts/Metropolis-Regular.otf'),
    'Metropolis-SemiBold': require('../../assets/fonts/Metropolis-SemiBold.otf'),
  });

  return (
    <ButtonWrapper onPress={onPress}>
      <ButtonText
        style={fontsLoaded && { fontFamily: fonts.primary }}>
        {label}
      </ButtonText>
    </ButtonWrapper>
  )
}