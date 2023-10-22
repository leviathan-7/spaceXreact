import * as d3 from "d3";
import {containerRef} from "./map";
import {g} from "./map";
import {projection} from "./map";

let launches;
let launchpads;
function LaunchList(props) {
    launches = props.launches
    launchpads = props.launchpads
    return (
        <aside className="aside" id="launchesContainer">
            <h3>Launches</h3>
            <div id="listContainer" >


                <ul>
                    {launches.map(launch => {
                        return <li onMouseEnter = {MakeColor} onMouseLeave = {NoColor} key={launch.id}>{launch.name} </li>
                    })}
                </ul>
            </div>
        </aside>
    )
}

export {LaunchList}

function MakeColor(Event){
    let Elem = Event.target
    Elem.style.backgroundColor = 'red';
    let text = Elem["innerText"]
    SwithPointColor(text,'red')
}
function NoColor(Event){
    let Elem = Event.target
    Elem.style.backgroundColor = 'white';
    let text = Elem["innerText"]
    SwithPointColor(text,'blue')
}

function SwithPointColor(text, color){
    launches.map(Launche => {
        if (Launche.name === text) {
            let launchpad_UUID = Launche.launchpad
            launchpads.map(Launchpad => {
                if (Launchpad.id === launchpad_UUID) {
                    
                    let x = Launchpad.longitude
                    let y = Launchpad.latitude  
                    
                    let [xx, yy] = projection([x, y])
                    svg = d3.select(containerRef.current).select("svg")
                    g.append("circle")
                        .attr("r", 2.5)
                        .attr("cx", xx)
                        .attr("cy", yy)
                        .style("fill", color)
                        .attr("class", "topo")
                        
                }
            })
        }
    })
}
