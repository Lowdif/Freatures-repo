import './App.css'
import Layer from './LayerComponent/Layer';
import Dialogue from './DialogueComponent/Dialogue';
import Arrow from './ArrowComponent/Arrow';

import { useState, useEffect } from 'react';
import type { LayerInfo } from './LayerComponent/Layer';
import type { DialogueProps } from './DialogueComponent/Dialogue';
import type { ArrowProps } from './ArrowComponent/Arrow';
import tempIcon from './assets/dialogueIconTemp.png'

function App() {
    const [selectedLayer, setSelectedLayer] = useState(0);
    const [layerInfo, setLayerInfo] = useState<LayerInfo[]>([]);
    const [compList, setcompList] = useState<(DialogueProps | ArrowProps)[]>([]);
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

    

    //adds new dialogue to the dialogue list
    const addDialogue = (id: number, x: number, y: number, speed: number, txt: string, icon: string) => {
        const dial: DialogueProps = {
            type: "dialogue",
            id: id,
            x: x,
            y: y,
            speed: speed,
            txt: txt,
            icon: icon,
            unmountComp: removeComp
        }
        setcompList(c => [...c, dial]);
    }

    const addArrow = (id: number, x1: number, y1: number, x2: number, y2: number, headSize: number, stemSize: number, color: string, duration: number) => {
        const arr: ArrowProps = {
            type: "arrow",
            id: id,
            x1: x1,
            y1: y1,
            x2: x2,
            y2: y2,
            headSize: headSize,
            stemSize: stemSize,
            color: color,
            duration: duration,
            unmountComp: removeComp
        }

        setcompList(c => [...c, arr]);
    }

    const removeComp = (id: number) => {
        if(id === -1) return;

        setcompList(c => c.filter((comp) => comp.id != id));
    }

    useEffect(() => {
        addDialogue(10, 20, 65, 30, "Hello there! This Section is an introduction to one of the most important concepts in the world of networking. The OSI Model!", tempIcon);
        addArrow(20, 300, 500, 200, 500, 50, 20, "red", 3);
    }, []);

    useEffect(() => {
    const load = async () => {
        const data = await loadLayerInfo();
        setLayerInfo(data); //fetches data and sets layerInfo
    };

    load(); //calls function

    }, [] /*only on first component mount (added to DOM tree)*/);

    return (<>
        <div className ="layersContainer">
            {Object.values(layerInfo).map((info) => //maps values of layerInfo dictionary to Layer components
            <Layer  key={info.layer}
                    info={info}
                    setSelectedLayer={setSelectedLayer}
                    selectedLayer={selectedLayer}
            />)}
        </div>

        {/*Dynamically maps type objects to react componenets*/}
        {compList.map(d =>  {
            if(d.type === "arrow") return <Arrow key={d.id} {...d}/>;
            else if(d.type === "dialogue") return <Dialogue key={d.id} {...d}/>;
            return null;
        })}
    </>);
}

export default App
