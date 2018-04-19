import * as d3 from 'd3';
import { resetSvg } from '../event_handlers.js';
import { stopBestTimout } from './best_cand_vis.js';

const width = 800;
const height = 500;

let numDots;

const random = simpleRandom(width, height, 1000);

const svgElement = d3.select("svg")
.append('g');

let t;

export const startSimpleRandom = function() {
  if (t){
    return;
  }

  stopBestTimout();
  resetSvg();

  document.getElementById('simple-sample-info').style.color = '#484848';
  document.getElementById('best-sample-info').style.color = 'white';
  document.getElementById('poisson-sample-info').style.color = 'white';

  t = d3.timer(function() {
    for (let i = 0; i < 7; ++i) {
      const circle = random();
      if (!circle) return t.stop();
      svgElement.append("circle")
      .attr("cx", circle[0])
      .attr("cy", circle[1])
      .attr("r", 5)
      .attr("fill", 'lightseagreen');
    }
  });
};



function simpleRandom(w, h, maxDots) {
  numDots = 0;
  return function() {

    if (numDots > maxDots) {
      numDots = 0;
      return;
    } else {
      numDots += 1;
      return [w * Math.random(), h * Math.random()];
    }
  };
}

export const stopSimpleTimer = function() {
  numDots = 0;
  if (t){
    t.stop();
  }
  t = undefined;
};
