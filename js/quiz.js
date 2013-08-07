$(document).ready(function(){

var questions = [
{question: "What is the closest planet to the sun?",
 choices: ["Mercury","Mars","Earth","Saturn"],
 quesNum: 1,
 correctAns: 0},

 {question: "What is the name of the 2nd biggest planet in our solar system?",
 choices: ["Jupiter","Uranus","Pluto","Saturn"],
 quesNum: 2,
 correctAns: 3},

 {question: "What is the hottest planet in our solar system?",
 choices: ["Mercury","Mars","Venus","Earth"],
 quesNum: 3,
 correctAns: 2},

 {question: "What is the planet famous for the big red spot on it?",
 choices: ["Pluto","Jupiter","Neptune","Mars"],
 quesNum: 4,
 correctAns: 1},

 {question: "What is the planet famous for the beautiful rings around it?",
 choices: ["Saturn","Venus","Earth","Uranus"],
 quesNum: 5,
 correctAns: 0}
 ];

 //Question Number
 $("div#main p:first").text("Question " + questions[0].quesNum + " of " + questions.length);

 //Global Variables
 var questionNumber = 0;
 var correctAnswers = 0;
 var counter = 0;
 var userAnswers = new Array();

 //On Submit Button
 $("button#submit").on("click",function(){ 		 	
 	checkAnswer();
 	questionNumber++;

 	if(questionNumber === questions.length){
 	 	$(this).css("display","none");
 	 	$("#review").css("display","block"); 	 	
	}
	else {
		nextQuestion();	
	};	
 });

//On Review Button
$("button#review").on("click",function(){
 	fade("#main","fast","#revSection",1000);
	reviewQuestions(); 	
 });

//On Restart Quiz Button
$("button#restart").on("click",function(){	
 	restart();
 	nextQuestion();
})

//Utility function for fading out sections
function fade(sectionOut, speed1, sectionIn, speed2){
	$(sectionOut).fadeOut(speed1);
	$(sectionIn).fadeIn(speed2);
}

//Move to next question - update question & answers
function nextQuestion(){
	$("div#main p:first").text("Question " + questions[questionNumber].quesNum + " of " + questions.length);
	$("#quizQuest").text(questions[questionNumber].question);

	var multChoice = $.each(questions[questionNumber].choices,function(index,value){value});
	$("fieldset#mainSec label").remove();
	$.each(multChoice,function(index,value){
		$("fieldset#mainSec").append("<label class='radio'><input type='radio' name='check' data-ans=" + index +">"+value+"</label>");
		});				                  
	}

//Check user answer against correct answer - store user answer & keep count fo right or wrong answers
function checkAnswer(){
	var userAns = $("input[type=radio]:checked").data("ans");
	userAnswers.push(userAns);
	
 	if(userAns === questions[counter].correctAns) {
 		correctAnswers++;
 	} 
	counter++;
	}

//Review questions 
function reviewQuestions(){
	$("#revSection h1,#revSection p,#revSection label").remove();
	$("#revSection").prepend("<h1>You Got " + correctAnswers + " Out Of " + questions.length + " Questions Right!</h1>").show();

	for(var i = 0; i < questions.length; i++){
		$("#revSection").append("<p class='revQuest'>Question " + questions[i].quesNum +"</p>" + 
			"<p id='q" + i + "'" + "><span class='wrong'>&#10008;</span><span class='right'>&#10004;</span>" +
			questions[i].question + "<span id='rightAns'>&nbsp;&nbsp;The right answer is " 
			+ questions[i].choices[questions[i].correctAns] + "." + "</p>");
		
		var multChoice = $.each(questions[i].choices,function(index,value){value});
		$.each(multChoice,function(index,value){
			$("#revSection").append("<label class='radio'><input type='radio' name='check' data-ans=" + index +">"+value+"</label>");
			});

		if(userAnswers[i] === questions[i].correctAns){
			$("#q"+i+" span.right").show();
		}else {
			$("#q"+i+" span.wrong").show();
			}
		}
	}

//Restart Quiz
function restart(){
	questionNumber = 0;
 	correctAnswers = 0;
 	counter = 0;
 	userAnswers = new Array();	
 	$("#submit").css("display","block");
 	$("#review").css("display","none");
 	fade("#revSection",50,"#main",1000);
}


});
