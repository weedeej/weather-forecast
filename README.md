# Weather Forecast App

Welcome to the Weather Forecast App project! This ReactJS TypeScript application provides users with real-time weather information using the OpenWeather API. The project is designed as a Single Page Application (SPA) with a focus on adhering to mockups provided in the wireframes.

## Features

- **ReactJS with TypeScript:** Utilizes the power of ReactJS with TypeScript for a robust and maintainable codebase.
- **Material-UI (MUI) Component Library:** Enhances efficiency in implementation by leveraging MUI components for a consistent and responsive user interface.
- **Fetch API:** Fetches weather data from the OpenWeather API to provide up-to-date and accurate information.
- **Auth0 for Authentication:** Implements Auth0 for secure user authentication to access personalized features and preferences.
- **Wireframe-Guided Design:** Follows the provided wireframes to ensure the application's design aligns with the specified requirements.

## Usage
- Login your account using the login button after deployment.
- Go to your *Home* and enter the city name.
- Press the **Display Weather** button to get the weather forecast.

## Installation

1. **Clone the repository:**
```bash
git clone https://github.com/your-username/weather-forecast-app.git
```

2. **Install dependencies:**
```bash
cd weather-forecast-app
npm install
```

3. **Configure Auth0:**
- Create an account on [Auth0](https://auth0.com/) and set up a new application.
- Add the Auth0 configuration details to **src/index.tsx** L15-L16.

4. **Configure OpenWeather API:**
- Obtain an API key from [OpenWeather](https://openweathermap.org/full-price#current) and add it to the **.env** file.

5. **Run the application:**
```bash
npm start
```
The application will be accessible at `http://localhost:3000`.