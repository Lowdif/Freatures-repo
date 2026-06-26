import styles from './Layer.module.css';
import { motion} from "motion/react";

function Layer({info, setSelectedLayer, selectedLayer}: LayerProps) {
    const isExpanded = selectedLayer === info.layer;

    //just makes the whileHover logic cleaner to understand
    const hoverStyle = {
        scale: 1.01,
        cursor: "pointer",
        y: -2,
        backgroundColor: info.bgColorHover,
        boxShadow: `0px 5px 2px ${info.hoverShadowColor}`
    }

    const scaleSize: number = 85; // deletermines the scale of the layer after expanding
    const leftOffset: number = 2; //positive values move to left
    const topOffset: number = -2; //positive values move to bottom
    const animatedProperties = isExpanded ? {
        zIndex: 10,
        width: `${scaleSize}vw`,
        height: `${scaleSize}vh`,
        left: `${(50 - scaleSize/2 + leftOffset)}vw`,
        top: `${(50 - scaleSize/2 + topOffset)}vh`,
        position: "absolute",
        borderRadius: "10px"
    } : {}

    const initialProperties = {
        zIndex: "auto",
        width: "5vw",
        height: "5vh",
        top: `${(info.layer - 1) * 5}vh`, //5 = height (in vh)
        left: `0vw`,
        position: "static",
        cursor: "default",
        backgroundColor: info.bgColor,
        boxShadow: "none",
        borderRadius: "0px"
    }

    const onLayerClick = () => {
        setSelectedLayer(info.layer);
    }

    //HTML when layer is expanded
    const expandedContent =
    (<>
        <p className={styles.expandedTitle}>Layer {info.layer}</p>
        <div className={styles.expandedContent}>

        </div>
    </>);

    //HTML when layer is collapsed
    const collapsedContent =
    (<>
        <p><b>Layer {info.layer}</b></p>
        <p>{info.name}</p>
    </>);

    return(<motion.div className={`${styles.layer} ${isExpanded? styles.expanded : styles.collapsed}`}
                initial={initialProperties}
                animate={animatedProperties}
                
                whileHover={isExpanded ? {} : hoverStyle}
                onClick={onLayerClick}
                transition={{duration: isExpanded ? 0.75 : 0.25, ease: "easeIn"}}>
        {isExpanded? expandedContent : collapsedContent}
    </motion.div>);
}

type LayerProps = {
    info: LayerInfo;
    setSelectedLayer: Function;
    selectedLayer: number;
}

export type LayerInfo = {
    layer: number;
    name: string;
    desc: string;
    bgColor: string;
    bgColorHover: string;
    hoverShadowColor: string;
    expandedText: Object;
    expandedImages: Object;
}

export default Layer;
