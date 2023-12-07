const baseURL = `https://studio.time-shift.shop/`;

const API_ENDPOINTS = {

    SIGNUP : (role) => {
        return `/${role}/signup`;
    },

    LOGIN : (role) => {
        return `/${role}/login`;
    },

    LOGOUT : (role) => {
        return `/${role}/logout`;
    }
}




module.exports = {
    baseURL,
    API_ENDPOINTS,
}