const  question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progress-text");
const scoreText = document.getElementById("score");

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = questions;


// CONSTANT 
const CORRECT_BONUS = 10;
const MAX_QUESTIONS  = 50;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    console.log(availableQuestions);
    getNewQuestion();
};
// startGame();

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        /* To save score */
        localStorage.setItem('mostRecentScore', score);
        /* go to the end page */
        return window.location.assign("/end.html");
    }

    questionCounter++;
    progressText.innerText = 'question'  + (questionCounter + '/' + MAX_QUESTIONS);

    /* updating the progress bar */

    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;


    const questionIndex = Math.floor(Math.random() * availableQuestions.length);



    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;


    choices.forEach( choice => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice" + number ];
    });

    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if(!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        // const classToApply = "incorrrect";
        // if(selectedAnswer == currentQuestion.answer) {
        //     classToApply = "correct";
        // }

        const classToApply =
        selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';
        if(classToApply == "correct") {
            increamentScore(CORRECT_BONUS);
        }



        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout( () => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1500);
    });
});

increamentScore = num => {
    score +=num;
    scoreText.innerText = score;
};

startGame();

