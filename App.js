import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { Navigation } from './src/Infrastructure';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import store, { persistor } from './src/Redux/Store';
import { PersistGate } from 'redux-persist/integration/react';
import { ToastProvider } from 'react-native-toast-notifications';


export default function App() {
  
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <ToastProvider>
            <Navigation />
            <StatusBar style="auto" />
          </ToastProvider>
        </NavigationContainer>
      </PersistGate>

    </Provider>

  );
}
