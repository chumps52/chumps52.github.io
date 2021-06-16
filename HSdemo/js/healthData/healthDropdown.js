$(document).ready(function() {

  // Initialise the dropdown
  let dropdown = $('#healthMeasurements-dropdown');

  // Empty any values already in the dropdown
  dropdown.empty();

  // Add default (null) value
  dropdown.append('<option selected="true" disabled>Choose Patient ID</option>');
  // Select said value
  dropdown.prop('selectedIndex', 0);

  const url = '/HSdemo/exampleData/database/csvIDs.json'

  $.getJSON(url, function(data) {
    $.each(data, function(key, entry) {
      // Add each Patient ID to the dropdown
      dropdown.append($('<option></option>').attr('value', key).text(key))
    });
  });

});