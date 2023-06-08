
class Login {
    constructor() {
      const loginForm = document.querySelector('#loginForm');
      this._doLogin = this._doLogin.bind(this);
      loginForm.addEventListener('submit', this._doLogin);
    }
  
    _doLogin(event) {
      event.preventDefault();
      const username = document.querySelector("#username").value;
      const password = document.querySelector("#password").value;
  
      // Realizar las acciones necesarias para el inicio de sesión, por ejemplo, enviar los datos al servidor
      // Aquí puedes utilizar fetch o AJAX para enviar los datos al servidor y manejar la respuesta
  
      // Ejemplo de uso de fetch:
      const loginData = {
        username: username,
        password: password
      };
  
      fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
      })
        .then(response => {
          if (response.ok) {
            window.location.href = '/index'; // Redirigir a la página de inicio de sesión exitoso
          } else {
            // Manejar error de inicio de sesión
            console.error('Error en el inicio de sesión');
          }
        })
        .catch(error => {
          console.error('Error en el inicio de sesión', error);
        });
    }
  }
  
  const login = new Login();

  fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(loginData)
  })
  
  

  class Login {
    constructor() {
      const loginForm = document.querySelector('#loginForm');
      this._doLogin = this._doLogin.bind(this);
      loginForm.addEventListener('submit', this._doLogin);
    }
  
    _doLogin(event) {
      event.preventDefault();
      const username = document.querySelector("#username").value;
      const password = document.querySelector("#password").value;
  
      // Realizar las acciones necesarias para el inicio de sesión, por ejemplo, enviar los datos al servidor
      // Aquí puedes utilizar fetch o AJAX para enviar los datos al servidor y manejar la respuesta
  
      // Ejemplo de uso de fetch:
      const loginData = {
        username: username,
        password: password
      };
  
      fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
      })
        .then(response => {
          if (response.ok) {
            window.location.href = '/index'; // Redirigir a la página de inicio de sesión exitoso
          } else {
            // Manejar error de inicio de sesión
            console.error('Error en el inicio de sesión');
          }
        })
        .catch(error => {
          console.error('Error en el inicio de sesión', error);
        });
    }
  }
  

  