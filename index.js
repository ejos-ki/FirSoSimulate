/*
        File Type :    Vanilla JavaScript (JS)
        Used in   :    index.html
        Code by   :    Jeo D. Latorre
*/

//  Variable Declarations and Initializations

// Shorthand Variables
const query      = className => document.querySelector(className);

// Export the variables related to DOM Query
export const domVar = {
    smokeSensor : query(".smokeSensor"),
    fireSensor  : query(".fireSensor"),
    edit        : query(".edit"),
    done        : query(".done"),
};

domVar.smokeSensor.addEventListener('click', () => toggleSmokeSensor());
domVar.fireSensor.addEventListener('click', () => toggleFireSensor());
domVar.edit.addEventListener('click', () => editPhoneNumber());
domVar.done.addEventListener('click', () => savePhoneNumber());

function editPhoneNumber() {
    domVar.edit.style.visibility = "hidden";
    domVar.done.style.visibility = "visible";
};

function savePhoneNumber() {
    domVar.edit.style.visibility = "visible";
    domVar.done.style.visibility = "hidden";
};

function toggleFireSensor() {
    const bgColor = window.getComputedStyle(domVar.fireSensor).backgroundColor;
    
    if(bgColor === "rgb(202, 41, 12)"){
        domVar.fireSensor.style.backgroundColor = "#3bca0c"
        domVar.fireSensor.textContent = "Reset Sensor"
    }
    else {
        domVar.fireSensor.style.backgroundColor = "#ca290c"
        domVar.fireSensor.textContent = "Trigger Sensor" 
        sendSMS("Fire has been detected by your FirSo system at 2025-04-18 10:45 PM in your Living Room. Please check your property immediately and contact emergency services if necessary.");
    }
};

function toggleSmokeSensor() {
    const bgColor = window.getComputedStyle(domVar.smokeSensor).backgroundColor;

    if(bgColor === "rgb(202, 41, 12)"){
        domVar.smokeSensor.style.backgroundColor = "#3bca0c"
        domVar.smokeSensor.textContent = "Reset Sensor"
    }
    else {
        domVar.smokeSensor.style.backgroundColor = "#ca290c"
        domVar.smokeSensor.textContent = "Trigger Sensor"
        sendSMS("Smoke has been detected by your FirSo system at 2025-04-18 10:45 PM in your Living Room. Please check your property immediately and contact emergency services if necessary.");
    }
};

function sendSMS(message) {
    fetch('http://localhost:3000/send-sms', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message })
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            console.log('SMS sent!');
        } else {
            console.error('SMS failed to send.', data.error);
        }
    })
    .catch(err => {
        console.error('Request error:', err);
    });
}
