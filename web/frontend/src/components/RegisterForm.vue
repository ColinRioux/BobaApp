<template>
    <div>
        <!-- <div class="left-side">
            <p>Sign Up</p>
        </div> -->
        <div class="register-form">
            <form id="RegisterForm" @submit.prevent="submit">
                <div class="container">
                    <label for="email"><b>Email</b></label>
                    <input type="text" id="email" placeholder="Enter Email" name="email" required>

                    <label for="username"><b>Username</b></label>
                    <input type="text" id="username" placeholder="Enter Username" name="username" required>

                    <label for="password"><b>Password</b></label>
                    <input type="password" id="password" placeholder="Enter Password" name="password" required>

                    <!-- <label for="password2"><b>Confirm Password</b></label>
                    <input type="password" id="password2" placeholder="Confirm Password" name="password2" required> -->

                    <label for="userType"><b>User Type</b></label>
                    <select id="userType" name="userType">
                        <option value="customer" selected>Customer</option>
                        <option value="owner">Store Owner</option>
                        <option value="admin">Admin</option>
                    </select>

                    <button @click.prevent="submit">Sign Up</button>

                    <p>Have an Account? <a href="/login">Login</a></p>
                </div>
            </form>   
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'RegisterForm',
    data() {
        return {
            email: "",
            username: "",
            password: "",
            userType: ""
        };
    },
    methods: {
        submit() {
            var body = {
                email: this.email,
                username: this.username,
                password: this.password,
            };

            axios.post('http://127.0.0.1:3000/register', body)
                .then(response => {
                    if(!response.data.success){
                        this.submissionResponse = "Your request failed! Please try again later!";
                    } else {
                        alert("Successfully Registered!");
                        this.exitView();
                    }
                });
        },
        exitView() {
            this.$router.go(loginView);
        }
    }
}
</script>

<style scoped>
    .register-form {
        background-color:#ecd5bf;
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

    label, p {
        color: black;
    }

    input[type=text], input[type=password], select {
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
        background-color: #4CAF50;
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