// Define exercises for each workout type
const exercises = {
  chest_triceps: ["Incline Chest Press", "Straight Chest Press", "Cable Fly Machine", "Triceps Overhead Press", "Lateral Raises"],
  legs_shoulder: ["Squats", "Shoulder Press", "Leg Extension", "Hamstring Extension", "Calves Raises", "Shrugs"],
  biceps_back: ["Vertical Pull Machine", "Horizontal Pull Machine", "Face Pull", "Pull Over for Back", "Preacher Curl", "Biceps Curl", "Deadlift"]
};

// Define a structure to store records based on date
let recordsByDate = {};

function populateExercises() {
  const workoutType = document.getElementById("workoutType").value;
  const exerciseDropdown = document.getElementById("exercise");
  exerciseDropdown.innerHTML = '';

  // Check if the selected workout type is in the exercises object
  if (exercises[workoutType]) {
    exercises[workoutType].forEach(exercise => {
      const option = document.createElement("option");
      option.value = exercise;
      option.text = exercise;
      exerciseDropdown.appendChild(option);
    });
  }
}

async function addRecord() {
  const date = document.getElementById("date").value;
  const workoutType = document.getElementById("workoutType").value;
  const exercise = document.getElementById("exercise").value;
  const weight = document.getElementById("weight").value;
  const sets = document.getElementById("sets").value;

  if (!recordsByDate[date]) {
    recordsByDate[date] = [];
  }

  // Add record to the recordsByDate structure
  recordsByDate[date].push({
    workoutType,
    exercise,
    weight,
    sets
  });

  try {
    // Assuming you have a server running at localhost:3000 to handle the POST request
    const response = await fetch('http://localhost:3000/data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        date,
        workoutType,
        exercise,
        weight,
        sets
      }),
      credentials: 'include',  // Include this line for credentials
      mode: 'cors',  // Set the mode to 'cors'
    });

    const data = await response.json();
    console.log(data);

    // Clear input fields after adding record
    document.getElementById("weight").value = "";
    document.getElementById("sets").value = "";

    // Update select options for viewing records
    updateSelectOptions();

    // Show records for the selected date
    showRecords();
  } catch (error) {
    console.error('Error adding record:', error);
  }
}

function updateSelectOptions() {
  const selectDate = document.getElementById("selectDate");
  selectDate.innerHTML = '';

  
  const sortedDates = Object.keys(recordsByDate).sort((a, b) => new Date(b) - new Date(a));

  sortedDates.forEach(date => {
    const option = document.createElement("option");
    option.value = date;
    option.text = date;
    selectDate.appendChild(option);
  });
}

function showRecords() {
  const selectDate = document.getElementById("selectDate").value;
  const recordsDiv = document.getElementById("records");
  recordsDiv.innerHTML = '';

  if (recordsByDate[selectDate]) {
    recordsByDate[selectDate].forEach(record => {
      const recordHTML = `
        <p>Date: ${selectDate}</p>
        <p>Workout Type: ${record.workoutType}</p>
        <p>Exercise: ${record.exercise}</p>
        <p>Weight: ${record.weight} kg</p>
        <p>Sets: ${record.sets}</p>
        <hr>
      `;
      recordsDiv.innerHTML += recordHTML;
    });
  }
}
