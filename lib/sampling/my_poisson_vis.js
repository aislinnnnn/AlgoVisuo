import * as d3 from 'd3';
import { stopBestTimout } from './best_cand_vis.js';
import { resetSvg } from '../event_handlers.js';



const w = 600;
const h = 400;

const svgElement = d3.select(".poisson-vis-svg");

const svgElement2 = d3.select(".poisson-vis-svg-2");
let timer;
let count;

const r = 50;
const limitSamples = 20;
const radiusSquared = r * r;
const R = 3 * radiusSquared;
const cellSize = r/(Math.sqrt(2));
const cellW = Math.ceil(w/cellSize);
const cellH = Math.ceil(h/cellSize);
const mappedSamples = new Array(cellW * cellH);

let queue = [];
let numInQueue = 0;
let numSamples = 0;

const innerAnnulus = d3.arc()
    .innerRadius(r)
    .outerRadius(r)
    .startAngle(0)
    .endAngle(2 * Math.PI)();

const outerAnnulus = d3.arc()
    .innerRadius(r)
    .outerRadius(2 * r)
    .startAngle(0)
    .endAngle(2 * Math.PI)();

const deadZone = svgElement.append("g");
const searchZone = svgElement.append("path");
const sampleVis = svgElement.append("g");
const candidateVis = svgElement.append("g");

const sample2 = svgElement2.append("g");

function addRandomSample() {
  const x = w * Math.random();
  const y = h * Math.random();

  sample2.append("circle")
    .datum([x,y])
    .attr("r", 1)
    .attr("cx", x)
    .attr("cy", y)
    .transition()
    .attr("r", 3)
    .attr("fill", "lightseagreen");

  sampleVis.append("circle")
    .datum([x,y])
    .attr("r", 1)
    .attr("cx", x)
    .attr("cy", y)
    .transition()
    .attr("r", 3)
    .attr("fill", "lightseagreen");

  deadZone.append("circle")
    .attr("r", 1)
    .attr("cx", x)
    .attr("cy", y)
    .transition()
    .attr("r", r)
    .attr("fill", "lightgrey");

  queue.push([x,y]);
  mappedSamples[cellW * (y / cellSize | 0) + (x / cellSize | 0)] = [x,y];
  numSamples += 1;
  numInQueue += 1;
  return [x,y];
}

function addSample (x,y) {
  queue.push([x,y]);

  sample2.append("circle")
    .datum([x,y])
    .attr("r", 1)
    .attr("cx", x)
    .attr("cy", y)
    .transition()
    .attr("r", 3)
    .attr("fill", "lightseagreen");

  sampleVis.append("circle")
    .datum([x,y])
    .attr("r", 1)
    .attr("cx", x)
    .attr("cy", y)
    .transition()
    .attr("r", 3)
    .attr("fill", "lightseagreen");

  deadZone.append("circle")
    .attr("r", 1)
    .attr("cx", x)
    .attr("cy", y)
    .transition()
    .attr("r", r)
    .attr("fill", "lightgrey");

  mappedSamples[cellW * (y / cellSize | 0) + (x / cellSize | 0)] = [x,y];
  numSamples += 1;
  numInQueue += 1;
  return [x,y];
}

function notReject(x,y) {
  let horiz = x / cellSize | 0;
  let vert = y / cellSize | 0;
  let horizMin = [horiz - 2, 0].sort()[1];
  let vertMin = [vert - 2, 0].sort()[1];
  let horizMax = [horiz + 3, cellW].sort()[0];
  let vertMax = [vert + 3, cellH].sort()[0];

  for (vert = vertMin; vert < vertMax; vert++) {
    const mapIdx = vert * cellW;
    for(horiz = horizMin; horiz < horizMax; horiz++) {

      if (s = mappedSamples[mapIdx + horiz]) {
        var s;
        const sampX = s[0] - x;
        const sampY = s[1] - y;
        if (sampX * sampX + sampY * sampY < radiusSquared) {
          return false;
        }
      }
    }
  }
  return true;
}



export const startPoissonVis = function() {
  resetSvg();
  stopBestTimout();

  svgElement
    .selectAll('circle').remove();
  svgElement2
    .selectAll('circle').remove();

  count = 0;
  queue = [];
  numInQueue = 0;
  numSamples = 0;

  addRandomSample();



  timer = setTimeout(function selectSample() {

    const idx = Math.floor(Math.random() * numInQueue);
    const curSample = queue[idx];
    count = 0;

    let chosenSampleVis = sampleVis.selectAll("circle")
      .filter(function(d) {
        return (d[0] === curSample[0] && d[1] === curSample[1]);
      });

    searchZone
      .attr("transform", "translate(" + curSample + ")")
      .attr("d", innerAnnulus)
      .transition()
      .attr("d", outerAnnulus)
      .attr("fill", "grey")
      .on("end", addCandidate);

    function addCandidate() {
      count += 1;
      if (count > limitSamples) {
        return deactivateSample();
      }

      const angle = 2 * Math.PI * Math.random();
      const rad = Math.sqrt(Math.random() * R + radiusSquared);
      const x = curSample[0] + rad * Math.cos(angle);
      const y = curSample[1] + rad * Math.sin(angle);

      if (0 > x || x >= w || 0 > y || y >= h) {
        return addCandidate();
      }

      candidateVis.append("circle")
        .attr("cx", x)
        .attr("cy", y)
        .attr("r", 3)
        .transition()
        .attr("fill", "magenta")
        .on("end", function(){
          if (notReject(x,y)){
            approveCandidate();
          } else {
            addCandidate();
          }
        });

      function approveCandidate() {
        removeCandidates()
          .on("end", function(){
            if (numInQueue){

              selectSample();
            }
          });
        addSample(x,y);
      }
    }

    function removeCandidates(){
      return candidateVis.transition()
        .selectAll("circle").remove();
    }

    function deactivateSample(){
      numInQueue -= 1;
      queue[idx] = queue[numInQueue];
      queue.length = numInQueue;

      chosenSampleVis
      .transition()
        .style("fill", "black");

      removeCandidates()
        .on("end", function(){
          if (numInQueue){
            selectSample();
          }
        });
    }
  }, 1000);
};

export const stopPoissonTimeout = function() {
  count = 1000;
  numInQueue = 0;

  svgElement
    .selectAll('circle').remove();
  svgElement2
    .selectAll('circle').remove();

    searchZone
      .attr("d", innerAnnulus)
      .transition()
      .attr("d", innerAnnulus)
      .attr("fill", "grey");
};
