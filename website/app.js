/* Global Variables */
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=794b56c732dd96e8114d11d29b38bec4';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

// Event listener 
document.getElementById('generate').addEventListener('click', performAction);

function performAction(e) {
    const zip = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;

    getWeather(baseURL, zip, apiKey)
        .then(function (data) {
            postData('/saveData', { temperature: data.main.temp, date: newDate, userResponse: feelings, });
        })
        .then(
            updateUI()
        )
};

// async function to make a GET request to the OpenWeatherMap API
const getWeather = async (baseURL, zip, Key) => {
    const res = await fetch(baseURL + zip + ',in' + Key)
    try {
        const data = await res.json();
        console.log(data)
        return data;
    } catch (error) {
        console.log("error", error);
        // appropriately handle the error
    }
}

// async function to make POST request
const postData = async (url = '', data = {}) => {

    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    try {
        const newData = await response.json();
        console.log(newData);
        return newData
    } catch (error) {
        console.log("error", error);

    }
}

// update UI
const updateUI = async (url) => {
    const request = await fetch('/all');

    try {
        const allData = await request.json();

        document.getElementById('date').innerHTML = allData[0].date;
        document.getElementById('temp').innerHTML = allData[0].temperature;
        document.getElementById('content').innerHTML = allData[0].userResponse;
        
    } catch (error) {
        console.log('Error: ', error);
    }
};
