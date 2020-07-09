import { GEO_CODER_API } from '../../ApiManager/ApiEndpoint'
import ApiSingleton from '../../ApiManager/ApiSingleton';
import { GOOGLE_API_KEY } from '../../utilities/AppConstants'


export const hitGeoCoderApi = (latitude, longitude) =>
    (dispatch) => {

        return new Promise((resolve, reject) => {
            const apiUrl = `${GEO_CODER_API}+${latitude},${longitude}&key=${GOOGLE_API_KEY}`
            //returns a funtion, not an action object
            dispatch(ApiSingleton.getInstance().apiActionCall({
                url: apiUrl,
                method: "GET",
                onSuccess: (data) => {

                    resolve((data));

                },
                onFailure: (error) => {

                    reject(error)

                },
                label: "GEO_CODER_API",
                headersOverride: null
            }));


        });
    };