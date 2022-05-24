import React from 'react';
import {Map as ReactMapGLMap} from 'react-map-gl';
import DeckGL, {ArcLayer} from 'deck.gl';

const MAP_STYLE = 'https://basemaps.cartocdn.com/gl/positron-nolabels-gl-style/style.json';

const AIR_PORTS =
  'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_10m_airports.geojson';

const INITIAL_VIEW_STATE = {
  latitude: 51.47,
  longitude: 0.45,
  zoom: 4,
  bearing: 0,
  pitch: 30
};

function App() {
  return (
    <DeckGL controller={true} initialViewState={INITIAL_VIEW_STATE}>
      <ReactMapGLMap
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
        mapStyle={MAP_STYLE}
      />
      <ArcLayer
        id="arcs"
        data={AIR_PORTS}
        dataTransform={d => d.features.filter(f => f.properties.scalerank < 4)}
        getSourcePosition={f => [-0.4531566, 51.4709959]}
        getTargetPosition={f => f.geometry.coordinates}
        getSourceColor={[0, 128, 200]}
        getTargetColor={[200, 0, 80]}
        getWidth={1}
      />
    </DeckGL>
  );
}


export default App;
