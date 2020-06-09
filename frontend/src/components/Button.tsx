import React from 'react';
import styled from 'styled-components/native'
import { View } from 'react-native'
import { useFonts } from '@use-expo/font';
import { colours, fonts } from '../theme'
import { GestureResponderEvent } from 'react-native'
import { SvgXml } from 'react-native-svg'

const ButtonWrapper = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${colours.primary};
  padding: 8px 64px;
  padding-bottom: 16px;
  border-radius: 50px;
`

const ButtonText = styled.Text`
  color: ${colours.secondary};
  font-size: 24px;
  text-align: center;
  line-height: 0;
`

interface IButton {
  label: string
  onPress: (event: GestureResponderEvent) => void
  icon?: string
}

export const Button = ({ label, onPress, icon }: IButton) => {

  // Get Fonts

  const [fontsLoaded] = useFonts({
    'Neuton-Bold': require('../../assets/fonts/Neuton-Bold.ttf'),
    'Metropolis-Regular': require('../../assets/fonts/Metropolis-Regular.otf'),
    'Metropolis-SemiBold': require('../../assets/fonts/Metropolis-SemiBold.otf'),
  });

  return (
    <ButtonWrapper onPress={onPress}>
      {icon && <View style={{ marginRight: 8, marginTop: 4 }}><SvgXml xml={icon} /></View>}
      <ButtonText
        style={fontsLoaded && { fontFamily: fonts.primary }}>
        {label}
      </ButtonText>
    </ButtonWrapper>
  )
}