const video = document.querySelector('.player__video');
const play = document.querySelector('.toggle');
const sliders = document.querySelectorAll('.player__slider');
const skips = document.querySelectorAll('[data-skip]');
const progress = document.querySelector('.progress');
const progressBar = document.querySelector('.progress__filled');


video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

play.addEventListener('click', togglePlay);
skips.forEach(button => button.addEventListener('click', handleButton));
sliders.forEach(slider => slider.addEventListener('change', handlerSlider));

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);


function togglePlay() {
    video.paused ? video.play() : video.pause()
}

function updateButton() {
    play.textContent = this.paused ? '►' : '❚ ❚';
}

function handleButton(e) {
    video.currentTime += +(this.dataset.skip);
}

function handlerSlider(e) {
    video[this.name] = this.value;
}

function handleProgress(e) {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}