import * as d3 from 'd3';


const width = 800;
const height = 500;

const svgElement = d3.select("svg");


const random = poissonDisc(width, height, 20);


export const startPoisson = function() {
  d3.timer(function() {
    
    for (let i = 0; i < 1; ++i) {
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

function poissonDisc(w, h, r) {
  const limitSamples = 30;
  const radiusSquared = r * r;
  const R = 3 * radiusSquared;
  const cellSize = r/(Math.sqrt(2));
  const cellW = Math.ceil(w/cellSize);
  const cellH = Math.ceil(h/cellSize);
  const mappedSamples = new Array(cellW * cellH);

  let queue = [];
  let numInQueue = 0;
  let numSamples = 0;


  return function() {
    if (numSamples === 0 ) {
      
      return addRandomSample();
    }

    while (numInQueue > 0 ){
      const idx = Math.floor(Math.random() * numInQueue);
      const curSample = queue[idx];
      

    for (let i = 0; i < limitSamples; i++) {
      const c = 2 * Math.PI * Math.random();
      const rad = Math.sqrt(Math.random() * R + radiusSquared);
      const x = curSample[0] + rad * Math.cos(c);
      const y = curSample[1] + rad * Math.sin(c);
      


      if (0 <= x && x < width && 0 <= y && y < height && notReject(x, y)) {
        return addSample(x, y);
      }
    }
    
    numInQueue -= 1;
    queue[idx] = queue[numInQueue];
    queue.length = numInQueue;
    }
  };

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


  function addRandomSample() {
    const x = w * Math.random();
    const y = h * Math.random();

    queue.push([x,y]);
    mappedSamples[cellW * (y / cellSize | 0) + (x / cellSize | 0)] = [x,y];
    numSamples += 1;
    numInQueue += 1;
    return [x,y];
  }

  function addSample (x,y) {
    queue.push([x,y]);

    mappedSamples[cellW * (y / cellSize | 0) + (x / cellSize | 0)] = [x,y];
    numSamples += 1;
    numInQueue += 1;
    return [x,y];
  }
}
