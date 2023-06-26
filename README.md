

# Newton Backend
![Nodejs logo](https://plugins.jetbrains.com/files/6098/351655/icon/pluginIcon.svg)

This repo contains all the api's with custom right access.
API's for: Customer, Ticket, Movie and Analytics.

## Technologies Used:
- Node.js (*Backend server*)
- Express (*Framework*)
- Typescript (*Type intellisense*)
- Docker (*Containarization*)
- Git (*Version control*)
- Postgres (*Database*)
- Winston (*Logger*)
- Postman (*API Testing*)






![Logo](https://newtonclassroom.com/wp-content/uploads/2022/07/Logo-Light@3x.png)

## 🔗 Links

[Postman collection Link](https://api.postman.com/collections/18253477-5bf2d0d6-2c89-4bf3-88ca-36454ee4eb7f?access_key=PMAT-01H3SXF77SKM22VENT3HFDPE45)

[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/ananddpd)

# How To Start

### 1. Using Docker 🐳
![Docker image](https://www.docker.com/wp-content/uploads/2022/03/vertical-logo-monochromatic.png)

### Steps
- Clone the repository.
- Switch branch to ```deploy/docker```
- npm install in the directory.
- Make sure docker is installed.
- Run ```docker-compose up -d```.
- or ```docker-compose up -d --build``` (*to force new build*).
- Server should be running on specified port.

### 2. Without Docker 🔧
![Npm image](https://www.liblogo.com/img-logo/max/np8797nb9e-npm-logo-npm-logo-png-transparent-amp-svg-vector-freebie-supply.png)
### Steps
- Clone the repository.
- npm install in the directory.
- Switch branch to ```master```.
- Install Postgres
- Run ```npm start```.
- Server should be running on specified port.

## NOTE
1. There are 2 tokens, one for normal user and one for admin.
Currently it's statically verified.
For normal user send ```auth: Bearer Token``` in headers. For Admin send ```auth: Bearer Admin```.

2. Port for Docker and non docker application are different, please update if needed for docker ```PORT=3030```, for non-dockerized app ```PORT=4000```







## Contact
#### anandpd0109@gmail.com
