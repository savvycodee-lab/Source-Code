// Grab button
const btn = document.querySelector(".magnetic-btn");

// Strength of magnetic pull
const strength = 150;

document.addEventListener("mousemove", (e) => {
  const rect = btn.getBoundingClientRect();

  // Find the center of the button
  const btnX = rect.left + rect.width / 2;
  const btnY = rect.top + rect.height / 2;

  // Distance from mouse to button center
  const distX = e.clientX - btnX;
  const distY = e.clientY - btnY;

  // Total distance
  const distance = Math.sqrt(distX * distX + distY * distY);

  // Animate with GSAP
  if (distance < strength) {
    gsap.to(btn, {
      x: distX * 0.3,
      y: distY * 0.3,
      duration: 0.3,
      ease: "power3.out",
    });
  } else {
    gsap.to(btn, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.4)",
    });
  }
});
