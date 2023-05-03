import WaterLevelView from "../views/waterLevelView";
import React, {useState, useEffect} from 'react'
import {writeWaterLevel, readWaterLevel} from '../firebaseModel';

export default function WaterLevel({setWaterLevel}){
    const [waterLevelState, setWaterLevelState] = useState(0);

    useEffect(() => {
        readWaterLevel("fredrik3", setWaterLevelState, setWaterLevel);
        setWaterLevel(waterLevelState);
    }, [])

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