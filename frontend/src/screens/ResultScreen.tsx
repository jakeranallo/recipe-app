import React from 'react';
import { Text, View, ScrollView, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Recipe } from '../utils/types'
import { NavigationInjectedProps } from 'react-navigation'
import { useFonts } from '@use-expo/font';
import { DifficultyFeedQuery } from '../gql/queries/difficultyFeed'
import { useQuery } from '@apollo/react-hooks';
import { Header, Hero, Avatar, Paragraph, HeadlineTwo, SmallParagraph } from '../components'
import { SvgXml } from 'react-native-svg';
import { logo } from '../theme/icons'

export const ResultScreen = ({ navigation }: NavigationInjectedProps) => {

    return (
        <View>
            <Text>This is the result screen</Text>
        </View>
    );
} 