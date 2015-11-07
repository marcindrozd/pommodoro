var clockRunning = false;
var startingTime;
var originalTime;
var timeLeft;
var runningTimer;
var currentTimer = 'work';

$(document).ready(function() {
  originalTime = $('#timer').text() * 60;

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
    if (!clockRunning) { 
      timeLeft = null;
      plusOne(event.target);
      updateSessionClock(event.target);
      originalTime = $('#timer').text() * 60;
    }
  });
  
  $('#sub-session').click(function(event) { 
    if (!clockRunning) { 
      timeLeft = null;
      minusOne(event.target);
      updateSessionClock(event.target);
      originalTime = $('#timer').text() * 60;
    }
  });
  
  $('#add-break').click(function(event) { 
    if (!clockRunning) { 
      timeLeft = null;
      plusOne(event.target);
    }
  });
  
  $('#sub-break').click(function(event) { 
    if (!clockRunning) { 
      timeLeft = null;
      minusOne(event.target);
    }
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

    runningTimer = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.text(minutes + ":" + seconds);

        if (--timer < 0) {
            timer = duration;
            playChime();
            switchTimer();
        }

        timeLeft = timer;
        $('#progress-bar').css('height', (Math.floor(((originalTime - timeLeft) / originalTime) * 100)) + '%');
    }, 1000);
    clockRunning = true;
}

function pauseTimer() {
  clockRunning = false;
  clearInterval(runningTimer);
}

function switchTimer() {
  timeLeft = null;
  var timerType;

  if (currentTimer == 'work') {
    timerType = $('#break-time').val();
    selectTimer('break', timerType);
  }
  else if (currentTimer == 'break') {
    timerType = $('#session-time').val();
    selectTimer('break', timerType);
  }
}

function selectTimer(current, timerType) {
  clearInterval(runningTimer);
  currentTimer = current;
  $('#clock-title').text(currentTimer);
  $('#timer').text(timerType);
  originalTime = startingTime = $('#timer').text() * 60;
  startTimer(startingTime, $('#timer'));
}

function playChime() {
  $('#chime')[0].play();
}
