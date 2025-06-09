function readMyMind() {
  const userNumber = document.getElementById('userInput').value;
  const userEmail = document.getElementById('userEmail').value;
  if (!userNumber) {
    alert('Please enter a number!');
    return;
  }
  if (!userEmail) {
    alert('Please enter your email!');
    return;
  }

  // Reset previous state
  clearAllSteps();
  document.getElementById('revealText').style.display = 'none';

  const explosionGif = document.getElementById('explosionGif');
  explosionGif.style.display = 'none';
  // Ensure animation is re‐triggered on each click
  explosionGif.style.animation = 'none';
  // Force reflow then restore animation
  void explosionGif.offsetWidth;
  explosionGif.style.animation = '';

  // Show loading bar
  const loadingContainer = document.getElementById('loadingContainer');
  const loadingBar = document.getElementById('loadingBar');
  loadingContainer.style.display = 'block';
  loadingBar.style.width = '0%';

  // Show second loading GIF
  const loadingGif = document.getElementById('loadingGif');
  loadingGif.style.display = 'block';

  // Start filling over 8 seconds
  setTimeout(() => {
    loadingBar.style.width = '100%';
  }, 50);

  // Steps timing (in ms)
  const steps = [
    { id: 'step1', delay: 0 },
    { id: 'step2', delay: 2000 },
    { id: 'step3', delay: 4000 },
    { id: 'step4', delay: 6000 }, // Shows at 6s
  ];

  // Show each step in turn (2s apart), hiding the previous one
  steps.forEach((stepObj, index) => {
    setTimeout(() => {
      if (index > 0) {
        document.getElementById(steps[index - 1].id).style.display = 'none';
      }
      if (stepObj.id === 'step4') {
        // Generate large number
        const xNumber = Math.random().toFixed(20).replace('0.', '6.37E+');
        document.getElementById('step4').innerText =
          `CALCULATING ${xNumber} POSSIBLE COMBINATIONS...`;
      }
      document.getElementById(stepObj.id).style.display = 'block';
    }, stepObj.delay);
  });

  // After 8 seconds, send the request and reveal result
  setTimeout(() => {
    document.getElementById('step4').style.display = 'none';
    loadingContainer.style.display = 'none';
    loadingGif.style.display = 'none';

    // Send POST to backend (number + email)
    fetch('/guess', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ number: userNumber, email: userEmail })
    })
    .then(res => res.json())
    .then(data => {
      // Show final reveal text
      const revealText = document.getElementById('revealText');
      revealText.innerText = `You were thinking of the number ${userNumber} 😱😲`;
      revealText.style.display = 'block';
      // Show explosion GIF (2-second fadeIn/fadeOut)
      explosionGif.style.display = 'block';
    })
    .catch(error => {
      alert('Wystąpił błąd przy wysyłaniu żądania!');
      console.error(error);
    });
  }, 8000);
}

// Utility to hide all step paragraphs
function clearAllSteps() {
  document.querySelectorAll('.step').forEach(el => {
    el.style.display = 'none';
  });
}