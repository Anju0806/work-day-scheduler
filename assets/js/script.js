

$(function () {
  
  // Code to display the current date in the header of the page.
  let today = dayjs();
  setInterval(function(){
    today=dayjs();
    reformatDate = today.format('dddd, MMMM D[th] YYYY hh:mm:ss');
    $('#currentDay').text(reformatDate);
  }, 1000);

  let current_hour = today.format('HH');
  let t1;
  let newTable = $("<table>");
  let tableBody = $("<tbody>");

  // create nine rows for the time blocks
  for (let i = 9; i <= 17; i++) {
    let row1 = $("<tr>");
    let cell1 = $("<td>");
    cell1.addClass("row hour");
    if (i < 13) {
      t1 = $("<div>").addClass("col-2 col-md-1  text-center py-3 ").text(i + "AM");
    }
    else {
      t1 = $("<div>").addClass("col-2 col-md-1  text-center py-3 ").text(i - 12 + "PM");
    }
    cell1.append(t1);
    row1.append(cell1);
    let cell2 = $("<td>");
    let textarea1 = $("<textarea>")
    cell2.addClass("col-8 col-md-10 description");
    //adding the id to textarea
    textarea1.attr("id", "textarea" + i);
    //adding the color(past,present,future) to the cells according to time
    if (i > current_hour) {
      cell2.addClass("time-block future");
    }
    else if (i == current_hour) {
      cell2.addClass("time-block present");
    }
    else {
      cell2.addClass("time-block past");
    }
    //get local storage values to display in the textarea
    textarea1.text(localStorage.getItem("textarea" + i));

    $(textarea1).attr("rows", "3")
    cell2.append(textarea1);
    row1.append(cell2);

    //row1.button1
    var cell3 = $("<td>");
    var button3 = $("<button>");
    button3.addClass("btn saveBtn col-2 col-md-1");
    var icon = $("<i>").addClass("fas fa-save").attr("aria-hidden", "true");
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
///editfrom here
$("#clear-all").on("click", function() {
  for (let i = 9; i <= 17; i++) {
    let textarea = $("#textarea" + i);
    textarea.val(" ");
  }
  localStorage.clear();
});
//till here

  //adding the event listener to table body and storing the textarea values in the local storage
  $(tableBody).on('click', '.saveBtn', function (event) {
    var buttonId = $(this).attr('id');
    // get the textarea 
    var textareaId = buttonId.replace('button', 'textarea');
    var textareaValue = $('#' + textareaId).val();
    localStorage.setItem(textareaId, textareaValue);
  });

});
