var clockRunning = false;
var startingTime;
var timeLeft;

$(document).ready(function() {
  $('#clock').click(function() {
    if (clockRunning) {
      pauseTimer()
    } else {
      startingTime = $('#timer').text() * 60;

      if (timeLeft) {
        startingTime = timeLeft;
      }

      startTimer(startingTime, $('#timer'));
    }    
  });
  
  $('#add-session').click(function(event) { 
    plusOne(event.target);
    updateSessionClock(event.target);
  });
  
  $('#sub-session').click(function(event) { 
    minusOne(event.target);
    updateSessionClock(event.target);
  });
  
  $('#add-break').click(function(event) { 
    plusOne(event.target);
  });
  
  $('#sub-break').click(function(event) { 
    minusOne(event.target);
  });
});

function plusOne(el) {
  var currentValue =  parseInt($(el).closest('div').find('input').attr('value'));  $(el).closest('div').find('input').attr('value', currentValue += 1);
}

function minusOne(el) {
  var currentValue =  parseInt($(el).closest('div').find('input').attr('value'));
  if (currentValue == 0) {
    return 0;
  } else {  $(el).closest('div').find('input').attr('value', currentValue -= 1);
  }
}

function updateSessionClock(el) {
  var currentValue =  $(el).closest('div').find('input').attr('value');
  $('#timer').text(currentValue);
}

function startTimer(duration, display) {
    var timer = duration;
    var minutes, seconds;

    currentTimer = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.text(minutes + ":" + seconds);

        if (--timer < 0) {
            timer = duration;
        }

        timeLeft = timer;

    }, 1000);
    clockRunning = true;
}

function pauseTimer() {
  clockRunning = false;
  clearInterval(currentTimer);
}
