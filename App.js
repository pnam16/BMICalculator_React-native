import {
  Animated,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {
  heightPercentageToDP,
  responsiveFontSize,
  widthPercentageToDP,
} from './src/untils/index';

import {NavigationContainer} from '@react-navigation/native';
import Slider from '@react-native-community/slider';
import {ceil} from 'react-native-reanimated';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      {/* <Stack.Navigator initialRouteName="Home" headerMode="none"> */}
      <Stack.Navigator initialRouteName="Splash" headerMode="none">
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function Splash({navigation}) {
  const fadeAnim = useRef(new Animated.Value(0.2)).current;
  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start();
    setTimeout(() => {
      navigation.navigate('Home');
    }, 3000);
  }, [fadeAnim, navigation]);
  // setTimeout(() => {
  //   navigation.navigate('Home');
  // }, 3000);
  return (
    <ImageBackground
      source={require('./assets/splash.png')}
      style={stylesSplash.bg}>
      <Animated.View style={[stylesSplash.container, {opacity: fadeAnim}]}>
        <Text style={stylesSplash.txt}> BMI</Text>
        <Text style={stylesSplash.txt}> Calculator</Text>
      </Animated.View>
    </ImageBackground>
  );
}

const stylesSplash = StyleSheet.create({
  bg: {
    resizeMode: 'cover',
    flex: 1,
  },
  txt: {
    color: '#fcc91c',
    fontSize: responsiveFontSize(8.5),
  },
  container: {
    alignItems: 'center',
    color: '#fcc91c',
    flex: 1,
    flexDirection: 'column',
    fontSize: responsiveFontSize(8),
    justifyContent: 'center',
  },
});

function Home() {
  const [height, setHeight] = useState(165);
  const [weight, setWeight] = useState(58);
  const [bmi, setBmi] = useState(21.56);
  const [message, setMessage] = useState('Normal');
  return (
    <ImageBackground source={require('./assets/bg.png')} style={styles.bg}>
      <ScrollView style={styles.mgHoz}>
        <Text style={styles.header}>BMI Calculator</Text>
        <Text style={styles.underHeader}>We care about your health</Text>
        <View style={styles.container1}>
          <Text
            style={
              (styles.txt, {color: '#FFFF00', fontSize: responsiveFontSize(6)})
            }>
            {bmi}
          </Text>
          <View style={styles.divider} />
          <Text
            style={
              (styles.txt,
              {color: '#FFFF00', fontSize: responsiveFontSize(5.5)})
            }>
            {message}
          </Text>
        </View>
        <Text style={styles.txt}>Height: {height} (cm)</Text>
        <Slider
          maximumTrackTintColor="#2196f3"
          maximumValue={220}
          minimumTrackTintColor="#fcc91c"
          minimumValue={30}
          onValueChange={(val) => {
            setBmi(
              (useState.bmi =
                Math.round((weight * 1000000) / height / height) / 100),
            );
            setHeight((useState.height = val));
            setMessage((useState.message = cal(bmi)));
          }}
          step={1}
          style={styles.slider}
          thumbTintColor="#FFFF00"
          value={height}
        />
        <Text style={styles.txt}>Weight: {weight} (kg)</Text>
        <Slider
          maximumTrackTintColor="#2196f3"
          maximumValue={220}
          minimumTrackTintColor="#fcc91c"
          minimumValue={3}
          onValueChange={(val) => {
            setBmi(
              (useState.bmi =
                Math.round((weight * 1000000) / height / height) / 100),
            );
            setMessage((useState.message = cal(bmi)));
            setWeight((useState.weight = val));
          }}
          step={1}
          style={styles.slider}
          thumbTintColor="#FFFF00"
          value={weight}
        />
      </ScrollView>
    </ImageBackground>
  );
}

function cal(value) {
  if (value < 18.5) {
    return 'Underweight';
  } else if (value >= 18.5 && value <= 24.9) {
    return 'Normal';
  } else if (value >= 25 && value <= 29.9) {
    return 'Overweight';
  } else {
    return 'Obese';
  }
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    alignContent: 'center',
  },
  mgHoz: {
    marginHorizontal: widthPercentageToDP(6),
  },
  header: {
    alignSelf: 'center',
    color: '#fcc91c',
    fontSize: responsiveFontSize(5.8),
  },
  underHeader: {
    alignSelf: 'center',
    color: '#fff',
    fontSize: responsiveFontSize(2),
  },
  container1: {
    alignItems: 'center',
    backgroundColor: '#1d1d1b',
    borderColor: '#FFFF00',
    borderRadius: 20,
    borderWidth: 2,
    flex: 1,
    flexDirection: 'column',
    height: heightPercentageToDP(25),
    justifyContent: 'center',
    marginVertical: heightPercentageToDP(8),
    width: '100%',
  },
  divider: {
    backgroundColor: '#FFFF00',
    height: 1,
    width: '55%',
  },

  slider: {
    marginBottom: heightPercentageToDP(3),
  },
  txt: {
    alignSelf: 'center',
    color: '#fff',
    fontSize: responsiveFontSize(3),
  },
});
