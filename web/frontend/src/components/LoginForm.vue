<template>
  <div>
    <!-- <div class="left-side">
      <p>Sign Up</p>
    </div> -->
    <div class="login-form">
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

          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.login-form {
  background-color: rgba(236, 213, 191, 0.8);
  width: 30%;
  height: 100%;
  position: absolute;
  right: 0px;
  top: 0px;
  z-index: 999;
}

/* .left-side {
    background-color: #ceb195;
    width: 60%;
    height: 100%;
    position: absolute;
    background-repeat: no-repeat;
  } */

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

button {
  border-radius: 20px;
  width: 20%;
  background-color: #4caf50;
  color: white;
  padding: 10px;
  margin: 9px 10px;
  border: none;
  cursor: pointer;
}

button:hover {
  opacity: 0.8;
}

.container {
  padding: 70px;
}
</style>