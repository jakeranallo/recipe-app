import React from 'react';
import { View, Image, Text, TouchableOpacity, ScrollView } from 'react-native';
import * as  ImagePicker from 'expo-image-picker';
import * as  Permissions from 'expo-permissions';
import { NavigationInjectedProps } from 'react-navigation'
import styled from 'styled-components/native'
import { colours, icons } from '../../theme'
import { Paragraph, HeadlineOne, Button, Avatar, Hero, HeadlineTwo, SmallParagraph } from '../../components'
import Modal from 'react-native-modalbox'
import getPermission from '../../utils/getPermission';
import { SvgXml } from 'react-native-svg';
import { useQuery } from '@apollo/react-hooks';
import { useNavigationParam } from 'react-navigation-hooks'
import { SingleUserQuery } from '../../gql/queries/singleUser'
import moment from 'moment'
import { Video } from 'expo-av';

const HiddenButton = styled.TouchableOpacity`
  width: 50%;
  height: 100%;
  position: absolute;
  z-index: 100;
`

const StepLozenge = styled.View`
  height: 4px;
  border-radius: 4px;
`

const Lozenges = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 0 8px;
  position: absolute;
  bottom: 24px;
`

const CompleteContainer = styled.View`
  width: 100%;
  height: 500px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
`

const MenuButton = styled.TouchableOpacity`
  display: flex;
  align-items: center;
  padding: 16px;
  border-bottom-color: #E9EAEB;
  border-bottom-width: 1px;
