//const publicVapidKey =
//  "BJthRQ5myDgc7OSXzPCMftGw-n16F7zQBEN7EUD6XxcfTTvrLGWSIG7y_JxiWtVlCFua0S8MTB5rPziBqNx1qIo";

  // Declaring the dynamic variables

// Check for service worker
if ("serviceWorker" in navigator) {
  send().catch(err => console.error(err));
}

// Register SW, Register Push, Send Push
async function send() {
  // Register Service Worker
  console.log("Registering service worker...");
  const register = await navigator.serviceWorker.register("/work.js", {
    scope: "/"
  });
  console.log("Service Worker Registered...");

  // Register Push
  console.log("Registering Push...");
  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
  });

  console.log("Push Registered...");
  // Send Push Notification
//  await fetch("/subscribe", {
//     method: "POST",
//    body: JSON.stringify(subscription),
//     headers: {
//       "content-type": "application/json"
//     }
//  });
console.log("sending push");
// post the subscription obj to the db
 await fetch("https://pushly.500apps.com/pushly/setting", {
    method: "post",
    headers: {
      Accept: "application/json",
      token:"eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqd3QiLCJlbWFpbCI6ImdlZXRoYW5qYWxpLm11bmdhcmFANTAwYXBwcy5jb20iLCJ0ZW5hbnRfaWQiOiIxNTM0IiwidXNlcl9pZCI6IjI2MDEiLCJ1c2VyX2ltZyI6IiJ9.HboBjUUlh-rE2EtUNy0h_9iLePGghGakq2DrUlNOixc"
      //content-type: "application/json"
    },
    body: JSON.stringify(subscription),
    }).then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.log(err));
  }
 

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
