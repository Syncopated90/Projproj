import WaterLevelView from "../views/waterLevelView";
import React, {useState, useEffect} from 'react'
import {writeWaterLevel, readWaterLevel} from '../firebaseModel';
import sound from '../sounds/sound.mp3'

export default function WaterLevel({setWaterLevel}){
    const [waterLevelState, setWaterLevelState] = useState(0);
    const [hasMounted, setHasMounted] = useState(false);
    const audio = new Audio(sound)
    audio.volume = 0.1

    useEffect(() => {
        readWaterLevel("fredrik3", setWaterLevelState, setWaterLevel);
        setWaterLevel(waterLevelState);
    }, [])

    useEffect(() => {
        if (hasMounted && waterLevelState === 0) {
            console.log("hello, mounted?: " + hasMounted + ", waterlevel?: " + waterLevelState )
            audio.play()
        }
        setHasMounted(true)
    }, [waterLevelState])

    const clickedOnIncrementHandler = () =>{
        const newWaterLevel = waterLevelState + 1
        setWaterLevelState(newWaterLevel)
        writeWaterLevel("fredrik3", newWaterLevel) 
        setWaterLevel(newWaterLevel);
    }

    const clickedOnDecrementHandler = () =>{
        const newWaterLevel = waterLevelState - 1 
        setWaterLevelState(newWaterLevel)
        writeWaterLevel("fredrik3", newWaterLevel)
        setWaterLevel(newWaterLevel);
    }

    return (
    <WaterLevelView 
    onClickIncrement = {clickedOnIncrementHandler} 
    onClickDecrement  = {clickedOnDecrementHandler} 
    value = {waterLevelState}/>
    );
}