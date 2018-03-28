import * as d3 from 'd3';
import { resetSvg } from '../event_handlers.js';
import { stopBestTimout } from './best_cand_vis.js';



const width = 800;
const height = 500;
let u;

const random = bestCandidate(width, height, 30, 1000);

const svgElement = d3.select("svg")
                    .append('g');


export const startBestCandidate = function() {
  resetSvg();
  stopBestTimout();
  
  if (u){
    return;
  }

  u = d3.timer(function() {

    for (let i = 0; i < 7; ++i) {

      const circle = random();

      if (!circle) return u.stop();

      svgElement.append("circle")
      .attr("cx", circle[0])
      .attr("cy", circle[1])
      .attr("r", 5)
      .attr("fill", 'lightseagreen');
    }
  });
};


var numSamples;
var circles;

function bestCandidate(width, height, numCands, maxNumSamples) {
  numSamples = 0;
  circles = [];

  return function() {


    if (circles.length === 0 ) {

      const firstCircle = [Math.random() * width, Math.random() * height];
      circles.push(firstCircle);
      return firstCircle;
    }

    if (++numSamples > maxNumSamples){

      circles = [];
      numSamples = 0;
      return;
    }

    var bestCand, bestD = 0;
    for (var i = 0; i < numCands; ++i) {

      const x = Math.random() * width;
      const y = Math.random() * height;

      var c = [x, y];

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

      const dist = distance(samp, c);
      if (dist < closestDist) {

        closest =  samp;
        closestDist = dist;
      }
    });
        return closest;
  }
}

export const stopBestTimer = function() {
  numSamples = 0;
  circles = [];
  if (u){
    u.stop();
  }
  u = undefined;
};
