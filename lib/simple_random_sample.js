import * as d3 from 'd3';


const width = 800;
const height = 500;

const random = simpleRandom(width, height, 1000);

const svgElement = d3.select("svg")
                      


export const simpleSampleHeader = d3.select(".canvas")
              .insert("h1", ":first-child")
              .html("Simple Random Sample Algorithm");

export const startSimpleRandom = function() {
  d3.timer(function() {
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
};

function simpleRandom(w, h, maxDots) {
  let numDots = 0;
  return function() {
    if (numDots > maxDots) {
      return;
    } else {
      numDots += 1;
      return [w * Math.random(), h * Math.random()];
    }
  };
}
