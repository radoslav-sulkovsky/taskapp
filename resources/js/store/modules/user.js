import axios from "axios"

const state = {
    auth: false,
    user: {}
}

const actions = {
    async login(state, payload) {
        const response = await axios.post('/api/login', payload);

        state.commit('setAuth', true);
    },
    async logout(state) {
        const response = await axios.get('/api/logout');

        state.commit('setAuth', false);
        state.commit('setUser', {});
    },
    async user(state) {
        try {
            const response = await axios.get('/api/user');

            state.commit('setUser', response.data);
            state.commit('setAuth', true);
        } catch(err) {
            throw new Error('Unauthorized or another error');
        }
    },
}

const mutations = {
    setAuth(state, payload) {
        state.auth = payload;
    },
    setUser(state, payload) {
        state.user = payload;
    }
}

const getters = {
    getAuth: state => state.auth,
    getUser: state => state.user,
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}