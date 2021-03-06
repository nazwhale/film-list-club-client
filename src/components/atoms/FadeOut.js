import React from "react";
import styled, { keyframes } from "styled-components";
const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const FadeOut = ({ duration = 1600, delay = 0, children, ...delegated }) => {
  return (
    <Wrapper
      {...delegated}
      style={{
        ...(delegated.style || {}),
        animationDuration: duration + "ms",
        animationDelay: delay + "ms"
      }}
    >
      {children}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  @media (prefers-reduced-motion: no-preference) {
    animation-name: ${fadeOut};
    animation-fill-mode: forwards;
  }
`;

export default FadeOut;
