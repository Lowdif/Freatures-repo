import { useEffect, useRef, useState } from 'react';
import styles from './Arrow.module.css';
import { motion, type MotionProps } from 'motion/react';

function Arrow({id, x1, y1, x2, y2, headSize, stemSize, color, duration, unmountComp} : ArrowProps) {
    const [finished, setFinished] = useState(false);
    const [animationToggle, setAnimationToggle] = useState(false);
    const mounted = useRef(false);
    const midX = (x1 + x2) / 2;
    const midY = (y1 + y2) / 2;
    const appear: MotionProps = {
        initial: {opacity: 0},
        animate: {opacity: 1}
    }
    const disappear: MotionProps = {
        initial: {opacity: 1},
        animate: {opacity: 0}
    }

    useEffect(() => {
        //makes sure code is not executed on mount
        if (!mounted.current) {
            mounted.current = true;
            return;
        }

        unmountComp(id);
    }, [finished]);

    return(<>
        <motion.svg className={styles.arrow}
                    {...(animationToggle? disappear : appear)}
                    transition={{duration: (animationToggle? duration: 1), ease: "easeOut"}}
                    onAnimationComplete={def => {
                        if(typeof def === "object" && def !== null && "opacity" in def) {
                            if(def.opacity == 0) setFinished(true);
                            if(def.opacity == 1) setAnimationToggle(true);
                        }
                    }}>
            <defs>
                <marker
                    id="arrowhead"
                    markerWidth={headSize}
                    markerHeight={headSize}
                    refX={0.1}
                    refY={headSize/2}
                    orient="auto"
                    markerUnits="userSpaceOnUse"
                >
                    <polygon points={`0 0, ${headSize} ${headSize/2}, 0 ${headSize}`} fill={color} />
                </marker>
            </defs>

            <path
                d={`M ${x1} ${y1} Q ${midX} ${midY} ${x2} ${y2}`}
                stroke={color}
                strokeWidth={stemSize}
                fill="none"
                markerEnd="url(#arrowhead)"
            />
        </motion.svg>
    </>);
}

export type ArrowProps = {
    type: "arrow";
    id: number;
    x1: number; //tail x
    y1: number; //tail y
    x2: number; //tip x
    y2: number; //tip y
    headSize: number
    stemSize: number;
    color: string;
    duration: number
    unmountComp: Function
}

export default Arrow