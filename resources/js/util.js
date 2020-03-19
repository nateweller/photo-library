export const Util = {
    convertObjectToFormData: obj => {
        if (obj instanceof FormData) {
            return obj;
        }
        // ensure provided object is actually an object
        if (typeof obj !== 'object' || obj === null) {
            return false;
        }
        // loop through object keys and append into formData
        return Object.keys(obj).reduce((formData, key) => {
            if (Array.isArray(obj[key])) {
                for (var i = 0; i < obj[key].length; i++) {
                    formData.append(key+'[]', obj[key][i]);
                }
            } else {
                formData.append(key, obj[key]);
            }
            return formData;
        }, new FormData());
    },
};

export default Util;
