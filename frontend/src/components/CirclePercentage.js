import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';

//   Styling
const StyledSvg = styled.svg`
  display: block;
  margin: 20px auto;
  max-width: 100%;
`;

const StyledCircle = styled.circle`
  fill: none;
`;
const StyledCircleBg = styled.circle`
  fill: none;
`;

const StyledText = styled.text`
  font-size: 2rem;
  text-anchor: middle;
  fill: #000;
  font-weight: bold;
`;

const StyledSubText = styled.text`
  font-size: 1rem;
  text-anchor: middle;
  fill: #000;
  font-weight: bold;
`;

const CirclePercentage = ({
  size,
  progress,
  effort,
  previousEffort,
  strokeWidth,
  circleOneStroke,
  circleTwoStroke,
}) => {
  console.log(previousEffort);

  // Hooks
  const [offset, setOffset] = useState(0);
  const circleRef = useRef(null);

  // Circle maths
  const center = size / 2;
  const radius = size / 2 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    const progressOffset = (progress / 100) * circumference;
    console.log(progressOffset);
    setOffset(progressOffset);
    circleRef.current.style = 'transition: stroke-dashoffset 0.5s ease-in-out;';
  }, [setOffset, circumference, progress, offset]);
  return (
    <>
      <StyledSvg width={size} height={size}>
        <StyledCircleBg
          stroke={circleOneStroke}
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={strokeWidth}
        />

        <StyledCircle
          ref={circleRef}
          stroke={circleTwoStroke}
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
        <StyledText x={`${center}`} y={`${center}`}>
          {effort}
        </StyledText>
        <StyledSubText x={center} y={center + 30}>
          Previous: {previousEffort}
        </StyledSubText>
      </StyledSvg>
    </>
  );
};

export default CirclePercentage;
