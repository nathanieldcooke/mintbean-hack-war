// src: https://www.joshwcomeau.com/snippets/react-components/fade-in/


// FadeIn.js
import React from 'react';
import styled, { keyframes } from 'styled-components';
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;
const FadeOut = ({
    duration = 10000,
    delay = 0,
    children,
    ...delegated
}) => {
    return (
        <Wrapper
            {...delegated}
            style={{
                ...(delegated.style || {}),
                animationDuration: duration + 'ms',
                animationDelay: delay + 'ms',
            }}
        >
            {children}
        </Wrapper>
    );
};
const Wrapper = styled.div`
  @media (prefers-reduced-motion: no-preference) {
    animation-name: ${fadeIn};
    animation-fill-mode: forwards;
  }
`;
export default FadeOut