import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation/index';
import store from './hooks/store';
import HelpPage from './new_pages/HelpPage';
import UserSearchPage from './new_pages/UserSearch';

const App: React.FC<unknown> = (): JSX.Element => {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return <></>;
  } else {
    return (
      <HelpPage/>
    );
  }
};

export default App;