# SBE API
This folder contains a standalone web api capable of authentication, database queries, and other utilities. 

## Getting the system up and running
1. Clone / pull the repository
2. Go to the api folder `$ cd web/api/`
3. Get the required packages `$ yarn install`
4. Start the server `$ yarn serve`

## Authentication
Authentication is managed by a secure stateless cookie session (fastify-secure-session) and a port of passportjs for fastiy. We use a standard username/password login and locally save the credentials in the database. 

If we ever want to give the options to register with google, as an example, we can use fastify-oauth2.