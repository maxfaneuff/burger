$(function() {
  $("#submit").click(function(event) {
    console.log("onclick working");
    var newBurger = {
      name: $("#burgerText")
        .val()
        .trim(),
      devoured: 0
    };

    $.ajax("/api/burgers", {
      type: "POST",
      data: newBurger
    }).then(function() {
      console.log("created new burger");

      location.reload();
    });
  });
});

$(function() {
  $(".devour").click(function(event) {
    var id = $(this).data("id");
    var newDevour = $(this).data("devour");

    var newBurgerState = {
      devour: newDevour
    };

    $.ajax("/api/burgers/" + id, {
      type: "PUT",
      data: newBurgerState
    }).then(function() {
      console.log("I ate the burger!");

      location.reload();
    });
  });
});
