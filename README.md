# secret santa
Secret santa full responsive application

## Some indications

This application is based on angularJs and Material Design.
For support IE11 the JS code isn't in ES6.

## Supported Browsers

This application support the browsers in below:

![picture alt](https://github.com/Carsa85/secret_santa/blob/master/app/img/browsers%20coverage.png "Supported Browsers")

## Getting Started

To get you started you can simply clone the `secret_santa` repository:

### Prerequisites

You need git to clone the `secret_santa` repository. You can get git from [here][git].

We also use a number of Node.js tools to initialize and test `secret_santa`. You must have Node.js
You can get them from [here][node].

### Clone `secret_santa`

Clone the `secret_santa` repository using git:

```
git clone https://github.com/Carsa85/secret_santa.git
cd secret_santa
```

If you just want to start a new project without the `secret_santa` commit history then you can do:

```
git clone --depth=1 https://github.com/Carsa85/secret_santa.git <your-project-name>
```

The `depth=1` tells git to only pull down one commit worth of historical data.

### Install Dependencies

All of dependencies in this project are from cdnjs [`https://cdnjs.com/`][cdnjs-url].

Library       | version | Link
------------- |---------|-------------
angular.js | 1.7.2 | [https://cdnjs.com/libraries/angular.js]
angular-material | 1.1.10 | [https://cdnjs.com/libraries/angular-material]
material-design-icons | 3.0.1 | [https://cdnjs.com/libraries/material-design-icons]

### Run the Application

I have preconfigured the project with a simple development web server. The simplest way to start
this server is:

```
npm start
```

Now browse to the app at [`localhost:8080/index.html`][local-app-url].
