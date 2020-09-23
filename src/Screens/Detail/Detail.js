import React, { Component } from 'react';
import { TextInput, View, Text, TouchableOpacity, SafeAreaView, Keyboard, Platform, Image } from 'react-native';
import { getStyleProps } from './DetailStyle'
import { getImageByTheme } from '../../Constants/Images';
import { getLanguageString } from '../../Constants/Message'
import APILoadingHOC from "../../Components/HOCS/APILoadingHOC";
import * as LogoutAction from '../../Store/Actions/LogoutActions'
import { connect } from 'react-redux';
import Toast from 'react-native-simple-toast';
import AppAsync from '../../Singleton/AsyncStorage';
import { ScrollView } from 'react-native-gesture-handler';
import Color from '../../Constants/Color';
import { SliderBox } from "react-native-image-slider-box";
import {widthPer} from '../../Utilities/Utils';
import Ionicons from 'react-native-vector-icons/Ionicons';



const AppAsyncStorage = AppAsync.getInstance();

class DetailScreen extends Component {
    static ROUTE_NAME = "Detail";

    state = {
        images: [
          "https://source.unsplash.com/1024x768/?house",
          "https://source.unsplash.com/1024x768/?socity",
          "https://source.unsplash.com/1024x768/?appartment",
          "https://source.unsplash.com/1024x768/?villa",
        ]
      };


    async componentDidMount(){
       
    }

