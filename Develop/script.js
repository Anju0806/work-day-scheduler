

// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {

  // Code to display the current date in the header of the page.
  let today = dayjs();
  let reformatDate = today.format('dddd, MMMM D[th] YYYY');
  $('#currentDay').text(reformatDate);
  let current_hour = today.format('HH');
  
  // TODO: Add a listener for click events on the save button. This code should
  
  let t1;
  let newTable = $("<table>");
 
  let tableBody = $("<tbody>");
 
  // create nine rows 
  for (let i = 9; i <= 17; i++) {
    let row1 = $("<tr>");
    
    let cell1 = $("<td>");
    cell1.addClass("row hour");
    if (i < 13) {
      t1 = $("<div>").addClass("col-2 col-md-1  text-center py-3 ").text(i + "AM");
    }
    else {
      t1 = $("<div>").addClass("col-2 col-md-1  text-center py-3 " ).text(i - 12 + "PM");
    }
    cell1.append(t1);
    row1.append(cell1);

    //row1.textarea1
    let cell2 = $("<td>");
    let textarea1 = $("<textarea>")
    textarea1.addClass("col-8 col-md-10 description");
    //adding the id to textarea
    textarea1.attr("id", "textarea" + i);
    if (i>current_hour) {
      textarea1.addClass("time-block future");
    }
    else if (i==current_hour) {
      textarea1.addClass("time-block present");
    }
    else {
      textarea1.addClass("time-block past");
    }
    //get local storage values
    textarea1.text(localStorage.getItem("textarea"+i));


    $(textarea1).attr("rows", "3")
    cell2.append(textarea1);
    row1.append(cell2);

    //row1.button1
    var cell3 = $("<td>");
    var button3 = $("<button>");
    button3.addClass("btn saveBtn col-2 col-md-1");
    var icon = $("<i>").addClass("fas fa-save").attr("aria-hidden", "true");
    //add the onclick function here
    button3.append(icon);
    $(button3).attr('aria-label', 'save');
     //adding the id to buttons
     button3.attr("id", "button" + i);
    cell3.append(button3);
    row1.append(cell3);
    tableBody.append(row1);
    newTable.append(tableBody);
  }
  $("#myTableContainer").append(newTable);


  $(tableBody).on('click', '.saveBtn', function(event) {
   
    var buttonId = $(this).attr('id');
    console.log('Save button clicked: ' + buttonId);
    // get the textarea 
    var textareaId = buttonId.replace('button', 'textarea');
    var textareaValue = $('#' + textareaId).val();

    localStorage.setItem(textareaId, textareaValue);
  });
  
});
