const AUTH_TOKEN_KEY = 'AUTH_TOKEN';

export default {
    set: (token) => {
        return localStorage.setItem(AUTH_TOKEN_KEY, token)
    },
    get: () => {
        return localStorage.getItem(AUTH_TOKEN_KEY)
    }
}