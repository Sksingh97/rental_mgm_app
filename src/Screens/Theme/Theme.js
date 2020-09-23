import React from 'react';
import { View, Text, TextInput, Image, KeyboardAvoidingView,TouchableOpacity,ScrollView } from 'react-native';
import { getStyleProps } from './ThemeStyle'
// import {  } from 'react-native-gesture-handler';
import Color from '../../Constants/Color';
import { getImageByTheme } from '../../Constants/Images';
import * as util from '../../Utilities/Utils';
import APILoadingHOC from "../../Components/HOCS/APILoadingHOC";
import { connect } from 'react-redux';
import * as actions from '../../Store/Actions/ThemeAction';
import Toast from 'react-native-simple-toast';
import ThemeSingleton from '../../Singleton/Theme';
import { Appearance } from 'react-native-appearance';
import { getLanguageString } from '../../Constants/Message';
let Theme = ThemeSingleton.getInstance()



class ThemeScreen extends React.Component {
    static ROUTE_NAME = "Theme";

    constructor(props){
        super(props);
        this.state = {
            selected_them : this.props.theme.color,
            selected_lang : this.props.theme.lang,
            selected_role : 'PS'
        }
    }

    componentDidMount() {
        Theme.setup();
        
    }

    changeTheme = (value) => {
        this.setState({
            selected_them:value
        })
        this.props.setThemeData(value,this.props.theme.lang)
    }

    changeLanguage = (value) => {
        this.setState({
            selected_lang:value
        })
        this.props.setThemeData(this.state.selected_them,value)

    }

    submitUserPreferences = () => {
        let color = this.state.selected_them
        let lang = this.state.selected_lang
        let role = this.state.selected_role
        this.props.SetPreferencesSetting(color, lang, role)
    }

    changeRole = (value) => {
        this.setState({
            selected_role:value
        })
    }

    render() {
        let Style_Var = getStyleProps(this.state.selected_them);
        let String_Var = getLanguageString(this.state.selected_lang);
        let Image_Var = getImageByTheme(this.state.selected_them);
        let data = [{
            label:'Hindi',
            value: 'hi',
          }, {
            label:'English',
            value: 'en',
          }];
        return (
            <ScrollView>

            <View style={Style_Var.Container}>
                <View style={Style_Var.SubContainer}>
                    <View style={Style_Var.HeaderContainer}>
                        <View style={Style_Var.SignUpHeading}>
                            <Text style={Style_Var.HeaderText}>{String_Var.preferences}</Text>
                            <TouchableOpacity style={Style_Var.ContinueButton} onPress={() => { this.submitUserPreferences()}}><Text style={Style_Var.ThemeName}>{String_Var.GoNext}</Text><Image source={Image_Var.Right} style={Style_Var.BackButton} /></TouchableOpacity>
                        </View>
                    </View>
                    <View style={Style_Var.LableContainer}>
                        <Text style={Style_Var.Lable}>{String_Var.Appearance}</Text>
                    </View>
                    <View style={Style_Var.ThemeSelectorContainer}>
                        <TouchableOpacity style={this.state.selected_them=='dark'?[Style_Var.ThemeSelectorItem,Style_Var.SelectedThemeItem]:[Style_Var.ThemeSelectorItem]} onPress={()=>{this.changeTheme('dark')}}>
                            <Image source = {Image_Var.Dark_Selector} style={Style_Var.ThemeSelector}/>
                            <Image source = {this.state.selected_them=='dark'?Image_Var.Check_Selector:Image_Var.Check_Dark_Unselected} style={Style_Var.CheckMark}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={this.state.selected_them=='light'?[Style_Var.ThemeSelectorItem,Style_Var.SelectedThemeItem]:[Style_Var.ThemeSelectorItem]} onPress={()=>{this.changeTheme('light')}}>
                            <Image source = {Image_Var.Light_Selector} style={Style_Var.ThemeSelector}/>
                            <Image source = {this.state.selected_them=='light'?Image_Var.Check_Selector:Image_Var.Check_Light_Unselected} style={Style_Var.CheckMark}/>
                        </TouchableOpacity>
                    </View>
                    <View style={Style_Var.ThemeSelectorContainer}>
                        <Text style={Style_Var.ThemeName}>{String_Var.Dark}</Text>
                        <Text style={Style_Var.ThemeName}>{String_Var.Light}</Text>
                    </View>
                    <View style={Style_Var.LableContainer}>
                        <Text style={Style_Var.Lable}>{String_Var.Language}</Text>
                    </View>
                    <View style={Style_Var.LanguageSelectContainer}>
                        <TouchableOpacity style={[Style_Var.LanguageButton,Style_Var.LeftButton,this.state.selected_lang=='en'?Style_Var.SelectedLanguage:'']} onPress={()=>{this.changeLanguage('en')}}>
                            <Text style={[Style_Var.WhiteText]}>{String_Var.English}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[Style_Var.LanguageButton,Style_Var.RightButton,this.state.selected_lang=='hi'?Style_Var.SelectedLanguage:'']} onPress={()=>{this.changeLanguage('hi')}}>
                            <Text style={[Style_Var.WhiteText]}>{String_Var.Hindi}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={Style_Var.LableContainer}>
                        <Text style={Style_Var.Lable}>{String_Var.WhoAreYou}</Text>
                    </View>
                    <View style={Style_Var.AppRoleSelectorContainer}>
                        <View style={{alignItems:'center'}}>
                            <TouchableOpacity style={[Style_Var.AppRoleItemContaine,this.state.selected_role=='PO'?Style_Var.SelectedLanguage:'']} onPress={()=>{this.changeRole('PO')}}>
                                <Image source={Image_Var.PropertyOwner} style={Style_Var.ImageStyle}/>
                            </TouchableOpacity>
                            <Text style={[Style_Var.ThemeName,{marginTop:10}]}>{String_Var.PropertyOwner}</Text>
                        </View>
                        <View style={{alignItems:'center'}}>
                            <TouchableOpacity style={[Style_Var.AppRoleItemContaine,this.state.selected_role=='PS'?Style_Var.SelectedLanguage:'']} onPress={()=>{this.changeRole('PS')}}>
                                <Image source={Image_Var.SearchProperty} style={Style_Var.ImageStyle}/>
                            </TouchableOpacity>
                            <Text style={[Style_Var.ThemeName,{marginTop:10}]}>{String_Var.PropertySeeker}</Text>
                        </View>
                        
                    </View>
                    <View style={Style_Var.ThemeSelectorContainer}>
                    </View>
                </View>
            </View>
            </ScrollView>

        )
    }
}

const mapStateToProps = (state) => {


    const {
        loginResponse,
    } = state.loginReducer;

    const {
        themeReducer
    } = state;



    return {
        loginResponse: loginResponse,
        theme: themeReducer.theme
    };

};
let ThemeContainer = connect(mapStateToProps, { ...actions })(ThemeScreen);
let ThemeWithLoader = APILoadingHOC(ThemeContainer);

ThemeWithLoader.getIntent = () => {
    return {
        routeName: Theme.ROUTE_NAME,
    };
};

export default ThemeWithLoader;
