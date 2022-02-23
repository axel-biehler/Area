import React from 'react';
import { List } from 'react-native-paper';

const ChooseItem = ({ items, choose }) => {
  return (
    <List.Section>
      {items.map(item => {
        return (
          <List.Accordion title={item.displayName} key={item.name}>
            {item.widgets.map(widget => {
              return (
                <List.Item
                  key={widget.name}
                  title={widget.displayName}
                  description={widget.description}
                  onPress={() => choose(item, widget)}
                />
              );
            })}
          </List.Accordion>
        );
      })}
    </List.Section>
  );
};

export default ChooseItem;
