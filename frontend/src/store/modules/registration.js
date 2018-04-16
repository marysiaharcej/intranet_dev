import axios from 'axios'
import router from '@/router/index.js'

const state = {
    userRoles: [],
    emails: [],
    email: ''
};

const mutations = {
    GET_ROLE_LIST(state, data) {
        state.userRoles.push(data);
    },
    ADD_EMAILS(state, data) {
        state.emails.push(data);
    },
    ADD_PREFIX_EMAIL(state, data) {
        state.email = data;
    }
};

const actions = {
    getRoleList({commit}) {
        axios.get("/api/rolesList").then(res => {
            const data = res.data;

            for(let key in data) {
                const role = data[key];
                let upper = data[key].roleName.substring(0, 1);
                let toLower = data[key].roleName.slice(1, data[key].roleName.length).toLowerCase();
                data[key].roleName = upper + toLower;
                role.roleName = data[key].roleName;
                commit('GET_ROLE_LIST', role.roleName);
            }
        });
    },
    checkEmail({commit, state}, email) {
        axios.get('/api/emailList').then(res => {
            const data = res.data;

            for(let key in data) {
                const email = data[key];

                email.email = data[key].email;
                commit('ADD_EMAILS', email.email);
            }

            if(state.emails.length > 0) {
                var bIsEmail;
                
                for (var i = 0; i < state.emails.length; i++) {
                    if (email === state.emails[i]) {
                        bIsEmail = true;
                        break;
                    } else {
                       bIsEmail = false; 
                    }
                }
                bIsEmail ? alert('znaleziono email') : alert('nie znaleziono adresu email');
            }
        });
    },
    fullNameToEmail({commit, state}, fullName, email) {
        var sEmail = fullName.replace(" ", ".").toLowerCase(),
            sDomain = "@btech.pl",
            sReturnEmail;

        fullName === "" ? (sDomain = "") : (sReturnEmail = sEmail + sDomain);
        email = sReturnEmail;
        commit('ADD_PREFIX_EMAIL', email);
        // return sReturnEmail;
    }
};

const getters = {
    roleList() {
        return state.userRoles;
    },
    emails() {
        return state.emails;
    },
    prefixEmail() {
        return state.email;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
}