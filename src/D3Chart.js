import * as d3 from "d3";

const MARGIN = { TOP: 10, BOTTOM: 80, LEFT: 70, RIGHT: 10 };
const WIDTH = 500 - MARGIN.LEFT - MARGIN.RIGHT;
const HEIGHT = 300 - MARGIN.TOP - MARGIN.BOTTOM;

class D3Chart {
  constructor(element, data, updateName) {
    // vis refers to a particular instance of this D3Chart object
    let vis = this;
    vis.updateName = updateName;
    
    // Appending the svg canvas and moving it to the center of the screen according to D3 Margin Convention
    vis.g = d3.select(element)
      .append("svg")
        .attr("width", WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
        .attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)
      .append("g")
        .attr("transform", `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`)
    

    // x and y scales - domain corresponds to input values from the data, and range corresponds to output that the scale gives back (in pixels)
    vis.x = d3.scaleLinear()
      .range([0, WIDTH])
    
    vis.y = d3.scaleLinear()
      .range([HEIGHT, 0])

    
    // axis generators
    vis.xAxisGroup = vis.g.append("g")
      .attr("transform", `translate(0, ${HEIGHT})`)
    vis.yAxisGroup = vis.g.append("g")


    // Axis labels
    vis.g.append("text")
      .attr("x", WIDTH / 2)
      .attr("y", HEIGHT + 40)
      .attr("font-size", 20)
      .attr("text-anchor", "middle")
      .text("Age")

    vis.g.append("text")
      .attr("x", -(HEIGHT / 2) )
      .attr("y", -50)
      .attr("transform", "rotate(-90)")
      .attr("font-size", 20)
      .attr("text-anchor", "middle")
      .text("Height in cm")


    vis.update(data)
  }
  update(data) {
    let vis = this;
    vis.data = data;  // save the data variable to the D3Chart object instance

    vis.x.domain([0, d3.max(vis.data, d => Number(d.age))]);
    vis.y.domain([0, d3.max(vis.data, d => Number(d.height))]);

    const xAxisCall = d3.axisBottom(vis.x);
    const yAxisCall = d3.axisLeft(vis.y);

    vis.xAxisGroup.transition().duration(500).call(xAxisCall)
    vis.yAxisGroup.transition().duration(500).call(yAxisCall)

    // Create/Update a small circle for every item in the data array. Here's the general D3 update pattern:
    // 1. Data Join - selectAll() matching elements on the screen and update the data array
    const circles = vis.g.selectAll("circle")
      .data(vis.data, d => d.name);

    // 2. Exit - remove() any old elements from the screen that don't exist in the new data array
    circles.exit()
      .transition().duration(500)  // anything after the .transition is what we want to gradually see a change in
        .attr("cy", vis.y(0))
        .remove();

    // 3. Update - Update the elements that still exist in the new data as well as the screen (e.g. elements moved)
    circles.transition().duration(500)
      .attr("cx", d => vis.x(d.age))
      .attr("cy", d => vis.y(d.height))

    // 4. Enter - Add the new elements which exist in the new data, but not on the screen
    circles.enter().append("circle")
      .attr("cy", vis.y(0))
      .attr("cx", d => vis.x(d.age))
      .attr("r", 5)
      .attr("fill", "blue")
      .on("click", d => vis.updateName(d.name))
      .transition().duration(500)
        .attr("cy", d => vis.y(d.height));
  }
}

export default D3Chart;