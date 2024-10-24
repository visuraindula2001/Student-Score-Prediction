const data = [
  { hoursStudied: 5, attendance: 90, schoolExamScore: 85, stateExamScore: 88 },
  { hoursStudied: 3, attendance: 80, schoolExamScore: 79, stateExamScore: 92 },
  { hoursStudied: 7, attendance: 95, schoolExamScore: 99, stateExamScore: 92 },
  { hoursStudied: 2, attendance: 76, schoolExamScore: 68, stateExamScore: 84 },
  { hoursStudied: 6, attendance: 85, schoolExamScore: 75, stateExamScore: 73 },
  { hoursStudied: 8, attendance: 98, schoolExamScore: 80, stateExamScore: 70 },
  { hoursStudied: 1, attendance: 60, schoolExamScore: 55, stateExamScore: 57 },
  { hoursStudied: 9, attendance: 99, schoolExamScore: 95, stateExamScore: 96 },
  { hoursStudied: 8, attendance: 95, schoolExamScore: 92, stateExamScore: 91 },
  { hoursStudied: 10, attendance: 97, schoolExamScore: 98, stateExamScore: 99 },
  { hoursStudied: 7, attendance: 92, schoolExamScore: 89, stateExamScore: 90 },
  { hoursStudied: 6, attendance: 90, schoolExamScore: 85, stateExamScore: 87 },
  { hoursStudied: 11, attendance: 98, schoolExamScore: 97, stateExamScore: 96 },
  { hoursStudied: 5, attendance: 88, schoolExamScore: 83, stateExamScore: 84 },
  { hoursStudied: 9, attendance: 96, schoolExamScore: 94, stateExamScore: 95 },
  {
    hoursStudied: 12,
    attendance: 100,
    schoolExamScore: 99,
    stateExamScore: 98,
  },
  { hoursStudied: 4, attendance: 85, schoolExamScore: 79, stateExamScore: 80 },
  { hoursStudied: 13, attendance: 99, schoolExamScore: 96, stateExamScore: 97 },
  {
    hoursStudied: 10,
    attendance: 100,
    schoolExamScore: 98,
    stateExamScore: 99,
  },
  {
    hoursStudied: 3.5,
    attendance: 82,
    schoolExamScore: 78,
    stateExamScore: 80,
  },
];

// 1:Setup backend to webgl

ml5.setBackend("webgl");

// 2:Initialize the neural network

const brain = ml5.neuralNetwork({
  //This creates a new neural network. It’s an easy way to build models in JavaScript for tasks like classification or regression.
  task: "regression",
  debug: true,
});

// 3: Add data to the neural network

data.forEach((item) => {
  const input = {
    hoursStudied: item.hoursStudied,
    attendance: item.attendance, // Correct spelling
    schoolExamScore: item.schoolExamScore,
  };

  const output = {
    stateExamScore: item.stateExamScore,
  };
  brain.addData(input, output);
});

//4 : Normalize Data to make feature similar scale

brain.normalizeData();

//5: Train the model

const trainingOptions = {
  epochs: 32,
  batchSize: 12,
};

brain.train(trainingOptions, finishedTraining);

function finishedTraining() {
  console.log("model training finished");
}

function predictscore() {
  const input = {
    hoursStudied: parseFloat(document.getElementById("hoursStudied").value),
    attendance: parseFloat(
      document.getElementById("attendance").value
    ),
    schoolExamScore: parseFloat(document.getElementById("schoolExamScore").value),
  };

  //6 : Make prediction with custom model
  brain.predict(input, (results) => {
    console.log(results);
    document.getElementById("results").textContent =
      results[0].value.toFixed(2);
      document.getElementById("results").style.display = 'block';
  });
}

// Add event listner to predict button
document.getElementById("predictBtn").addEventListener("click", predictscore);
