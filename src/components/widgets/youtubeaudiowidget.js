import React, { useState } from "react";
import ChoiceSelector from "../common/ChoiceSelector";
import styled from "styled-components";

// List of public YouTube MP3 downloader APIs
const audioApis = [
  { label: "David CyrilTech", value: "https://api.davidcyriltech.my.id/download/ytmp3?url=" },
  { label: "Dark Yasiya", value: "https://www.dark-yasiya-api.site/download/ytmp3?url=" },
  { label: "GiftedTech", value: "https://api.giftedtech.web.id/api/download/dlmp3?url=" },
  { label: "Dreaded Site", value: "https://api.dreaded.site/api/ytdl/audio?url=" },
];

// Simple bouncy button
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
    border-color: #4fd7fa;
    box-shadow: 0 2px 12px #8884;
  }
`;

const ResultBox = styled.div`
  margin-top: 1.2rem;
  padding: 1rem;
  background: #f7e94f22;
  border-radius: 1rem;
  font-size: .98rem;
  color: #222;
  animation: fadeIn .6s;
`;

function YouTubeAudioWidget() {
  const [selectedApi, setSelectedApi] = useState(audioApis[0].value);
  const [videoUrl, setVideoUrl] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleDownload(e) {
    e.preventDefault();
    setLoading(true);
    setResult("");
    try {
      let apiUrl = selectedApi;
      if (selectedApi.includes("giftedtech")) {
        apiUrl += encodeURIComponent(videoUrl) + "&apikey=gifted-md";
      } else {
        apiUrl += encodeURIComponent(videoUrl);
      }
      // Fetch result (most APIs return JSON or file, so just show the link)
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
        label="Choose Audio Downloader API"
        options={audioApis}
        value={selectedApi}
        onChange={e => setSelectedApi(e.target.value)}
      />
      <Input
        type="text"
        placeholder="Paste YouTube Video URL here"
        value={videoUrl}
        onChange={e => setVideoUrl(e.target.value)}
        required
      />
      <DownloadButton type="submit" disabled={loading}>
        {loading ? "Generating..." : "Get MP3 Link"}
      </DownloadButton>
      {result && <ResultBox>{result}</ResultBox>}
    </form>
  );
}

export default YouTubeAudioWidget;
