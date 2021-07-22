import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { Auth, Storage } from 'aws-amplify';

import awsmobile from './src/aws-exports';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation/index';
import store from './hooks/store';

Auth.configure(awsmobile);

Storage.configure({
  region: awsmobile.aws_user_files_s3_bucket_region,
  bucket: awsmobile.aws_user_files_s3_bucket,
  identityPoolId: awsmobile.aws_user_pools_id,
});

const App: React.FC<unknown> = (): JSX.Element => {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  Auth.currentAuthenticatedUser().then(console.log).catch(console.error);

  if (!isLoadingComplete) {
    return <></>;
  } else {
    return (
      <Provider store={store}>
        <SafeAreaProvider>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </SafeAreaProvider>
      </Provider>
    );
  }
};

export default App;