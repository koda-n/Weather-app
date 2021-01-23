function now() {
  let datum = new Date();
  let hour = datum.getHours();
  let minutes = datum.getMinutes();
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  let days = [
    "SUNDAY",
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
  ];
  let day = days[datum.getDay()];

  let stavek = `${day} at ${hour}:${minutes}`;

  let h3 = document.querySelector("h3");
  h3.innerHTML = stavek;
}

function ure(timestamp) {
  let datum = new Date(timestamp);
  let hour = datum.getHours();
  let minutes = datum.getMinutes();
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  return `${hour}:${minutes}`;
}
now();

function vnesiInfo(event) {
  now();
  event.preventDefault();
  let vnesi = document.querySelector("#searchBox");
  let mesto = document.querySelector(".mesto");
  mesto.innerHTML = vnesi.value;

  function displayTemp(response) {
    let temperature = Math.round(response.data.main.temp);
    let veter = Math.round(response.data.wind.speed * 3.6);
    let vlaga = response.data.main.humidity;
    let feeling = Math.round(response.data.main.feels_like);

    let temp = document.querySelector(".temperatura");
    temp.innerHTML = `${temperature}°C`;

    let vlag = document.querySelector("#vlaga");
    vlag.innerHTML = `${vlaga}`;

    let vet = document.querySelector("#veter");
    vet.innerHTML = `${veter}`;

    let feelin = document.querySelector("#feeling");
    feelin.innerHTML = `${feeling}`;

    let icon = document.querySelector(".ikona");
    icon.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  }
  function napoved(response) {
    console.log(response);
    let napovednik = document.querySelector("#prvi");
    let napovedcasa = response.data.list[0];
    napovednik.innerHTML = `
        <li>
          <div class="dan">${ure(napovedcasa.dt * 1000)}</div>
          <div class="slikca">
          <img
                src="http://openweathermap.org/img/wn/${
                  response.data.list[0].weather[0].icon
                }@2x.png"
                alt="fog"
                width="70"
          />
          <br />
          </div>
          <div class="temp">${Math.round(
            response.data.list[0].main.temp
          )}°C</div>
          </li>`;

    napovedcasa = response.data.list[1];
    napovednik.innerHTML += `
        <li>
          <div class="dan">${ure(napovedcasa.dt * 1000)}</div>
          <div class="slikca">
          <img
                src="http://openweathermap.org/img/wn/${
                  response.data.list[0].weather[0].icon
                }@2x.png"
                alt="fog"
                width="70"
          />
          <br />
          </div>
          <div class="temp">${Math.round(
            response.data.list[0].main.temp
          )}°C</div>
          </li>`;

    napovedcasa = response.data.list[2];
    napovednik.innerHTML += `
        <li>
          <div class="dan">${ure(napovedcasa.dt * 1000)}</div>
          <div class="slikca">
          <img
                src="http://openweathermap.org/img/wn/${
                  response.data.list[0].weather[0].icon
                }@2x.png"
                alt="fog"
                width="70"
          />
          <br />
          </div>
          <div class="temp">${Math.round(
            response.data.list[0].main.temp
          )}°C</div>
          </li>`;

    napovedcasa = response.data.list[3];
    napovednik.innerHTML += `
        <li>
          <div class="dan">${ure(napovedcasa.dt * 1000)}</div>
          <div class="slikca">
          <img
                src="http://openweathermap.org/img/wn/${
                  response.data.list[0].weather[0].icon
                }@2x.png"
                alt="fog"
                width="70"
          />
          <br />
          </div>
          <div class="temp">${Math.round(
            response.data.list[0].main.temp
          )}°C</div>
          </li>`;

    napovedcasa = response.data.list[4];
    napovednik.innerHTML += `
        <li>
          <div class="dan">${ure(napovedcasa.dt * 1000)}</div>
          <div class="slikca">
          <img
                src="http://openweathermap.org/img/wn/${
                  response.data.list[0].weather[0].icon
                }@2x.png"
                alt="fog"
                width="70"
          />
          <br />
          </div>
          <div class="temp">${Math.round(
            response.data.list[0].main.temp
          )}°C</div>
          </li>`;
  }

  function lokacija(city) {
    let cityy = city;
    let apiKey = "f8b197b8ac625b62389f229440e44443";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityy}&units=metric&mph=kmh&appid=${apiKey}`;
    axios.get(url).then(displayTemp);

    url = `https://api.openweathermap.org/data/2.5/forecast?q=${cityy}&units=metric&appid=${apiKey}`;
    axios.get(url).then(napoved);
  }
  let city = vnesi.value;

  lokacija(city);
}
let vnesiMesto = document.querySelector("#vnesi");
vnesiMesto.addEventListener("submit", vnesiInfo);
