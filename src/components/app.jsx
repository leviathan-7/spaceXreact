import {LaunchList} from "./launchList";
import {Map} from "./map";
import {useEffect, useState} from "react";
import {SpaceX} from "../api/spacex";

function App(){
    const spacex = new SpaceX();
    const [launches, setLaunches] = useState([]);
    const [launchpads, setLaunchpads] = useState([]);
    useEffect(()=>{
        spacex.launches().then(data =>{
            setLaunches(data)
        })
        spacex.launchpads().then(data =>{
            setLaunchpads(data)
        })
    },[])
    return(
        <main className='main'>
            <LaunchList launches = {launches} launchpads = {launchpads} />
            <Map launchpads = {launchpads}/>
        </main>
    )
}

export {App}; 
