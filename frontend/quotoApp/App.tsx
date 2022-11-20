import * as React from 'react';
import {Provider} from 'react-redux';

import store from './src/store';
import AppInner from './AppInner';

import SplashScreen from 'react-native-splash-screen';

function App() {
  React.useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <Provider store={store}>
      <AppInner />
    </Provider>
  );
}

export default App;
