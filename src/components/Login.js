import React from 'react';

const Login = ({ onLogin }) => (
  <div>
    <p>Login</p>
    <button
      onClick={() => onLogin({ email: 'test@test.fr', token: 'whatever' })}
    >
      Next
    </button>
  </div>
);

export default Login;