    render() {
        const { navigation } = this.props;
        let Style_Var = getStyleProps(this.props.theme.color);
        let String_Var = getLanguageString(this.props.theme.lang);
        let Image_Var = getImageByTheme(this.props.theme.color);
        console.log(Style_Var)
        return (
            <>
                <View style={Style_Var.Container}>
                    <ScrollView style={Style_Var.ContentContainer} showsVerticalScrollIndicator={false}>
                            <View style={Style_Var.ImageSliderContainer}>
                                <SliderBox
                                autoplay
                                circleLoop
                                images={this.state.images}
                                sliderBoxHeight={300}
                                parentWidth={widthPer(100)}
                                ImageComponentStyle={{borderRadius: 5,width:'98%'}}
                                />
                                <TouchableOpacity style={Style_Var.FavContainer}>
                                    <Image source={Image_Var.FavSelected} style={Style_Var.FavImage}/>
                                </TouchableOpacity>
                                <TouchableOpacity style={Style_Var.BackContainer} onPress={()=>{this.props.navigation.goBack()}}>
                                    <Image source={Image_Var.WhiteBack} style={Style_Var.BackImage}/>
                                </TouchableOpacity>
                            </View>
                            <View style={Style_Var.DetailContainer}>
                                <View style={Style_Var.Details}>
                                    <View style={Style_Var.FeatureContainer}>
                                        <Text style={Style_Var.LayoutText}>2 BED - 2 BATH</Text>
                                        <View style={Style_Var.PriceTextContainer}>
                                            <Text style={Style_Var.PriceText}>$ 1,000</Text><Text style={Style_Var.SuperScrip}>PerMonth</Text>
                                        </View>
                                        <Text style={Style_Var.AddressText}>55-B, Sec-21, Noida</Text>
                                    </View>
                                    <View style={Style_Var.BenifitContainer} >
                                        <Text style={Style_Var.BenifitLable}>Benifits</Text>
                                        <ScrollView style={Style_Var.BenifitItemList} horizontal={true} automaticallyAdjustContentInsets={true} showsHorizontalScrollIndicator={false} bounces={true}>
                                            <View style={Style_Var.BenifitItem}>
                                                <Text style={Style_Var.BenifitText}>Free Wifi</Text>
                                            </View>
                                            <View style={Style_Var.BenifitItem}>
                                                <Text style={Style_Var.BenifitText}>NetFlix</Text>
                                            </View>
                                            <View style={Style_Var.BenifitItem}>
                                                <Text style={Style_Var.BenifitText}>Gas Connection</Text>
                                            </View>
                                            <View style={Style_Var.BenifitItem}>
                                                <Text style={Style_Var.BenifitText}>Electricity</Text>
                                            </View>
                                            <View style={Style_Var.BenifitItem}>
                                                <Text style={Style_Var.BenifitText}>24/7 Power Backup</Text>
                                            </View>
                                            <View style={Style_Var.BenifitItem}>
                                                <Text style={Style_Var.BenifitText}>Free Wifi</Text>
                                            </View>
                                            <View style={Style_Var.BenifitItem}>
                                                <Text style={Style_Var.BenifitText}>Free Wifi</Text>
                                            </View>
                                            <View style={Style_Var.BenifitItem}>
                                                <Text style={Style_Var.BenifitText}>Free Wifi</Text>
                                            </View>
                                            <View style={Style_Var.BenifitItem}>
                                                <Text style={Style_Var.BenifitText}>Free Wifi</Text>
                                            </View>
                                        </ScrollView>
                                    </View>
                                    <View style={Style_Var.PropertyDetailContainer} >
                                        <Text style={Style_Var.BenifitLable}>Property Details</Text>
                                        <View style={Style_Var.PropertyDetailList} >
                                            <View style={Style_Var.PropertyDetailItem}>
                                                <Ionicons name='md-flame-outline' size={24} color={Color[this.props.theme.color]['OffWhite']} />
                                                <Text style={Style_Var.BenifitText}>Gas</Text>
                                            </View>
                                            <View style={Style_Var.PropertyDetailItem}>
                                                <Ionicons name='md-eye-outline' size={24} color={Color[this.props.theme.color]['OffWhite']} />
                                                <Text style={Style_Var.BenifitText}>South Facing</Text>
                                            </View>
                                            <View style={Style_Var.PropertyDetailItem}>
                                                <Ionicons name='paw-outline' size={24} color={Color[this.props.theme.color]['OffWhite']} />
                                                <Text style={Style_Var.BenifitText}>Pet Allowed</Text>
                                            </View>
                                            <View style={Style_Var.PropertyDetailItem}>
                                                <Ionicons name='globe-outline' size={24} color={Color[this.props.theme.color]['OffWhite']} />
                                                <Text style={Style_Var.BenifitText}>Broadband</Text>
                                            </View>
                                            <View style={Style_Var.PropertyDetailItem}>
                                                <Ionicons name='md-car-sport-outline' size={24} color={Color[this.props.theme.color]['OffWhite']} />
                                                <Text style={Style_Var.BenifitText}>2 Parking</Text>
                                            </View>
                                            <View style={Style_Var.PropertyDetailItem}>
                                                <Ionicons name='restaurant-outline' size={24} color={Color[this.props.theme.color]['OffWhite']} />
                                                <Text style={Style_Var.BenifitText}>Food</Text>
                                            </View>
                                            <View style={Style_Var.PropertyDetailItem}>
                                                <Ionicons name='md-flash-outline' size={24} color={Color[this.props.theme.color]['OffWhite']} />
                                                <Text style={Style_Var.BenifitText}>Electricity</Text>
                                            </View>
                                            
                                            <View style={Style_Var.PropertyDetailItem}>
                                                <Ionicons name='shield-checkmark-outline' size={24} color={Color[this.props.theme.color]['OffWhite']} />
                                                <Text style={Style_Var.BenifitText}>24/7 Security</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={Style_Var.BenifitContainer} >
                                        <Text style={Style_Var.BenifitLable}>More Detail</Text>
                                        <View style={Style_Var.MoreDetailTextContainer}>
                                            <Text style={Style_Var.MoreDetailText}>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        <View style={Style_Var.ScreenEnd}/>
                    </ScrollView>
                    
                </View>
                <View style={Style_Var.BottomButtonContainer}>
                <TouchableOpacity style={Style_Var.RentNowButton}>
                    <Text style={Style_Var.RentNow}>Rent Now</Text>
                </TouchableOpacity>
                <TouchableOpacity >
                <View style={Style_Var.SchedualeButton}>
                    <Ionicons name='md-calendar-outline' size={24} color={Color[this.props.theme.color]['OffWhite']} />
                    <Text style={Style_Var.BenifitText}>Scheduale</Text>
                </View>
                </TouchableOpacity>
            </View>
            </>
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
let HomeContainer = connect(mapStateToProps, {...LogoutAction })(DetailScreen);
let HomeWithLoader = APILoadingHOC(HomeContainer);

HomeWithLoader.getIntent = () => {
    return {
        routeName: DetailScreen.ROUTE_NAME,
    };
};

// export default DetailScreen;
export default HomeWithLoader;