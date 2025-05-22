// "use client";

// import React from "react";
// import styled from "styled-components";

// const Loadingcomponents = () => {
//   return (
//     <div className="min-h-screen flex justify-center items-center">
//       <StyledWrapper>
//         <div className="loader">
//           <span className="l">L</span>
//           <span className="o">o</span>
//           <span className="a">a</span>
//           <span className="d">d</span>
//           <span className="i">i</span>
//           <span className="n">n</span>
//           <span className="g">g</span>
//           <span className="d1">.</span>
//           <span className="d2">.</span>
//         </div>
//       </StyledWrapper>
//     </div>
//   );
// };

// const StyledWrapper = styled.div`
//   .loader {
//     font-size: 30px; /* Set text size to 30px */
//     font-weight: bold;
//   }

//   .l, .o, .a, .d, .i, .n, .g, .d1, .d2 {
//     color: black;
//     opacity: 0;
//     animation: pass 2s ease-in-out infinite;
//     letter-spacing: 0.1em;
//     text-shadow: 2px 2px 3px #919191;
//   }

//   .l { animation-delay: 0.2s; }
//   .o { animation-delay: 0.4s; }
//   .a { animation-delay: 0.6s; }
//   .d { animation-delay: 0.8s; }
//   .i { animation-delay: 1s; }
//   .n { animation-delay: 1.2s; }
//   .g { animation-delay: 1.4s; }
//   .d1 { animation: pass1 2s ease-in-out infinite; animation-delay: 1.6s; }
//   .d2 { animation: pass1 2s ease-in-out infinite; animation-delay: 2s; }

//   @keyframes pass {
//     0%, 100% { opacity: 1; }
//     50% { opacity: 0; }
//   }

//   @keyframes pass1 {
//     0%, 100% { opacity: 1; }
//     50% { opacity: 0; }
//   }
// `;

// export default Loadingcomponents;






"use client";

import React from "react";
import styled from "styled-components";

const Loadingcomponents = () => {
  return (
    <div className="min-h-screen flex justify-center items-center bg-white">
      <StyledWrapper>
        {/* Step-by-step bar */}
        <div className="bar">
          <div className="segment s1" />
          <div className="segment s2" />
          <div className="segment s3" />
          <div className="segment s4" />
          <div className="segment s5" />
          <div className="segment s6" />
        </div>

        {/* Loading text */}
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
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;

  .bar {
    display: flex;
    width: 240px;
    height: 24px;
    border: 2px solid #000;
    padding: 2px;
    box-sizing: border-box;
  }

  .segment {
    flex: 1;
    background-color: white;
    margin: 0 1px;
    opacity: 0;
    animation: fill 1.8s ease-in-out forwards infinite;
  }

  .s1 { animation-delay: 0s; }
  .s2 { animation-delay: 0.3s; }
  .s3 { animation-delay: 0.6s; }
  .s4 { animation-delay: 0.9s; }
  .s5 { animation-delay: 1.2s; }
  .s6 { animation-delay: 1.5s; }

  @keyframes fill {
    0% { background-color: white; opacity: 0; }
    50% { background-color: black; opacity: 1; }
    100% { background-color: white; opacity: 0; }
  }

  .loader {
    font-size: 30px;
    font-weight: normal;
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

export default Loadingcomponents;
