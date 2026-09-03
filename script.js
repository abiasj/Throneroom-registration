const SUPABASE_URL = "https://hxsotjzeaxazqxctnmox.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh4c290anplYXhhenF4Y3RubW94Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODgzNjM5OTAsImV4cCI6MjEwMzkzOTk5MH0.YTSu9y9ivSMUr9qycWMAI1Jd-p6jhh9c_w9GW3bERV8";

async function saveRegistration(data) {
  const response = await fetch(
    `${SUPABASE_URL}/rest/v1/registrations`,
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
  .addEventListener("submit", async function(event) {

    event.preventDefault();

    const message = document.getElementById("message");

    const firstName =
      document.getElementById("first_name").value.trim();

    const surname =
      document.getElementById("surname").value.trim();

    const telephone =
      document.getElementById("telephone").value.trim();

    const department =
      document.querySelector(
        'input[name="department"]:checked'
      ).value;

    const attendance =
      document.querySelector(
        'input[name="attendance"]:checked'
      ).value;

    const companionName =
      document.getElementById("companion_name").value.trim();

    const registration = {
      first_name: firstName,
      surname: surname,
      telephone: telephone,
      department: department,
      attendance: attendance,
      companion_name:
        attendance === "With someone"
          ? companionName
          : null
    };

    message.textContent = "Registering...";

    try {

      await saveRegistration(registration);

      message.textContent =
        "Thank you! Your registration has been received.";

      this.reset();

      document.getElementById("companionField").style.display = "none";

    } catch (error) {

      console.error(error);

      message.textContent =
        "Something went wrong. Please try again.";

    }

  });
