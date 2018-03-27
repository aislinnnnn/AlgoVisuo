import * as d3 from 'd3';

import { startSimpleRandom } from './sampling/simple_random_sample.js';
import{ startBestCandidate } from './sampling/best_candidate.js';
import{ startPoisson } from './sampling/poisson_disc.js';
import{ startBubble } from './sorting/bubblesort.js';
import { startQuick } from './sorting/quicksort.js';
import { startBestVis } from './sampling/best_cand_vis.js';
import { startPoissonVis } from './sampling/my_poisson_vis.js';

const resetSvg = function(){
  debugger;
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

// const modal = document.getElementById("algo-modal");
//
// document.getElementById("open-modal").addEventListener("click", function(){
//   modal.style.display = "block";
// });
//
// document.addEventListener("DOMContentLoaded", function(){
//   modal.style.display = "block";
// });
//
// document.getElementById("close").addEventListener("click", function(){
//   modal.style.display = "none";
// });
//
// window.onclick = function(event) {
//     if (event.target == modal) {
//         modal.style.display = "none";
//     }
// };
