// Set up the SVG
const svg = d3.select("#graph")
    .append("svg")
    .attr("width", "100%")
    .attr("height", "100%");

// Tooltip for hover information
const tooltip = d3.select("#graph")
    .append("div")
    .attr("class", "tooltip");

// Input form
const inputForm = d3.select("#input-form");

// Set up the scales
const xScale = d3.scaleLinear().domain([0, 100]).range([50, 450]);
const yScale = d3.scaleLinear().domain([0, 100]).range([450, 50]);

// Create the X axis
svg.append("g")
    .attr("transform", "translate(0, 450)")
    .call(d3.axisBottom(xScale));

// X axis label
svg.append("text")
    .attr("class", "axis-label") // Add the new class
    .attr("transform", "translate(250, 490)")
    .style("text-anchor", "middle")
    .text("Level of Expertise");

// Create the Y axis
svg.append("g")
    .attr("transform", "translate(50, 0)")
    .call(d3.axisLeft(yScale));

// Y axis label
svg.append("text")
    .attr("class", "axis-label") // Add the new class
    .attr("transform", "rotate(-90)")
    .attr("y", 0) // Increase this value to move the label away from the axis
    .attr("x", -250)
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("Level of Interest");

// Drag functionality
const drag = d3.drag()
    .on("drag", function(d) {
        const x = d3.event.x;
        const y = d3.event.y;
        const transformedX = xScale.invert(x);
        const transformedY = yScale.invert(y);

        d3.select(this)
            .attr("transform", `translate(${x}, ${y})`)
            .attr("data-expertise", transformedX)
            .attr("data-interest", transformedY);
    });

// Add click listener to the SVG
svg.on("click", function() {
    const coords = d3.mouse(this);
    inputForm.style("left", (coords[0] + 60) + "px")
        .style("top", (coords[1] + 60) + "px")
        .style("opacity", 1)
        .classed("hidden", false)
        .attr("data-x", xScale.invert(coords[0]))
        .attr("data-y", yScale.invert(coords[1]));

    // Activate the "Interest" input box
    document.getElementById("name").focus();
});

// Add click listener to "Add Interest" button
d3.select("#add-interest").on("click", function() {
    const x = +inputForm.attr("data-x");
    const y = +inputForm.attr("data-y");
    const name = d3.select("#name").property("value");
    const commercialViability = +d3.select("#commercial-viability").property("value");

    // Convert commercial viability to color (red to green)
    const color = d3.scaleLinear().domain([0, 100]).range(["red", "green"])(commercialViability);

    // Create a group for the dot and label
    const group = svg.append("g")
        .attr("transform", `translate(${xScale(x)}, ${yScale(y)})`)
        .attr("data-interest", y)
        .attr("data-expertise", x)
        .call(drag);

    // Add the dot to the group
    group.append("circle")
        .attr("class", "dot")
        .attr("cx", 0)
        .attr("cy", 0)
        .attr("r", 5)
        .attr("fill", color);

    // Add the label to the group
        group.append("text")
        .attr("class", "dot-label") // Add the new class
        .attr("x", 10)
        .attr("y", 4) // Align the text horizontally with the dot
        .text(name);

// Tooltip hover actions
group.on("mouseover", function() {
    const expertise = d3.select(this).attr("data-expertise");
    const interest = d3.select(this).attr("data-interest");

    tooltip.style("opacity", 1)
        .html(`Interest: ${name}<br>Level of Interest: ${Math.round(interest)}<br>Level of Expertise: ${Math.round(expertise)}<br>Commercial Viability: ${commercialViability}`)
        .style("left", (d3.event.pageX + 15) + "px")
        .style("top", (d3.event.pageY - 10) + "px");
})
.on("mouseout", function() {
    tooltip.style("opacity", 0);
});


    // Reset the input form
    inputForm.style("opacity", 0)
        .classed("hidden", true);
    d3.select("#name").property("value", "");
    d3.select("#commercial-viability").property("value", "");
});
