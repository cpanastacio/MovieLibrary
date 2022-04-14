import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import "./App.css";

import Header from "./components/Header/Header";
import CardWrapper from "./components/CardWrapper/CardWrapper";
import MovieDetails from "./components/MovieDetails/MovieDetails";

function App() {
    return (
        <div className="App">
            <Header />
            <Router>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <Container>
                                <CardWrapper />
                            </Container>
                        }
                    ></Route>
                    <Route path={`/tv:title`} element={<MovieDetails />}></Route>
                    <Route path={`*`} element={<h1>404. Page not found!</h1>}></Route>
                </Routes>
            </Router>
        </div>
    );
}

export default App;
