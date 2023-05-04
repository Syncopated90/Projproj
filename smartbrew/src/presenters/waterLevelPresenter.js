import WaterLevelView from "../views/waterLevelView";
import React, {useState, useEffect} from 'react'
import {writeWaterLevel, readWaterLevel, readWaterLevel2} from '../firebaseModel';
import sound from '../sounds/sound.mp3'

export default function WaterLevel(props){
    const [waterLevelState, setWaterLevelState] = useState(0);
    const [hasMounted, setHasMounted] = useState(false);
    const audio = new Audio(sound)
    audio.volume = 0.1
    
    useEffect(() => {
        readWaterLevel("fredrik", setWaterLevelState, props.setWaterLevel);
        props.setWaterLevel(waterLevelState);
    }, [])
    useEffect(() => {
        readWaterLevel2("fredrik", (value) => {
          console.log("Water level from Firebase:", value);
          setWaterLevelState(value);
          props.setWaterLevel(value);
        });
      }, []);
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
        writeWaterLevel("fredrik", newWaterLevel) 
        props.setWaterLevel(newWaterLevel);
    }

    const clickedOnDecrementHandler = () =>{
        const newWaterLevel = waterLevelState - 1 
        setWaterLevelState(newWaterLevel)
        writeWaterLevel("fredrik", newWaterLevel)
        props.setWaterLevel(newWaterLevel);
    }

    return (
    <WaterLevelView 
    onClickIncrement = {clickedOnIncrementHandler} 
    onClickDecrement  = {clickedOnDecrementHandler} 
    value = {waterLevelState}/>
    );
}