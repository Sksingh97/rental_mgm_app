// import React, { PureComponent } from 'react';
// import { View, Text, NetInfo, StyleSheet } from 'react-native';
// import { myWidth, isiPhoneX } from '../utilities/Utils';


// class OnOffNetNotice extends PureComponent {

//     constructor(props) {
//         super(props);

//         this.state = {
//             isConnected: false,
//             showLabel: true
//         };
//     }

//     //-------- network info------------//
//     componentDidMount() {
//         // NetInfo.getConnectionInfo().then((connectionInfo) => {
//         //     console.log(`'Initial, type: ' ${connectionInfo.type} 
//         //     ', effectiveType: ' ${connectionInfo.effectiveType}`
//         //     );
//         // });

//         NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
//     }

//     handleConnectivityChange = isConnected => {
//         //  console.log(`OnOffNetNotice:  handleConnectivityChange: ${isConnected}`);
//         if (isConnected) {
//             this.setState({ isConnected: true, showLabel: true });
//         } else {
//             this.setState({ isConnected: false });
//         }
//     };

//     componentWillUnmount() {
//         NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
//     }
//     //-------- network info------------//


//     //METHOD: render HELPER
//     onLineTxtRender = () => {
//         setTimeout(() => {
//             this.setState({
//                 showLabel: false
//             });
//         }, 1000);
//         if (this.state.showLabel) {
//             return (
//                 <View style={styles.onlineContainer}>
//                     <Text style={styles.on_off_text}>We are back online.</Text>
//                 </View>);
//         }
//         return null;
//     };

//     //METHOD: render HELPER
//     offLineTxtRender = () => {
//         return (
//             <View style={styles.offlineContainer}>
//                 <Text style={styles.on_off_text}>No internet connection.</Text>
//             </View>);
//     };

//     //SCREEN
//     render() {
//         if (this.state.isConnected) {
//             return this.onLineTxtRender();
//         }
//         else {
//             return this.offLineTxtRender();
//         }
//     }
// }

// const styles = StyleSheet.create({
//     offlineContainer: {
//         backgroundColor: 'red',
//         height: 30,
//         justifyContent: 'center',
//         alignItems: 'center',
//         flexDirection: 'row',
//         width: myWidth,
//         position: 'absolute',
//         bottom: isiPhoneX ? 20 :0,
//         zIndex: 15
//     },
//     on_off_text: {
//         color: '#fff',
//         fontSize: 16
//     },
//     onlineContainer: {
//         backgroundColor: 'green',
//         height: 30,
//         justifyContent: 'center',
//         alignItems: 'center',
//         flexDirection: 'row',
//         width: myWidth,
//         position: 'absolute',
//         bottom: isiPhoneX ? 20 : 0,
//         zIndex: 15
//     }
// });

// export default OnOffNetNotice;
