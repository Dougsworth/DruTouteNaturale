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
  const selectedAnswers = new Array(quizQuestions.length); // Stores selected answers
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

    currentQuestion.answers.forEach((answer, index) => {
      let option = document.createElement("button");
      option.textContent = answer;
      option.classList.add("option");
      option.addEventListener("click", () => selectAnswer(answer, index));
      answerOptionsElement.appendChild(option);
      if (selectedAnswers[currentQuestionIndex] === answer) {
        option.classList.add("selected"); // Visually indicate this was the selected answer
      }
    });

    nextButton.classList.add("hidden");
    if (currentQuestionIndex === quizQuestions.length - 1) {
      submitButton.classList.remove("hidden");
    } else {
      submitButton.classList.add("hidden");
    }
    updateProgressBar();
  }

  function selectAnswer(answer, answerIndex) {
    selectedAnswers[currentQuestionIndex] = answer; // Store selected answer
    document.querySelectorAll(".option").forEach((btn) => {
      btn.classList.remove("selected"); // Remove the selected class from all buttons
      btn.disabled = false; // Enable all options
    });
    answerOptionsElement.children[answerIndex].classList.add("selected"); // Visually mark as selected
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

  function updateProgressBar() {
    const progressPercent =
      ((currentQuestionIndex + 1) / quizQuestions.length) * 100;
    progressBar.style.width = `${progressPercent}%`;
  }

  function calculateResults() {
    let hairType =
      selectedAnswers.find((answer) =>
        ["Curly", "Straight", "Wavy", "Coily"].includes(answer)
      ) || "";
    const recommendations = {
      Curly: {
        product: "Leave-in conditioner",
        careRoutine:
          "Use a hydrating shampoo and conditioner, followed by a leave-in conditioner to define curls.",
        additionalInfo:
          "Consider using a wide-tooth comb or fingers to detangle wet hair to prevent breakage.",
      },
      Straight: {
        product: "Lightweight serum",
        careRoutine:
          "Use a volumizing shampoo and conditioner, followed by a lightweight serum to add shine.",
        additionalInfo: "Avoid heavy products that may weigh down your hair.",
      },
      Wavy: {
        product: "Sea salt spray",
        careRoutine:
          "Use a moisturizing shampoo and conditioner, followed by a sea salt spray to enhance waves.",
        additionalInfo:
          "Scrunch your hair while applying products to enhance wave definition.",
      },
      Coily: {
        product: "Curl defining cream",
        careRoutine:
          "Use a sulfate-free shampoo and conditioner, followed by a curl defining cream to moisturize and define coils.",
        additionalInfo:
          "Deep condition regularly to keep coils hydrated and prevent breakage.",
      },
    };

    let resultText = hairType
      ? `<div class="recommendationBox">
            <h1>You have ${hairType.toLowerCase()} hair type.</h1>
            <h2>Here's what we recommend:</h2>
            <ul>
                <li><strong>Product:</strong> ${
                  recommendations[hairType].product
                }</li>
                <li><strong>Hair Care Routine:</strong> ${
                  recommendations[hairType].careRoutine
                }</li>
                <li><strong>Additional Info:</strong> ${
                  recommendations[hairType].additionalInfo
                }</li>
            </ul>
         </div>`
      : "Based on your answers, we recommend consulting a professional hair stylist for personalized advice.";

    document.querySelector(".resultBox").innerHTML = resultText; // Make sure to target the correct element
  }

  document.querySelector(".replay").addEventListener("click", function () {
    // Reload the current page
    window.location.reload();
  });
  function showResults() {
    multipleChoiceQues.style.display = "none";
    resultArea.style.display = "block";
  }

  displayQuestion();
});
