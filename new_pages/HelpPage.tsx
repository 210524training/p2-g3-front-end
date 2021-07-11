import * as React from 'react';
import { useState } from 'react';
import { Pressable, View, Text, ScrollView, StyleSheet, Button} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';

type FAQItem = {
    header: string,
    content: string,
}

const styles = StyleSheet.create({
    FAQ: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        padding: 5,
    },

    FAQContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
        padding: 10,
        borderWidth: 1,
        backgroundColor: '#F9F9F9',
        borderColor: '#d3d3d3',
        borderRadius: 20,
        paddingLeft: 75,
        paddingRight: 75,
    },

    page: {
        backgroundColor: '#cdf0ea',
    },

    title: {
        color: '#beaee2',
        fontSize: 20,
        fontWeight: 'bold',
        justifyContent: 'center',
        marginTop: 75,
        marginBottom: 10,
    },

    titleView: {
        justifyContent: 'center',
        alignItems:'center',
    },

    input: {
        height: 500,
        width: 250,
        backgroundColor: '#FFFFFF',
    }
});

const HelpPage: React.FC<unknown> = (props) => {
    const [modalView, setModalView] = useState(false);
    const [currentTopic, setCurrentTopic] = useState<FAQItem>();
    const [modalViewHelp, setModalViewHelp] = useState(false);
    const [helpMessageText, setHelpMessageText] = useState('Write here.');

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
        <ScrollView style={styles.page}>
            <View style={styles.titleView}>
                <Text style = {styles.title}>Frequently Asked Questions</Text>
            </View>
            <View>
                {
                    FAQItems.map((FAQ) => (
                        <View style={styles.FAQ} key={FAQ.header}>
                            <Pressable onPress={() => {setModalView(true); setCurrentTopic(FAQ)}}>
                                <View style={styles.FAQContainer}>
                                    <Text>{FAQ.header}</Text>
                                </View>
                            </Pressable>
                            {currentTopic? (
                            <ScrollView>
                                <Modal isVisible={modalView}
                                animationIn='slideInUp'
                                backdropColor='#F7DBF0'
                                backdropOpacity={1}
                                onBackdropPress={() => {setModalView(false);}}>
                                    <View style={styles.FAQ}>
                                    <Text>{currentTopic.header}</Text>
                                    <Text>{currentTopic.content}</Text>
                                    <Button 
                                    title='Close'
                                    color='#beaee2'
                                    onPress={closeModal}/>
                                    </View>
                                </Modal>
                            </ScrollView> ): <></>}
                        </View>
                    ))
                }
                <View style={styles.FAQ}>
                    <Pressable onPress={() => {setModalViewHelp(true)}}>
                        <View style={styles.FAQContainer}>
                            <Text>Request Help From An Admin</Text>
                        </View>
                    </Pressable>
                    <ScrollView>
                        <Modal isVisible={modalViewHelp}
                        animationIn='slideInUp'
                        backdropColor='#F7DBF0'
                        backdropOpacity={1}
                        onBackdropPress={() => {setModalViewHelp(false);}}>
                            <View style={styles.FAQ}>
                                <TextInput
                                style={styles.input}
                                multiline={true}
                                numberOfLines={10}
                                onChangeText={(text) => setHelpMessageText(text)}
                                value={helpMessageText}
                                />
                            </View>
                            <Button
                                title='Submit'
                                color='#beaee2'
                                onPress={submitHelpMessage}
                            />
                        </Modal>
                    </ScrollView>
                </View>
            </View>
        </ScrollView>
    )
}

export default HelpPage;