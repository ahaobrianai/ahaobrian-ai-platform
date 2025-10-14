import React from "react";
import styled from "styled-components";

// Sample song links
const links = [
  { label: "About You - J Rizzy", url: "https://youtu.be/wu12LLIQEVQ?si=v3ACc3_aI2hzpo0t" },
  { label: "The Box - Roddy Ricch", url: "https://youtu.be/4QGqFfhKWYo?si=0BF__Oax2EyK7sZq" },
  { label: "God's Plan - Drake", url: "https://youtu.be/pPKx-fon1nY?si=hQRBxnggrXAb6WIy" },
  { label: "Sasa Hivi - Vijana Barubaru", url: "https://youtu.be/O5MyE-b9tPw?si=IjMxjq4Hpe4KxIWr" },
];

// Playful rainbow buttons
const LinksContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
  align-items: flex-start;
`;

const LinkButton = styled.a`
  display: inline-block;
  background: ${({ theme }) => theme.rainbowBorder};
  color: white;
  font-weight: 700;
  border-radius: 1rem;
  padding: 0.8rem 1.4rem;
  font-size: 1rem;
  text-decoration: none;
  box-shadow: 0 2px 12px #8885;
  transition: transform .18s ${({ theme }) => theme.animationFast};
  animation: bounce 1s infinite alternate;
  &:hover {
    transform: scale(1.09) rotate(-2deg);
    filter: brightness(1.13);
  }
`;

function QuickLinksWidget() {
  return (
    <LinksContainer>
      {links.map(link => (
        <LinkButton
          key={link.url}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {link.label}
        </LinkButton>
      ))}
    </LinksContainer>
  );
}

export default QuickLinksWidget;
