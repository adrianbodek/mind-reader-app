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

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Endpoint POST do wysyłki maila (od razu po odebraniu żądania)
app.post('/guess', (req, res) => {
  const { number, email } = req.body;
  res.send({ ok: true }); // Odpowiada natychmiast
  if (email) sendResultEmail(email, number);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});