import {
  CommonActions,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import React, { useCallback } from 'react';
import request from '../api/request';
import Params from './CreateInstance/Params';

const EditAction = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { instance } = route.params;

  const navigateToHome = useCallback(() => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name: 'Home',
          },
        ],
      }),
    );
  }, [navigation]);

  const update = async params => {
    await request(`/instances/${instance._id}`, 'POST', {
      action: params,
    });
    await navigateToHome();
  };

  return <Params params={instance.action.params} confirm={update} />;
};

export default EditAction;
