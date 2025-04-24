
// rippeles effect start
$(document).ready(function () {
  $(".mainContent").ripples({
    dropRadius: 30,
    perturbance:0.005,
  });
});
// rippeles effect end



// Register start

const switchers = [...document.querySelectorAll('.switcher')]

switchers.forEach(item => {
	item.addEventListener('click', function() {
		switchers.forEach(item => item.parentElement.classList.remove('is-active'))
		this.parentElement.classList.add('is-active')
	})
})


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
