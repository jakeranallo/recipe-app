import React from 'react';
import styled from 'styled-components/native'

const AvatarContainer = styled.ImageBackground`
  width: 44px;
  height: 44px;
  border-radius: 22px;
  border: 1px solid white;
  overflow: hidden;
`

export const Avatar = ({ source }) => {
  return (
    <AvatarContainer source={{ uri: source }} />
  );
}
