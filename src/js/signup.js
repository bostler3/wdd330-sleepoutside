// signup.js
document.getElementById("signupForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const address = document.getElementById("address").value.trim();
  const avatar = document.getElementById("avatar").value.trim();

  const user = {
    name,
    email,
    address,
  };

  if (avatar) {
    user.avatar = avatar;
  }

  try {
    const response = await fetch("/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const result = await response.json();

    const messageContainer = document.getElementById("signup-message");

    if (response.ok) {
      messageContainer.textContent = "Sign-up successful!";
      messageContainer.style.color = "green";
      // Redirect or further actions can go here
    } else {
      messageContainer.textContent = `Error: ${result.message || "Unable to create account"}`;
      messageContainer.style.color = "red";
    }
  } catch (err) {
    document.getElementById("signup-message").textContent =
      "An error occurred while submitting the form.";
  }
});
