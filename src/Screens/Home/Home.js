import React, { Component } from 'react';
import { TextInput, View, Text, TouchableOpacity, SafeAreaView, Keyboard, Platform, Image } from 'react-native';
import { getStyleProps } from './HomeStyle'
import { getImageByTheme } from '../../Constants/Images';
import { getLanguageString } from '../../Constants/Message'
import APILoadingHOC from "../../Components/HOCS/APILoadingHOC";
import * as LogoutAction from '../../Store/Actions/LogoutActions'
import { connect } from 'react-redux';
import Toast from 'react-native-simple-toast';
import AppAsync from '../../Singleton/AsyncStorage';
import FirebaseSingleton from '../../Singleton/Firebase';
import {RegisterDevice} from '../../Utilities/Utils'
import { ScrollView } from 'react-native-gesture-handler';
import Color from '../../Constants/Color';
import { SliderBox } from "react-native-image-slider-box";
import {widthPer} from '../../Utilities/Utils'

let Firebase = FirebaseSingleton.getInstance()

const AppAsyncStorage = AppAsync.getInstance();

class HomeScreen extends Component {
    static ROUTE_NAME = "Home";

    state = {
        images: [
          "https://source.unsplash.com/1024x768/?house",
          "https://source.unsplash.com/1024x768/?socity",
          "https://source.unsplash.com/1024x768/?appartment",
          "https://source.unsplash.com/1024x768/?villa",
        ]
      };


    async componentDidMount(){
        await this.saveFcm();
       
    }

    saveFcm = async() => {
        let fcmToken = (await AppAsyncStorage.getAsyncData('fcmToken'))||null
        if(fcmToken && fcmToken.length>0){
            this.sendTokenToServer(fcmToken)
        }else{
            fcmToken = (await Firebase.FirebaseInit())||null;
            this.sendTokenToServer(fcmToken)
        }
    }

    sendTokenToServer(token){
        let data = {
            token: this.props.user.token,
            device_type: Platform.OS === 'android' ? "1" : "2",
            fcm_token: token
        }
        RegisterDevice(data)
    }

    goToDetail=(id)=>{
        console.log("GOING TO DETAIL")
        this.props.navigation.navigate('Detail');
    }

