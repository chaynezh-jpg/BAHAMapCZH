mapboxgl.accessToken = 'pk.eyJ1IjoiY2hheW5lemgiLCJhIjoiY21oOXJ1eTQ5MDk3bjJpb2o4ZHFtNXB2MiJ9.-81gnYO-U7epgEZuXTGaRw';
const map = new mapboxgl.Map({
        container: 'map', 
        style: 'mapbox://styles/chaynezh/cmh9s3tfp00qk01r5bkstfkbz',
        center: [-122.3, 37.87], 
        zoom: 13 
    });

map.on('load', () => {
  map.addSource('points-data', {
    type: 'geojson',
    data: 'https://raw.githubusercontent.com/chaynezh-jpg/BAHAMapCZH/refs/heads/main/data/183dataczh.geojson'
  });

  map.addLayer({
    id: 'points-layer',
    type: 'circle',
    source: 'points-data',
    paint: {
      'circle-color': '#65275b',
      'circle-radius': 6,
      'circle-stroke-width': 2,
      'circle-stroke-color': '#f5bddd'
    }
  });

  const popupEl = document.createElement('div');
  popupEl.className = 'custom-popup';
  document.body.appendChild(popupEl);

  let activeFeature = null;

  map.on('click', 'points-layer', (e) => {
    activeFeature = e.features[0];
    const properties = activeFeature.properties;
    popupEl.innerHTML = `
      <div style="max-width:250px;
            background:rgba(250, 238, 223, 0.9);
            padding:8px;
            border-radius:4px;
            box-shadow:0 2px 6px rgba(0,0,0,0.2);">
        <h3 style="margin:0 0 5px;">${properties.Landmark}</h3>
        <img src="${properties.ImageLink}" width="100%" style="border-radius:4px;margin-bottom:8px;">
        <p><strong>Address:</strong> ${properties.Address}</p>
        <p><strong>Architect & Date:</strong> ${properties.ArchitectDate}</p>
        <p><strong>Designated:</strong> ${properties.Designated}</p>
        ${properties.Link ? `<p><a href="${properties.Link}" target="_blank">More info</a></p>
        <p><strong>All above data from Berkeley Architectural Heritage Association.</strong></p>` : ''}
      </div>`;
    popupEl.style.display = 'block';
  });

  map.on('click', (e) => {
  const features = map.queryRenderedFeatures(e.point, {
    layers: ['points-layer']
  });

  if (features.length === 0) {
    popupEl.style.display = 'none';
    activeFeature = null;
  }
});

  
  map.on('render', () => {
    if (!activeFeature) return;
    const screen = map.project(activeFeature.geometry.coordinates);
    popupEl.style.position = 'absolute';
    popupEl.style.left = `${screen.x}px`;
    popupEl.style.top = `${screen.y - 20}px`; 
    popupEl.style.transform = 'translate(-50%, -100%)';
  });
  const cent = [-122.27, 37.87];
const zm = 13;

document.getElementById('button1').addEventListener('click', () => {
  map.flyTo({
    center: cent,
    zoom: zm,
   
  });
});
  map.on('mouseenter', 'points-layer', () => {
              map.getCanvas().style.cursor = 'url(https://64.media.tumblr.com/1404cda70d5cd5bc46ca9c0acc6b7012/debf3f0bae94a1ee-63/s75x75_c1/f98df0c23741340907358711fca3e162dfec98ab.gifv), pointer';
      });

      
    map.on('mouseleave', 'points-layer', () => {
            map.getCanvas().style.cursor = '';
      });
      const myButton = document.getElementById('myButton');


});





    
