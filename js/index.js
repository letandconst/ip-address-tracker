const api ='at_usEAVSXOR8MwNZuw4hPJ86kytM9OR'
const uri = 'https://geo.ipify.org/api/v1'
const bypass_cors_url = 'https://cors-anywhere.herokuapp.com/'




// data to display 
let ip = document.getElementById('ipAddressData')
let locationResult = document.getElementById('locationData')
let timeZone = document.getElementById('timeZoneData')
let serviceProvider= document.getElementById('serviceProviderData')

// form 

const handleInput = document.getElementById('handleInput')
const handleSubmit = document.getElementById('handleSubmit')


//map

const map =  L.map('display-map').setView([51.505, -0.09], 13);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibWFqZHVtbXlkZXYiLCJhIjoiY2twd2oweDl6MDUyeTJ2bjI4dWtyOXl6cSJ9.sG8ApuPSPja8lz-OsZa5DQ'
}).addTo(map)




updateMarker = (update_marker = [-33.665, 18.993]) => {
    map.setView(update_marker, 13);
    L.marker(update_marker).addTo(map);
}

getIPDetails = (default_ip) => {
    if(default_ip == undefined){
        var ip_url = `${uri}?apiKey=${api}`
    }
    else {
        var ip_url = `${uri}?apiKey=${api}&ipAddress=${default_ip}`
    }
    fetch( ip_url)
    .then( results => results.json())
    .then( data => {
        ip.innerHTML = data.ip
        locationResult.innerHTML = `${data.location.region} ${data.location.country
        } ${data.location.postalCode}`
       timeZone.innerHTML = data.location.timezone
       serviceProvider.innerHTML = data.isp

        // update map marker 
        updateMarker([data.location.lat, data.location.lng])
    })
    .catch(error => {
        alert("Unable to get IP details")
        console.log(error)
    })
}

document.addEventListener('load', updateMarker())

handleSubmit.addEventListener('click', e => {
    e.preventDefault()
    if (handleInput.value != '' && handleInput.value != null) {
        getIPDetails(handleInput.value)
        return
    }
    alert("Please enter a valid IP address");
})