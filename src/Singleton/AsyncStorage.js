import AsyncStorage from '@react-native-community/async-storage';

class AppUser {

    static mInstance = null;

    user = {
        token : "",
        userId : "",
        userDetails : "",
        name : "",
        email : "",
        colorScheme : "",
        lang : "",
        fcmtoken : "",
    }

    static getInstance() {
        if (AppUser.mInstance == null) {
            AppUser.mInstance = new AppUser();
        }
        return AppUser.mInstance;
    }

    async setInstance(){
        let user_data = await AsyncStorage.getItem('USER_DATA');
        if(user_data){
            this.user = JSON.parse(user_data)
            console.log("Current Async User : ",user_data)
        }else{
            this.user = {}
        }
    }

    async setAsyncData(key,value){
        let old_data = await AsyncStorage.getItem('USER_DATA');
        let new_data = {}
        if(old_data){
            old_data=JSON.parse(old_data);
            old_data[key]=value;
            new_data = JSON.stringify(old_data);
        }else{
            new_data = JSON.stringify({})
        }
        AsyncStorage.setItem('USER_DATA',new_data)
    }

    async getAsyncData(key){
        let async_data = await AsyncStorage.getItem('USER_DATA');
        if(async_data){
            async_data=JSON.parse(async_data);
            return async_data[key]
        }else{
            return null
        }
    }

}

export default AppUser;