import React from 'react';
import {
    StyleSheet,
    View,
    ActivityIndicator,
} from 'react-native';
import { connect } from 'react-redux';


function APILoadingHOC(Component, doNotShowWhile = []) {


    // eslint-disable-next-line react/display-name
    function LoaderComponent(props) {

        doNotShowWhile = ["EVENT_CHECKIN", "EVENT_CHECKIN_STATUS"]
        const { apiModel } = props;

        let showLoader = false;

        if (doNotShowWhile.length == 0) {
            showLoader = true;
        } else {

            for (let i = 0; i < props.apiLables.length; i++) {
                let el1 = props.apiLables[i];

                if (el1 == "EVENT_CHECKIN" || el1 == "EVENT_CHECKIN_STATUS") {
                    showLoader = false;
                    break;
                } else {
                    showLoader = true
                }

            }
        }

        return (
            <View style={{ flex: 1 }}>

                <Component {...props}>

                </Component>

                {
                    apiModel.API_IS_LOADING
                    &&
                    showLoader
                    &&
                    <View style={styles.containerLoaderStyle}>
                        <ActivityIndicator size="large" color="#0f57d1" />
                    </View>
                }
            </View>
        );
    }

    const mapStateToProps = (state) => {
        const { apiModel, apiLables } = state.api_reducer;

        return {
            apiModel: apiModel,
            apiLables: apiLables,
        };
    };

    return connect(mapStateToProps, {})(LoaderComponent);
}



const styles = StyleSheet.create({
    containerLoaderStyle: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "rgba(0,0,0,0.6)",
        justifyContent: 'center',
        alignItems: 'center'
    },
    textStyle: {
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        color: "black",
        // fontFamily: FONT_FAMILY.roboto,
        fontSize: 14
    }
});

export default APILoadingHOC;