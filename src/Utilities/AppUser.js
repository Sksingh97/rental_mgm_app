class AppUser {

    static mInstance = null;

    static getInstance() {
        if (AppUser.mInstance == null) {
            AppUser.mInstance = new AppUser();
        }
        return AppUser.mInstance;
    }

    token = "";
    userId = "";
    userDetails = "";

}

export default AppUser;