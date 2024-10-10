import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import { AuthProvider } from './src/contexts/AuthContext';
import Routes from './src/routes/routes';


export default function App() {
  return (
    <NavigationContainer style={styles.container}>
      <AuthProvider>
        <StatusBar style='light' backgroundColor='#000' />
        <Routes />
      </AuthProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },

});
