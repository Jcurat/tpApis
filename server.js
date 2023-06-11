

const express = require('express');
const app = express();

// Resto del código del servidor

const port = 3000;
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});

