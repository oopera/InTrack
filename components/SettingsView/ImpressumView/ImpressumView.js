import React, {useState} from 'react';
import {Modal, Text, View} from 'react-native';
import {styles} from "./ImpressumViewStyle";
import {CustomButton} from "../../customElements/CustomButton/CustomButton";



export const ImpressumView = () => {
    const [modalVisible, setModalVisible] = useState(false);

    return(
        <View >

            <Modal visible={modalVisible} transparent={true}>
                <View style={styles.modal}>
                    <Text style={styles.modalTextBold}>Impressum</Text>
                    <Text style={styles.modalText}>{'\nHochschule Ruhr West\n' +
                        'Duisburger Straße 100\n' +
                        '45479 Mülheim an der Ruhr\n' +
                        '\n' +
                        'Erstellt durch:\n' +
                        '- Nils Milewski\n' +
                        '- Lucas Lichner\n\n'
                    }</Text>
                    <CustomButton text={"Schließen"} onPress={() => setModalVisible(!modalVisible)} />
                </View>
            </Modal>
            <CustomButton text={"Impressum"} onPress={() => setModalVisible(true)} />
        </View>

    );

}

