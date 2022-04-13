import React from "react";
import Header from "./components/Header/Header";
import CardWrapper from "./components/CardWrapper/CardWrapper";
import { Container } from "react-bootstrap";
import "./App.css";

function App() {
    return (
        <div className="App">
            <Header />
            <Container>
                <CardWrapper />
            </Container>
        </div>
    );
}

export default App;
