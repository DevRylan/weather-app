# Weather App

Welcome! This application delivers up-to-the-minute weather details for any location you choose. It includes a backend system that fetches and delivers weather information from an external API.

## Contents

- [Overview](#Overview)
- [Highlights](#Highlights)
- [Requirements](#Requirements)
- [Setup](#Setup)
- [Instructions](#Instructions)

## Overview

This weather app offers users current weather data for any city in the United States based on a zip code. It features a frontend for user interaction and a backend that retrieves weather information from the [Open Weather API](https://openweathermap.org/api)

## Highlights

- Access real-time weather details for any US based location location.
- View temperature, weather conditions, and other key data.
- A straightforward and user-friendly interface.
### Requirements

- Ensure you have Node.js and npm installed on your device.
- Obtain an API key from the [Open Weather API](https://openweathermap.org/api)

### Setup

1. Clone the repository or download the project files.
    ```sh
    git clone https://github.com/rylan0-0/weatherApp
    ```

2. Install the required dependencies.
    ```sh
    npm install
    ```

4. Create a `.env` file in the backend directory and insert your API key.
    ```plaintext
    API_KEY=your_api_key_here
    ```

5. Start the backend server.
    ```sh
    nodemon index.js
    ```

## Instructions

1. Start the local server.
2. Enter the zip code for which you need weather information.
3. Click the button below the text form to fetch and display the current weather details for the specified zip code.
