import WaterLevelView from "../views/waterLevelView";
import React, {useState, useEffect} from 'react'
import {writeWaterLevel, readWaterLevel} from '../firebaseModel';

export default function WaterLevel(){
    const [waterLevelState, setWaterLevelState] = useState(0);
    console.log("Waterlevelstate:"+waterLevelState);

    useEffect(() => {
        readWaterLevel("fredrik", setWaterLevelState);
    }, [])

    const clickedOnIncrementHandler = () =>{
        const newWaterLevel = waterLevelState + 1
        setWaterLevelState(newWaterLevel)
        writeWaterLevel("fredrik", newWaterLevel) 
    }

    const clickedOnDecrementHandler = () =>{
        const newWaterLevel = waterLevelState - 1 
        setWaterLevelState(newWaterLevel)
        writeWaterLevel("fredrik", newWaterLevel)
    }

    return (
    <WaterLevelView 
    onClickIncrement = {clickedOnIncrementHandler} 
    onClickDecrement  = {clickedOnDecrementHandler} 
    value = {waterLevelState}/>
    );
}