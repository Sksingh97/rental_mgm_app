import messaging from '@react-native-firebase/messaging';
import AppUser from './AsyncStorage';
import { AppRegistry } from 'react-native';
// import App from '../../App';
let AppAsync = AppUser.getInstance()
class FirebaseSingleton {

    static mInstance = null;

    static getInstance() {
        if (FirebaseSingleton.mInstance == null) {
            FirebaseSingleton.mInstance = new FirebaseSingleton();
        }
        return FirebaseSingleton.mInstance;
    }

    async requestUserPermission() {
        const authStatus = await messaging().requestPermission();
        const enabled =
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL;
      
        if (enabled) {
          console.log('Authorization status:', authStatus);
        }
    }

    async requrstHandler(){
        const unsubscribe = messaging().onMessage(async remoteMessage => {
          console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
        });
    
        return unsubscribe;
    }

    async backGroundHandler(){
        // Register background handler
        // messaging().setBackgroundMessageHandler(async remoteMessage => {
        //     console.log('Message handled in the background!', remoteMessage);
        // });
        
        // AppRegistry.registerComponent('app', () => App);
    }

    async FirebaseInit(){
        this.requestUserPermission();
        this.un_subscriber = this.requrstHandler()
        try{
            let fcmToken = await AppAsync.getAsyncData('fcmToken')
            if (!fcmToken) {
                fcmToken = await messaging().getToken();
                if (fcmToken) {
                    // user has a device token
                    AppAsync.setAsyncData('fcmToken',fcmToken)
                }
            }
            console.log("FCM TOKEN : : : ",fcmToken)
        }catch(e){
            console.log("ERROR: : :",e,AppAsync)
        }
        
    }


    

}

export default FirebaseSingleton;