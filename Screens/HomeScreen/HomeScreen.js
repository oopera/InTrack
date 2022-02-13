import React, {useState} from "react";
import {ScrollView, View} from "react-native";
import {NationView} from "../../components/NationView/NationView";
import {CountyDetailCard} from "../../components/CountyView/CountyDetailCard/CountyDetailCard";
import {CARD_ITEM_WIDTH, isMobile} from "../../utils/GeneralUtils";


export default function HomeScreen(props) {
    const [data, setData] = useState({});
    const [chosenCounty, setChosenCounty] = useState("");

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
                <CountyDetailCard
                                  data={data} setData={setData}
                                  gps={props.gps}
                                  chosenCounty={chosenCounty} setChosenCounty={setChosenCounty}
                                  countyList={props.countyList}
                />
                <NationView />
            </ScrollView>
        </View>
    );
}
