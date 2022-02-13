import React, {useState} from "react";
import {View, Text, ActivityIndicator} from "react-native";
import {Card} from "react-native-elements";
import {getCountyInformationByName} from "../../../api/CountyDataController";
import {SearchElement} from "../../customElements/SearchElement/SearchElement";
import {styles} from "./CountyDetailCardStyle";
import {AppData} from "../../../utils/ApplicationData";
import {Locator} from "../../../services/LocationService";
import {CustomCountyCard} from "../CustomCountyCard/CustomCountyCard";
import {toastingWarning} from "../../../utils/GeneralUtils";
import {CustomButton} from "../../customElements/CustomButton/CustomButton";

/**
 * This is a custom react native component.<br>
 * The component contains a search view for a county and a detail view about a county.<br>
 * Searching can be done manually by entering a county name or via the location service of the device.
 * @returns {JSX.Element}
 */
const CountyDetailCard = (props) => {
    /**
     * This attribute is used to determine a loading state. <br>
     * If true a loading animation will be displayed and the search and locate button are disabled
     */
    const [loading, setLoading] = useState(false);
    const [currentlySelectedCountyName, setCurrentlySelectedCountyName] = useState(AppData.getCounty());
    const [currentlySelectedCountyData, setCurrentlySelectedCountyData] = useState({});
    const [showSearch, setShowSearch] = useState(true);
    const gps = props.gps;


    // Toggle the view between a search view and a county details view
    if (showSearch) {
        return (
            <View>
                <Card containerStyle={styles.card}>
                    <Card.Title style={[styles.title]}>Landkreis suchen</Card.Title>
                    <Card.Divider/>
                    <SearchElement styles={styles.search_element}
                                   data={props.countyList}
                                   currentlySelectedCountyName={currentlySelectedCountyName}
                                   setCurrentlySelectedCountyName={setCurrentlySelectedCountyName}/>

                    <Card.Divider/>
                    {
                        loading && (
                            <View>
                                <ActivityIndicator size={"large"}/>
                                <Text style={[styles.text]}>Locating device using V8 turbo</Text>
                            </View>
                        )
                    }
                    <View style={[styles.multiple_button_container]}>
                        {Locator.isEnabled() && <CustomButton text="Orten" onPress={() => {
                            // Display loading state while the current city is located
                            setLoading(true);
                            Locator.getCurrentLocationName().then(result => {
                                // The current county is located so disable search animation and update
                                // the currently selected county name
                                setCurrentlySelectedCountyName(result);
                                setLoading(false);
                            }).catch(() => toastingWarning("Landkreis mit diesen Koordinaten \"" + gps + "\" existiert nicht"));

                        }}/>
                        }


                        <CustomButton text="Suchen" onPress={() => {
                            getCountyInformationByName(currentlySelectedCountyName).then(result => {
                                // The data is loaded and now stored inside the county data
                                // this implies that the search view is no longer required => hide it
                                setCurrentlySelectedCountyData(result);
                                setShowSearch(false);
                            }).catch(() => toastingWarning("Landkreis \"" + currentlySelectedCountyName + "\" existiert nicht"));
                        }}/>

                    </View>
                </Card>
            </View>
        )
    } else {
        return (
            <View>
                <CustomCountyCard county={currentlySelectedCountyData} onButton={() => setShowSearch(true)} buttonText={"Zurück"} />
            </View>
        )
    }
}

export {CountyDetailCard}
