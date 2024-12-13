import React, { useEffect, useState } from "react";

function App() {
	const [message, setMessage] = useState("");
	const [prediction, setPrediction] = useState(null);
	const [error, setError] = useState(null);
	const [formData, setFormData] = useState({
		holiday: "",
		temp: "",
		hour: "",
		rain_1h: "",
		snow_1h: "",
		clouds_all: "",
		weather_main: "",
		weather_description: "",
		day: "",
		month: "",
		year: ""
	});

	useEffect(() => {
		// Fetch the welcome message
		fetch("http://localhost:8000/")
			.then((response) => {
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}
				return response.json();
			})
			.then((data) => setMessage(data.message))
			.catch((error) => {
				setError("Failed to connect to the server. Please ensure the backend is running.");
				console.error("Error:", error);
			});

		// Fetch the prediction
		fetch("http://localhost:8000/predict")
			.then((response) => {
				console.log("resssssss",response)
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}
				return response.json();
			})
			.then((data) => {
				console.log(data);
				// setPrediction(data.prediction)
			})
			.catch((error) => {
				setError("Failed to fetch prediction. Please ensure the backend is running.");
				console.error("Error:", error);
			});
	}, []);/*  */

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		fetch("http://localhost:8000/predict", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(formData)
		})
		.then((response) => {
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			return response.json();
		})
		.then((data) => {
			setPrediction(data.prediction);
		})
		.catch((error) => {
			setError("Failed to fetch prediction. Please ensure the backend is running.");
			console.error("Error:", error);
		});
	};

	return (
		<div>
			<h1>React + FastAPI</h1>
			<p>{message}</p>
			<form onSubmit={handleSubmit}>
				<input name="holiday" value={formData.holiday} onChange={handleChange} placeholder="Holiday" />
				<input name="temp" value={formData.temp} onChange={handleChange} placeholder="Temperature" />
				<input name="hour" value={formData.hour} onChange={handleChange} placeholder="Hour" />
				<input name="rain_1h" value={formData.rain_1h} onChange={handleChange} placeholder="Rain 1h" />
				<input name="snow_1h" value={formData.snow_1h} onChange={handleChange} placeholder="Snow 1h" />
				<input name="clouds_all" value={formData.clouds_all} onChange={handleChange} placeholder="Clouds All" />
				<input name="weather_main" value={formData.weather_main} onChange={handleChange} placeholder="Weather Main" />
				<input name="weather_description" value={formData.weather_description} onChange={handleChange} placeholder="Weather Description" />
				<input name="day" value={formData.day} onChange={handleChange} placeholder="Day" />
				<input name="month" value={formData.month} onChange={handleChange} placeholder="Month" />
				<input name="year" value={formData.year} onChange={handleChange} placeholder="Year" />
				<button type="submit">Predict</button>
			</form>
			{prediction && (
				<div>
					<h2>Prediction:</h2>
					<p>{prediction.join(", ")}</p>
				</div>
			)}
		</div>
	);
}

export default App;
