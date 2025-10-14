import React from "react";
import styled from "styled-components";

// Bouncy animated select dropdown
const SelectorWrapper = styled.div`
  margin-bottom: 1.2rem;
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.rainbowText};
  background: ${({ theme }) => theme.rainbowText};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 1.1rem;
  animation: bounce 1s infinite alternate;
`;

const Select = styled.select`
  padding: 0.6rem 1rem;
  border-radius: 1rem;
  border: 2px solid;
  border-image: ${({ theme }) => theme.rainbowBorder} 1;
  font-size: 1rem;
  transition: box-shadow .15s ${({ theme }) => theme.animationFast}, transform .18s ${({ theme }) => theme.animationFast};
  box-shadow: 0 0 0 2px ${({ theme }) => theme.rainbowBorder};
  &:hover, &:focus {
    box-shadow: 0 2px 12px 0 #8884;
    transform: scale(1.05);
    outline: none;
  }
`;

function ChoiceSelector({ label, options, value, onChange, ...props }) {
  return (
    <SelectorWrapper>
      {label && <Label>{label}</Label>}
      <Select value={value} onChange={onChange} {...props}>
        {options.map(opt =>
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        )}
      </Select>
    </SelectorWrapper>
  );
}

export default ChoiceSelector;
