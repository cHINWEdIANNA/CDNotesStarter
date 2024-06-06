import React, { useState } from 'react';
import { SafeAreaView, Text, TextInput, Button, FlatList, View, TouchableOpacity, StyleSheet } from 'react-native';
import tw, { useDeviceContext } from 'twrnc';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store, addEntry, deleteEntry } from './store';

function Journal() {
  useDeviceContext(tw);
  const [text, setText] = useState('');
  const dispatch = useDispatch();
  const journalEntries = useSelector(state => state.journal.entries);

  const handleAddEntry = () => {
    if (text.trim()) {
      dispatch(addEntry({ id: Date.now(), text }));
      setText('');
    }
  };

  const handleDeleteEntry = (id) => {
    dispatch(deleteEntry(id));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>My Journal App</Text>
      <TextInput
        style={styles.input}
        placeholder="Write your journal entry here..."
        value={text}
        onChangeText={setText}
      />
      <Button title="Add Entry" onPress={handleAddEntry} />
      <FlatList
        data={journalEntries}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.entry}>
            <Text>{item.text}</Text>
            <TouchableOpacity onPress={() => handleDeleteEntry(item.id)}>
              <Text style={styles.delete}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <Journal />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16
  },
  input: {
    borderWidth: 1,
    padding: 8,
    marginBottom: 16
  },
  entry: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
    borderBottomWidth: 1
  },
  delete: {
    color: 'red'
  }
});
