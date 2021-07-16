import * as React from 'react';
import { useState } from 'react';
import { Pressable, View, Text, ScrollView, StyleSheet, Button } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import createStyle from '../components/ChatListItem/style';
import useColorScheme from '../hooks/useColorScheme';
import Colors from '../constants/Colors';
import t from '../Localization';
import Link from '../components/Link';

export type FAQItem = {
  header: string,
  content: string | JSX.Element,
}

const FAQItems: FAQItem[] = [
  {
    header: 'How to...',
    content: 'Figure it out!',
  },
  {
    header: 'How not to...',
    content: 'Simple, don\'t figure it out!',
  },
  {
    header: 'Do this',
    content: <Link link={'https://google.com'} />,
  },
];

const HelpPage: React.FC<unknown> = (): JSX.Element => {
  const colorScheme = useColorScheme();
  const styles = createStyle(colorScheme);


  const [modalView, setModalView] = useState(false);
  const [currentTopic, setCurrentTopic] = useState<FAQItem>();
  const [modalViewHelp, setModalViewHelp] = useState(false);
  const [helpMessageText, setHelpMessageText] = useState('');

  const closeModal = () => {
    setModalView(false);
  };

  const submitHelpMessage = () => {
    console.log('submitHelpMessage');
  };

  return (
    <ScrollView>
      <View style={{
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 10,
        width: '100%',
        alignItems: 'center'
      }}>
        <Text style={styles.title}>{t('faq')}</Text>
      </View>
      <View>
        {
          FAQItems.map((FAQ) => (
            <View key={FAQ.header}>
              <Pressable onPress={() => {
                setModalView(true);
                setCurrentTopic(FAQ);
              }}>
                <View style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  padding: 10,
                  width: '100%',
                  alignItems: 'center'
                }}>
                  <Text style={{
                    color: Colors[colorScheme].text,
                    fontSize: 12,
                    fontWeight: 'bold',
                  }}>{FAQ.header}</Text>
                </View>
              </Pressable>
              {currentTopic ? (
                <ScrollView>
                  <Modal isVisible={modalView}
                    animationIn='slideInUp'
                    backdropColor='#DDDDDD'
                    backdropOpacity={1}
                    onBackdropPress={() => { setModalView(false); }}>
                    <View style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      padding: 10,
                      width: '100%',
                      alignItems: 'center'
                    }}>
                      <Text style={{ fontWeight: 'bold' }}>{currentTopic.header}</Text>
                    </View>
                    <View style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      padding: 10,
                      width: '100%',
                      alignItems: 'center'
                    }}>
                      <Text>{currentTopic.content}</Text>
                    </View>
                    <View style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      padding: 10,
                      width: '100%',
                      alignItems: 'center'
                    }}>
                      <Button
                        title='Close'
                        color='blue'
                        onPress={closeModal} />
                    </View>
                  </Modal>
                </ScrollView>) : <></>}
            </View>
          ))
        }
        <View>
          <Pressable onPress={() => { setModalViewHelp(true); }}>
            <View style={{
              flexDirection: 'row',
              justifyContent: 'center',
              padding: 10,
              width: '100%',
              alignItems: 'center'
            }}>
              <Text style={{ color: 'blue' }}>{t('requestHelp')}</Text>
            </View>
          </Pressable>
          <ScrollView>
            <Modal isVisible={modalViewHelp}
              animationIn='slideInUp'
              backdropColor='#DDDDDD'
              backdropOpacity={1}
              onBackdropPress={() => { setModalViewHelp(false); }}>
              <View style={{
                flexDirection: 'row',
                justifyContent: 'center',
                padding: 10,
                width: '100%',
                alignItems: 'center',
              }}>
                <Text style={{
                  color: Colors[colorScheme].text,
                  fontSize: 12,
                  fontWeight: 'bold',
                }}>{t('describeYourIssue')}</Text>
              </View>
              <View style={{
                flexDirection: 'row',
                justifyContent: 'center',
                padding: 10,
                width: '100%',
                alignItems: 'center',
              }}>
                <TextInput
                  style={{ backgroundColor: 'white', flex: 1, height: 500 }}
                  multiline={true}
                  numberOfLines={10}
                  onChangeText={(text) => setHelpMessageText(text)}
                  placeholder={t('myIssue')}
                  value={helpMessageText}
                />
              </View>
              <Button
                title={t('submit')}
                color={Colors[colorScheme].tint}
                onPress={submitHelpMessage}
              />
            </Modal>
          </ScrollView>
        </View>
      </View>
    </ScrollView >
  );
};

export default HelpPage;