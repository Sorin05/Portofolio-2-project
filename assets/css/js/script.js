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