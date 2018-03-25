import { startSimpleRandom } from './simple_random_sample.js';
import{ startBestCandidate } from './best_candidate.js';
import{ startPoisson } from './poisson_disc.js';
import{ startBubble } from './bubblesort.js';

document.getElementById("simple-button").addEventListener("click", startSimpleRandom);

document.getElementById("best-button").addEventListener("click", startBestCandidate);

document.getElementById("poisson-button").addEventListener("click", startPoisson);

document.getElementById("bubble-button").addEventListener("click", startBubble);