`

export const ProfileSection = ({ navigation }: NavigationInjectedProps) => {

  const userId = useNavigationParam('user');
  const { loading, error, data } = useQuery(SingleUserQuery, {
    variables: { userId },
  });
  const user = data && data.singleUser[0]

  return (
    <>
      {loading ? <Text>Loading...</Text> :
        error ? <Text>{error.message}</Text> : user &&
          <>
            <View style={{ display: 'flex', flexDirection: 'column', padding: 16, }}>
              <View style={{ marginBottom: 16 }}>
                <Paragraph color='white'>That’s it! Enjoy your fresh sourdough bread and the addiction that will surely follow as you make more and more loaves in the future.</Paragraph>
              </View>
              <View style={{ display: 'flex', flexDirection: 'row' }}>
                <View style={{ marginRight: 8 }}>
                  <Avatar
                    source={user && user.avatar}
                    onPress={() => {
                      navigation.navigate('Profile', {
                        user: user && user.id,
                      });
                    }}
                  />
                </View>
                <View>
                  <SmallParagraph>{user.firstName} {user.lastName}</SmallParagraph>
                  <TouchableOpacity style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <HeadlineTwo color={colours.primary}>Visit {user.firstName}'s YouTube</HeadlineTwo>
                    <SvgXml style={{ marginLeft: 8 }} xml={icons.arrowBeige} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <ScrollView>
              {user.recipes.map((recipe, i) =>
                <TouchableOpacity
                  key={i}
                  onPress={() => {
                    navigation.navigate('Recipe', {
                      recipe: recipe,
                    });
                  }}>
                  <Hero
                    imgOne={recipe.imgOne}
                    imgTwo={recipe.imgTwo}
                    imgThree={recipe.imgThree} />
                  <View style={{ padding: 8 }}>
                    <HeadlineTwo color='white'>{recipe.title}</HeadlineTwo>
                    <SmallParagraph>{recipe.results.length} Results</SmallParagraph>
                  </View>
                </TouchableOpacity>
              )}
            </ScrollView>
          </>
      }
    </>
  )
}

type ISteps =
  NavigationInjectedProps &
  {
    steps:
    [{
      src: string,
      title: string,
      description: string,
      duration: number,
      notify: number
    }]
  } &
  { recipeId: number, userId: number }

type ICameraModal = NavigationInjectedProps & { recipeId: number }

const options = {
  allowsEditing: true,
};

export const CameraModal = ({ navigation, recipeId }: ICameraModal) => {

  const selectPhoto = async () => {
    const status = await getPermission(Permissions.CAMERA_ROLL);
    if (status) {
      const result = await ImagePicker.launchImageLibraryAsync(options);
      if (!result.cancelled) {
        const uri = result.uri;
        const type = result.type;
        const n = result.uri.lastIndexOf('/');
        const name = result.uri.substring(n + 1);
        const source = {
          uri,
          type,
          name,
        }
        cloudinaryUpload(source)
      }
    }
  };

  const takePhoto = async () => {
    const status = await getPermission(Permissions.CAMERA);
    if (status) {
      const result = await ImagePicker.launchCameraAsync(options);
      if (!result.cancelled) {
        navigation.navigate('Post', { image: result.uri });
      }
    }
  };

  const cloudinaryUpload = (source) => {
    const data = new FormData()
    data.append('file', source)
    data.append('upload_preset', 'spruce-apparel')
    fetch("https://api.cloudinary.com/v1_1/sprucepartners/upload", {
      method: "post",
      body: data
    }).then(res => res.json()).
      then(data => {
        navigation.navigate('Post', { image: data.secure_url, recipeId })
      }).catch(err => {
        console.log("An Error Occured While Uploading")
      })
  }

  return (
    <View style={{ paddingBottom: 24 }}>
      <MenuButton onPress={selectPhoto}>
        <HeadlineTwo color={colours.secondary}>
          Select Photo
          </HeadlineTwo>
      </MenuButton>
      <MenuButton onPress={takePhoto}>
        <HeadlineTwo color={colours.secondary}>
          Take Photo
          </HeadlineTwo>
      </MenuButton>
    </View>
  );
}

export const Steps = ({ steps, recipeId, navigation, userId }: ISteps) => {

  const [activeStep, setActiveStep] = React.useState(0);
  const step = steps[activeStep]
  const [modalOpen, setModalOpen] = React.useState(false);
  const [count, setCount] = React.useState(0);
  const duration = 10000

  const getDuration = (duration: number) => {
    const momentDuration = moment.duration(duration);
    const durationHours = momentDuration.hours()
    const durationMinutes = momentDuration.minutes()
    return (
      (durationHours > 0 ? `${durationHours} hours ` : '') + (durationMinutes > 0 ? `${durationMinutes} minutes` : '')
    )
  }

  React.useEffect(() => {
    setCount(count => count = 0)
  }, [activeStep]);

  React.useEffect(() => {
    if (count === duration) { setActiveStep(activeStep => activeStep + 1) };
    const intervalId = setInterval(() => {
      setCount(count + 100);
    }, 100);
    return () => clearInterval(intervalId);
  }, [count]);

  const filename = 'https://res.cloudinary.com/sprucepartners/video/upload/v1566194147/tooltips_coffvj.mov'

  return (
    <View>
      <Modal style={{ height: 'auto' }} isOpen={modalOpen} position={"bottom"} onClosed={() => setModalOpen(!modalOpen)}>
        <CameraModal recipeId={recipeId} navigation={navigation} />
      </Modal>
      {activeStep + 1 <= steps.length ?
        <View style={{ backgroundColor: colours.secondary }}>
          <ScrollView style={{ height: '100%' }}>
            <HiddenButton
              onPress={() => activeStep === 0 ? null : setActiveStep(activeStep - 1)}>
            </HiddenButton>
            <HiddenButton
              onPress={() => setActiveStep(activeStep + 1)}
              style={{ left: '50%' }}
            >
            </HiddenButton>
            {step && step.src.split('.').pop() === ('mov' || 'mp4') ?
              < Video
                source={{ uri: 'https://res.cloudinary.com/sprucepartners/video/upload/v1566194147/tooltips_coffvj.mov' }}
                shouldPlay
                isLooping
                style={{ width: "100%", height: 600, borderRadius: 20 }}
              />
              :
              <Image source={{ uri: step && step.src }} style={{ width: '100%', height: 600, borderRadius: 20 }} />
            }
            <View style={{ padding: 24, marginBottom: 32 }}>
              <HeadlineOne color="white">{step.title}</HeadlineOne>
              <View style={{ marginBottom: 16 }}>
                {step.notify === 1 &&
                  <>
                    <HeadlineTwo color={colours.primary}>{step ? getDuration(step.duration) : 0}</HeadlineTwo>
                    <TouchableOpacity style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                      <HeadlineTwo color={colours.primary}>Notify Me</HeadlineTwo>
                      <SvgXml style={{ marginLeft: 8 }} xml={icons.arrowBeige} />
                    </TouchableOpacity>
                  </>
                }
              </View>
              <Paragraph color="white">{step.description}</Paragraph>

              <View>
                {step.resources.length >= 1 && <><HeadlineTwo color={colours.primary}>Related</HeadlineTwo>
                    {step.resources.map((resource, i) =>
                      <TouchableOpacity>
                        <Paragraph color={colours.primary}>{resource.title}</Paragraph>
                      </TouchableOpacity>)}
              </>}
              </View>

            </View>
          </ScrollView>
          <Lozenges>
            {steps && steps.map((step, i: number) =>
              <View key={i} style={{ paddingLeft: 1, paddingRight: 1, width: `${100 / steps.length}%`, }}>
                <StepLozenge
                  style={{
                    backgroundColor: activeStep === i ? 'white' : colours.strokeGrey
                  }} >{activeStep === i && <View style={{ borderRadius: 2, height: 4, backgroundColor: colours.positive, width: `${(count / duration) * 100}%` }}></View>}</StepLozenge>
              </View>
            )}
          </Lozenges>
        </View> :
        <ScrollView style={{ backgroundColor: colours.secondary, height: '100%' }}>
          <CompleteContainer>
            <SvgXml xml={icons.congrats} />
            <View style={{ marginTop: 16, marginBottom: 32 }}>
              <HeadlineOne color={colours.secondary}>Recipe Complete!</HeadlineOne>
            </View>
            <Button label="Share Your Result" onPress={() => setModalOpen(!modalOpen)} icon={icons.camera} />
            <TouchableOpacity
              onPress={() => setActiveStep(0)}
              style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 16 }}>
              <SvgXml style={{ marginRight: 8 }} xml={icons.arrowBlack} />
              <HeadlineTwo>Start Again</HeadlineTwo>
            </TouchableOpacity>
          </CompleteContainer>
          <ProfileSection navigation={navigation} />
        </ScrollView>
      }
    </View>
  )
}