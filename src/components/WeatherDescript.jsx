import PropTypes from "prop-types";

const WeatherDescript = async (prompt, weatherData) => {
  const url = "https://api.openai.com/v1/chat/completions";
  const sysMessage = `In a conversational professional tone, answer the [Question] based on the [Weather Data].
- Provide an opinion about what the weather feels like.
- Provide a temperature in either Celsius or Fahrenheit, whichever is more appropriate.
- Never display the temperature in Kelvin.
- Provide a recommendation on how to prepare and what to wear (eg. bring an umbrella, wear a wind breaker, a warm jacket, etc.)`;
  const newPrompt = `Question: ${prompt}. Weather Data: ${JSON.stringify(
    weatherData
  )}`;

  const data = {
    model: "gpt-4o",
    messages: [
      { role: "system", content: sysMessage },
      { role: "user", content: newPrompt },
    ],
  };

  const params = {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_OPENAI}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    method: "POST",
  };

  return fetch(url, params)
    .then((response) => response.json())
    .then((data) => {
      return data.choices[0].message.content;
    })
    .catch((error) => {
      console.log("Error:", error);
      return Promise.reject("Unable to fetch the weather description.");
    });
};

WeatherDescript.propTypes = {
  prompt: PropTypes.string.isRequired,
};

export default WeatherDescript;
