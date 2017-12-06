var makeRequest = function(url, callback){
  //create a new XHR
  var request = new XMLHttpRequest();

  //Open the request passing in the HTTP request type and the URL
  request.open("GET", url);

  //write an event listener for the request
  request.addEventListener("load", callback);

  //GO
  request.send();
};

var requestComplete = function(){
  if(this.status !== 200) return;

  var jsonString = this.responseText;

  var countries = JSON.parse(jsonString);
  populateSelector(countries)
  // populateList(countries);
};

var populateSelector = function(countries){
  var countriesList = document.getElementById('countries-dropdown');

  for(var i = 0; i < countries.length; i++){
    var country = countries[i];
    var option = document.createElement("option");
    option.textContent = country.name;
    option.value = i;
    countriesList.appendChild(option)
  }

  countriesList.addEventListener('change', function(){
    var selectedCountry = countries[this.value];
    var countryName = document.getElementById('country-name');
    countryName.textContent = selectedCountry.name;
    var countryPop = document.getElementById('country-population');
    countryPop.textContent = "Population: " + selectedCountry.population;
    var countryCapital = document.getElementById('county-capital');
    countryCapital.textContent = "Capital: " + selectedCountry.capital;
    var borderingCountries = document.getElementById('bordering-countries')
    borderingCountries.innerText = "";
    for(var cntry of selectedCountry.borders){
      var country = document.createElement('li');
      country.innerText = cntry;
      borderingCountries.appendChild(country)
    }

    var flag = document.getElementById('country-flag');
    flag.src = selectedCountry.flag;

    var map = document.getElementById('main-map');
    var center = {lat: selectedCountry.latlng[0], lng: selectedCountry.latlng[1]};
    var mainMap = new MapWrapper(map, center, 5)
    mainMap.addMarker(center);



    var jsonString = JSON.stringify(selectedCountry);
    localStorage.setItem('selectedCountry', jsonString);

  })

}


var populateList = function(countries){
  var ul = document.getElementById('country-list');

  for(var country of countries){
    var li = document.createElement('li')
    li.innerText = country.name
    ul.appendChild(li)
  }
}

var app = function(){
  // var loadCountries = document.getElementById('load-countries');
  // loadCountries.addEventListener('click', function(){
  //   this.disabled = "disabled";
    var url = "https://restcountries.eu/rest/v2/all";
    makeRequest(url, requestComplete);

    var jsonString = localStorage.getItem('selectedCountry');
    var savedCountry = JSON.parse(jsonString);

    var countryName = document.getElementById('country-name');
    countryName.textContent = savedCountry.name;
    var countryPop = document.getElementById('country-population');
    countryPop.textContent = "Population: " + savedCountry.population;
    var countryCapital = document.getElementById('county-capital');
    countryCapital.textContent = "Capital: " + savedCountry.capital;

    var borderingCountries = document.getElementById('bordering-countries')
    borderingCountries.innerText = "";
    for(var cntry of savedCountry.borders){
      var country = document.createElement('li');
      country.innerText = cntry;
      borderingCountries.appendChild(country)
    }

    var flag = document.getElementById('country-flag');
    flag.src = savedCountry.flag;

    var map = document.getElementById('main-map');
    var center = {lat: savedCountry.latlng[0], lng: savedCountry.latlng[1]};
    var mainMap = new MapWrapper(map, center, 5)
    mainMap.addMarker(center);



  };








window.addEventListener('load', app);
