import * as React from 'react';
import {Provider} from 'react-redux';
import store from './src/store';
import AppInner from './AppInner';
import {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';

function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <Provider store={store}>
      <AppInner />
    </Provider>
  );
}

export default App;
