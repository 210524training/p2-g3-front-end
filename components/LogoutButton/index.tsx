import { Auth } from 'aws-amplify';
import React from 'react';
import { Button } from 'react-native';
import { useAppDispatch } from '../../hooks';
import { logout } from '../../hooks/slices/user.slice';
import t from '../../Localization';

const LogOutButton: React.FC<unknown> = (): JSX.Element => {
  const dispatch = useAppDispatch();
  return (
    <Button
      title={t('logout')}
      color="red"
      onPress={() => {
        (async () => {
          try {
            await Auth.signOut();
            dispatch(logout());
          } catch (err) {
            console.error('Failed to logout', err);
          }
        })();
      }}
    />
  );
};

export default LogOutButton;