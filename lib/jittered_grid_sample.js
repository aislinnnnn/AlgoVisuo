// import * as d3 from 'd3';
//
//
// const width = 800;
// const height = 500;
//
// const random = jitteredGrid(width, height, 100);
//
// const svgElement = d3.select("body")
//                       .append("div")
//                       .attr("class", "jitter")
//                       .append("svg")
//                         .attr("width", width)
//                         .attr("height", height);
//
//
// export const jitteredGridHeader = d3.select(".jitter")
//               .insert("h1", ":first-child")
//               .html("Jittered Grid Sampling Algorithm");
//
// export const jitteredGridSample = d3.timer(function() {
//   // for (let i = 0; i < 7; ++i) {
//     const circle = random();
//     if (!circle) return true;
//     svgElement.append("circle")
//         .attr("cx", circle[0])
//         .attr("cy", circle[1])
//         .attr("r", 5)
//         .attr("fill", 'lightseagreen');
//   // }
// });

// function jitteredGrid(w, h, subGrids) {
//   let row = 0;
//   let column = 0;
//     return function() {
//           for (row < subGrids; row++;) {
//             for (column < subGrids; column ++;)
//             debugger
//             let subWidth = (w / subGrids) * row;
//             let subWidthMin = (w / subGrids) * (row - 1);
//             let subHeight = (h / subGrids) * column;
//             let subHeightMin = (h / subGrids) * (column - 1);
//             debugger
//             if (subHeight > h || subWidth > w) return;
//             debugger
//             return [((w/subGrids) * Math.random()) + subWidthMin, ((w/subGrids) * Math.random()) + subHeightMin];
//           }
//         };
//     }
