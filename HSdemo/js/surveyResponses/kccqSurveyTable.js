$(document).ready(function() {
  $('#generate-table').click(function() {

    // Get the selected Patient ID
    let selectedID = $('#surveyResponses-dropdown').val();

    // Null if default dropdown value used
    if (selectedID !== null) {

      // Get JSON data for current patient
      const url = '/HSdemo/exampleData/database/' + selectedID + '/kccqTableResponses.json'

      $.getJSON(url, function(data) {

        // Get the columns
        let columns = Object.keys(data);

        // Get unique questions
        let rows = []
        for (column of columns) {
          rows = Object.keys(data[column]).reduce((a, b) => {
            if (!a.includes(b)) a.push(b)
            return a
          }, rows)
        }

        // Extract row data
        rows = rows.map(row => {
          let rowData = {
            Question: row
          }
          for (column of columns) {
            rowData[column] = data[column][row]
          }
          return rowData
        })

        // Add the 'Question' column
        columns.unshift("Question");

        // Log the results
        console.log("COLUMNS:");
        console.log(columns);
        console.log("ROWS:");
        console.log(rows);
        // rows is an array of objects


        // Add the required properties to display the columns in the table
        var columnsArray2 = columns.map(c => ({
          title: c,
          field: c,
          headerSort: false
        }))

        //Build Tabulator
        var table = new Tabulator("#example-table", {
          height: "658px",
          layout: "fitColumns",
          responsiveLayout: "hide",
          placeholder: "No Data Set",
          columns: columnsArray2
        });

        // Set the table data
        table.setData(rows);

        // Show the download buttons (default hidden in HTML)
        $("#download-csv").show();
        $("#download-json").show();
        $("#download-xlsx").show();
        $("#download-pdf").show();

        $("#generate-charts").show();

        // Trigger download of data.csv file
        $("#download-csv").click(function() {
          table.download("csv", "data.csv");
        });

        // Trigger download of data.json file
        $("#download-json").click(function() {
          table.download("json", "data.json");
        });

        // Trigger download of data.xlsx file
        $("#download-xlsx").click(function() {
          table.download("xlsx", "data.xlsx", {
            sheetName: "My Data"
          });
        });

        // Trigger download of data.pdf file
        $("#download-pdf").click(function() {
          table.download("pdf", "data.pdf", {
            orientation: "landscape", // Set page orientation to landscape
            title: selectedID, // Add Patient ID as PDF title
          });
        });

      }); // End $.getJSON(url, function(data)

    } else {
      console.log("NULL ID");
    }

  });
});