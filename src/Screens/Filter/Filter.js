import React, { Component } from 'react';
import { TextInput, View, Text, TouchableOpacity, SafeAreaView, Keyboard, Platform, Image } from 'react-native';
import { getStyleProps } from './FilterStyle'
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
import {widthPer, width} from '../../Utilities/Utils';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MultiSlider from '@ptomasroos/react-native-multi-slider'

const AppAsyncStorage = AppAsync.getInstance();

class FilterScreen extends Component {
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
                <View style={Style_Var.HeaderContainer}>
                    <TouchableOpacity style={Style_Var.BackContainer} onPress={()=>{this.props.navigation.goBack()}}>
                        <Image source={Image_Var.Cross} style={Style_Var.BackImage}/>
                    </TouchableOpacity>
                    <View style={Style_Var.HeaderTitleContainer}>
                        <Text style={Style_Var.HeaderTitle}>Filter</Text>
                    </View>

                </View>
                <View style={Style_Var.Container}>
                    <ScrollView style={Style_Var.ContentContainer} showsVerticalScrollIndicator={false}>
                            
                            <View style={Style_Var.FilterContainer}>
                                <View style={Style_Var.Filter}>
                                    
                                    <View style={Style_Var.HouseTypeContainer} >
                                        <Text style={Style_Var.HouseTypeLable}>Property Type</Text>
                                        <View style={Style_Var.HouseTypeList} >
                                            <View style={Style_Var.HouseTypeItem}>
                                                <Text style={Style_Var.ItemText}>Entire Appartment</Text>
                                            </View>
                                            <View style={Style_Var.HouseTypeItem}>
                                                <Text style={Style_Var.ItemText}>Modern</Text>
                                            </View>
                                            <View style={Style_Var.HouseTypeItem}>
                                                <Text style={Style_Var.ItemText}>Minimal</Text>
                                            </View>
                                            <View style={Style_Var.HouseTypeItem}>
                                                <Text style={Style_Var.ItemText}>Sharing</Text>
                                            </View>
                                            <View style={Style_Var.HouseTypeItem}>
                                                <Text style={Style_Var.ItemText}>Free Wifi</Text>
                                            </View>
                                            <View style={Style_Var.HouseTypeItem}>
                                                <Text style={Style_Var.ItemText}>Free Wifi</Text>
                                            </View>
                                            <View style={Style_Var.HouseTypeItem}>
                                                <Text style={Style_Var.ItemText}>Free Wifi</Text>
                                            </View>
                                            <View style={Style_Var.HouseTypeItem}>
                                                <Text style={Style_Var.ItemText}>Free Wifi</Text>
                                            </View>
                                            <View style={Style_Var.HouseTypeItem}>
                                                <Text style={Style_Var.ItemText}>Free Wifi</Text>
                                            </View>
                                        </View>
                                        
                                    </View>
                                    <View style={Style_Var.HouseTypeContainer} >
                                        <Text style={Style_Var.HouseTypeLable}>No. Of Rooms</Text>
                                        <View style={Style_Var.HouseTypeList} >
                                            <View style={Style_Var.RoomNoItem}>
                                                <Text style={Style_Var.ItemText}>1</Text>
                                            </View>
                                            <View style={Style_Var.RoomNoItem}>
                                                <Text style={Style_Var.ItemText}>2</Text>
                                            </View>
                                            <View style={Style_Var.RoomNoItem}>
                                                <Text style={Style_Var.ItemText}>3</Text>
                                            </View>
                                            <View style={Style_Var.RoomNoItem}>
                                                <Text style={Style_Var.ItemText}>4</Text>
                                            </View>
                                            <View style={Style_Var.RoomNoItem}>
                                                <Text style={Style_Var.ItemText}>5</Text>
                                            </View>
                                            
                                        </View>
                                        
                                    </View>
                                    <View style={Style_Var.HouseTypeContainer} >
                                        <Text style={Style_Var.HouseTypeLable}>Features</Text>
                                        <View style={Style_Var.HouseTypeList} >
                                            <View style={Style_Var.HouseTypeItem}>
                                                <Text style={Style_Var.ItemText}>Balcony</Text>
                                            </View>
                                            <View style={Style_Var.HouseTypeItem}>
                                                <Text style={Style_Var.ItemText}>Parking</Text>
                                            </View>
                                            <View style={Style_Var.HouseTypeItem}>
                                                <Text style={Style_Var.ItemText}>Heating</Text>
                                            </View>
                                            <View style={Style_Var.HouseTypeItem}>
                                                <Text style={Style_Var.ItemText}>Air Conditioning</Text>
                                            </View>
                                            <View style={Style_Var.HouseTypeItem}>
                                                <Text style={Style_Var.ItemText}>Connectivity</Text>
                                            </View>
                                            <View style={Style_Var.HouseTypeItem}>
                                                <Text style={Style_Var.ItemText}>Metro</Text>
                                            </View>
                                        </View>
                                        
                                    </View>

                                    <View style={Style_Var.HouseTypeContainer} >
                                        <Text style={Style_Var.HouseTypeLable}>Rules</Text>
                                        <View style={Style_Var.HouseTypeList} >
                                            <View style={Style_Var.HouseTypeItem}>
                                                <Text style={Style_Var.ItemText}>No Smoking</Text>
                                            </View>
                                            <View style={Style_Var.HouseTypeItem}>
                                                <Text style={Style_Var.ItemText}>Pet Allowed</Text>
                                            </View>
                                            <View style={Style_Var.HouseTypeItem}>
                                                <Text style={Style_Var.ItemText}>Vegitarien</Text>
                                            </View>
                                        </View>
                                        
                                    </View>
                                    <View style={Style_Var.PriceRangeSliderContainer}>

                                        <Text style={Style_Var.HouseTypeLable}>Price</Text>
                                        <View style={Style_Var.PriceSliderContainer}>   
                                        <MultiSlider
                                            onValuesChangeStart={()=>{}}
                                            onValuesChangeFinish={()=>{}}
                                            min={1000}
                                            max={100000}
                                            step={100}
                                            // enableLabel={true}
                                            touchDimensions={{height: 1000,width: 1000,borderRadius: 0,slipDisplacement: 1000,backgroundColor:'red'}}
                                            enabledOne={true}
                                            enabledTwo={true}
                                            values={[0,100000]}
                                            containerStyle={{width:'100%',alignItems:'center',justifyContent:'center',padding:0,margin:0}}
                                            track={{width:'100%',padding:0,margin:0}}
                                            markerContainer={{width:'100%'}}
                                        />
                                        <View style={Style_Var.RangeTextContainer}>
                                            <Text style={Style_Var.SliderMinMax}>1000</Text>
                                            <Text style={Style_Var.SliderMinMax}>1,00,000</Text>
                                        </View>
                                    </View>
                                    </View>
                                    
                                </View>
                            </View>
                        <View style={Style_Var.ScreenEnd}/>
                    </ScrollView>
                    
                </View>
                <View style={Style_Var.BottomButtonContainer}>
                <TouchableOpacity style={Style_Var.RentNowButton}>
                    <Text style={Style_Var.RentNow}>Search</Text>
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
let FilterContainer = connect(mapStateToProps, {...LogoutAction })(FilterScreen);
let FilterWithLoader = APILoadingHOC(FilterContainer);

FilterWithLoader.getIntent = () => {
    return {
        routeName: FilterScreen.ROUTE_NAME,
    };
};

// export default FilterScreen;
export default FilterWithLoader;