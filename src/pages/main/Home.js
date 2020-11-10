import React from "react"

import ReactFullpage from "@fullpage/react-fullpage"
import ServiceIntro from "./ServiceIntro_fullpage"
import FoundationIntro from "./FoundationIntro_fullpage"
import TrustWay from "../trust/TrustWay"

//Home
const Home = () => {
  return(
  <ReactFullpage scrollingSpeed = {1000}
    render={({ fullpageApi }) => {
      return (
        <ReactFullpage.Wrapper>
          <div class="section"  >
            <div className="homeimage"  onClick={() => fullpageApi.moveSectionDown()} />
          </div>
          <div class="section" onClick={() => fullpageApi.moveSectionDown()}>
          <div className="sectionheader" >서비스 소개</div>
            <ServiceIntro />      
          </div>
          <div class="section" onClick={() => fullpageApi.moveSectionDown()}>
            <div className="sectionheader">재단 소개</div>
            <FoundationIntro />
          </div>
          <div class="section"onClick={() => fullpageApi.moveSectionDown()} >
            <div className="sectionheader" >신탁 방법</div>
            <TrustWay />
          </div>
        </ReactFullpage.Wrapper>
      )
    }}
  />
  )
}

export default Home
