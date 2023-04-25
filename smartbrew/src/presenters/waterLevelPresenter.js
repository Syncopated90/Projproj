import WaterLevelView from "../views/waterLevelView";
import React, {useState} from 'react'
import {writeWaterLevel} from '../firebaseModel';

export default function WaterLevel(){
    const [waterLevelState, setWaterLevelState] = useState(0);

    const clickedOnIncrementHandler = () =>{
        setWaterLevelState(waterLevelState + 1)
        writeWaterLevel("fredrik", waterLevelState + 1) 
    }

    const clickedOnDecrementHandler = () =>{
        setWaterLevelState(waterLevelState - 1)
        writeWaterLevel("fredrik", waterLevelState - 1)
    }

    return (
    <WaterLevelView 
    onClickIncrement = {clickedOnIncrementHandler} 
    onClickDecrement  = {clickedOnDecrementHandler} 
    value = {waterLevelState}/>
    );
}