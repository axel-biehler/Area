import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, FAB, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import request from '../api/request';

const Instance = ({ instance, refreshList }) => {
  const del = async () => {
    await request(`/instances/${instance._id}`, 'DELETE');
    await refreshList();
  };

  return (
    <Card style={styles.instanceView}>
      <Card.Title title={instance.action.displayName} />
      <Icon
        style={styles.instanceArrow}
        size={24}
        name="arrow-down-circle-outline"
      />
      <Card.Title title={instance.reaction.displayName} />
      <Card.Actions>
        <Button onPress={del}>Delete</Button>
      </Card.Actions>
    </Card>
  );
};

const Home = () => {
  const [instances, setInstances] = useState([]);
  const navigation = useNavigation();

  const refreshList = async () => {
    const res = await request('/instances');
    setInstances(res.instances);
  };

  useEffect(() => {
    refreshList();
  }, []);
  return (
    <>
      <View>
        {instances.map(i => {
          return (
            <Instance key={i._id} instance={i} refreshList={refreshList} />
          );
        })}
      </View>
      <FAB
        style={styles.fab}
        small
        icon="plus"
        onPress={() => navigation.navigate('Create instance')}
      />
    </>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  instanceView: {
    margin: 4,
  },
  instanceArrow: {
    marginLeft: 32,
  },
});

export default Home;
