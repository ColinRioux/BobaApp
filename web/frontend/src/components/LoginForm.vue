<template>
  <div>
    <div class="login-form">
      <b-button type="is-light" class="close-button" @click="closeSidebar" title="Close">
          <b-icon pack="fas" icon="times"></b-icon>
      </b-button>
      <form action="action_page.php" method="post">
        <div class="container">
          <label for="uname"><b>Username</b></label>
          <input
            type="text"
            placeholder="Enter Username"
            name="uname"
            required
          />

          <label for="psw"><b>Password</b></label>
          <input
            type="password"
            placeholder="Enter Password"
            name="psw"
            required
          />

          <button class="submit-button" type="submit">Login</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  export default {
      name: 'LoginForm',
      components: {},
      methods: {
        closeSidebar() {
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

input {
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