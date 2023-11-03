# tcc_repo
Repository for my final paper of my bachelor's degree in computer science.
## Installing and Running
1. Install Docker, Docker Desktop was used in the development of this project, available [at this URL](https://www.docker.com/products/docker-desktop/).
2. In case you are running Docker in Windows, it will be necessary to install WSL (Windows Subsystem for Linux), [available here](https://learn.microsoft.com/pt-br/windows/wsl/install). 
3. Clone the repository using **Git**.
4. Run the command *docker compose up* to build the images through its Dockerfiles and start the services' containers.

## Informations
This project contains three services:
1. A RESTful backend server developed with **Express**
2. A GraphQL backend server developed with **Apollo Server** and **Express** middleware
3. A PostgreSQL database integrated with the forementioned services through **Sequelize**. The database image is the default postgres image from Docker, and has two databases: *commerce-rest* and *commerce-graphql*.


