let query = "";

function search_data() {
	let data = document.querySelector("#search_data").value;
	query = data;
	data_loading();
}
let aqi = false;
async function request() {
	console.log(query);
	try {
		let response = await fetch(`https://api.weatherapi.com/v1/current.json?key=bb9c960ec19b4c18a4d140348222806&q=${query}&aqi=${aqi ? "yes" : "no"}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				// 'Content-Type': 'application/x-www-form-urlencoded',
			},
		});
		let response_data = await response.json();
		console.log(response_data);
		return response_data;
	} catch (error) {
		console.log(error.message);
	}
}

async function data_loading() {
	let data = await request();
	let content_location = document.querySelector(".content-data");
	let locData = `
    <div class='location_data'>
    <p>Country - ${data.location.country}</p>
    <p>Name - ${data.location.name}</p>
    <p>Region - ${data.location.region}</p>
    <p>Latitude - ${data.location.lat}</p>
    <p>Longitude - ${data.location.lon}</p>
    <p>Local time - ${data.location.localtime}</p>
    <p>Timezone - ${data.location.tz_id}</p>
    </div>`;
	content_location.innerHTML = locData;
	/******************************************************************* */
	let content_condition = document.querySelector(".content-details");
	let conData = `
    <div class='condition_data'>
   <div > <p class='cond_config'>Condition - <span><img src=${data.current.condition.icon}></img></span>${data.current.condition.text}</p></div>
    <p>Feels like - ${data.current.feelslike_c} celsius ${data.current.feelslike_f} fahrenheit</p>
    <p>Humidity - ${data.current.humidity}</p>
    <p>Wind Degree - ${data.current.wind_degree} </p>
    <p>Wind direction - ${data.current.wind_dir} </p>
    <p>Wind Speed - ${data.current.wind_kph} Kph</p>
    </div>`;
	content_condition.innerHTML = conData;
}
