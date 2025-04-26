
// rippeles effect start
$(document).ready(function () {
  $(".mainContent").ripples({
    dropRadius: 30,
    perturbance:0.005,
  });
});
// rippeles effect end



// Register start

document.addEventListener('DOMContentLoaded', function() {
  const optionButtons = document.querySelectorAll('.option-btn');
  const participantForm = document.getElementById('participantForm');
  const coderForm = document.getElementById('coderForm');
  const optionButtonsContainer = document.getElementById('optionButtons');
  const backFromParticipant = document.getElementById('backFromParticipant');
  const backFromCoder = document.getElementById('backFromCoder');
  const participantRegistration = document.getElementById('participantRegistration');
  const coderRegistration = document.getElementById('coderRegistration');
  const card = document.querySelector('.card');

  optionButtons.forEach(button => {
      button.addEventListener('click', function() {
          // Remove active class from all buttons
          optionButtons.forEach(btn => btn.classList.remove('active'));
          
          // Add active class to clicked button
          this.classList.add('active');
          
          // Animate card
          card.style.transform = 'translateY(-5px) rotateX(5deg)';
          setTimeout(() => {
              card.style.transform = 'translateY(0) rotateX(0)';
          }, 300);
          
          // Hide all forms
          participantForm.classList.remove('active');
          coderForm.classList.remove('active');
          
          // Show the selected form
          const option = this.getAttribute('data-option');
          if (option === 'participant') {
              setTimeout(() => {
                  participantForm.classList.add('active');
              }, 200);
          } else if (option === 'coder') {
              setTimeout(() => {
                  coderForm.classList.add('active');
              }, 200);
          }
          
          // Hide the option buttons
          optionButtonsContainer.style.display = 'none';
      });
  });

  backFromParticipant.addEventListener('click', function(e) {
      e.preventDefault();
      participantForm.classList.remove('active');
      setTimeout(() => {
          optionButtonsContainer.style.display = 'flex';
          optionButtons.forEach(btn => btn.classList.remove('active'));
      }, 300);
  });

  backFromCoder.addEventListener('click', function(e) {
      e.preventDefault();
      coderForm.classList.remove('active');
      setTimeout(() => {
          optionButtonsContainer.style.display = 'flex';
          optionButtons.forEach(btn => btn.classList.remove('active'));
      }, 300);
  });

  participantRegistration.addEventListener('submit', function(e) {
      e.preventDefault();
      // Add loading animation
      const btn = this.querySelector('.submit-btn');
      btn.innerHTML = '<span>Processing...</span>';
      setTimeout(() => {
          btn.innerHTML = '<span>Registration Successful!</span>';
          setTimeout(() => {
              btn.innerHTML = '<span>Register as Participant</span>';
          }, 2000);
      }, 1500);
  });

  coderRegistration.addEventListener('submit', function(e) {
      e.preventDefault();
      // Add loading animation
      const btn = this.querySelector('.submit-btn');
      btn.innerHTML = '<span>Processing...</span>';
      setTimeout(() => {
          btn.innerHTML = '<span>Registration Successful!</span>';
          setTimeout(() => {
              btn.innerHTML = '<span>Register as Coder</span>';
          }, 2000);
      }, 1500);
  });

  // Floating label effect
  document.querySelectorAll('.form-group input').forEach(input => {
      input.addEventListener('focus', function() {
          this.parentNode.querySelector('label').style.transform = 'translateY(-25px) scale(0.9)';
          this.parentNode.querySelector('label').style.color = '#4a6fa5';
      });
      
      input.addEventListener('blur', function() {
          if (!this.value) {
              this.parentNode.querySelector('label').style.transform = '';
              this.parentNode.querySelector('label').style.color = '';
          }
      });
      
      // Initialize labels if input has value
      if (input.value) {
          input.parentNode.querySelector('label').style.transform = 'translateY(-25px) scale(0.9)';
      }
  });
});

// Register end

// scrollReal start
const sr = ScrollReveal({
  origin: 'top',
  distance: '20px',
  duration: 2000,
  reset: true
});

sr.reveal('section', { delay: 300 });

// scrollReal end


// line Path start
const svg = document.querySelector('svg.squiggle')
const path = svg.querySelector('path')

const scroll = () => {
  const distance = window.scrollY
  const totalDistance = svg.clientHeight - window.innerHeight

  const percentage = distance / totalDistance

  const pathLength = path.getTotalLength()

  path.style.strokeDasharray = `${pathLength}`
  path.style.strokeDashoffset = `${pathLength * (1 - percentage)}`
}

// scroll()
window.addEventListener('scroll', scroll)

// line Path end

// clockdown start
const timeInDay = 2;
const currentTime = Date.parse(new Date());
const deadline = new Date(currentTime + timeInDay*24*60*60*1000);
// for a timer count down in minute
//const deadline = 'December 31 2030 23:59:59 GMT+0200';
// for count down untill a date

function getTimeRemaining(endtime){
  const total = Date.parse(endtime) - Date.parse(new Date());
  const seconds = Math.floor( (total/1000) % 60 );
  const minutes = Math.floor( (total/1000/60) % 60 );
  const hours = Math.floor( (total/(1000*60*60)) % 24 );
  const days = Math.floor( total/(1000*60*60*24) );

  return {
    total,
    days,
    hours,
    minutes,
    seconds
  };
}

function initializeClock(clockClass, endtime) {
  const clock = document.querySelector(clockClass);
  const daysSpan = clock.querySelector('.days');
  const hoursSpan = clock.querySelector('.hours');
  const minutesSpan = clock.querySelector('.minutes');
  const secondsSpan = clock.querySelector('.seconds');
  function updateClock(){
  const t = getTimeRemaining(endtime);
  daysSpan.innerHTML = ('0' + t.days).slice(-2);
  hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
  minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
  secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);
  if (t.total <= 0) {
    clearInterval(timeinterval);
    }
  }
  updateClock(); // run function once at first to avoid delay
  var timeinterval = setInterval(updateClock,1000);
  }

initializeClock('.clock', deadline);

// clockdown end
