import React, { useState } from "react";
import ChoiceSelector from "../common/ChoiceSelector";
import styled from "styled-components";

// List of entertainment APIs
const entertainmentOptions = [
  { label: "Joke", value: "joke", api: "https://v2.jokeapi.dev/joke/Any" },
  { label: "Quote", value: "quote", api: "https://api.quotable.io/random" },
  { label: "Anime", value: "anime", api: "https://api.jikan.moe/v4/random/anime" },
  { label: "Cricket", value: "cricket", api: "https://api.cricapi.com/v1/currentMatches?apikey=f68d1cb5-a9c9-47c5-8fcd-fbfe52bace78" },
  { label: "Urban Dictionary", value: "urban", api: "https://api.urbandictionary.com/v0/define?term=" },
  { label: "NPM Search (music)", value: "npm", api: "https://weeb-api.vercel.app/npm?query=music:" },
];

// Playful button
const GetButton = styled.button`
  background: ${({ theme }) => theme.rainbowBorder};
  color: white;
  font-weight: 700;
  border: none;
  border-radius: 1rem;
  padding: 0.8rem 1.4rem;
  font-size: 1rem;
  margin-top: 1rem;
  box-shadow: 0 2px 12px #8885;
  cursor: pointer;
  transition: transform .18s ${({ theme }) => theme.animationFast};
  animation: bounce 1s infinite alternate;
  &:hover {
    transform: scale(1.08) rotate(-2deg);
  }
`;

const Input = styled.input`
  padding: 0.7rem;
  border-radius: 1rem;
  border: 2px solid #ddd;
  width: 100%;
  font-size: 1rem;
  margin-bottom: 1rem;
  box-shadow: 0 0 0 2px ${({ theme }) => theme.rainbowBorder};
  &:focus {
    outline: none;
    border-color: #8c6bfa;
    box-shadow: 0 2px 12px #8884;
  }
`;

const ResultBox = styled.div`
  margin-top: 1.2rem;
  padding: 1rem;
  background: #ffa35b22;
  border-radius: 1rem;
  font-size: 1rem;
  color: #222;
  animation: fadeIn .6s;
`;

function EntertainmentWidget() {
  const [selected, setSelected] = useState(entertainmentOptions[0].value);
  const [term, setTerm] = useState(""); // For Urban Dictionary/NPM
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleGet(e) {
    e.preventDefault();
    setLoading(true);
    setResult("");
    const option = entertainmentOptions.find(opt => opt.value === selected);
    let apiUrl = option.api;
    if (selected === "urban" && term) {
      apiUrl += encodeURIComponent(term);
    }
    if (selected === "npm" && term) {
      apiUrl += encodeURIComponent(term);
    }
    try {
      const res = await fetch(apiUrl);
      if (selected === "joke") {
        const data = await res.json();
        if (data.type === "single") {
          setResult(data.joke);
        } else if (data.type === "twopart") {
          setResult(`${data.setup}\n${data.delivery}`);
        } else {
          setResult("No joke found.");
        }
      } else if (selected === "quote") {
        const data = await res.json();
        setResult(`"${data.content}"\n— ${data.author}`);
      } else if (selected === "anime") {
        const data = await res.json();
        setResult(`${data.data.title} (${data.data.year})\n${data.data.synopsis}`);
      } else if (selected === "cricket") {
        const data = await res.json();
        setResult(
          data.data && data.data.length
            ? data.data.map(match => `${match.name}: ${match.status}`).join("\n")
            : "No cricket matches found."
        );
      } else if (selected === "urban") {
        const data = await res.json();
        setResult(
          data.list && data.list.length
            ? data.list[0].definition
            : "No result found."
        );
      } else if (selected === "npm") {
        const data = await res.json();
        setResult(
          data.results && data.results.length
            ? data.results.map(pkg => `${pkg.name}: ${pkg.description}`).join("\n\n")
            : "No packages found."
        );
      } else {
        setResult("No result.");
      }
    } catch (err) {
      setResult("Error fetching result.");
    }
    setLoading(false);
  }

  return (
    <form onSubmit={handleGet}>
      <ChoiceSelector
        label="Choose your entertainment"
        options={entertainmentOptions}
        value={selected}
        onChange={e => setSelected(e.target.value)}
      />
      {(selected === "urban" || selected === "npm") && (
        <Input
          type="text"
          placeholder={`Search term for ${selected === "urban" ? "Urban Dictionary" : "NPM"}`}
          value={term}
          onChange={e => setTerm(e.target.value)}
          required
        />
      )}
      <GetButton type="submit" disabled={loading}>
        {loading ? "Loading..." : "Get"}
      </GetButton>
      {result && <ResultBox>{result}</ResultBox>}
    </form>
  );
}

export default EntertainmentWidget;
