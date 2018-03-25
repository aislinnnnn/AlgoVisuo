import * as d3 from 'd3';

import { startSimpleRandom } from './sampling/simple_random_sample.js';
import{ startBestCandidate } from './sampling/best_candidate.js';
import{ startPoisson } from './sampling/poisson_disc.js';
import{ startBubble } from './sorting/bubblesort.js';
import { startQuick } from './sorting/quicksort.js';

const resetSvg = function(){
  d3.select('svg')
  .selectAll("*").remove();
};

document.getElementById("simple-button").addEventListener("click", startSimpleRandom);

document.getElementById("best-button").addEventListener("click", startBestCandidate);

document.getElementById("poisson-button").addEventListener("click", startPoisson);

document.getElementById("bubble-button").addEventListener("click", startBubble);

document.getElementById("quick-button").addEventListener("click", startQuick);

document.getElementById("reset").addEventListener("click", resetSvg);
