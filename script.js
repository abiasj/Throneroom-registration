function toggleCompanion(show) {
  const field = document.getElementById("companionField");
  const input = document.getElementById("companion_name");

  if (show) {
    field.style.display = "block";
    input.required = true;
  } else {
    field.style.display = "none";
    input.required = false;
    input.value = "";
  }
}

document
  .getElementById("registrationForm")
  .addEventListener("submit", function(event) {

    event.preventDefault();

    const message = document.getElementById("message");

    message.textContent =
      "Thank you! Your registration has been received.";

    this.reset();

    document.getElementById("companionField").style.display = "none";
  });
