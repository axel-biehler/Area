import React from 'react';
import { Text } from 'react-native';
import { NavigationContainer, useRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Register from './screens/Register';
import ServerSettingsModal from './screens/ServerSettingsModal';
import CustomNavigationBar from './components/CustomNavigationBar';

const Stack = createNativeStackNavigator();

const Login = () => {
  const route = useRoute();
  const { registerSuccess } = route.params;
  return <Text>{registerSuccess ? 'Register success' : 'Login'}</Text>;
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Register"
        screenOptions={{
          header: CustomNavigationBar,
        }}>
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Group screenOptions={{ presentation: 'modal' }}>
          <Stack.Screen
            name="Server settings"
            component={ServerSettingsModal}
          />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
