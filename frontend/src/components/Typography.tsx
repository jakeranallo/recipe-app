import React from 'react';
import styled from 'styled-components/native'
import colors from '../theme/colours'
import fonts from '../theme/fonts'
import { useFonts } from '@use-expo/font';

const ParagraphContainer = styled.Text`
  font-size: 16px;
  line-height: 22px;
  color: ${colors.textGrey};
`

const SmallParagraphContainer = styled.Text`
  font-size: 14px;
  line-height: 22px;
  color: ${colors.textGrey};
`

const HeadlineTwoContainer = styled.Text`
  font-size: 16px;
  line-height: 22px;
  color: white;
`

export const Paragraph = ({ children, numberOfLines, color }) => {

  const [fontsLoaded] = useFonts({
    'Neuton-Bold': require('../../assets/fonts/Neuton-Bold.ttf'),
    'Metropolis-Regular': require('../../assets/fonts/Metropolis-Regular.otf'),
    'Metropolis-SemiBold': require('../../assets/fonts/Metropolis-SemiBold.otf'),
  });

  return (
    <ParagraphContainer numberOfLines={numberOfLines} style={{ fontFamily: fontsLoaded ? fonts.secondary : 'Helvetica', color: color }}>{children}</ParagraphContainer>
  );
}

export const SmallParagraph = ({ children }) => {

  const [fontsLoaded] = useFonts({
    'Neuton-Bold': require('../../assets/fonts/Neuton-Bold.ttf'),
    'Metropolis-Regular': require('../../assets/fonts/Metropolis-Regular.otf'),
    'Metropolis-SemiBold': require('../../assets/fonts/Metropolis-SemiBold.otf'),
  });

  return (
    <SmallParagraphContainer style={{ fontFamily: fontsLoaded ? fonts.secondary : 'Helvetica' }}>{children}</SmallParagraphContainer>
  );
}

export const HeadlineTwo = ({ children, color }) => {

  const [fontsLoaded] = useFonts({
    'Neuton-Bold': require('../../assets/fonts/Neuton-Bold.ttf'),
    'Metropolis-Regular': require('../../assets/fonts/Metropolis-Regular.otf'),
    'Metropolis-SemiBold': require('../../assets/fonts/Metropolis-SemiBold.otf'),
  });

  return (
    <HeadlineTwoContainer style={{ fontFamily: fontsLoaded ? fonts.tertiary : 'Helvetica', color: color }}>{children}</HeadlineTwoContainer>
  );
}
