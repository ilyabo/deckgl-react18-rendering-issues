import React, {useEffect, useState} from 'react';
import {Map as ReactMapGLMap} from 'react-map-gl';
import DeckGL, {ScatterplotLayer} from 'deck.gl';
import {flushSync} from "react-dom";
import create from "zustand";

const MAP_STYLE = 'https://basemaps.cartocdn.com/gl/positron-nolabels-gl-style/style.json';
// const MAP_STYLE = 'mapbox://styles/mapbox/streets-v11';

const INITIAL_VIEW_STATE = {
  longitude: 0,
  latitude: 0,
  zoom: 2,
  bearing: 0,
  pitch: 0
};

const DATA = (() => {
  const data = [];
  for (let i = 0; i < 5000; i++) {
    const lon = Math.random() * 360 - 180;
    const lat = Math.random() * 180 - 90;
    data.push({
      coords: [lon, lat],
      size: Math.random() * 10,
      color: [Math.random() * 255, Math.random() * 255, Math.random() * 255]
    });
  }
  return data;
})();


const useStore = create(set => ({
  viewState: null,
  setViewState: (viewState) => set(state => ({ viewState })),
}))

function App() {
  const layers = [
    new ScatterplotLayer({
      data: DATA,
      radiusUnits: 'pixels',
      pickable: true,
      opacity: 0.8,
      filled: true,
      getPosition: (d) => d.coords,
      getRadius: (d) => d.size,
      getFillColor: (d) => d.color,
    }),

  ]

  const viewState_ = useStore(state => state.viewState)
  const setViewState_ = useStore(state => state.setViewState)
  const [viewState, setViewState] = useState(INITIAL_VIEW_STATE);

  // useEffect(() => {
  //   setViewState_(viewState);
  // }, [viewState]);

  const handleViewStateChange = ({viewState}) => {
    // flushSync(() => {
    setViewState_(viewState);
    // });
  };

  return (
    <DeckGL
      controller={true}
      initialViewState={INITIAL_VIEW_STATE}
      onViewStateChange={handleViewStateChange}
      viewState={viewState_}
      layers={layers}
    >
      <ReactMapGLMap
        mapStyle={MAP_STYLE}
      />
    </DeckGL>
  );
}


export default App;
