
// Getting Html elements using DOM and store them in a variable 

const question = document.querySelector('#question');
const picks = Array.from(document.querySelectorAll('.pick-text'));
const progressText = document.querySelector('#progressText');
const progressBarFull = document.querySelector('#progressBarFull');
const scoreText = document.querySelector ('#score');

// Declaring Variables

let currentQuestion= {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

// Defining questions

let questions = [
    {
        question: 'Where does Sheldon work?',
        pick1: 'Supervalu',
        pick2: '2',
        pick3: '23',
        pick4: '5',
        answer: 1,
    },
    {
        question: 'What is 1 + 3?',
        pick1: '4',
        pick2: '3',
        pick3: '2',
        pick4: '5',
        answer: 1,
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

// Declaring game Variables where you can increase the score count and question count

const SCORE_POINTS = 100
const MAX_QUESTIONS = 5

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

// Function that gets new question

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)
        return window.location.assign('/endpage.html')
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

    acceptingAnswers = true
}

// Checking if the answer its right or wrong on users click

picks.forEach(pick => {
    pick.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedPick = e.target
        const selectedAnswer = selectedPick.dataset ['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'
        
        if(classToApply === 'correct') {
            document.querySelector("#audio").play()
            incrementScore(SCORE_POINTS)
        }

        selectedPick.parentElement.classList.add(classToApply)

        setTimeout(() => {
             selectedPick.parentElement.classList.remove(classToApply)
             getNewQuestion()  
        }, 1000 )
    })
})

// Incrementing the score when you pick the right answer 

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()