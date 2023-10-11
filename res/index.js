
const url = "https://ipgeolocation.abstractapi.com/v1/?api_key=3f061ac999564a6b8e6230ce79b328bd"

var map = L.map('map').setView([-29.5943, 30.3875], 13)
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

const icon = L.icon({
    iconUrl: './images/icon-location.svg',
    iconSize: [30, 38]
})


const Post = (data) => {
    data = JSON.parse(data)
    let ip = data.ip_address
    let location = `${data.city}, ${data.region_iso_code} ${data.continent_geoname_id}`
    let time = data.timezone.current_time
    let long = data.longitude
    let lat = data.latitude
    let isp = data.connection.isp_name

    map.panTo(new L.LatLng(lat, long))
    var marker = L.marker([lat, long], { icon: icon }, 13).addTo(map)

    document.getElementById("IP").innerHTML = ip
    document.getElementById("location").innerHTML = location
    document.getElementById("time").innerHTML = time
    document.getElementById("ISP").innerHTML = isp
}

const httpGetAsync = (url) => {
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState === 4 && xmlHttp.status === 200)
            Post(xmlHttp.responseText)
    }
    xmlHttp.open("GET", url, true);
    xmlHttp.send(null)
}

const Search = () => {
    let find = document.getElementById("input").value
    httpGetAsync(`${url}&ip_address=${find}`)
    console.log(url)
}