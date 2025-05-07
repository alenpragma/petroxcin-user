"use client";

import React from "react";
import styled from "styled-components";

const Loading = () => {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <StyledWrapper>
        <div className="loader">
          <span className="l">L</span>
          <span className="o">o</span>
          <span className="a">a</span>
          <span className="d">d</span>
          <span className="i">i</span>
          <span className="n">n</span>
          <span className="g">g</span>
          <span className="d1">.</span>
          <span className="d2">.</span>
        </div>
      </StyledWrapper>
    </div>
  );
};

const StyledWrapper = styled.div`
  .loader {
    font-size: 30px; /* Set text size to 30px */
    font-weight: bold;
  }

  .l, .o, .a, .d, .i, .n, .g, .d1, .d2 {
    color: black;
    opacity: 0;
    animation: pass 2s ease-in-out infinite;
    letter-spacing: 0.1em;
    text-shadow: 2px 2px 3px #919191;
  }

  .l { animation-delay: 0.2s; }
  .o { animation-delay: 0.4s; }
  .a { animation-delay: 0.6s; }
  .d { animation-delay: 0.8s; }
  .i { animation-delay: 1s; }
  .n { animation-delay: 1.2s; }
  .g { animation-delay: 1.4s; }
  .d1 { animation: pass1 2s ease-in-out infinite; animation-delay: 1.6s; }
  .d2 { animation: pass1 2s ease-in-out infinite; animation-delay: 2s; }

  @keyframes pass {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }

  @keyframes pass1 {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }
`;

export default Loading;
