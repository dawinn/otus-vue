import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import usersMockDB from '../mock/users';

const useUser = defineStore('user', () => {
    const user = ref(null);

    const isLoggedIn = computed(() => !!user.value?.login);
    const isAdmin = computed(() => user.value?.isadmin);
    const username = computed(() => user.value?.name);
    const userAddress = computed(() => user.value?.address);

    const login = (userLogin, userPass) => {
        const userDB = usersMockDB.filter((acc) => userLogin.toLowerCase() === acc.login && userPass.toLowerCase() === acc.pass);
        if (userDB.length) {
            user.value = userDB[0];
            return true;
        }

        return false;
    };

    const logout = () => {
        user.value = null;
    }


    return {
        user,
        isLoggedIn,
        login,
        logout,
        isAdmin,
        username,
        userAddress
    }

});

export default useUser;
