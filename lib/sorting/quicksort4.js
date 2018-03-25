import * as d3 from 'd3';

const w = 800;
const h = 500;
const n = 30;
const speed = 50;
let dataset = [];
let scale;
let timer;
let quickSvg;

let data = d3.range(n);



setDataset(n);
setLines(dataset);

function setDataset(len) {
    len = len || 20;

    var i = 0;

    dataset = [];

    for (; i < len; i++) {
        dataset[i] = { num: (Math.random() * len * 2) | 0};
    }

    scale = d3.scaleLinear()
                .domain([0, d3.max(dataset, function(d) { return d.num; })])
                .range([9, h]);
}

function color(num) {
  if (num < 10) {
    return "red";
  } else if (num < 20) {
    return "orange";
  } else if (num < 30) {
    return "yellow";
  } else if (num < 40) {
    return "green";
  } else if (num < 50) {
    return "blue";
  } else if (num < 60) {
    return "purple";
  } else if (num < 70) {
    return "black";
  } else {
    return "lightseagreen";
  }
}


function setLines(lineData) {
  quickSvg = d3.select("body")
  .append("svg")
  .attr("width", w)
  .attr("height", h);


  const lines = quickSvg.selectAll("rect")
                        .data(lineData)
                        .enter()
                        .append("rect")

  lines.attr("x", function(d,i){
    return i * (w / data.length);
  });
  lines.attr("y", function(d,i){
    return h - scale(d.num);
  });
  lines.attr("width", function(d,i){
    return (w/data.length);
  });
  lines.attr("height", function(d,i){
    return scale(d.num);
  });
  lines.attr("fill", function(d,i){
    ;
    return color(d.num);
  });
}

function redrawLines(lineData) {
    const lines = quickSvg.selectAll("rect")
                    .data(lineData)
                    .transition()
                    .duration(speed / 2 | 0);

    lines.attr("y", function(d, i) {
        return h - scale(d.num);
    });

    lines.attr("width", function(d, i) {
        return (w / lineData.length);
    });

    lines.attr("height", function(d, i) {
        return scale(d.num);
    });
    lines.attr("fill", function(d,i){
      return color(d.num);
    });
}

const quick = function() {
  let i = 0;
  const length = dataset.length;
  let j = length - 1;
  let inI = false;
  let wait = false;

  timer = setInterval(function() {

        if {

        } else {

            clearInterval(timer);
        }

        redrawLines(dataset);

    }, speed);
};

//algos[algo]();

// common swap function
function swap(i, j) {
    var temp = dataset[i];
    dataset[i] = dataset[j];
    dataset[j] = temp;
}

// bubble();
