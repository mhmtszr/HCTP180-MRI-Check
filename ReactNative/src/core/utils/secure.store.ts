import * as SecureStore from 'expo-secure-store'


const SecureStorage = {

    storeData: async function (key, data) {
        await SecureStore.setItemAsync(key, JSON.stringify(data));
    },

    retriveData: async function (key) {
        return await SecureStore.getItemAsync(key);
    },

    deleteData: async function (key) {
        await SecureStore.deleteItemAsync(key);
    }

}

export default SecureStorage;