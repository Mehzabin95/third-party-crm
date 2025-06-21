let smartcommTab = null;

document.getElementById("crm-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const phone = document.getElementById("phone").value.trim();
  if (!phone) {
    alert("Please enter a phone number!");
    return;
  }

  const smartcommUrl = "http://localhost:3000/home";

  if (!smartcommTab || smartcommTab.closed) {
    smartcommTab = window.open(smartcommUrl, "_blank");
  } else {
    smartcommTab.focus();
  }

  setTimeout(() => {
    smartcommTab.postMessage({ phoneNumber: phone }, "http://localhost:3000");
  }, 1000);
});

window.addEventListener("message", function (event) {
  if (event.origin !== "http://localhost:3000") return;

  if (event.data && event.data.event === "dialed") {
    console.log("Received from SmartComm:", event.data.phoneNumber);
    showCustomNotification(event.data.phoneNumber);
  }
});

function showCustomNotification(phoneNumber) {
  const notification = document.createElement("div");
  notification.innerText = `Dialed: ${phoneNumber}`;
  notification.style.position = "fixed";
  notification.style.bottom = "20px";
  notification.style.right = "20px";
  notification.style.backgroundColor = "#333";
  notification.style.color = "#fff";
  notification.style.padding = "10px 20px";
  notification.style.borderRadius = "5px";
  notification.style.boxShadow = "0px 0px 10px rgba(0,0,0,0.2)";
  notification.style.zIndex = "1000";

  document.body.appendChild(notification);

  setTimeout(() => {
    document.body.removeChild(notification);
  }, 3000);
}
