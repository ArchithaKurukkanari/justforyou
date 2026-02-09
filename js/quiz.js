/*********************************
 🔐 EMAILJS CONFIGURATION
*********************************/

// 🔴 REPLACE THESE WITH YOUR REAL VALUES
const SERVICE_ID = "service_wysqgmt";
const TEMPLATE_ID = "template_bgqaxsp";
const PUBLIC_KEY = "c6zX6pt6hcGJm5AXs";

// Initialize EmailJS
emailjs.init(PUBLIC_KEY);

/*********************************
 💖 QUIZ QUESTIONS
*********************************/

const quiz = [
  {
    question: "What is my favorite thing about you?",
    options: ["Your smile", "The way you care", "Your sense of humor", "Everything"],
    correct: "Everything"
  },
  {
    question: "Who fell in love first ❤️?",
    options: ["Me", "You"],
    correct: null   // any answer allowed
  },
  {
    question: "Who is more dramatic 😝?",
    options: ["You", "Me"],
    correct: "Me"
  },
  {
    question: "What do I bring into your life?",
    options: ["Someone who truly understands you", "A shoulder to lean on", "Trust 🔐", "Unconditional love ❤️"],
    correct: null
  },
  {
    question: "Where did we click this photo?",
    image: "assets/photos/q3-photo.jpg",
    options: ["Plan B", "Toit", "21st Amendment Gastrobar", "No idea"],
    correct: "21st Amendment Gastrobar"
  },
  {
    question: "What do you think I need most from you?",
    options: ["Reassurance 🤍", "Time ⏳", "Honesty 💬", "Your presence 🫶"],
    correct: null
  },
  {
    question: "When did I first fall for you?",
    options: ["Nov 20", "Dec 16", "Dec 20", "I don’t remember"],
    correct: "Dec 16"
  },
  {
    question: "What do you think I overthink the most?",
    options: ["You 😌", "My future", "Small details", "Everything 😅"],
    correct: null
  },
  {
    question: "What do I bring that no one else does?",
    options: ["Emotional safety", "Consistency", "Deep understanding", "A love that stays"],
    correct: null
  },
  {
    question: "What kind of love do we have?",
    options: ["Calm & comforting", "Deep & intense", "Fun & silly", "Forever kind"],
    correct: null
  },
  {
    question: "Will you stay with me forever 💍?",
    options: ["Yes ❤️", "Obviously 😘"],
    correct: null
  }
];

/*********************************
 📦 STATE VARIABLES
*********************************/

let currentIndex = 0;
let answersChosen = [];

/*********************************
 🧠 DOM ELEMENTS
*********************************/

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const errorEl = document.getElementById("error");
const imageEl = document.getElementById("quiz-image");

/*********************************
 🚀 FUNCTIONS
*********************************/

function loadQuestion() {
  errorEl.innerText = "";
  answersEl.innerHTML = "";

  const currentQ = quiz[currentIndex];

  questionEl.innerText = currentQ.question;

  // Handle image-based question
  if (currentQ.image) {
    imageEl.src = currentQ.image;
    imageEl.style.display = "block";
  } else {
    imageEl.style.display = "none";
  }

  currentQ.options.forEach(option => {
    const btn = document.createElement("button");
    btn.className = "answer-btn";
    btn.innerText = option;
    btn.onclick = () => handleAnswer(option);
    answersEl.appendChild(btn);
  });
}


function handleAnswer(selectedOption) {
  const currentQ = quiz[currentIndex];

  // Save answer (right or wrong)
  answersChosen.push(
    `${currentQ.question} → ${selectedOption}`
  );

  // If wrong answer, show message ONCE
  if (currentQ.correct && selectedOption !== currentQ.correct) {
    errorEl.innerText = "😈 Kill you after the test 😡🔪";
  } else {
    errorEl.innerText = "";
  }

  // Disable all buttons immediately (no second chance)
  const buttons = document.querySelectorAll(".answer-btn");
  buttons.forEach(btn => btn.disabled = true);

  // Move to next question after short delay
  setTimeout(() => {
    currentIndex++;

    if (currentIndex < quiz.length) {
        loadQuestion();
    } else {
        sendQuizEmail();
    }
  }, 800);
}




async function sendQuizEmail() {
  const messageBody = answersChosen.join("\n");

  const templateParams = {
    quiz_answers: messageBody
  };

  try {
    // ⏳ WAIT for email to finish (CRITICAL for mobile)
    await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams);
    console.log("Quiz email sent ❤️");
  } catch (err) {
    console.error("Email failed:", err);
  }

  // ⏱️ Small delay for safety (mobile browsers)
  setTimeout(() => {
    window.location.href = "gifts.html";
  }, 300);
}







/*********************************
 ▶️ START QUIZ
*********************************/

loadQuestion();
