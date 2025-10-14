import React, { useState } from "react";
import ChoiceSelector from "../common/ChoiceSelector";
import styled from "styled-components";

// List of social media downloaders
const platforms = [
  { label: "YouTube MP3", value: "ytmp3", api: "https://bk9.fun/download/ytmp3?q=" },
  { label: "YouTube MP4", value: "ytmp4", api: "https://bk9.fun/download/ytmp4?q=" },
  { label: "Facebook", value: "facebook", api: "https://bk9.fun/download/facebook?q=" },
  { label: "Instagram", value: "instagram", api: "https://bk9.fun/download/instagram?q=" },
  { label: "TikTok", value: "tiktok", api: "https://bk9.fun/download/tiktok?q=" },
  { label: "Twitter", value: "twitter", api: "https://bk9.fun/download/twitter?q=" },
  { label: "SoundCloud", value: "soundcloud", api: "https://bk9.fun/download/soundcloud?q=" },
  { label: "Spotify", value: "spotify", api: "https://bk9.fun/download/spotify?q=" },
  { label: "Mediafire", value: "mediafire", api: "https://bk9.fun/download/mediafire?q=" },
  { label: "AllDownload (generic)", value: "alldownload", api: "https://bk9.fun/download/alldownload?url=" },
];

// Playful button
const DownloadButton = styled.button`
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
  background: #53fa7b22;
  border-radius: 1rem;
  font-size: .98rem;
  color: #222;
  animation: fadeIn .6s;
`;

function SocialDownloaderWidget() {
  const [selectedPlatform, setSelectedPlatform] = useState(platforms[0].value);
  const [inputUrl, setInputUrl] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleDownload(e) {
    e.preventDefault();
    setLoading(true);
    setResult("");
    try {
      const apiObj = platforms.find(p => p.value === selectedPlatform);
      let apiUrl = apiObj.api;
      if (selectedPlatform === "alldownload") {
        apiUrl += encodeURIComponent(inputUrl);
      } else {
        apiUrl += encodeURIComponent(inputUrl);
      }
      setResult(
        `Download link: 
        ${apiUrl} 
        
        (Open in browser to download, or copy-paste)`
      );
    } catch (err) {
      setResult("Failed to generate download link.");
    }
    setLoading(false);
  }

  return (
    <form onSubmit={handleDownload}>
      <ChoiceSelector
        label="Choose Social Platform"
        options={platforms.map(p => ({ label: p.label, value: p.value }))}
        value={selectedPlatform}
        onChange={e => setSelectedPlatform(e.target.value)}
      />
      <Input
        type="text"
        placeholder="Paste video or post URL here"
        value={inputUrl}
        onChange={e => setInputUrl(e.target.value)}
        required
      />
      <DownloadButton type="submit" disabled={loading}>
        {loading ? "Generating..." : "Get Download Link"}
      </DownloadButton>
      {result && <ResultBox>{result}</ResultBox>}
    </form>
  );
}

export default SocialDownloaderWidget;
