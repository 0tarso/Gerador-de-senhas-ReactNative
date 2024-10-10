import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';

import { AuthProvider } from './src/contexts/AuthContext';
import Routes from './src/routes/routes';


export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <StatusBar style='light' backgroundColor='#000' />
        <Routes />
      </AuthProvider>
    </NavigationContainer>
  );
}

