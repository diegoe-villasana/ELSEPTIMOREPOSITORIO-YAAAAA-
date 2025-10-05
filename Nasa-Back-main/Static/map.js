document.addEventListener('DOMContentLoaded', function () {
    // Inicializar el mapa y centrarlo en una vista global
    var map = L.map('map').setView([20, 0], 2);

    // Añadir las capas base: satelital (ESRI) y calles (OpenStreetMap)
    const esriSat = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, Maxar, Earthstar Geographics, and the GIS User Community'
    });

    const osmStreets = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    // Añade la capa satelital por defecto
    esriSat.addTo(map);

    // Control para alternar entre capas base (ubicado en bottomleft para evitar solapamiento con HUD)
    L.control.layers({
        'Satelital': esriSat,
        'Mapa calles': osmStreets
    }, null, { position: 'bottomleft' }).addTo(map);

    let impactMarker;
    let impactCircle;

    let impactMarker;
let impactCircle;

// Función para dibujar círculo de impacto en coordenadas dadas
function drawImpactCircle(lat, lng, radio = 50000) { // radio en metros (50 km por defecto)
    // Si ya hay un círculo, lo eliminamos
    if (impactCircle) {
        map.removeLayer(impactCircle);
    }

    // Crear el nuevo círculo
    impactCircle = L.circle([lat, lng], {
        color: 'red',         // borde rojo
        fillColor: '#f03',    // relleno rojo
        fillOpacity: 0.3,     // transparencia
        radius: radio         // radio en metros
    }).addTo(map);

    // Centrar el mapa en la zona del impacto
    map.setView([lat, lng], 6);

    console.log(`🟥 Círculo dibujado en lat:${lat}, lng:${lng}, radio:${radio}m`);
}

// Exponer función global para dibujar desde otros scripts
window.drawImpactCircle = drawImpactCircle;
