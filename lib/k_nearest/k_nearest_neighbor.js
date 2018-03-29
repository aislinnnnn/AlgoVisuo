import * as d3 from 'd3';

const h = 500;
const w = 800;
let max;
let allData = [];
const colors = ['green', 'yellow', 'red'];
let gender;


// x refers to age, y refers to BMI \
// id refers to risk: 0 being normal, 1 being 20% increase, 2 being 50% increase

const trainingData = [{x: 30, y: 23.8, id: 1},
                    {x: 48, y: 24.2, id: 1},
                    {x: 62, y: 24.7, id: 1},
                    {x: 70, y: 28.3, id: 1},
                    {x: 83, y: 24.2, id: 1},
                    {x: 31, y: 21, id: 0},
                    {x: 53, y: 21, id: 0},
                    {x: 57, y: 21, id: 0},
                    {x: 66, y: 21, id: 0},
                    {x: 78, y: 21, id: 0 },
                    {x: 40, y: 27.2, id: 2},
                    {x: 51, y: 28.1, id: 2},
                    {x: 64, y: 29.1, id: 2},
                    {x: 66, y: 37.0, id: 2},
                    {x: 76, y: 42.1, id: 2}
                  ];

const svgElement = d3.select('.k-nearest-svg')
                    .attr('width', w)
                    .attr('height', h)

const findMax = (data) => {
  debugger
  let results = {x:0, y:0};
  data.map((dataPoint) => {
    let x = dataPoint.x;
    let y = dataPoint.y;
debugger
    if (x > results.x) {
      results.x = x;
    }
    if (y > results.y) {
      results.y = y;
    }
  });
  debugger
  return results;
};


const placeDataPoint = (dataPoint, newPoint) => {
  debugger
  if (newPoint) {
    svgElement.append('circle')
    .attr('cx', dataPoint.x)
    .attr('cy', dataPoint.y)
    .attr('r', 8)
    .attr('fill', 'black');

  } else {
    svgElement.append('circle')
    .attr('cx', dataPoint.x)
    .attr('cy', dataPoint.y)
    .attr('r', 5)
    .attr('fill', colors[dataPoint.id]);
  }

debugger
  if (newPoint) {
        drawCircle(dataPoint);
  }
};

const drawCircle = (dataPoint) => {
  debugger;
  const neighborsDistance = dataPoint.neighbors.reduce((distances,neighbor) => distances.concat(neighbor[0]), []);
  const farthestNeighbor = Math.max(...neighborsDistance);

  svgElement.append('circle')
              .attr('cx', dataPoint.x)
              .attr('cy', dataPoint.y)
              .attr('r', farthestNeighbor)
              .style("stroke", colors[dataPoint.id])
              .style("fill", "none")
              .style("stroke-width", 3);
};

const populateSvg = (data, adjust=true, newPoint=false) => {
  debugger;
  if (max === undefined){
    debugger
    max = findMax(data);
  } else {
    max = max;
  }

  data.map((dataPoint) => {
    allData.push(dataPoint);
    if (adjust){
      smooth(dataPoint, max);
    }
    placeDataPoint(dataPoint, newPoint);
  });
};

const smooth = (dataPoint, max) => {
  debugger;
  dataPoint.x = ((dataPoint.x/max.x) * w) - 150;
  dataPoint.y = ((dataPoint.y/max.y) * h) - 150;
  return dataPoint;
};

const findNeighbors = function(data, k){
  debugger;
  return data.map((dataPoint) => {
    allData.map((neighbor)=> {
      const xDiff = Math.abs(dataPoint.x - neighbor.x);
      const yDiff = Math.abs(dataPoint.y - neighbor.y);
      const distance = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff,2));

      const farthest = dataPoint.neighbors.find(dataNeighbor => dataNeighbor[0] > distance)

      if (dataPoint.neighbors.length < k){
        dataPoint.neighbors.push([distance, neighbor.id]);
      } else {
        if (farthest) {
          dataPoint.neighbors.splice(dataPoint.neighbors.indexOf(farthest), 1, [distance, neighbor.id])
        }
        dataPoint.neighbors.sort((a,b) => {
          return b[0] - a[0];
        });
        return dataPoint;
      }
    });
  });
};

export const formatData = (data) => {
  debugger;
  data.map((dataPoint) => smooth(dataPoint, max));
  findNeighbors(data, 3);
  const formatted = data.map((dataPoint) => {

    const neighborId = dataPoint.neighbors.reduce((acc, neighbor) => {

      if (acc[neighbor[1]] === undefined){

        acc[neighbor[1]] = 1;
      }  else {

        acc[neighbor[1]] = acc[neighbor[1]] + 1;
      }

      return acc;
    }, []);

    const maximum = Math.max(...neighborId.filter(neighbor => neighbor));

    dataPoint.id = neighborId.indexOf(maximum);

    return dataPoint;
  });
  populateSvg(formatted, false, true);
};




populateSvg(trainingData);



// formatData([{x: 55, y: 29, neighbors: [], id:0}]);

export const resetGraph = function(){
  debugger;
  svgElement
    .selectAll('circle').remove();

  allData= [];
  debugger;
  populateSvg(trainingData, false, false);
};
