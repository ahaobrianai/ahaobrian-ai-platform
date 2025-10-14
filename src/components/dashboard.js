import React from "react";
import styled from "styled-components";

// We'll stub the widgets for now; you'll fill these in step-by-step!
import YouTubeAudioWidget from "./widgets/youtubeaudiowidget";
import YouTubeVideoWidget from "./widgets/youtubevideowidget";
import AIChatWidget from "./widgets/aichatwidget";
import AIImageWidget from "./widgets/aiimagewidget";
import MovieWidget from "./widgets/moviewidget";
import SocialDownloaderWidget from "./widgets/socialdownloaderwidget";
import EntertainmentWidget from "./widgets/entertainmentwidget";
import QuickLinksWidget from "./widgets/quicklinkswidget";

// Rainbow card styling and playful bounce animation
const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
  gap: 2.5rem;
  padding: 2.5rem;
  width: 100vw;
  max-width: 1400px;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.rainbowText};
  text-align: left;
  letter-spacing: 1.5px;
  animation: bounce 1.2s infinite alternate;
`;

const WidgetCard = styled.div`
  background: white;
  border-radius: 1.5rem;
  box-shadow: 0 2px 16px 0 rgba(0,0,0,0.08), 0 0 0 4px ${({ theme }) => theme.rainbowBorder};
  padding: 2rem 1.2rem;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  transition: transform 0.18s cubic-bezier(.68,-0.55,.27,1.55);
  &:hover {
    transform: scale(1.04) rotate(-2deg);
  }
`;

function Dashboard() {
  return (
    <DashboardGrid>
      <WidgetCard>
        <SectionTitle>🎵 YouTube Audio Downloader</SectionTitle>
        <youtubeaudiowidget />
      </WidgetCard>
      <WidgetCard>
        <SectionTitle>🎬 YouTube Video Downloader</SectionTitle>
        <youtubevideowidget />
      </WidgetCard>
      <WidgetCard>
        <SectionTitle>🤖 AI Chat</SectionTitle>
        <aichatwidget />
      </WidgetCard>
      <WidgetCard>
        <SectionTitle>🎨 AI Image Generator</SectionTitle>
        <aiimagewidget />
      </WidgetCard>
      <WidgetCard>
        <SectionTitle>🎬 Movie Database</SectionTitle>
        <moviewidget />
      </WidgetCard>
      <WidgetCard>
        <SectionTitle>📥 Social Media Downloaders</SectionTitle>
        <socialdownloaderwidget />
      </WidgetCard>
      <WidgetCard>
        <SectionTitle>🎮 Entertainment</SectionTitle>
        <entertainmentwidget />
      </WidgetCard>
      <WidgetCard>
        <SectionTitle>🎵 Quick Links (Sample Songs)</SectionTitle>
        <quicklinkswidget />
      </WidgetCard>
    </DashboardGrid>
  );
}

export default Dashboard;
