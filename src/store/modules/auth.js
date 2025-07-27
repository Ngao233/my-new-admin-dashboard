const state = {
  user: null,
  token: localStorage.getItem('token') || null,
  isAuthenticated: false
};

const getters = {
  currentUser: state => state.user,
  isAuthenticated: state => state.isAuthenticated
};

const mutations = {
  SET_TOKEN(state, token) {
    state.token = token;
    state.isAuthenticated = !!token;
    localStorage.setItem('token', token);
  },
  SET_USER(state, user) {
    state.user = user;
  },
  LOGOUT(state) {
    state.user = null;
    state.token = null;
    state.isAuthenticated = false;
    localStorage.removeItem('token');
  }
};

const actions = {
  login({ commit }, { token, user }) {
    commit('SET_TOKEN', token);
    commit('SET_USER', user);
  },
    logout({ commit }) {
    return new Promise((resolve) => {
      // Xóa token và user info
      commit('CLEAR_AUTH_DATA');
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      resolve();
    });
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};

