import WaterLevelView from "../views/waterLevelView";
import React, {useState} from 'react'
import writeUserData from '../firebaseModel';

export default
function WaterLevel(){
    return(<WaterLevelView/>);
}