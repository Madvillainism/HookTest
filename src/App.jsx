import useFetch from "./useFetch";
import { useState } from "react";
import { Container, Row, Button, Form } from "react-bootstrap";
import "./app.css";
import axios from "axios";

function App() {
  const { data, loading, error, reFetch } = useFetch(
    "https://dog.ceo/api/breeds/image/random"
  );

  const { data: perro } = useFetch("http://localhost:3000/dogs");

  const { data: usuario } = useFetch("http://localhost:3000/users");

  //POST

  const sendUser = () => {
    axios
      .post("http://localhost:3000/users", {
        email: msg,
        password: pass,
      })
      .then((res) => console.log(res));
  };

  const [msg, setMsg] = useState("");
  const [pass, setPass] = useState("");

  const dog = data?.message;

  const onFormSubmit = (e) => {
    e.preventDefault();
    console.log("The email is: " + msg);
    console.log("The password is : " + pass);
    sendUser();
  };

  if (loading) return <h1>CARGANDO PERRUKIO</h1>;

  if (error) console.log(error);

  return (
    <>
      <div className="container">
        <Container>
          <Row className="boot md">
            <h2>DOG?S PLACE</h2>
            <img src={dog} style={{ width: "300px", height: "300px" }}></img>
            <Button onClick={reFetch}>GET NEW DOGS </Button>
          </Row>
          <Row className="boot md ">
            <Form onSubmit={onFormSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  onChange={(e) => {
                    setMsg(e.target.value);
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={(e) => {
                    setPass(e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Row>
          <button
            onClick={() => {
              console.log("El perro favorito del dev es: " + perro?.breed);
              console.log(
                "La info del dev es: " + usuario.email + usuario.password
              );
            }}
          >
            GET DOG INFO
          </button>
        </Container>
      </div>
    </>
  );
}

export default App;
