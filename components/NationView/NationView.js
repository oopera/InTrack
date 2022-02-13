import React, {useEffect, useState} from "react";
import {View, Text, ActivityIndicator} from "react-native";
import { Card } from "react-native-elements";
import NationalDataController from "../../api/NationalDataController";
import {styles} from "./NationViewStyle";
import {CustomTable} from "../customElements/CustomTable/CustomTable";

/**
 * Transforms a county data document into a processable entity
 * <ul>Mandatory input elements
 *  <li>population</li>
 *  <li>incidence</li>
 *  <li>cases</li>
 *  <li>casesPerWeek</li>
 *  <li>death</li>
 *  <li>deathPerWeek</li>
 * </ul>
 * @param data Input json document
 * @returns Mapped data
 */
export const extractNationDataset = (data) => {
    return [
        {
            "key": "Fälle",
            "value": data.national.cases7
        },
        {
            "key": "Inzidenz",
            "value": data.national.cases7_per_100k
        },
        {
            "key": "Todesfälle",
            "value": data.national.death
        },
        {
            "key": "R Wert",
            "value": data.national.r_value
        },
        {
            "key": "Hospitalisierung",
            "value": data.national.hospitalization
        }
    ]
};

/**
 * This component represents information about a nation
 * @returns {JSX.Element} New React Native Custom Nation View
 */
export const NationView = () => {
    /**
     * If this attribute is false a loading animation is shown
     */
    const [initialized, setInitialized] = useState(false);
    const [data, setData] = useState({});
    // Initialize the data once when the component is loaded
    useEffect(() => {
        NationalDataController().then(result => {
            setData(result);
            setInitialized(true);
        })
    }, []);

    if(!initialized){
        return(
            <View>
                <ActivityIndicator size={"large"}/>
                <Text>Loading.... </Text>
            </View>
        );
    }else {
        return (
            <View>
                <Card style={[styles.card, styles.text, styles.headline]}  containerStyle={styles.card}>
                    <Card.Title style={styles.text}>Aktuelle Nationale Inzidenz</Card.Title>
                    <Text style={[styles.subtitle]}>Deutschland</Text>
                    <Card.Divider/>
                    <CustomTable data={extractNationDataset(data)}/>
                </Card>
            </View>
        );
    }
}

