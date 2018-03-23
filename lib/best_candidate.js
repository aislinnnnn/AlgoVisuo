import * as d3 from 'd3';


const width = 800;
const height = 500;

const random = bestCandidate(width, height, 10, 1000);

const svgElement = d3.select("body")
                      .append("div")
                      .attr("class", "best")
                      .append("svg")
                        .attr("width", width)
                        .attr("height", height);


export const bestSampleHeader = d3.select(".best")
              .insert("h1", ":first-child")
              .html("Best Candidate Sample Algorithm");

export const bestCandidateSample = d3.timer(function() {
  for (let i = 0; i < 7; ++i) {
    debugger
    const circle = random();
    debugger
    if (!circle) return true;
    svgElement.append("circle")
        .attr("cx", circle[0])
        .attr("cy", circle[1])
        .attr("r", 5)
        .attr("fill", 'lightseagreen');
  }
});

function bestCandidate(width, height, numCandidates, numSamplesMax) {
  var numSamples = 0;
  var circles = [];


  return function() {
    debugger;
    if (circles.length === 0 ) {
      const firstCircle = [Math.random() * width, Math.random() * height];
      circles.push(firstCircle);
      return firstCircle;
    }

    if (++numSamples > numSamplesMax) return;
    var bestCand, bestDistance = 0;
    for (var i = 0; i < numCandidates; ++i) {
      var c = [Math.random() * width, Math.random() * height];
      var d = distance(findClosest(circles, c), c);
      debugger;
      if (d >= bestDistance) {
        bestDistance = d;
        bestCand = c;
      }
    }
    circles.push(bestCand);
    return bestCand;
  };

  function distance(x, y) {
    debugger
    var dx = x[0] - y[0],
        dy = x[1] - y[1];
    return dx * dx + dy * dy;
  }

  // Find the closest node to the specified point.
  function findClosest(samps, c) {
    let closestDist = 1000000000;
    let closest;

    samps.forEach((samp) => {
      const dist = distance(samp, c);
      if (dist < closestDist) {
        debugger;
        closest =  samp;
        closestDist = dist;
      }
    });
    debugger
    return closest;
  }
}
