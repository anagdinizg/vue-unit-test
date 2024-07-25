<script>
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import Alert from './alert-login.vue';

export default defineComponent({
  name: 'FormLogin',
  components: {
    Alert,
  },
  setup() {
    const store = useStore();
    const username = ref('');
    const password = ref('');
    const router = useRouter();
    const alertType = ref('');
    const alertMessage = ref('');
    const isVisible = ref(false);

    function isValidUsername(username) {
      return username.length >= 5;
    }

    function isValidPassword(password) {
      return password.length >= 5;
    }

    function handleLogin() {
      if (!isValidUsername(username.value) || !isValidPassword(password.value)) {
        alertType.value = 'error';
        alertMessage.value = 'Um dos campos ou ambos estão inválidos. Tente novamente.';
        isVisible.value = true;
        return;
      }

      if (username.value === 'anagdinizg' && password.value === '12345') {
        isVisible.value = true;
        store.dispatch('updateUsername', username.value);
        router.push({ name: 'home' });
      } else {
        alertType.value = 'error';
        alertMessage.value = 'Usuário ou senha incorretos. Tente novamente.';
        password.value = '';
        isVisible.value = true;
      }
    }

    return {
      username,
      password,
      handleLogin,
      alertType,
      alertMessage,
      isVisible,
    };
  },
});
</script>

<template>
  <div class="login">
    <div class="login-screen">
      <div class="app-title">
        <h1>Login</h1>
      </div>

      <div class="login-form">
        <div class="control-group">
          <input type="text" class="login-field" v-model="username" placeholder="username" id="login-name">
          <label class="login-field-icon fui-user" for="login-name"></label>
        </div>

        <div class="control-group">
          <input type="password" class="login-field" v-model="password" placeholder="password" id="login-pass">
          <label class="login-field-icon fui-lock" for="login-pass"></label>
        </div>

        <a class="btn btn-primary btn-large btn-block" href="#" @click="handleLogin">Login</a>

        <Alert v-if="isVisible && alertType === 'error'" type="error" :message="alertMessage" />
      </div>
    </div>
  </div>
</template>

<style scoped>
* {
  box-sizing: border-box;
}

*:focus {
  outline: none;
}

body {
  font-family: Arial;
  height: 100vh;
  padding: 50px;
}

.login {
  margin: 20px auto;
  width: 300px;
}

.login-screen {
  background-color: #cdcdcd;
  padding: 20px;
  border-radius: 5px
}

.app-title {
  text-align: center;
  color: #777;
}

.login-form {
  text-align: center;
}

.control-group {
  margin-bottom: 10px;
}

input {
  text-align: center;
  background-color: #ECF0F1;
  border: 2px solid transparent;
  border-radius: 3px;
  font-size: 16px;
  font-weight: 200;
  padding: 10px 0;
  width: 250px;
  transition: border .5s;
}

input:focus {
  border: 2px solid #595959;
  box-shadow: none;
}

.btn {
  border: 2px solid transparent;
  background: #404040;
  color: #ffffff;
  font-size: 16px;
  line-height: 25px;
  padding: 10px 0;
  text-decoration: none;
  text-shadow: none;
  border-radius: 3px;
  box-shadow: none;
  transition: 0.25s;
  display: block;
  width: 250px;
  margin: 0 auto;
}

.btn:hover {
  background-color: #363636;
}
</style>
