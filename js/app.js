let hour = document.getElementById("hour");
let minute = document.getElementById("min");
let second = document.getElementById("sec");
let ampmSet = document.getElementById("ampm");

const audio = new Audio("audio/alarm.mp3");

audio.loop = true;

function alarmRing() {
  audio.play();
  alert("Alarm is ringing");
}

//function for getting the current time
function getTime() {
  let date = new Date();
  let h = date.getHours();
  let m = date.getMinutes();
  let s = date.getSeconds();
  let ampm = h >= 12 ? "PM" : "AM";
  h = h % 12;
  h = h ? h : 12;
  m = m < 10 ? "0" + m : m;
  s = s < 10 ? "0" + s : s;
  hour.innerHTML = h;
  minute.innerHTML = m;
  second.innerHTML = s;
  ampmSet.innerHTML = ampm;
}

//object for storing all alarms
let alarmArray = [];

//button for adding alarms
const alarmSet = document.getElementById("alarmSetButton");

//function for setting the alarm
alarmSet.addEventListener("click", function (e) {
  e.preventDefault();
  let alarmTime = document.getElementById("alarmTime");
  if (alarmTime.value !== "") {
    let hours = alarmTime.value.split(":")[0]; //get the hours
    let minutes = alarmTime.value.split(":")[1]; //get the minutes
    let seconds = alarmTime.value.split(":")[2]; //get the seconds
    let ampm = hours >= 12 ? "PM" : "AM"; //get the am/pm
    hours = hours % 12; //convert to 12 hour format
    hours = hours ? hours : 12; //if hours is 0, set it to 12
    minutes = minutes < 10 ? "0" + minutes : minutes; //if minutes is less than 10, add a 0 in front
    seconds = seconds < 10 ? "0" + seconds : seconds; //if seconds is less than 10, add a 0 in front

    let alarm = {
      hours: hours,
      minutes: minutes,
      seconds: seconds,
      ampm: ampm,
    };

    alarmArray.push(alarm);
    console.log(alarmArray);

    //store each value in a a variable
    let alarmHours = alarm.hours;
    let alarmMinutes = alarm.minutes;
    let alarmSeconds = alarm.seconds;
    let alarmAmpm = alarm.ampm;

    //remove first zero from minutes and seconds
    if (alarmMinutes[0] === "0" && alarmMinutes[1] === "0") {
      alarmMinutes = alarmMinutes.substring(1);
    }
    if (alarmSeconds[0] === "0" && alarmSeconds[1] === "0") {
      alarmSeconds = alarmSeconds.substring(1);
    }

    let alarmList = document.getElementById("alarm-list");
    let newAlarm = document.createElement("li");
    newAlarm.innerHTML = `${alarmHours}:${alarmMinutes}:${alarmSeconds} ${alarmAmpm}`;

    alarmList.appendChild(newAlarm);

    //add a delete button right after the alarm
    let deleteButton = document.createElement("button");
    //add id to the button
    deleteButton.setAttribute("id", "deleteButton");

    deleteButton.innerHTML = "Delete";

    newAlarm.appendChild(deleteButton);
    deleteButton.addEventListener("click", function (e) {
      e.preventDefault();
      alarmList.removeChild(newAlarm);
      delete alarmArray[value];
    });

    alarmTime.value = "";
  } else {
    alert("Please enter the time");
  }
});

//function for calling the getTime function every 1 second
setInterval(getTime, 1000);

//function for checking current time and alarm time

setInterval(function () {
  for (let i = 0; i < alarmArray.length; i++) {
    let alarmHours = alarmArray[i].hours;
    let alarmMinutes = alarmArray[i].minutes;
    let alarmSeconds = alarmArray[i].seconds;
    let alarmAmpm = alarmArray[i].ampm;

    //remove first zero from minutes and seconds
    if (alarmMinutes[0] === "0" && alarmMinutes[1] === "0") {
      alarmMinutes = alarmMinutes.substring(1);
    }
    if (alarmSeconds[0] === "0" && alarmSeconds[1] === "0") {
      alarmSeconds = alarmSeconds.substring(1);
    }

    let currentTime = `${hour.innerHTML}:${minute.innerHTML}:${second.innerHTML} ${ampm.innerHTML}`;
    let alarmTime = `${alarmHours}:${alarmMinutes}:${alarmSeconds} ${alarmAmpm}`;

    if (currentTime === alarmTime) {
      alarmRing();
    }
  }
}, 1000);
