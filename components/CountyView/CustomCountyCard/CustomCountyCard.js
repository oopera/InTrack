import {Card} from "react-native-elements";
import {styles} from "../CountyDetailCard/CountyDetailCardStyle";
import {Text} from "react-native";
import {CustomTable} from "../../customElements/CustomTable/CustomTable";
import React, {useState} from "react";
import {CustomButton} from "../../customElements/CustomButton/CustomButton";

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
export const extractCountyDataset = (data) => {
    return [
        {
            "key": "Einwohner",
            "value": data['population']
        },
        {
            "key": "Inzidenz",
            "value": data['incidence']
        },
        {
            "key": "Fälle gesamt",
            "value": data['cases']
        },
        {
            "key": "Fälle/Woche",
            "value": data['casesPerWeek']
        },
        {
            "key": "Tode",
            "value": data['death']
        },
        {
            "key": "Tode/Woche",
            "value": data['deathPerWeek']
        }
    ];
}

/**
 * This component shows information about a county
 * @param props The properties must contain county information
 * @returns {JSX.Element} React native component
 */
export const CustomCountyCard = (props) => {
    const [county, _] = useState(props.county);
    return (
        <Card containerStyle={styles.card}>
            <Card.Title style={[styles.title]}>{county.name}</Card.Title>
            <Text style={[styles.subtitle]}>{county.state}</Text>
            <Card.Divider/>
            <CustomTable data={extractCountyDataset(county.data)}/>
            <Card.Divider/>
            {props.onButton &&
                <CustomButton onPress={props.onButton} text={props.buttonText || 'search'}/>
            }
        </Card>
    )
}
