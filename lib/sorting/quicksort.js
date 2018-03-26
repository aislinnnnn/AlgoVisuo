import * as d3 from 'd3';

var n = 300;

var z = d3.scaleSequential(d3.interpolateRainbow).domain([0, n]);

var data = d3.range(n);

var svg = d3.select('.quick')
  .append('svg')
  .attr('width', 800)
  .attr('height', n);

var g = svg.append('g');

function* sort () {
  function* partition (left, right, pivot) {
    var v = data[pivot];
    yield * swap(pivot, --right);
    for (var i = left; i < right; ++i) if (data[i] <= v) yield * swap(i, left++);
    yield * swap(left, right);
    return left;
  }

  function* swap (i, j) {
    if (i === j) return;
    yield [i, j];
    var t = data[i];
    data[i] = data[j];
    data[j] = t;
  }

  function* recurse (left, right) {
    if (left < right) {
      var pivot = Math.floor((left + right) / 2);
      pivot = yield * partition(left, right, pivot);
      yield * recurse(left, pivot);
      yield * recurse(pivot + 1, right);
    }
  }

  yield * recurse(0, data.length);
  yield "done";
}

var gen = { next () {
  return { done: true };
  }
};


export const startQuick = function() {
  var rect = g.selectAll('rect')
    .data(data, Number)
  .enter()
    .append('rect')
    .attr('width', function (d, i) { return i + 500; })
    .attr('height', 10)
    .attr('x', 1)
    .attr('y', function (d, i) { return i; })
    .attr('fill', z);

  d3.shuffle(data);

  d3.timer(function () {
    while ((gen.next()).done) {
      gen = sort();
    }
    rect.data(data, Number)
    .attr('y', function (d, i) { return i; });
  });
};
