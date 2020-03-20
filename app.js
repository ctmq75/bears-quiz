function startQuiz() {
    $('#start').on('click', function(e){
      renderAQuestion();
    }
    )};

function updateAnswers(){
      let question = STORE.questions[STORE.currentQuestion];
      for(let i=0; i<question.answers.length; i++)
      {
        $('.js-answers').append(`<ul id='answersList'>
            <li><input tabindex= "${i + 1}" type = "radio" name="answers" id="answers${i+1}" value= "${question.answers[i]}" >
            <label for="answer${i+1}"> ${question.answers[i]}</label> <br/>
            <span id="js-r${i+1}"></span></li>            
            </ul>
        `);
      }
      
    }
 
function updateQuestionAndScore() {
    const text = $(`<ul id='qsList'>
        <li id="js-answered">Question: ${STORE.currentQuestion + 1}/${STORE.questions.length}</li>
        <li id="js-score">Score: ${STORE.score}/${STORE.questions.length}</li>
      </ul>`);
        $(".questionAndScore").html(text);
    }

function renderAQuestion() {
      let question = STORE.questions[STORE.currentQuestion];
        updateQuestionAndScore();
        const questionText = $(`
        <section role='form'>
          <form id="js-questions" class="question-form">
            
            <fieldset class='container'>
              <div class="box question">
                <legend> ${question.question}</legend>
              </div>
      
              <div class="box answers">
                <div class="js-answers"> </div>
              </div>
      
              <div class="">
                <button type = "submit" id="answer" tabindex="5">Submit</button>
                <button type = "button" id="next-question" tabindex="6"> Next Question</button>
              </div>
            </fieldset>
          </form>
        </section>`);
      $("main").html(questionText);
      updateAnswers();
      $("#next-question").hide();
}

function handleSelectedAnswer() {
        $('body').on("submit",'#js-questions', function(event) {
          event.preventDefault();
          let currentQuestion = STORE.questions[STORE.currentQuestion];
          let selectedOption = $("input[name=answers]:checked").val();
          if (!selectedOption) {
            alert("Choose an answer!");
            return;
          } 
          let id_num = currentQuestion.answers.findIndex(i => i === selectedOption);
          let id = "#js-r" + ++id_num;
          if(selectedOption === currentQuestion.correctAnswer) {
            STORE.score++; 
            $(`${id}`).closest('.box').html(`Correct! Great Job!<br/><img class='resultImg' src='https://www.tracking-board.com/wp-content/uploads/2017/12/85-Bears.jpg' alt='happy bears coach'><br>"${currentQuestion.correctAnswer}" is correct!`);
          }
          else {
            $(`${id}`).closest('.box').html(`WRONG!!! <br/><img class='resultImg' src='https://littlebylisten.files.wordpress.com/2012/09/6a00e551db9e1a88340120a69d1507970b.jpg' alt='sad bears player'><br> The answer is "${currentQuestion.correctAnswer}"<br/>`);
            
          }
      
          STORE.currentQuestion++;
          $("#js-score").text(`Score: ${STORE.score}/${STORE.questions.length}`);
          $('#answer').hide();
          $("input[type=radio]").attr('disabled', true);
          $('#next-question').show();
        });
      }



function handleQuestions() {
    $('body').on('click','#next-question', (event) => {
      STORE.currentQuestion === STORE.questions.length?displayResults() : renderAQuestion();
            });
      }

function restartQuiz() {
    $('body').on('click','#restart', (event) => {
      renderAQuestion();
    });
      }      

function displayResults() {
    let resultText = $(
        `<div class="results">
        <form id="js-restart-quiz">
          <fieldset class='container'>
                <div>
                  <div class="">
                    <legend>Your Score is: ${STORE.score}/${STORE.questions.length}</legend>
                  </div>
                  <div id='gifContainer'>
                  <iframe alt='bears fans animated gif' src="https://giphy.com/embed/KAftf53Ras7ao"  frameBorder="0" id="gif" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/football-chicago-bears-nfl-KAftf53Ras7ao"></a></p>
                  </div>
                </div>
              
                <div class="">
                  <div class="">
                    <button type="button" id="restart"> Restart Quiz </button>
                  </div>
                </div>
              </fieldset>
          </form>
          </div>`);
          STORE.currentQuestion = 0;
          STORE.score = 0;
        $("main").html(resultText);
      }
function handleQuizApp() {
        startQuiz();
        handleQuestions();
        handleSelectedAnswer();
        restartQuiz();
    
      }
      
$(handleQuizApp);

const STORE = {
  questions: [
  {
    question: 'In which city were the Bears originally founded?',
    answers: [
      'Decatur, IL',
      'Chicago, IL',
      'St. Louis, MO',
      'South Bend, IN'
    ],
    correctAnswer:
      'Decatur, IL'
  },
  {
      question: 'How much did George Halas pay for the Chicago Bears franchise in 1921?',
      answers: [
        '$100,000',
        '$10,000',
        '$100',
        '$1,000'
      ],
      correctAnswer:
        '$100'
    },
    {
      question: 'Which Chicago Bear was nicknamed "The Refrigerator"?',
      answers: [
        'Walter Payton',
        'William Perry',
        'Gale Sayers',
        'Jay Cutler'
      ],
      correctAnswer:
        'William Perry'
    },
    {
    question: 'What was the Bears\' original mascot?',
    answers: [
      'Staleys',
      'Bulldogs',
      'Eagles',
      'Bulls'
    ],
    correctAnswer:
      'Staleys'
  },
  {
  question: 'What is the name of the Super Bowl song and dance created by the 1985 Bears?',
  answers: [
    'Super Bowl Shutout',
    'Super Bowl Shuffle',
    'Super Bowl Swing',
    'Super Bowl Swag'
  ],
  correctAnswer:
    'Super Bowl Shuffle'
  },
  {
      question: 'Which Chicago Bear was nicknamed "Sweetness"?',
      answers: [
        'Brian Urlacher',
        'Jay Cutler',
        'Mike Ditka',
        'Walter Payton'
      ],
      correctAnswer:
        'Walter Payton'
  },
  {
      question: 'Who is considered the founder of the Chicago Bears?',
      answers: [
        'Michael McCaskey',
        'Dutch Sternaman',
        'George Halas',
        'John Gruden'
      ],
      correctAnswer:
        'George Halas'
  },
  {
      question: 'Which Chicago Bear won Rookie of the Year in 2000?',
      answers: [
        'Brian Urlacher',
        'Devin Hester',
        'Lance Briggs',
        'Matt Forte'
      ],
      correctAnswer:
        'Brian Urlacher'
  },
  {
      question: 'Which Quarterback led the Bears to win the 1985 Super Bowl?',
      answers: [
        'Jay Cutler',
        'Jim McMahon',
        'Steve Young',
        'Dan Marino'
      ],
      correctAnswer:
        'Jim McMahon'
  },
  {
      question: 'In the 2019 Divisional Playoff game, this Bears kicker missed the game winning field goal with his "double doink" off the goal post?',
      answers: [
        'Cody Parkey',
        'Robbie Gould',
        'Adam Vinateiri',
        'Joe Montana'
      ],
      correctAnswer:
        'Cody Parkey'
  }],

  currentQuestion: 0,
  score: 0

}


    