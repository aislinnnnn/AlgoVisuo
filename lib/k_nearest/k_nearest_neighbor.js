import * as d3 from 'd3';

const h = 500;
const w = 800;
let max;
let allData = [];
const colors = ['green', 'yellow', 'red'];
let gender = 'female';


// x refers to age, y refers to BMI \
// id refers to risk: 0 being normal, 1 being 20% increase, 2 being 50% increase

const maleTrainingData = [
                    {x: 30, y: 23.8, id: 1},
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

const femaleTrainingData = [
                          {x: 30, y: 21.0, id: 0},
                          {x: 31, y: 20.3, id: 0},
                          {x: 33, y: 21.2, id: 0},
                          {x: 32.5, y: 20.0, id: 0},
                          {x: 38, y: 20.8, id: 0},
                          {x: 39, y: 20.2, id: 0},
                          {x: 41, y: 21.0, id: 0},
                          {x: 44, y: 21.0, id: 0},
                          {x: 46, y: 20.5, id: 0},
                          {x: 48, y: 20.9, id: 0},
                          {x: 51, y: 21.0, id: 0},
                          {x: 53, y: 20.9, id: 0},
                          {x: 55, y: 20.0, id: 0},
                          {x: 56, y: 20.1, id: 0},
                          {x: 57.5, y: 20.2, id: 0},
                          {x: 60, y: 20.3, id: 0},
                          {x: 61, y: 20.3, id: 0},
                          {x: 64, y: 21.0, id: 0},
                          {x: 66, y: 20.9, id: 0},
                          {x: 67, y: 20.8, id: 0},
                          {x: 69, y: 20.7, id: 0},
                          {x: 71, y: 21.1, id: 0},
                          {x: 73, y: 20.9, id: 0},
                          {x: 74, y: 20.7, id: 0},
                          {x: 30, y: 26.0, id: 1},
                          {x: 35, y: 26.0, id: 1},
                          {x: 44, y: 26.0, id: 1},
                          {x: 44, y: 26.4, id: 1},
                          {x: 33, y: 26.2, id: 1},
                          {x: 46, y: 24.8, id: 1},
                          {x: 49, y: 25.5, id: 1},
                          {x: 51, y: 25.2, id: 1},
                          {x: 54, y: 24.9, id: 1},
                          {x: 57, y: 25.9, id: 1},
                          {x: 59, y: 26.0, id: 1},
                          {x: 62, y: 27.0, id: 1},
                          {x: 62, y: 29.0, id: 1},
                          {x: 63, y: 28.3, id: 1},
                          {x: 64, y: 29.9, id: 1},
                          {x: 58, y: 30.0, id: 1},
                          {x: 65, y: 30.0, id: 1},
                          {x: 67, y: 32.3, id: 1},
                          {x: 67, y: 37.3, id: 1},
                          {x: 69, y: 35.3, id: 1},
                          {x: 71, y: 37.3, id: 1},
                          {x: 74, y: 31.3, id: 1},
                          {x: 73, y: 30.3, id: 1},
                          {x: 73, y: 36.3, id: 1},
                          {x: 30, y: 26.5, id: 2},
                          {x: 31, y: 26.6, id: 2},
                          {x: 30, y: 28.0, id: 2},
                          {x: 32, y: 35.0, id: 2},
                          {x: 34, y: 47.0, id: 2},
                          {x: 33, y: 29.5, id: 2},
                          {x: 35, y: 29.5, id: 2},
                          {x: 36, y: 42.5, id: 2},
                          {x: 36, y: 27.5, id: 2},
                          {x: 38, y: 26.5, id: 2},
                          {x: 40, y: 26.5, id: 2},
                          {x: 40, y: 29.5, id: 2},
                          {x: 40, y: 38.5, id: 2},
                          {x: 42, y: 38.5, id: 2},
                          {x: 42, y: 36.5, id: 2},
                          {x: 42, y: 27.5, id: 2},
                          {x: 42, y: 26.7, id: 2},
                          {x: 44, y: 26.7, id: 2},
                          {x: 44, y: 28.7, id: 2},
                          {x: 44, y: 40.7, id: 2},
                          {x: 44, y: 36.7, id: 2},
                          {x: 44, y: 30.6, id: 2},
                          {x: 46, y: 25.8, id: 2},
                          {x: 50, y: 25.8, id: 2},
                          {x: 54, y: 25.8, id: 2},
                          {x: 54, y: 27.8, id: 2},
                          {x: 54, y: 34, id: 2},
                          {x: 47, y: 34, id: 2},
                          {x: 47, y: 26.0, id: 2},
                          {x: 47, y: 29.2, id: 2},
                          {x: 49, y: 29.2, id: 2},
                          {x: 49, y: 30.2, id: 2},
                          {x: 49, y: 35.2, id: 2},
                          {x: 50, y: 40.2, id: 2},
                          {x: 50, y: 30.2, id: 2},
                          {x: 50, y: 27.2, id: 2},
                          {x: 50, y: 29.2, id: 2},
                          {x: 50, y: 37.2, id: 2},
                          {x: 53, y: 37.2, id: 2},
                          {x: 53, y: 27.2, id: 2},
                          {x: 53, y: 33.2, id: 2},
                          {x: 55, y: 33.2, id: 2},
                          {x: 55, y: 30.3, id: 2},
                          {x: 55, y: 31.3, id: 2},
                          {x: 55, y: 34.3, id: 2},
                          {x: 55, y: 36.3, id: 2},
                          {x: 56, y: 42.8, id: 2},
                          {x: 56, y: 47.8, id: 2},
                          {x: 57, y: 32.3, id: 2},
                          {x: 59, y: 32.3, id: 2},
                          {x: 59, y: 31.3, id: 2},
                          {x: 59, y: 30.5, id: 2},
                          {x: 59, y: 42.0, id: 2},
                          {x: 59, y: 39.0, id: 2},
                          {x: 61, y: 39.0, id: 2},
                          {x: 61, y: 42.0, id: 2},
                          {x: 63, y: 30.5, id: 2},
                          {x: 63, y: 34.5, id: 2},
                          {x: 63, y: 36.5, id: 2},
                          {x: 63, y: 39.4, id: 2},
                          {x: 64, y: 39.4, id: 2},
                          {x: 64, y: 30.4, id: 2},
                          {x: 64, y: 46.4, id: 2},
                          {x: 65, y: 46.4, id: 2},
                          {x: 65, y: 40.4, id: 2},
                          {x: 65, y: 39.4, id: 2},
                          {x: 65, y: 38.9, id: 2},
                          {x: 67, y: 38.9, id: 2},
                        ];

const svgElement = d3.select('.k-nearest-svg')
                    .attr('width', w)
                    .attr('height', h);

const findMax = (data) => {

  let results = {x:0, y:0};
  data.map((dataPoint) => {
    let x = dataPoint.x;
    let y = dataPoint.y;

    if (x > results.x) {
      results.x = x;
    }
    if (y > results.y) {
      results.y = y;
    }
  });

  return results;
};


const placeDataPoint = (dataPoint, newPoint) => {

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


  if (newPoint) {
        drawCircle(dataPoint);
  }
};

const drawCircle = (dataPoint) => {

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

  if (max === undefined){

    max = findMax(data);
  } else {
    max = max;
  }

  data.map((dataPoint) => {
    allData.push(dataPoint);
    if (adjust){
      fitToGraph(dataPoint, max);
    }
    placeDataPoint(dataPoint, newPoint);
  });
};

const fitToGraph = (dataPoint, max) => {

  dataPoint.x = ((dataPoint.x/max.x) * w) - 150;
  dataPoint.y = ((dataPoint.y/max.y) * h) - 150;
  return dataPoint;
};

const findNeighbors = function(data, k){

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
  resetGraph();

  data.map((dataPoint) => fitToGraph(dataPoint, max));
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


const setUpGraph = function () {
  if (gender === 'male'){
    populateSvg(maleTrainingData);
  } else {
    populateSvg(femaleTrainingData);
  }
};

setUpGraph();


export const resetGraph = function(){

  svgElement
    .selectAll('circle').remove();

  allData= [];

  populateSvg(maleTrainingData, false, false);
};


// ADD LIMITS TO CHOOSE
