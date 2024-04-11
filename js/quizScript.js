document.addEventListener("DOMContentLoaded", function () {
  const quizQuestions = [
    {
      question: "What is your hair type?",
      answers: ["Straight", "Wavy", "Curly", "Coily"],
      correctAnswer: "Curly",
    },
    {
      question: "How often do you wash your hair?",
      answers: ["Daily", "Every few days", "Weekly", "Rarely"],
      correctAnswer: "Weekly",
    },
    {
      question: "What is your biggest hair concern?",
      answers: ["Dryness", "Oiliness", "Dandruff", "Hair loss"],
      correctAnswer: "Dryness",
    },
    {
      question: "What is your hair's porosity?",
      answers: ["Low", "Medium", "High"],
      correctAnswer: "Medium",
    },
    {
      question: "Which product do you use most?",
      answers: ["Gel", "Mousse", "Pomade", "Leave-in Conditioner"],
      correctAnswer: "Leave-in Conditioner",
    },
  ];

  let currentQuestionIndex = 0;
  const questionElement = document.querySelector(".question");
  const answerOptionsElement = document.querySelector(".answerOptions");
  const nextButton = document.getElementById("next");
  const submitButton = document.getElementById("submit");
  const progressBar = document.querySelector(".my-progress-bar");
  const resultArea = document.querySelector(".resultArea");
  const multipleChoiceQues = document.querySelector(".multipleChoiceQues");

  function displayQuestion() {
    const currentQuestion = quizQuestions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    answerOptionsElement.innerHTML = "";

    currentQuestion.answers.forEach((answer) => {
      let option = document.createElement("button");
      option.textContent = answer;
      option.classList.add("option");
      option.addEventListener("click", () => selectAnswer(answer, option));
      answerOptionsElement.appendChild(option);
    });

    nextButton.classList.add("hidden");
    if (currentQuestionIndex === quizQuestions.length - 1) {
      submitButton.classList.remove("hidden");
    }
    updateProgressBar();
  }

  function selectAnswer(answer, option) {
    document
      .querySelectorAll(".option")
      .forEach((btn) => (btn.disabled = true));
    option.disabled = false; // highlight selected option
    nextButton.classList.remove("hidden");
  }

  nextButton.addEventListener("click", function () {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      currentQuestionIndex++;
      displayQuestion();
    }
  });

  submitButton.addEventListener("click", function () {
    calculateResults();
    showResults();
  });

  const replayButton = document.querySelector(".replay");
  replayButton.addEventListener("click", function () {
    // Reload the page to restart the quiz
    window.location.reload();
  });

  function updateProgressBar() {
    const progressPercent =
      ((currentQuestionIndex + 1) / quizQuestions.length) * 100;
    progressBar.style.width = `${progressPercent}%`;
  }

  function calculateResults() {
    // Example logic to calculate results
    // This should be replaced or expanded based on your actual result calculation needs
    let resultText = "You have mixed hair type"; // Example result
    // Display the results in the result box
    document.querySelector(
      ".resultBox h1"
    ).textContent = `Your hair type is likely: ${resultText}`;
  }
  submitButton.addEventListener("click", function () {
    calculateResults();
    showResults();
    console.log("submit button clicked");
  });

  function showResults() {
    const resultElement = document.querySelector(".resultArea");
    const quizElement = document.querySelector(".multipleChoiceQues");

    // Hide the quiz questions
    quizElement.style.display = "none";

    // Show the results
    resultElement.style.display = "block";
  }
  displayQuestion();
});
