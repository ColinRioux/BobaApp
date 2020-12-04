<template>
  <div>
    <div class="login-form">
      <b-button type="is-light" class="close-button" @click="closeSidebar" title="Close">
          <b-icon pack="fas" icon="times"></b-icon>
      </b-button>
      <form action="action_page.php" method="post">
        <div class="container">
          <label for="username"><b>Username</b></label>
          <input
            type="text"
            placeholder="Enter Username"
            name="username"
            required v-model="username"
          />

          <label for="password"><b>Password</b></label>
          <input
            type="password"
            placeholder="Enter Password"
            name="password"
            required v-model="password"
          />

          <label for="userType"><b>User Type</b></label>
            <select id="userType" name="userType" v-model="userType" >
                <option value="customer" selected>Customer</option>
                <option value="owner">Store Owner</option>
                <option value="admin">Admin</option>
            </select>

          <button @click.prevent="submit">Login</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'LoginForm',
    data() {
        return {
            username: "",
            password: "",
            userType: ""
        };
    },
    methods: {
        submit() {
            var body = {
                username: this.username,
                password: this.password,
                userType: this.userType
            };

            axios.post('http://127.0.0.1:3000/login', body)
                .then(response => {
                    if(!response.data.success){
                        this.submissionResponse = "Your request failed! Please try again later!";
                    } else {
                        alert("Successfully Logged-in!");
                        this.exitView();
                    }
                });
        },
        exitView() {
            this.$router.push({ path: '/' });
        }
    }
}
</script>

<style scoped>
.login-form {
  background-color: rgba(236, 213, 191, 0.8);
  width: 30%;
  height: 100%;
  position: absolute;
  right: 0;
  top: 3em;
  z-index: 999;
}

label {
  color: black;
}

input, select {
  border-radius: 25px;
  width: 100%;
  padding: 12px 20px;
  margin: 9px 0px;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box;
}

.submit-button {
  border-radius: 20px;
  width: 20%;
  background-color: #4caf50;
  color: white;
  padding: 10px;
  margin: 9px 10px;
  border: none;
  cursor: pointer;
}

.submit-button:hover {
  opacity: 0.8;
}

.container {
  padding: 70px;
}

.close-button {
  float: left;
  margin-left: 10px;
  margin-top: 10px;
  z-index: 1000;
}

.close-button:hover {
  cursor: pointer;
}
</style>
