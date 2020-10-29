import router from "../../router";

function getUser() {
  try {
    var res = JSON.parse(localStorage.getItem("user"))
    return res
  } catch (error) {
    localStorage.removeItem('user')
    return ''
  }
}

function getAvatar() {
  try {
    var res = JSON.parse(localStorage.getItem("avatar"))
    return res
  } catch (error) {
    localStorage.removeItem('avatar');
    return ''
  }
}
function getAddress() {
  try {
    var res = JSON.parse(localStorage.getItem("address"))
    return res
  } catch (error) {
    localStorage.removeItem('address')
    return ''
  }
}

const state = {
  user: getUser(),
  avatar: getAvatar(),
  address: getAddress(),
  locationCurrent: "",
  token: localStorage.getItem("token"),
  userId: localStorage.getItem("userId"),
  allowedUrls: JSON.parse(localStorage.getItem("pages"))
};

const getters = {
  getUser: state => {
    return state.user;
  },
  getAvatar: state => {
    return state.avatar;
  },
  getAddress: state => {
    return state.address;
  },
  getToken: state => {
    return state.token;
  },
  getAllowedUrls: state => {
    return state.allowedUrls;
  }
};


const actions = {
  signIn(context, payload) {
    context.commit("loginUser", payload);
  },
  loginDataAvatar(context, { idAvatar, path, url }) {
    context.commit("gettingAvatarUser", { idAvatar, path, url });
  },
  loginDataAddress(context, { country, state, city }) {
    context.commit("gettingAddressUser", { country, state, city });
  },
  signOut(context, payload) {
    context.commit("logoutUser", payload);
  },
};

const mutations = {
  loginUser(state, payload) {
    const { provider, email, name, status, gender, phone, birthday, token, _id } = payload;
    const user = { provider, email, name, status, gender, phone, birthday };
    state.user = user;
    state.token = token;
    state.userId = _id;
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    localStorage.setItem("userId", _id);
  },

  gettingAvatarUser(state, payload) {

    if (!payload) return state.avatar = null;

    const { idAvatar, path, url } = payload;
    const avatar = { idAvatar, path, url };
    state.avatar = avatar;
    localStorage.setItem("avatar", JSON.stringify(avatar));
  },

  gettingAddressUser(stateStore, payload) {

    if (!payload) return stateStore.address = null
    
    state.address = payload;
    localStorage.setItem("address", JSON.stringify(payload));
  },

  allowedUrls(state, urls) {
    state.allowedUrls = urls
  },

  logoutUser(state) {
    state.user = null;
    state.token = null;
    state.userId = null;
    state.avatar = null;
    state.address = null;
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("avatar");
    localStorage.removeItem("address");
    localStorage.removeItem("userId");
    router.push("/");
  },
};

export default {
  state,
  getters,
  actions,
  mutations
};