    render() {
        const { navigation } = this.props;
        let Style_Var = getStyleProps(this.props.theme.color);
        let String_Var = getLanguageString(this.props.theme.lang);
        let Image_Var = getImageByTheme(this.props.theme.color);
        console.log(Style_Var)
        return (
            // <ScrollView>
                <View style={Style_Var.Container}>
                    <View style={Style_Var.SearchContainer}>
                            <Image source={Image_Var.Search} style={Style_Var.SearchImage}/>
                            <TextInput style={Style_Var.SearchInput} placeholder="Search" placeholderTextColor={Color[this.props.theme.color]['Gray']}/>
                            <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Filter')}}><Image source={Image_Var.Filter} style={Style_Var.FilterImage}/></TouchableOpacity>

                        </View>
                    <ScrollView style={Style_Var.ContentContainer} showsVerticalScrollIndicator={false}>
                        
                        <View style={Style_Var.TextContainer}>
                            <Text style={Style_Var.Greeting}>Let's find a property for you.
                            </Text>
                        </View>
                        <TouchableOpacity style={Style_Var.HouseCard} onPress={this.goToDetail}>

                            <View style={Style_Var.ImageSliderContainer}>
                                
                                <SliderBox
                                // autoplay
                                circleLoop
                                images={this.state.images}
                                // onCurrentImagePressed={index =>
                                //     console.warn(`image ${index} pressed`)
                                // }
                                sliderBoxHeight={250}
                                parentWidth={widthPer(93)}
                                ImageComponentStyle={{borderRadius: 5,width:'98%'}}
                                />
                                <View style={Style_Var.TagContainer}>
                                    <View style={[Style_Var.TagTextContainer,Style_Var.JustAdded]}>
                                        <Text style={Style_Var.TagText}>Featured</Text>
                                    </View>
                                </View>
                                <TouchableOpacity style={Style_Var.FavContainer}>
                                    <Image source={Image_Var.Fav} style={Style_Var.FavImage}/>
                                </TouchableOpacity>
                            </View>
                            
                            <View style={Style_Var.FeatureContainer}>
                                <Text style={Style_Var.LayoutText}>2 BED - 2 BATH</Text>
                                <View style={Style_Var.PriceTextContainer}>
                                    <Text style={Style_Var.PriceText}>$ 1,000</Text><Text style={Style_Var.SuperScrip}>PerMonth</Text>
                                </View>
                                <Text style={Style_Var.AddressText}>55-B, Sec-21, Noida</Text>
                                <Text style={Style_Var.BenifitText}>No Deposit - Netflix - Cleaner</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={Style_Var.HouseCard}>

                            <View style={Style_Var.ImageSliderContainer}>
                                
                                <SliderBox
                                // autoplay
                                circleLoop
                                images={this.state.images}
                                // onCurrentImagePressed={index =>
                                //     console.warn(`image ${index} pressed`)
                                // }
                                sliderBoxHeight={250}
                                parentWidth={widthPer(93)}
                                ImageComponentStyle={{borderRadius: 5,width:'98%'}}
                                />
                                <View style={Style_Var.TagContainer}>
                                    <View style={[Style_Var.TagTextContainer,Style_Var.Premium]}>
                                        <Text style={Style_Var.TagText}>Premium</Text>
                                    </View>
                                </View>
                                <TouchableOpacity style={Style_Var.FavContainer}>
                                    <Image source={Image_Var.FavSelected} style={Style_Var.FavImage} />
                                </TouchableOpacity>
                            </View>
                            
                            <View style={Style_Var.FeatureContainer}>
                                <Text style={Style_Var.LayoutText}>2 BED - 2 BATH</Text>
                                <View style={Style_Var.PriceTextContainer}>
                                    <Text style={Style_Var.PriceText}>$ 1,000</Text><Text style={Style_Var.SuperScrip}>PerMonth</Text>
                                </View>
                                <Text style={Style_Var.AddressText}>55-B, Sec-21, Noida</Text>
                                <Text style={Style_Var.BenifitText}>No Deposit - Netflix - Cleaner</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={Style_Var.HouseCard}>

                            <View style={Style_Var.ImageSliderContainer}>
                                
                                <SliderBox
                                // autoplay
                                circleLoop
                                images={this.state.images}
                                // onCurrentImagePressed={index =>
                                //     console.warn(`image ${index} pressed`)
                                // }
                                sliderBoxHeight={250}
                                parentWidth={widthPer(93)}
                                ImageComponentStyle={{borderRadius: 5,width:'98%'}}
                                />
                                <View style={Style_Var.TagContainer}>
                                    <View style={[Style_Var.TagTextContainer,Style_Var.New]}>
                                        <Text style={Style_Var.TagText}>New</Text>
                                    </View>
                                </View>
                                <TouchableOpacity style={Style_Var.FavContainer}>
                                    <Image source={Image_Var.Fav} style={Style_Var.FavImage} />
                                </TouchableOpacity>
                            </View>
                            
                            <View style={Style_Var.FeatureContainer}>
                                <Text style={Style_Var.LayoutText}>2 BED - 2 BATH</Text>
                                <View style={Style_Var.PriceTextContainer}>
                                    <Text style={Style_Var.PriceText}>$ 1,000</Text><Text style={Style_Var.SuperScrip}>PerMonth</Text>
                                </View>
                                <Text style={Style_Var.AddressText}>55-B, Sec-21, Noida</Text>
                                <Text style={Style_Var.BenifitText}>No Deposit - Netflix - Cleaner</Text>
                            </View>
                        </TouchableOpacity>

                        <View style={Style_Var.ScreenEnd}/>
                    </ScrollView>
                    
                </View>
            // </ScrollView>
            
        );
    }
}
const mapStateToProps = (state) => {
    const { loginResponse } = state.loginReducer;
    const {
        themeReducer
    } = state;
    return {
        user: {...loginResponse},
        theme: themeReducer.theme
    };
};
let HomeContainer = connect(mapStateToProps, {...LogoutAction })(HomeScreen);
let HomeWithLoader = APILoadingHOC(HomeContainer);

HomeWithLoader.getIntent = () => {
    return {
        routeName: HomeScreen.ROUTE_NAME,
    };
};

// export default HomeScreen;
export default HomeWithLoader;