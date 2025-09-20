// js/alerts.js

async function loadAlerts() {
  try {
    const res = await fetch("/alerts.json");
    if (!res.ok) throw new Error("Failed to fetch alerts");

    const alerts = await res.json();
    const container = document.getElementById("alert-container");

    alerts.forEach(alert => {
      const alertDiv = document.createElement("div");
      alertDiv.className = "custom-alert";
      alertDiv.style.backgroundColor = alert.backgroundColor;
      alertDiv.innerText = alert.message;
      container.appendChild(alertDiv);
    });
  } catch (err) {
    // Optionally display error to user or handle it silently
    // alert("Error loading alerts."); // Uncomment to show alert to user
  }
}

document.addEventListener("DOMContentLoaded", loadAlerts);
