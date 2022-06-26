var map;
map = L.map('map').setView([25.168623223894397, 121.44559804615191], 10);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '<a href="https://www.openstreetmap.org/">OpenStreetMap</a> ',
    maxZoom: 18,
}).addTo(map);

var marker = L.marker([25.176111135998408, 121.4517188138298]);
marker.addTo(map);
marker.bindPopup("<b>淡江大學</b><br>新工學院").openPopup();

const popup = L.popup();
function onMapClick(e) {
  let lat = e.latlng.lat; // 緯度
  let lng = e.latlng.lng; // 經度
  popup
    .setLatLng(e.latlng)
    .setContent(`緯度：${lat}<br/>經度：${lng}`)
    .openOn(map);
}
map.on('click', onMapClick);
// 1.定義 marker 顏色，把這一段放在 getData() 前面
let iconColor;
// 2.我們取出綠、橘、紅三個顏色來代表口罩數量的不同狀態
const greenIcon = new L.Icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    // 3.只要更改上面這一段的 green.png 成專案裡提供的顏色如：red.png，就可以更改 marker 的顏色
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const orangeIcon = new L.Icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});


const redIcon = new L.Icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});
const blueIcon = new L.Icon({
  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});
function listStation(stations) 
{
  for(var i=0;i<stations.length;i++)
  {
    var stationName=stations[i].sna;
    var stationTot=stations[i].tot;
    var stationSbi=stations[i].sbi;
    var stationLatLng={lat: stations[i].lat , lng: stations[i].lng};
    var stationBemp=stations[i].bemp;
    if(stations[i].sbi==0)
      iconColor=redIcon;
    else if(stations[i].sbi>0&&stations[i].sbi<=5)
      iconColor=orangeIcon;
    else if(stations[i].sbi>5&&stations[i].sbi<=15)
      iconColor=blueIcon;
    else 
      iconColor=greenIcon;
    
    var marker2= new L.Marker(
      [stations[i].lat,
      stations[i].lng],
      {icon:iconColor},
      map,
      {title: stationName},
    );
    marker2.addTo(map);
    marker2.bindPopup(stationName+"<br>可借 : "+stationSbi+"<br>總共 : "+stationTot).openPopup();
  }  
}
  
fetch('https://tcgbusfs.blob.core.windows.net/dotapp/youbike/v2/youbike_immediate.json', { 
  method: 'GET'
})
.then(function(response) { return response.json(); })
.then(function(json) {
  // use the json
  listStation(json)
  console.log(json);
  
});

$.getJSON('https://d3hu5rc2ze6fj6.cloudfront.net/wms?Request=GetGeoJSON&Layers=ronnywang/%E9%84%89%E9%8E%AE%E5%B8%82%E5%8D%80%E8%A1%8C%E6%94%BF%E5%8D%80%E5%9F%9F%E7%95%8C%E7%B7%9A&sql=SELECT+%2A+FROM+this+ORDER+BY+_id_+ASC', function (r) {
    L.geoJSON(r, { color: "#333" }).addTo(map);
});
