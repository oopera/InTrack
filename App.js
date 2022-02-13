import React, {useEffect, useState} from 'react';
import {ActivityIndicator, AppState, Text, View} from 'react-native';
import {Header} from "react-native-elements";
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Locator} from "./services/LocationService";
import {
    getCountyListAsProcessableJsonObject,
    updateCountyDataSource
} from "./api/CountyDataController"
import {SettingsView} from "./components/SettingsView/SettingsView";
import styles from './styles/default'
import logger from "./utils/Logger";
import {AppData} from "./utils/ApplicationData";
import HomeScreen from "./Screens/HomeScreen/HomeScreen";
import FavouriteCountyScreen from "./Screens/FavouriteScreen/FavouriteCountyScreen";
import Toast from "react-native-toast-notifications";
import { Ionicons, MaterialIcons  } from '@expo/vector-icons';
import {loadData, storeData} from "./utils/GeneralUtils";
import {AppSettings} from "./utils/ApplicationSettings";


function SettingScreen(props) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#2D2D2D'}}>
            <SettingsView setGps={props.setGps} gps={props.gps} />
        </View>
    );
}

const Tab = createBottomTabNavigator();

export default function App() {
    //General used states
    const [countyList, setCountyList] = useState({});

    const [loading, setLoading] = useState(true);
    const [loadingText, setLoadingText] = useState("Firing up ultra fast mega hypa hypa V8 turbo");

    const [gps, setGps] = useState(AppSettings.gpsEnabled());

    // This is runs once when the application started, after finishing the loading screen will be hidden
    useEffect(async () => {
        // Note the setLoadingText will inform the user what operation is currently executed
        logger.enter("App initial useEffect");

        AppState.addEventListener("change", nextAppState => {
            if (nextAppState === "background") {
                storeData();
            }
        });
        logger.info("Read AppData");
        setLoadingText("Lade Nutzerdaten");
        await loadData();
        setGps(AppSettings.gpsEnabled())
        logger.info("Request all required permissions")
        setLoadingText("Request permissions");
        await Locator.request();

        logger.info("Update data sources");
        setLoadingText("Super fast V8 turbo is updating data sources 1/2");
        await updateCountyDataSource();

        logger.info("Updating county list");
        setLoadingText("Super fast V8 turbo is updating data sources 2/2");
        let result = await getCountyListAsProcessableJsonObject();
        setCountyList(result);

        if (Locator.isGranted()) {
            logger.info("Locate user");
            setLoadingText("Locating user inside real world using V8 turrrrrrbo");
            let county =  await Locator.getCurrentLocationName().catch(error => {
                logger.critical("Cannot locate the user using default Berlin Mitte");
                logger.exception(error);
                return "Berlin Mitte"
            });
            AppData.setCounty(county)
        } else {
            logger.warn("Location service has no permission");
        }

        logger.info("Done initializing");
        setLoadingText("...")
        setLoading(false);
        logger.leave("App initial useEffect");
        return async () =>{
            setLoading(true);
            setLoadingText("V8 is shutting down please stand by...");
            await storeData();
            setLoading(false);
        }
    }, []);


    if (loading) {
        return (
            <SafeAreaProvider>
                <Header backgroundColor={'#2d2d2d'} style={styles.headerContainer}
                        leftComponent={{text: 'InTrack', style: styles.heading}}/>
                <View style={{justifyContent: 'center', alignItems: 'center', flex: 1, backgroundColor:'#2d2d2d'}}>
                    <Text style={{fontSize:28, color: 'white'}}>{loadingText}</Text>
                    <ActivityIndicator size={"large"}/>
                </View>
            </SafeAreaProvider>)
    } else {
        return (
                <SafeAreaProvider>

                    <NavigationContainer>
                        <Header backgroundColor={'#2d2d2d'} style={styles.headerContainer}
                                leftComponent={{text: 'InTrack', style: styles.heading}}/>
                        <Tab.Navigator screenOptions={{
                            headerShown: false, tabBarInactiveBackgroundColor: '#2D2D2D',
                            tabBarActiveBackgroundColor: '#858585', tabBarActiveTintColor: 'white',   showIcon: true
                        }}
                        >
                            <Tab.Screen name="Start"
                                        children={() => <HomeScreen countyList={countyList} gps={gps}/>
                                        }
                                        options={{
                                            tabBarLabel: 'Home',
                                            tabBarIcon: () => (<Ionicons name="home" color='white' size={24} />),
                                        }}
                            />

                            <Tab.Screen name="Favoriten"
                                        children={() => <FavouriteCountyScreen countyList={countyList}/>}
                                        options={{
                                            tabBarLabel: 'Favoriten',
                                            tabBarIcon: () => (<MaterialIcons name="favorite" size={24} color="white" />),
                                        }}
                            />

                            <Tab.Screen name="Einstellungen"
                                        children={() => <SettingScreen setGps={setGps} gps={gps} />}
                                        options={{
                                            tabBarLabel: 'Einstellungen',
                                            tabBarIcon: () => (<Ionicons name="settings-sharp" size={24} color="white" />),
                                        }}
                            />

                        </Tab.Navigator>
                    </NavigationContainer>
                    <Toast ref={(ref) => global['toast'] = ref} />
                </SafeAreaProvider>
        );
    }
}
