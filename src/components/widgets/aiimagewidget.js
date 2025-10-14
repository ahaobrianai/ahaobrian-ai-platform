import React, { useState } from "react";
import styled from "styled-components";

// API endpoint for AI image generator
const IMAGE_API = "https://api.maher-zubair.tech/ai/photoleap?q=";

// UI styling
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
    border-color: #8c6bfa;
    box-shadow: 0 2px 12px #8884;
  }
`;

const GenerateButton = styled.button`
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

const ImgBox = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 180px;
  background: #f7e94f22;
  border-radius: 1rem;
  animation: fadeIn .6s;
`;

function AIImageWidget() {
  const [prompt, setPrompt] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleGenerate(e) {
    e.preventDefault();
    setLoading(true);
    setImgUrl("");
    try {
      const apiUrl = IMAGE_API + encodeURIComponent(prompt);
      const res = await fetch(apiUrl);
      const data = await res.json();
      if (data?.imageUrl || data?.url) {
        setImgUrl(data.imageUrl || data.url);
      } else {
        setImgUrl("");
      }
    } catch (err) {
      setImgUrl("");
    }
    setLoading(false);
  }

  return (
    <Form onSubmit={handleGenerate}>
      <Input
        type="text"
        placeholder="Describe your image (e.g. 'cat astronaut in space')"
        value={prompt}
        onChange={e => setPrompt(e.target.value)}
        required
      />
      <GenerateButton type="submit" disabled={loading}>
        {loading ? "Generating..." : "Generate Image"}
      </GenerateButton>
      <ImgBox>
        {imgUrl ? (
          <img
            src={imgUrl}
            alt={prompt}
            style={{
              maxWidth: "100%",
              maxHeight: "240px",
              borderRadius: "1rem",
              boxShadow: "0 2px 12px #8884"
            }}
          />
        ) : (
          loading ? <span>Loading...</span> : <span style={{color:"#aaa"}}>Your image will appear here!</span>
        )}
      </ImgBox>
    </Form>
  );
}

export default AIImageWidget;
