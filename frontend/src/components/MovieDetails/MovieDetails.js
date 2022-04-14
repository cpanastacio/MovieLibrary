import React from "react";
import { useLocation } from "react-router-dom";

const MovieDetails = () => {
    const state = {
        id: useLocation().state.id,
        title: useLocation().state.title,
    };
    return <h1>{state.title}</h1>;
};

export default MovieDetails;
