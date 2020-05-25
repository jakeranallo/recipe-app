import React from 'react';
import styled from 'styled-components/native'
import { GestureResponderEvent, TouchableOpacity } from 'react-native'

const AvatarContainer = styled.ImageBackground`
  width: 44px;
  height: 44px;
  border-radius: 50px;
  border: 1px solid white;
  overflow: hidden;
`

interface IAvatar {
  source: string | undefined
  onPress?: (event: GestureResponderEvent) => void
  large?: boolean
}

export const Avatar = ({ source, onPress, large }: IAvatar) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <AvatarContainer
        style={{ width: large ? 72 : 44, height: large ? 72 : 44 }}
        source={{ uri: source }} />
    </TouchableOpacity>
  );
}
