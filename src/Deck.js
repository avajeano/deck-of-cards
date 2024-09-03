import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card";

const API_BASE_URL = "https://deckofcardsapi.com/api/deck";

const Deck = () => {
    const [deck, setDeck] = useState(null);
    const [drawn, setDrawn] = useState([]);
    const [isShuffling, setIsShuffling] = useState(false);

    // retrieves a new shuffled deck of cards 
    useEffect(function loadDeck() {
        async function newDeck() {
            const d = await axios.get(`${API_BASE_URL}/new/shuffle/`);
            setDeck(d.data);
        }
        newDeck();
        // empty array tells useEffect, run this callback after the first render 
    }, []);

    async function draw() {
        try {
            const drawResponse = await axios.get(`${API_BASE_URL}/${deck.deck_id}/draw/`);
            const card = drawResponse.data.cards[0];
            setDrawn(d => [
                ...d,
                {
                    id: card.code,
                    name: card.suit + " " + card.value,
                    image: card.image,
                },
            ]);
        }   catch(err) {
            alert(err);
        }
    }

    async function startShuffling() {
        setIsShuffling(true);
        try {
            await axios.get(`${API_BASE_URL}/${deck.deck_id}/shuffle/`);
            setDrawn([]);
        } catch (err) {
            alert(err);
        } finally {
            setIsShuffling(false);
        }
    }

    function drawButton() {
        if (!deck) return null;

        return (
            <button onClick={draw} disabled={isShuffling}>draw card</button>
        );
    }

    function shuffleButton() {
        if (!deck) return null;

        return (
            <button onClick={startShuffling} disabled={isShuffling}>shuffle deck</button>
        );
    }

    return (
        <div>
            {drawButton()}
            {shuffleButton()}
            <div>
                {drawn.map(c => (<Card key={c.id} name={c.name} image={c.image} />))}
            </div>
        </div>
    )
}

export default Deck;