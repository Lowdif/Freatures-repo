import './App.css'
import Layer from './LayerComponent/Layer';
import { useState, useEffect } from 'react';
import type { LayerInfo } from './LayerComponent/Layer';

function App() {
    const [selectedLayer, setSelectedLayer] = useState(0);
    const [layerInfo, setLayerInfo] = useState<LayerInfo[]>([]);
    const loadLayerInfo = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/layers");

            if (!res.ok) {
            throw new Error("Could not fetch API data");
            }

            const data = await res.json();

            return data;
        } catch (e) {
            console.error(e);
            return -1;
        }
    };

    useEffect(() => {
    const load = async () => {
        const data = await loadLayerInfo();
        setLayerInfo(data); //fetches data and sets layerInfo
    };

    load(); //calls function

    }, [] /*only on first component mount (added to DOM tree)*/);

    return (<>
        <div className ="layersContainer">
            {Object.values(layerInfo).map((info) =>
            <Layer  key={info.layer}
                    info={info}
                    setSelectedLayer={setSelectedLayer}
                    selectedLayer={selectedLayer}
            />)}
        </div>
    </>);
}

export default App
