import * as d3 from 'd3';

const random = simpleRandomSampler(800, 500, 1000);

const svgElement = d3.select("svg");

export const simpleRandomSample = d3.timer(function() {
  for (let i = 0; i < 7; ++i) {
    const circle = random();
    if (!circle) return true;
    svgElement.append("circle")
        .attr("cx", circle[0])
        .attr("cy", circle[1])
        .attr("r", 5)
        .attr("fill", 'lightseagreen');
  }
});

function simpleRandomSampler(width, height, numSamplesMax) {
  var numSamples = 0;
  return function() {
    if (++numSamples > numSamplesMax) return;
    return [Math.random() * width, Math.random() * height];
  };
}
