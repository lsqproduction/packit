import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import './Login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <Form>
      <Form.Group controlId="formGroupEmail">
        <Form.Control type="email" placeholder="Enter email" />
      </Form.Group>
      <Form.Group controlId="formGroupPassword">
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      <Button className="button">SIGN IN</Button>
    </Form>
  );
}
