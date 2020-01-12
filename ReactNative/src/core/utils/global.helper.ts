// import { ActivityIndicatorProps } from '@src/core/appLoader/activityIndicator.component';
import { AsyncStorage } from 'react-native';


const GlobalHelper = {

    setIndocatorState: function (state, text) {

    },

    storeData: async function (key, data) {
        await AsyncStorage.setItem(key, data);
    },

    retriveData: async function (key) {
        try {
            const retrievedItem =  await AsyncStorage.getItem(key);
            const item = JSON.parse(retrievedItem);
            return item;
          } catch (error) {
            console.log(error.message);
          }
          return
        return await AsyncStorage.getItem(key);
    },

    deleteData: async function (key) {
        await AsyncStorage.removeItem(key);
    }

}

export default GlobalHelper;