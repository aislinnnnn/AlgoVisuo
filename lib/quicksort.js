import * as d3 from 'd3';

var n = 800;

var z = d3.scaleSequential(d3.interpolateRainbow).domain([0, n]);

var data = d3.range(n);

var svg = d3.select('.quick')
  .append('svg')
  .attr('width', n)
  .attr('height', n);

var g = svg.append('g');

var rect = g.selectAll('rect')
  .data(data, Number)
.enter()
  .append('rect')
  .attr('width', function (d, i) { return i + 1 })
  .attr('height', 1)
  .attr('x', 1)
  .attr('y', function (d, i) { return i })
  .attr('fill', z)

function* sort () {
  function* partition (left, right, pivot) {
    var v = data[pivot]
    yield * swap(pivot, --right)
    for (var i = left; i < right; ++i) if (data[i] <= v) yield * swap(i, left++)
    yield * swap(left, right)
    return left
  }

  function* swap (i, j) {
    if (i === j) return
    yield [i, j]
    var t = data[i]
    data[i] = data[j]
    data[j] = t
  }

  function* recurse (left, right) {
    if (left < right) {
      var pivot = Math.floor((left + right) / 2)
      pivot = yield * partition(left, right, pivot)
      yield * recurse(left, pivot)
      yield * recurse(pivot + 1, right)
    }
  }

  yield * recurse(0, data.length)
  yield []
}

var gen = { next () {
  return { done: true };
  }
};


export const startQuick = function() {
  debugger;
  d3.shuffle(data);

  d3.timer(function () {
    var v;
    while ((v = gen.next()).done) {
      gen = sort();
    }
    rect.data(data, Number)
    .attr('y', function (d, i) { return i; });
  });
};

// startQuick();
