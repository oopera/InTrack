import React, {useEffect, useState} from "react";
import {ScrollView, View} from "react-native";
import {AppData} from "../../utils/ApplicationData";
import logger from "../../utils/Logger";
import {doesCountyExists, getCountyInformationByName} from "../../api/CountyDataController";
import {CustomCountyCard} from "../../components/CountyView/CustomCountyCard/CustomCountyCard";
import {SearchCard} from "../../components/CountyView/CountySearchCard/SearchCard";
import {CARD_ITEM_WIDTH, isMobile, toastingBad, toastingGood, toastingWarning} from "../../utils/GeneralUtils";


export default function FavouriteCountyScreen(props) {
    const [favouriteCounties] = useState([]);

    const [rerender, setRerender] = useState(false);
    const [searchResult, setSearchResult] = useState("");

    /**
     * This method starts a rendering process by using a toggle state
     */
    function softRerender(){
        setRerender(!rerender);
    }

    /**
     * Loads a favourite list into the application, should run once when the component is loaded
     */
    useEffect(async () => {
        logger.enter("initialize of FavouriteScreen", "App")

        favouriteCounties.length = 0;
        logger.info("Read favourites from application data")
        for(let county of AppData.getFavourites()){
            let details = await getCountyInformationByName(county);
            favouriteCounties.push({"key": county, "details": details});
        }
        softRerender();

        logger.leave("initialize of FavouriteScreen", "App")
    }, []);

    /**
     * Adds a county to the favourite list
     * @returns {Promise<boolean>} Always true
     */
    async function addCounty() {
        logger.enter("addCounty", "App");
        try {
            let county = searchResult;
            if(AppData.getFavourites().indexOf(county) >= 0){
                toastingWarning("Landkreis \"" + county + "\" wurde bereits hinzugefügt");
                logger.info("County " + county + " already added");
                logger.leave("addCounty", "App");
                setSearchResult("");
                return false;
            }
            if(!doesCountyExists(county)){
                toastingWarning("Landkreis \"" + county + "\" existiert nicht");
                setSearchResult("");
                return false;
            }
            let result = await getCountyInformationByName(county);

            favouriteCounties.push({"key": county, "details": result});
            AppData.addFavourite(county);
            softRerender();

            toastingGood("Landkreis \"" + county + "\" wurde zu den favoriten hinzugefügt");
            setSearchResult("");
            logger.leave("addCounty", "App")
            return true;
        } catch (ex) {
            toastingBad("Es ist ein Fehler passiert");
            logger.exception(ex);
            logger.unexpectedLeft("addCounty", "App");
            return false;
        }
    }

    /**
     * Removes a county from the favourite list
     * @param county County to remove
     */
    function removeCounty(county){
        logger.enter("removeCounty", "App");

        // Get the index of the favourite county
        const favouriteItemIndex = favouriteCounties.indexOf(county);

        // If the county exists as a favourite the index is greater or equal 0
        if(favouriteItemIndex >= 0){
            // remove one element at given index
            favouriteCounties.splice(favouriteItemIndex, 1);

            AppData.removeFavourite(county.key);

            softRerender();

            toastingGood("Landkreis \"" + county.key + "\" wurde aus den Favoriten entfernt");
            logger.enter("removeCounty", "App");
        }
    }

    function renderElements(){
        return favouriteCounties.map((item) => {
            return (
                <View key={item.key}>
                    <CustomCountyCard county={item.details}
                                      buttonText={"Entfernen"}
                                      onButton={()=> removeCounty(item)} />
                </View>
            )
        });
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#2D2D2D'}}>
            <ScrollView
                horizontal={isMobile()}
                decelerationRate={"normal"}
                snapToInterval={CARD_ITEM_WIDTH}
                bounces={false}
                style={{ marginTop: 40, paddingHorizontal: 0 }}
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={12}>
                <View>
                    <SearchCard searchResult={searchResult}
                                setSearchResult={setSearchResult}
                                dataList={props.countyList}
                                buttonText={"Hinzufügen"}
                                onSearch={() => addCounty()} />
                </View>
                {
                    renderElements()
                }
            </ScrollView>
        </View>
    );
}
