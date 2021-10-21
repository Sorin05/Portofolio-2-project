
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
        pick1: 'The California Institute of Technology',
        pick2: 'SuperValu',
        pick3: 'Trinity College',
        pick4: 'ZARA',
        answer: 1,
    },
    {
        question: 'Which band wrote the theme song for the show?',
        pick1: 'Barenaked Ladies',
        pick2: 'U2',
        pick3: 'Blink182',
        pick4: 'Spin Doctors',
        answer: 1,
    },
    {
        question: "What is Sheldon's middle name??",
        pick1: 'Jerry',
        pick2: 'Lee',
        pick3: 'Richard',
        pick4: 'Tom',
        answer: 2,
    },
    {
        question: 'Which actor, who is famous for his role as a Vulcan, has been gradually guest starring in the series?',
        pick1: ' Patrick Stewart',
        pick2: ' Leonard Nimoy ',
        pick3: ' William Shatner ',
        pick4: 'DeForest Kelly',
        answer: 2,
    },
    {
        question: 'Sheldon is very dedicated to his work but he also has outside interests and hobbies. Which of these is one of them?',
        pick1: 'Stand Up Comedy',
        pick2: 'Model trains',
        pick3: 'Line dancing',
        pick4: ' Bird watching',
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
        return window.location.assign('endpage.html')
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