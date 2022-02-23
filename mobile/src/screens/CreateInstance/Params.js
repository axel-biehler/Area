import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Checkbox, Subheading, TextInput } from 'react-native-paper';

const BooleanParam = ({ param, setValue }) => {
  const [rand, setRand] = useState(0);
  return (
    <View style={booleanStyles.view}>
      <Subheading>{param.name}</Subheading>
      <Checkbox
        status={param.value === 'true' ? 'checked' : 'unchecked'}
        onPress={() => {
          setValue(param.name, param.value !== 'true' ? 'true' : 'false');
          setRand(Math.random());
        }}
      />
    </View>
  );
};

const booleanStyles = StyleSheet.create({
  view: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 4,
  },
});

const StringParam = ({ param, setValue }) => {
  return (
    <TextInput
      label={param.name}
      onChangeText={text => {
        setValue(param.name, text);
      }}
    />
  );
};

const NumParam = ({ param, setValue }) => {
  return (
    <TextInput
      label={param.name}
      type={'number'}
      keyboardType={'numeric'}
      onChangeText={text => {
        setValue(param.name, parseInt(text, 10));
      }}
    />
  );
};

const Param = ({ param, setValue }) => {
  switch (param.type) {
    case 'boolean':
      return <BooleanParam param={param} setValue={setValue} />;
    case 'string':
      return <StringParam param={param} setValue={setValue} />;
    case 'number':
      return <NumParam param={param} setValue={setValue} />;
    default:
      return null;
  }
};

const getDefaultValue = type => {
  switch (type) {
    case 'boolean':
      return 'false';
    case 'string':
      return '';
    case 'number':
      return 0;
    default:
      return undefined;
  }
};

const Params = ({ params, confirm }) => {
  const setValue = (name, value) => {
    const index = input.findIndex(x => x.name === name);
    input[index].value = value;
    setInput(input);
  };

  const defaultParams = params.map(p => {
    const defaultValue = getDefaultValue(p.type);
    return { ...p, value: defaultValue };
  });

  const [input, setInput] = useState(defaultParams);
  return (
    <View style={styles.view}>
      {input.map(i => {
        return (
          <View key={i.name} style={styles.item}>
            <Param param={i} setValue={setValue} />
          </View>
        );
      })}
      <Button style="contained" onPress={() => confirm(input)}>
        Confirm
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    margin: 4,
  },
  item: {
    marginVertical: 2,
  },
});

export default Params;
