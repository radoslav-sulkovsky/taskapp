import axios from "axios"

const state = {
    tasks: [{
        title: '',
        description: '',
        created_at: '',
        user: {
            name: '',
        }
    }],
    task: {
        title: '',
        description: '',
        created_at: '',
        user: {
            name: '',
        }
    }
}

const actions = {
    async getTasks(state, payload) {
        const response = await axios.get('/api/tasks');

        state.commit('setTasks', response.data);
    },
    async getTask(state, payload) {
        const response = await axios.get('/api/tasks/' + payload);

        state.commit('setCurrentTask', response.data);
    },
    async addTask(state, payload) {
        const response = await axios.post('/api/tasks', payload);

        state.commit('storeTask', response.data);
    },
}

const mutations = {
    setTasks(state, payload) {
        state.tasks = payload;
    },
    setCurrentTask(state, payload) {
        state.task = payload;
    },
    storeTask(state, payload) {
        state.tasks.unshift(payload);
    },
}

const getters = {
    getTasks: state => state.tasks,
    getCurrentTask: state => state.task,
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters,
}