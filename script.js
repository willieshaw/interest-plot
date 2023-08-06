document.getElementById('interestForm').addEventListener('submit', function (e) {
    e.preventDefault();
    var interestName = document.getElementById('interestName').value;
    var levelOfInterest = document.getElementById('levelOfInterest').value;
    var levelOfExpertise = document.getElementById('levelOfExpertise').value;
    var commercialViability = document.getElementById('commercialViability').value;

    addInterest(interestName, levelOfInterest, levelOfExpertise, commercialViability);

    document.getElementById('interestForm').reset();
});

var xValues = [];
var yValues = [];
var zValues = [];
var textValues = [];

function addInterest(name, interest, expertise, viability) {
    xValues.push(interest);
    yValues.push(expertise);
    zValues.push(viability);
    textValues.push(name);

    var trace = {
        x: xValues,
        y: yValues,
        z: zValues,
        mode: 'markers',
        type: 'scatter3d',
        text: textValues,
        marker: {
            color: 'black',
            size: 5
        }
    };

    var data = [trace];
    var layout = {
        scene: {
            xaxis: { title: 'Level of Interest' },
            yaxis: { title: 'Level of Expertise' },
            zaxis: { title: 'Commercial Viability' }
        }
    };
    Plotly.newPlot('plotDiv', data, layout);
}
