import React from "react";
import ReactFullpage from "@fullpage/react-fullpage";

import ServiceIntro from "./ServiceIntro_fullpage";
import FoundationIntro from "./FoundationIntro_fullpage";

//Home
const Home = () => {
  return(
 
  <ReactFullpage
  scrollingSpeed = {1000}

  render={({ state, fullpageApi }) => {
    return (
      <ReactFullpage.Wrapper>
        <div class="section"  >
          <div className="homeimage"  onClick={() => fullpageApi.moveSectionDown()} />
        </div>
        <div class="section" onClick={() => fullpageApi.moveSectionDown()}>
         <div className="sectionheader" >서비스 소개</div>
         <ServiceIntro />      
        </div>
        <div class="section">
          <div className="sectionheader" >재단 소개</div>
          <FoundationIntro />
        </div>
      </ReactFullpage.Wrapper>
    );
  }}
/>
  );
};

export default Home;