import * as React from 'react';
import { useState } from 'react';
import { Pressable, View, Text, ScrollView, StyleSheet, Button } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import createStyle from '../components/ChatListItem/style';
import useColorScheme from '../hooks/useColorScheme';
import Colors from '../constants/Colors';

type FAQItem = {
    header: string,
    content: string,
}

// const styles = StyleSheet.create({
//     FAQ: {
//         justifyContent: 'center',
//         alignItems: 'center',
//         margin: 10,
//         padding: 5,
//     },

//     FAQContainer: {
//         justifyContent: 'center',
//         alignItems: 'center',
//         margin: 5,
//         padding: 10,
//         borderWidth: 1,
//         backgroundColor: '#F9F9F9',
//         borderColor: '#d3d3d3',
//         borderRadius: 20,
//         paddingLeft: 75,
//         paddingRight: 75,
//     },

//     page: {
//         backgroundColor: '#cdf0ea',
//     },

//     title: {
//         color: '#beaee2',
//         fontSize: 20,
//         fontWeight: 'bold',
//         justifyContent: 'center',
//         marginTop: 75,
//         marginBottom: 10,
//     },

//     titleView: {
//         justifyContent: 'center',
//         alignItems:'center',
//     },

//     input: {
//         height: 500,
//         width: 250,
//         backgroundColor: '#FFFFFF',
//     }
// });

const HelpPage: React.FC<unknown> = (props) => {
    const colorScheme = useColorScheme();
    const styles = createStyle(colorScheme);


    const [modalView, setModalView] = useState(false);
    const [currentTopic, setCurrentTopic] = useState<FAQItem>();
    const [modalViewHelp, setModalViewHelp] = useState(false);
    const [helpMessageText, setHelpMessageText] = useState('');

    const FAQItems: FAQItem[] = [];
    for (let i = 0; i < 5; i++) {
        FAQItems[i] = { header: "", content: "" };
        FAQItems[i].header = `Topic ${i + 1} -- Test`;
        FAQItems[i].content = "Figure it out.";
    }

    const closeModal = () => {
        setModalView(false);
    }

    const submitHelpMessage = () => {

    }

    return (
        <ScrollView>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'center',
                padding: 10,
                width: '100%',
                alignItems: 'center'
            }}>
                <Text style={styles.title}>Frequently Asked Questions</Text>
            </View>
            <View>
                {
                    FAQItems.map((FAQ) => (
                        <View key={FAQ.header}>
                            <Pressable onPress={() => { setModalView(true); setCurrentTopic(FAQ) }}>
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
                    <Pressable onPress={() => { setModalViewHelp(true) }}>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            padding: 10,
                            width: '100%',
                            alignItems: 'center'
                        }}>
                            <Text style={{ color: 'blue' }}>Request Help From An Admin</Text>
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
                                }}>Describe your issue below:</Text>
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
                                    placeholder='Begin Typing'
                                    value={helpMessageText}
                                />
                            </View>
                            <Button
                                title='Submit'
                                color='blue'
                                onPress={submitHelpMessage}
                            />
                        </Modal>
                    </ScrollView>
                </View>
            </View>
        </ScrollView >
    )
}

export default HelpPage;