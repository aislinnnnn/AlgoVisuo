import * as d3 from 'd3';


const width = 800;
const height = 500;

const random = bestCandidate(width, height, 10, 1000);

const svgElement = d3.select("svg");

export const startBestCandidate= function() {
  debugger
  const t = d3.timer(function() {
    for (let i = 0; i < 7; ++i) {
      debugger;
      const circle = random();
      debugger
      if (!circle) return t.stop();
      debugger
      svgElement.append("circle")
      .attr("cx", circle[0])
      .attr("cy", circle[1])
      .attr("r", 5)
      .attr("fill", 'lightseagreen');
    }
  });
};

function bestCandidate(width, height, numCands, maxNumSamples) {
  debugger;
  var numSamples = 0;
  var circles = [];


  return function() {
    debugger

    if (circles.length === 0 ) {
      debugger
      const firstCircle = [Math.random() * width, Math.random() * height];
      circles.push(firstCircle);
      return firstCircle;
    }

    if (++numSamples > maxNumSamples){
      debugger
      circles = [];
      numSamples = 0;
      return;
    }
    debugger
    var bestCand, bestD = 0;
    for (var i = 0; i < numCands; ++i) {
      debugger
      const x = Math.random() * width;
      const y = Math.random() * height;

      var c = [x, y];
      debugger
      var d = distance(closestSample(circles, c), c);

      if (d >= bestD) {
        bestD = d;
        bestCand = c;
      }
    }
    circles.push(bestCand);

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
      debugger
      const dist = distance(samp, c);
      if (dist < closestDist) {

        closest =  samp;
        closestDist = dist;
      }
    });
        return closest;
  }
}
