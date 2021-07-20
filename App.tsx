import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { API, Auth, Storage } from 'aws-amplify';

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

API.configure({
  endpoints: [
    {
      name: awsmobile.aws_cloud_logic_custom[0].name,
      endpoint: awsmobile.aws_cloud_logic_custom[0].endpoint,
      region: awsmobile.aws_cloud_logic_custom[0].region,
    },
  ],
});

const App: React.FC<unknown> = (): JSX.Element => {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

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