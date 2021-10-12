const question = document.querySelector('#question');
const picks = Array.from(document.querySelectorAll('.pick-text'));
const progressText = document.querySelector('#progressText');
const progressBarFull = document.querySelector('#progressBarFull');
const scoreText = document.querySelector ('#score');


let currentQuestion= {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []


let questions = [
    {
        question: 'What is 1 + 1?',
        pick1: '2',
        pick2: '3',
        pick3: '23',
        pick4: '5',
        answer: 2,
    },
    {
        question: 'What is 1 + 1?',
        pick1: '2',
        pick2: '3',
        pick3: '23',
        pick4: '5',
        answer: 2,
    },
    {
        question: 'What is 1 + 1?',
        pick1: '2',
        pick2: '3',
        pick3: '23',
        pick4: '5',
        answer: 2,
    },
    {
        question: 'What is 1 + 1?',
        pick1: '2',
        pick2: '3',
        pick3: '23',
        pick4: '5',
        answer: 2,
    }
]


const SCORE_POINTS = 100
const MAX_QUESTIONS = 4

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)
        return window.location.assign('/end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionIndex]
    question.innerText = currentQuestion.question

    picks.forEach( pick => {
        const number = pick.dataset['number']
        pick.innerText = currentQuestion['pick' + number]
    })

    availableQuestions.splice(questionIndex, 1)
}