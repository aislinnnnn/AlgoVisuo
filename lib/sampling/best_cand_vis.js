import * as d3 from 'd3';


const width = 800;
const height = 500;

const random = bestCandidate(width, height, 10, 1000);

const svgElement = d3.select(".best-vis-svg");
const svgElement2 = d3.select(".best-vis-svg-2");

let candGroup = svgElement.append("g");
let dotGroup = svgElement2.append("g");

export const startBestVis= function() {

  d3.timer(function() {
    for (let i = 0; i < 7; ++i) {
      const circle = random();
      if (!circle) return true;

      svgElement2.append("circle")
      .attr("cx", circle[0])
      .attr("cy", circle[1])
      .attr("r", 5)
      .transition()
      .attr("fill", 'lightseagreen');

      // svgElement.append("circle")
      // .attr("cx", circle[0])
      // .attr("cy", circle[1])
      // .attr("r", 5)
      // .attr("fill", 'lightseagreen');
    }
  });
};

function bestCandidate(width, height, numCands, maxNumSamples) {
  var numSamples = 0;
  var circles = [];

  return function() {
    
    if (circles.length === 0 ) {
      const firstCircle = [Math.random() * width, Math.random() * height];
      circles.push(firstCircle);
      return firstCircle;
    }

    if (++numSamples > maxNumSamples) return;
    var bestCand, bestD = 0;
    for (var i = 0; i < numCands; ++i) {
      const x = Math.random() * width;
      const y = Math.random() * height;

      candGroup.append("circle")
      .attr("cx", x)
      .attr("cy", y)
      .attr("r", 3.75)
      .attr("fill", "grey");

      dotGroup.append("circle")
      .attr("cx", x)
      .attr("cy", y)
      .attr("r", 3.75)
      .attr("fill", "grey");

      var c = [x, y];
      var d = distance(closestSample(circles, c), c);

      if (d >= bestD) {
        bestD = d;
        bestCand = c;
      }
    }
    circles.push(bestCand);

    dotGroup
      .selectAll("circle").transition().style("opacity", 0)
      .remove();

    return bestCand;
  };

  function distance(x, y) {
        var dx = x[0] - y[0],
        dy = x[1] - y[1];
    return dx * dx + dy * dy;
  }

  function closestSample(samps, c) {
    let closestDist = 1000000000;
    let closest;

    samps.forEach((samp) => {
      const dist = distance(samp, c);
      if (dist < closestDist) {

        closest =  samp;
        closestDist = dist;
      }
    });
        return closest;
  }
}
