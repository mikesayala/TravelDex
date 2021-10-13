# TravelDex

A web application for users planning an itinerary.

I built this application because I love traveling and have made itineraries before.
being able to make plans day by day and having each activity lined up makes the planning process a lot easier.

[live demo](https://travel-dex.herokuapp.com/)

![ezgif com-gif-maker (85)](https://user-images.githubusercontent.com/82190583/136864405-bace6dd0-4d7a-4b07-90ec-ccf3ebf4c3f7.gif)
![ezgif com-gif-maker (86)](https://user-images.githubusercontent.com/82190583/136864395-81481bca-836b-4593-82f2-d5186b63d538.gif)

## Technologies Used
 - React
 - JavaScript
 - Bootstrap
 - CSS3
 - Express
 - Node.js
 - PostgreSQL

 ## Features

 * User can add plans to their itinerary.
 * User can read their plans from the itinerary.
 * User can update the plans from the itinerary.
 * User can delete plans from the itinerary.
 * User can add amount if the plans cost money.

 ## Future features

 * User can search location with google maps api

 ## System Requirements
* PostgreSQL
* Node.js

## Getting Started
1. Cloning the repository

  ```Shell
  git clone git@github.com:mikesayala/TravelDex.git
  cd TravelDex
  ```

2. Install all dependencies with NPM.

  ```shell
  npm install
  ```

3. Create a new database.

  ```shell
  createdb TravelDex
  ````

4. Import the provided schema.sql and data.sql using the command line interface.

  ```shell
  npm run db:import
  ````

5. Time to get started, check the app in the browser using localhost:3000

  ```shell
  npm run dev
  ```
