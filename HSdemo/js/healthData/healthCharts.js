$(document).ready(function() {
  var chartActiveEnergy;
  var chartFlightsClimbed;
  var chartAvgHeartRate;
  var chartRestingEnergy;
  var chartSteps;
  var chartDistance;

  $('#generate-charts').click(function() {

    // Get the selected Patient ID
    let selectedID = $('#healthMeasurements-dropdown').val();

    // Null if default dropdown value used
    if (selectedID !== null) {

      // Get JSON data for current patient
      const url = '/HSdemo/exampleData/database/' + selectedID + '/healthData.json'

      $.getJSON(url, function(data) {

        // Show charts
        $("#chart-div").show();

        // Show the reset button (default hidden in HTML), hide generate button
        $("#reset-charts").show();
        $("#generate-charts").hide();

        console.log("DATA:");
        console.log(data);

        // Get the columns
        let columns = Object.keys(data);

        //Get unique questions
        let rows = []
        for (column of columns) {
          rows = Object.keys(data[column]).reduce((a, b) => {
            if (!a.includes(b)) a.push(b)
            return a
          }, rows)
        }

        //Extract row data
        rows = rows.map(row => {
          let rowData = {}
          for (column of columns) {
            rowData[column] = data[column][row]
          }
          return rowData
        })
        console.log("ROWS2");
        console.log(rows);

        let activeEnergyObject = rows[0]
        let flightsClimbedObject = rows[1]
        let avgHeartRateObject = rows[2]
        let restingEnergyObject = rows[3]
        let stepsObject = rows[4]
        let distanceObject = rows[5]

        console.log("active");
        console.log(activeEnergyObject);

        var optionsActiveEnergy, optionsFlightsClimbed, optionsAvgHeartRate, optionsRestingEnergy, optionsSteps, optionsDistance;
        optionsActiveEnergy = optionsFlightsClimbed = optionsAvgHeartRate = optionsRestingEnergy = optionsSteps = optionsDistance = {
          aspectRatio: 1,
          title: {
            display: true,
            fontSize: 16,
            padding: 25,
          },
          legend: {
            display: false
          },
          scales: {
            yAxes: [{
              display: true,
              scaleLabel: {
                display: false
              },
              ticks: {
                beginAtZero: false,
                //stepSize: 1,
                padding: 25
              }
            }],
            xAxes: [{
              scaleLabel: {
                display: false,
                fontStyle: 'bold',
                padding: 10,
                labelString: 'Date (ddMMMyyyy-HHmmss)'
              },
              ticks: {
                padding: 25,
                maxRotation: 90,
                minRotation: 90
              }
            }]
          } // End scales
        };

        if (typeof activeEnergyObject !== 'undefined') {
          // .destroy() chart if it already exists
          if (typeof chartActiveEnergy !== 'undefined') {
            chartActiveEnergy.destroy();
          }
          let activeEnergyDates = Object.keys(activeEnergyObject);
          let activeEnergyAnswers = Object.values(activeEnergyObject);
          // Active Energy Chart
          var ctxActiveEnergy = document.getElementById("chartCanvasActiveEnergy");
          optionsActiveEnergy.title.text = 'Active Energy Burned (kcal)'
          chartActiveEnergy = new Chart(ctxActiveEnergy, {
            type: 'line',
            data: {
              datasets: [{
                label: "kcal",
                backgroundColor: "rgba(255,99,132,0.2)",
                borderColor: "rgba(255,99,132,1)",
                borderWidth: 2,
                cubicInterpolationMode: "monotone",
                data: activeEnergyAnswers
              }],
              labels: activeEnergyDates,
            },
            options: optionsActiveEnergy
          }); // End chart
        }

        if (typeof flightsClimbedObject !== 'undefined') {
          // .destroy() chart if it already exists
          if (typeof chartFlightsClimbed !== 'undefined') {
            chartFlightsClimbed.destroy();
          }
          let flightsClimbedDates = Object.keys(flightsClimbedObject);
          let flightsClimbedAnswers = Object.values(flightsClimbedObject);
          // Flights Climbed Chart
          var ctxFlightsClimbed = document.getElementById("chartCanvasFlightsClimbed");
          optionsFlightsClimbed.title.text = 'Number of Flights Climbed (approx 3 meters/10 feet/16 steps)'
          chartFlightsClimbed = new Chart(ctxFlightsClimbed, {
            type: 'line',
            data: {
              datasets: [{
                label: "Flights",
                backgroundColor: "rgba(255,99,132,0.2)",
                borderColor: "rgba(255,99,132,1)",
                borderWidth: 2,
                cubicInterpolationMode: "monotone",
                data: flightsClimbedAnswers
              }],
              labels: flightsClimbedDates,
            },
            options: optionsFlightsClimbed
          }); // End chart
        }

        if (typeof avgHeartRateObject !== 'undefined') {
          // .destroy() chart if it already exists
          if (typeof chartAvgHeartRate !== 'undefined') {
            chartAvgHeartRate.destroy();
          }
          let avgHeartRateDates = Object.keys(avgHeartRateObject);
          let avgHeartRateAnswers = Object.values(avgHeartRateObject);
          // Avg Heart Rate Chart
          var ctxAvgHeartRate = document.getElementById("chartCanvasAvgHeartRate");
          optionsAvgHeartRate.title.text = 'Average Heart Rate (bpm)'
          chartAvgHeartRate = new Chart(ctxAvgHeartRate, {
            type: 'line',
            data: {
              datasets: [{
                label: "bpm",
                backgroundColor: "rgba(255,99,132,0.2)",
                borderColor: "rgba(255,99,132,1)",
                borderWidth: 2,
                cubicInterpolationMode: "monotone",
                data: avgHeartRateAnswers
              }],
              labels: avgHeartRateDates,
            },
            options: optionsAvgHeartRate
          }); // End chart
        }

        if (typeof restingEnergyObject !== 'undefined') {
          // .destroy() chart if it already exists
          if (typeof chartRestingEnergy !== 'undefined') {
            chartRestingEnergy.destroy();
          }
          let restingEnergyDates = Object.keys(restingEnergyObject);
          let restingEnergyAnswers = Object.values(restingEnergyObject);
          // Resting Energy Chart
          var ctxRestingEnergy = document.getElementById("chartCanvasRestingEnergy");
          optionsRestingEnergy.title.text = 'Resting Energy Burned (kcal)'
          chartRestingEnergy = new Chart(ctxRestingEnergy, {
            type: 'line',
            data: {
              datasets: [{
                label: "kcal",
                backgroundColor: "rgba(255,99,132,0.2)",
                borderColor: "rgba(255,99,132,1)",
                borderWidth: 2,
                cubicInterpolationMode: "monotone",
                data: restingEnergyAnswers
              }],
              labels: restingEnergyDates,
            },
            options: optionsRestingEnergy
          }); // End chart
        }

        if (typeof stepsObject !== 'undefined') {
          // .destroy() chart if it already exists
          if (typeof chartSteps !== 'undefined') {
            chartSteps.destroy();
          }
          let stepsDates = Object.keys(stepsObject);
          let stepsAnswers = Object.values(stepsObject);
          // Steps Chart
          var ctxSteps = document.getElementById("chartCanvasSteps");
          optionsSteps.title.text = 'Number of Steps Taken'
          chartSteps = new Chart(ctxSteps, {
            type: 'line',
            data: {
              datasets: [{
                label: "Steps",
                backgroundColor: "rgba(255,99,132,0.2)",
                borderColor: "rgba(255,99,132,1)",
                borderWidth: 2,
                cubicInterpolationMode: "monotone",
                data: stepsAnswers
              }],
              labels: stepsDates,
            },
            options: optionsSteps
          }); // End chart
        }

        if (typeof distanceObject !== 'undefined') {
          // .destroy() chart if it already exists
          if (typeof chartDistance !== 'undefined') {
            chartDistance.destroy();
          }
          let distanceDates = Object.keys(distanceObject);
          let distanceAnswers = Object.values(distanceObject);
          // Walking Running Chart
          var ctxDistance = document.getElementById("chartCanvasDistance");
          optionsDistance.title.text = 'Walking + Running Distance (meters)'
          chartDistance = new Chart(ctxDistance, {
            type: 'line',
            data: {
              datasets: [{
                label: "Meters",
                backgroundColor: "rgba(255,99,132,0.2)",
                borderColor: "rgba(255,99,132,1)",
                borderWidth: 2,
                cubicInterpolationMode: "monotone",
                data: distanceAnswers
              }],
              labels: distanceDates,
            },
            options: optionsDistance
          }); // End chart
        }


      }); // End $.getJSON(url, function(data)

    } else {
      console.log("NULL ID");
    }
  });

  $('#reset-charts').click(function() {
    // CODE
    chartActiveEnergy.destroy();
    chartFlightsClimbed.destroy();
    chartAvgHeartRate.destroy();
    chartRestingEnergy.destroy();
    chartSteps.destroy();
    chartDistance.destroy();

    // Hide charts
    $("#chart-div").hide();

    // Hide the reset button (default hidden in HTML), show generate button
    $("#reset-charts").hide();
    $("#generate-charts").show();

    // location.reload(true);
  });
});