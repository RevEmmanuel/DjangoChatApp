$(document).ready(function () {
  setInterval(function () {
    $.ajax({
      type: "GET",
      url: "/getMessages/{{room}}/",
      success: function (response) {
        console.log(response);
        $("#display").empty();
        for (let key in response.messages) {
          const temp =
            "<div class='container darker'><b>" +
            response.messages[key].user +
            "</b><p>" +
            response.messages[key].value +
            "</p><span class='time-left'>" +
            response.messages[key].date +
            "</span></div>";
          $("#display").append(temp);
        }
      },
      error: function () {
        alert("An error occurred");
      },
    });
  }, 1000);
});

$(document).on("submit", "#post-form", function (e) {
  // Immediately the post-form is submitted
  e.preventDefault(); // prevent the page from reloading

  $.ajax({
    // Use ajax to send details to database
    type: "POST", // POST type
    url: "/send", // url tells it to send to 'send' function
    data: {
      // The details you want to send
      username: $("#username").val(),
      room_id: $("#room_id").val(),
      message: $("#message").val(),
      csrfmiddlewaretoken: $("input[name=csrfmiddlewaretoken]").val(),
    },
    success: function (data) {
      // alert(data);
    },
  });
  document.getElementById("message").value = ""; // Clears the input box for messages
});
