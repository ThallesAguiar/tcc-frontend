export default {
    login({commit}, {user, token}){
        commit('setUser', user)
        commit('setToken', token)
        commit('setAuthenticated', true)
    },

    createUser({commit}, {user, token}){
        commit('setUser', user)
        commit('setToken', token)
        commit('setAuthenticated', true)
    },

    logout({commit}){
        commit('setUser', {})
        commit('setToken', null)
        commit('setAuthenticated', false)
    },
}