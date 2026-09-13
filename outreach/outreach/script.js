const SUPABASE_URL = "DEINE_PROJECT_URL";
const SUPABASE_KEY = "DEIN_PUBLISHABLE_ODER_ANON_KEY";


async function saveRegistration(data) {

  const response = await fetch(
    `${SUPABASE_URL}/rest/v1/outreach_registrations`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "apikey": SUPABASE_KEY,
        "Authorization": `Bearer ${SUPABASE_KEY}`,
        "Prefer": "return=minimal"
      },

      body: JSON.stringify(data)
    }
  );


  if (!response.ok) {
    throw new Error(await response.text());
  }

}



function togglePeople(show) {

  const field =
    document.getElementById("peopleField");

  const input =
    document.getElementById("people_with");


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
  .addEventListener("submit", async function(event) {

    event.preventDefault();


    const message =
      document.getElementById("message");


    const firstName =
      document
        .getElementById("first_name")
        .value
        .trim();


    const age =
      parseInt(
        document.getElementById("age").value
      );


    const attendance =
      document.querySelector(
        'input[name="attendance"]:checked'
      ).value;


    const peopleWithInput =
      document.getElementById("people_with");


    const peopleWith =
      peopleWithInput.value
        ? parseInt(peopleWithInput.value)
        : null;


    const session =
      document.querySelector(
        'input[name="session"]:checked'
      ).value;



    const registration = {

      first_name: firstName,

      age: age,

      attendance: attendance,

      people_with:
        attendance === "With others"
          ? peopleWith
          : null,

      session: session

    };



    message.textContent =
      "Anmeldung wird gesendet...";



    try {

      await saveRegistration(registration);


      message.textContent =
        "Vielen Dank! Deine Anmeldung wurde erfolgreich übermittelt.";


      this.reset();


      document.getElementById(
        "peopleField"
      ).style.display = "none";


    } catch (error) {

      console.error(error);


      message.textContent =
        "Etwas ist schiefgelaufen. Bitte versuche es erneut.";

    }

  });
