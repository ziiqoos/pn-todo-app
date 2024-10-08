# Papernest To-Do App
## Context

> This is a front-end engineer position technical test for [papernest](https://papernest.com/)
>
> To view a live version of the app deployed on Vercel, please visit : [papernest-todo](https://pn-todo-app.vercel.app/)

## Table of Contents
* [Main Technologies](#main-technologies)
* [Features](#features)
* [Technical features](#technical-features)
* [Setup](#setup)


## Main Technologies
- Front-end
  - [Angular](https://angular.io) - v18.1.0
  - [NgRx](https://ngrx.io) - v18.0.2
  - [tailwindcss](https://tailwindcss.com/) - v3.4.10

## Features
The ready-to-use features are:
- Add new tasks with additional details, including title, description, and due date
- Edit existing tasks and its informations
- Delete tasks
- Mark tasks as completed or uncompleted
- Filter tasks by status
- Filter Tasks by keywords
- Drag and drop to reorganize tasks by priority
- View tasks persisted after reloading the page

## Technical features
The main technical features in the project are :
 - **State Management**: Implemented using NgRx
 - **Unit Testing**: Conducted with Jasmine and Karma (Up to **83%** of code coverage)
 - **Data Persistence**: Managed through localStorage
 - **Virtual Loading**: Using Angular's Virtual Scrolling CDK
 - **TTL (Time-To-Live) Strategy**: Employed to filter out expired tasks
 - **Automated Deployment**: Using Vercel for automatic app deployment
 - **Responsive Design**: Implemented to ensure the app adapts to various screen sizes and devices

## Setup
1. Clone the repository from Github, use command : (you can also download the zip file of the repo)

       git clone https://github.com/ziiqoos/pn-todo-app

2. Install the project dependencies, use comman :

       npm install

3. Run the Application : 

       ng serve

4. Open the app using the link : 

       http://localhost:4200

