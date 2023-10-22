import * as d3 from "d3";
import * as Geo from "../geo.json";
import {useRef, useEffect} from "react";

let containerRef = null
let g = null
let projection = null
function Map(props){
    const launchpads = props.launchpads
    const width = 1000;
    const height = 600;
    const margin = {
        top: 20,
        right: 20,
        bottom: 20,
        left: 100
    };
    containerRef = useRef(null);
    useEffect(()=> { 
        let svgArr = d3.select(containerRef.current).selectAll("svg")
        let svg = null
        if(svgArr.size() !== 0)
            svg = d3.select(containerRef.current).select("svg")
        else
            svg = d3.select(containerRef.current).append("svg")

        svg.selectAll("*").remove();
        svg.attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom )
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`)

        projection = d3.geoMercator()
            .scale(70)
            .center([0, 20])
            .translate([width/2 - margin.left, height/2 - margin.top]);
        g = svg.append("g");

        g.selectAll("path")
            .data(Geo.features)
            .enter()
            .append("path")
            .style("fill", "green")
            .attr("class", "topo")
            .attr("d", d3.geoPath().projection(projection))
            .style("opacity", .7)
           
        
        launchpads.map(Launchpad => {
            let x = Launchpad.longitude
            let y = Launchpad.latitude  
            let [xx, yy] = projection([x, y])
            g.append("circle")
                .attr("r", 2.5)
                .attr("cx", xx)
                .attr("cy", yy)
                .style("fill", "blue")
                .attr("class", "topo")
        })
        
     });



    return(
        <div className="mapContainer map" ref={containerRef}>
        </div>
    )
}

export {Map}
export {containerRef}
export {g}
export {projection}