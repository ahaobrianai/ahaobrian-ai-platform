import React, { useState } from "react";
import styled from "styled-components";

// OMDb API endpoint and key
const OMDB_API = "https://www.omdbapi.com/?apikey=742b2d09&t=";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 0.7rem;
  border-radius: 1rem;
  border: 2px solid #ddd;
  font-size: 1rem;
  width: 100%;
  box-shadow: 0 0 0 2px ${({ theme }) => theme.rainbowBorder};
  &:focus {
    outline: none;
    border-color: #ff6b6b;
    box-shadow: 0 2px 12px #8884;
  }
`;

const SearchButton = styled.button`
  background: ${({ theme }) => theme.rainbowBorder};
  color: white;
  font-weight: 700;
  border: none;
  border-radius: 1rem;
  padding: 0.8rem 1.4rem;
  font-size: 1rem;
  cursor: pointer;
  transition: transform .18s ${({ theme }) => theme.animationFast};
  animation: bounce 1s infinite alternate;
  &:hover {
    transform: scale(1.08) rotate(-2deg);
  }
`;

const ResultBox = styled.div`
  margin-top: 1.2rem;
  padding: 1rem;
  background: #ff9bea22;
  border-radius: 1rem;
  animation: fadeIn .6s;
`;

const Poster = styled.img`
  width: 120px;
  height: auto;
  border-radius: 1rem;
  margin-right: 1.2rem;
  box-shadow: 0 2px 12px #8884;
`;

function MovieWidget() {
  const [title, setTitle] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSearch(e) {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    try {
      const apiUrl = OMDB_API + encodeURIComponent(title);
      const res = await fetch(apiUrl);
      const data = await res.json();
      if (data && data.Response !== "False") {
        setResult(data);
      } else {
        setResult({ error: "Movie not found!" });
      }
    } catch (err) {
      setResult({ error: "Failed to fetch movie info." });
    }
    setLoading(false);
  }

  return (
    <Form onSubmit={handleSearch}>
      <Input
        type="text"
        placeholder="Enter movie title (e.g. 'Inception')"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
      />
      <SearchButton type="submit" disabled={loading}>
        {loading ? "Searching..." : "Find Movie"}
      </SearchButton>
      {result && (
        <ResultBox>
          {result.error ? (
            <span style={{ color: "#ff6b6b" }}>{result.error}</span>
          ) : (
            <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}>
              {result.Poster && result.Poster !== "N/A" && (
                <Poster src={result.Poster} alt={result.Title} />
              )}
              <div>
                <div style={{ fontWeight: "bold", fontSize: "1.2rem", marginBottom: "0.5rem" }}>
                  {result.Title} ({result.Year})
                </div>
                <div><b>Genre:</b> {result.Genre}</div>
                <div><b>Director:</b> {result.Director}</div>
                <div><b>Actors:</b> {result.Actors}</div>
                <div><b>Plot:</b> {result.Plot}</div>
                <div><b>IMDB Rating:</b> {result.imdbRating}</div>
              </div>
            </div>
          )}
        </ResultBox>
      )}
    </Form>
  );
}

export default MovieWidget;
