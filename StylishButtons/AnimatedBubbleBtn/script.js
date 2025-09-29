// Animated Bubble Buttons JavaScript by Anaroul Hasan

const bubbleConfig = [
  { class: 'bubble-1', background: '#ff007f', top: '-20%', left: '-10%', animation: 'moveUpRight 6s ease-in-out infinite', delay: '0s' },
  { class: 'bubble-2', background: '#ff6a00', top: '0%', left: '10%', animation: 'moveDownLeft 5s ease-in-out infinite', delay: '1s' },
  { class: 'bubble-3', background: '#ffcc00', top: '20%', left: '50%', animation: 'moveRight 4s ease-in-out infinite', delay: '2s' },
  { class: 'bubble-4', background: '#00fff0', top: '-20%', left: '70%', animation: 'moveUpLeft 7s ease-in-out infinite', delay: '3s' },
  { class: 'bubble-5', background: '#9d00ff', top: '30%', left: '-10%', animation: 'moveDownRight 3s ease-in-out infinite', delay: '4s' },
  { class: 'bubble-6', background: '#ff007f', top: '-10%', left: '30%', animation: 'moveLeft 8s ease-in-out infinite', delay: '0.5s' },
  { class: 'bubble-7', background: '#ff6a00', top: '40%', left: '60%', animation: 'moveUp 6s ease-in-out infinite', delay: '1.5s' }
];

const buttons = document.querySelectorAll('.animation');

buttons.forEach(button => {
  bubbleConfig.forEach(config => {
    const bubble = document.createElement('div');
    bubble.classList.add('bubble-layer', config.class);
    bubble.style.background = config.background;
    bubble.style.top = config.top;
    bubble.style.left = config.left;
    bubble.style.animation = config.animation;
    bubble.style.animationDelay = config.delay;
    button.insertBefore(bubble, button.firstChild);
  });
});