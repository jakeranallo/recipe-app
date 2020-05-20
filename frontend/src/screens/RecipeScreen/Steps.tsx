import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { NavigationInjectedProps } from 'react-navigation'

type ISteps =
  NavigationInjectedProps &
  {
    steps:
    [{
      src: string,
      title: string,
      description: string
    }]
  } &
  { recipeId: number }


export const Steps = ({ steps, recipeId, navigation }: ISteps) => {

  const [activeStep, setActiveStep] = React.useState(0);
  const step = steps[activeStep]

  return (
    <View>
      {activeStep + 1 <= steps.length ?
        <View>
          <Image source={{ uri: step.src }} style={{ width: '100%', height: 500, borderRadius: 20 }} />
          <Text>{step.title}</Text>
          <Text>{step.description}</Text>
          <TouchableOpacity
            onPress={() => activeStep === 0 ? null : setActiveStep(activeStep - 1)}>
            <Text>Prev</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActiveStep(activeStep + 1)}>
            <Text>Next</Text>
          </TouchableOpacity>
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            {steps && steps.map((step, i: number) =>
              <View
                key={i}
                style={{
                  width: `${100 / steps.length}%`,
                  height: 8,
                  backgroundColor: activeStep === i ? 'red' : 'blue'
                }} />)}
          </View>
        </View> :
        <View style={{ paddingTop: 40 }}>
          <Text>Recipe Complete</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Result', {
                recipeId: recipeId,
              });
            }}>
            <Text>Share Your Result</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActiveStep(0)}>
            <Text>Start Again</Text>
          </TouchableOpacity>
        </View>
      }
    </View>
  )
}