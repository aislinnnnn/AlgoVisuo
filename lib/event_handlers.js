import * as d3 from 'd3';

import { startSimpleRandom, stopSimpleTimer } from './sampling/simple_random_sample.js';
import{ startBestCandidate, stopBestTimer } from './sampling/best_candidate.js';
import{ startPoisson, stopPoissonTimer } from './sampling/poisson_disc.js';
import{ startBubble } from './sorting/bubblesort.js';
import { startQuick } from './sorting/quicksort.js';
import { startBestVis, stopBestTimout } from './sampling/best_cand_vis.js';
import { startPoissonVis, stopPoissonTimeout } from './sampling/my_poisson_vis.js';
import { addDataPoint } from './k_nearest/k_nearest_neighbor.js';
import { formatData, resetGraph } from './k_nearest/k_nearest_neighbor.js';

export const resetSvg = function(){
  stopSimpleTimer();
  stopBestTimer();
  stopPoissonTimer();
  stopPoissonTimeout();

  d3.select('svg')
    .selectAll("circle").remove();
};

document.getElementById("simple-button").addEventListener("click", startSimpleRandom);
document.getElementById("best-button").addEventListener("click", startBestCandidate);
document.getElementById("poisson-button").addEventListener("click", startPoisson);

// document.getElementById("bubble-button").addEventListener("click", startBubble);
// document.getElementById("quick-button").addEventListener("click", startQuick);

document.getElementById("reset").addEventListener("click", resetSvg);
document.getElementById("best-vis-button").addEventListener("click", startBestVis);
document.getElementById("poisson-vis-button").addEventListener("click", startPoissonVis);
document.getElementById("stop-poisson-vis").addEventListener("click", stopPoissonTimeout);
document.getElementById("stop-best-vis").addEventListener("click", stopBestTimout);

export const handleKSubmit = function(e) {
  e.preventDefault();
  const age = e.target[0].value;
  const BMI = e.target[1].value;
  const newDataPoint = [{
    x:age,
    y:BMI,
    neighbors:[],
    id:0
  }];
  formatData(newDataPoint);
};

document.getElementById("k").addEventListener("submit", handleKSubmit);
document.getElementById("reset-graph").addEventListener("click", resetGraph);
