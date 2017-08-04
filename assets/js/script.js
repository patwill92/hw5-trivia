var questions = [
  {
    question: 'Who is the best coding boot camp instructor in Charlotte?',
    answers: ['Jeff Hoffman', 'Yoda', 'Goku', 'Luffy'],
    correct: 'Jeff Hoffman'
  },
  {
    question: 'How many super bowls have the New England Patriots won?',
    answers: ['2', '4', '5', '7'],
    correct: '5'
  },
  {
    question: 'Which NFL team has the most super bowls?',
    answers: ['New England Patriots', 'Atlanta Falcons', 'Green Bay Packers', 'Pittsburgh Steelers'],
    correct: 'Pittsburgh Steelers'
  },
  {
    question: 'What is the highest grossing film of all time?',
    answers: ['Titanic', 'Avatar', 'Gone with the Wind', 'The Terminator'],
    correct: 'Gone with the Wind'
  },
  {
    question: 'What is the best selling music album of all time?',
    answers: ['Led Zeppelin IV', 'Thriller', 'The Wall', 'Appetite for Destruction'],
    correct: 'Thriller'
  },
  {
    question: 'What is the largest country by population?',
    answers: ['India', 'U.S.A', 'China', 'Brazil'],
    correct: 'China'
  },
  {
    question: 'What year did Christopher Columbus arrive to America?',
    answers: ['1496', '1502', '1500', '1492'],
    correct: '1492'
  },
  {
    question: 'What is the tallest building in Charlotte, NC?',
    answers: ['Duke Energy Center', 'Bank of America Corporate Center', 'One Wells Fargo Center', 'Hearst Tower'],
    correct: 'Bank of America Corporate Center'
  }
];

var number = 7;
var count = 0;
var answer, answers, question, intervalId;
var correct = 0;
var incorrect = 0;
var unanswered = 0;



function start() {
  count = correct = incorrect = unanswered = 0;
  number = 7;
  $('.end').html('');
  $('.restart').css('display', 'none');
  $('.game-start').css('display', 'none');
  $('.game-content').css('display', 'grid');
  $("#timer").html(number);
  run();
}

function choose(ans) {
  if (ans === answer) {
    stop();
    correct ++;
    $('.answers').html(`
      <p style="color: lime;">${ans} is CORRECT!</p>`);
    pause(count);
  }
  else if (ans === 'OUT'){
    unanswered ++;
    $('.answers').html(`
      <p style="color: red;">OUT OF TIME!</p>
      <p>CORRECT ANSWER IS ${answer}</p>
      `);
    pause(count);
  }
  else {
    stop();
    incorrect ++;
    $('.answers').html(`
      <p style="color: red;">${ans} is INCORRECT!</p>
      <p>CORRECT ANSWER IS ${answer}</p>`);
    pause(count);
  }
}

function run() {
  $('.answers').html('');
  question = questions[count].question;
  answers = questions[count].answers;
  answer = questions[count].correct;
  $('.question').html(question);
  answers.forEach((answer, index) => {
    var choice = `<h4 class="answer" id="q${index}">${answer}</h4>`;
    $('.answers').append(choice);
  });
  intervalId = setInterval(decrement, 1000);
}

function decrement() {
  number--;
  $("#timer").html(number);
  if (number === 0) {
    stop();
    choose('OUT');
  }
}

function pause(time) {
  if(time === questions.length -1){
    $('.end').html(`
      <p>CORRECT ANSWERS: ${correct}</p>
      <p>INCORRECT ANSWERS: ${incorrect}</p>
      <p>UNANSWERED QUESTIONS: ${unanswered}</p>
      `);
    $('.restart').css('display', 'block').on('click', start);
  } else {
    setTimeout(() => {
      count++;
      number = 7;
      $("#timer").html(number);
      run();
    }, 3000);
  }
}

function stop() {
  clearInterval(intervalId);
}

$('.start').on('click', start);
$('.answers').on('click', '.answer', (event) => {
  var myAnswer = event.target.innerText;
  choose(myAnswer);
});