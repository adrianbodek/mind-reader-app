const express = require('express');
const app = express();
const path = require('path');
const nodemailer = require('nodemailer');

const PORT = 3000;

// Konfiguracja transportera do Gmaila
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'adrianbodek00@gmail.com',
    pass: 'ztwt nadz foyq pcvm'
  }
});

// Funkcja wysyłająca maila z wynikiem
function sendResultEmail(recipient, result) {
  const mailOptions = {
    from: 'adrianbodek00@gmail.com',
    to: recipient,
    subject: 'Your Result in Mind Reader App',
    text: `Your result is: ${result}`
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Błąd przy wysyłaniu maila:', error);
    } else {
      console.log('E-mail wysłany:', info.response);
    }
  });
}

// Middleware do obsługi plików statycznych i JSON
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Endpoint POST do odgadywania numeru i wysyłki maila
app.post('/guess', (req, res) => {
  const { number, email } = req.body; // oczekujemy JSON z number i email

  // Symulacja myślenia przez 10 sekund
  setTimeout(() => {
    res.send({ guess: number }); // Najpierw wysyłamy odpowiedź do użytkownika!
    if (email) {
      // Wysyłka maila asynchronicznie, już po wysłaniu odpowiedzi
      sendResultEmail(email, number);
    }
  }, 10000); // 10-sekundowe opóźnienie (animacja)
});

// Start serwera
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});