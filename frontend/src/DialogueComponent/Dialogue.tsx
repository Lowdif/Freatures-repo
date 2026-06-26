import styles from './Dialogue.module.css';
import { useEffect, useState, useRef } from "react";


function Dialogue({id, x, y, speed = 30, txt, icon, unmountComp} : DialogueProps) {
    const [displayedTxt, setDisplayedTxt] = useState("");
    const [finished, setFinished] = useState(false);
    const timerRef = useRef(0);
    const handleClick = () => {
        if (!finished) {
            clearInterval(timerRef.current);
            setDisplayedTxt(txt);
            setFinished(true);
        } else {
            unmountComp(id);
        }
    }

    //progressivley display text inside texbox
    useEffect(() => {
        setDisplayedTxt("");
        setFinished(false);

        let i = 0;

        timerRef.current = setInterval(() => {
            i++;
            setDisplayedTxt(txt.slice(0, i)); //slices and displays i-th indx characters from txt
            if (i >= txt.length) {
                clearInterval(timerRef.current); //stops repeated timer
                setFinished(true);
            }
        }, speed);

        return () => clearInterval(timerRef.current);
    }, [txt, speed]); //executes when txt or speed variable changes
    
    return(<>
        <div className={styles.dialogueContainer} style={{left: `${x}px`, top: `${y}px`}}>
            <img className={styles.dialogueIcon} src={icon}/>
            <div className={styles.dialogueBox} onClick={handleClick}>
                <div className={styles.hidden}>{txt}</div> {/*Used to set initial box size and keep it constant (no dynamic growth)*/}
                <div className={styles.shown}>{displayedTxt}</div>
            </div>
        </div>
    </>);
}

export type DialogueProps = {
    type: "dialogue";
    id: number;
    x: number;
    y: number;
    speed: number;
    txt: string;
    icon: string;
    unmountComp: Function
}

export default Dialogue