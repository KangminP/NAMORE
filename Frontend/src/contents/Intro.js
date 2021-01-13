import React, { useRef } from "react";

// component
import MyNavbar from "../components/Navbar/MyNavbar";
import IntroArticle from "../components/Intro/IntroArticle";
import IntroCategory from "../components/Intro/IntroCategory";

// video and css
import introvideo from "../assets/video/intro.mp4";
import "./Intro.css";

// reactstrap
import { Container } from "reactstrap";

function Intro() {
  const videoRef = useRef();
  const setPlayBack = () => {
    videoRef.current.playbackRate = 0.6;
  };

  return (
    <div>
      <MyNavbar />
      <Container style={{ padding: "16px 2rem 16px 2rem" }}>
        <div className="video-box">
          <video
            ref={videoRef}
            onCanPlay={() => setPlayBack()}
            loop
            autoPlay
            muted
          >
            <source src={introvideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <p className="video-title">Welcome :)</p>
          <div className="video-border"></div>
          <div className="video-text">
            <p>이거.. 해먹어볼래..?</p>
          </div>
        </div>
        <IntroArticle />
        <IntroCategory />
      </Container>
    </div>
  );
}

// class Intro extends Component {
//   //   constructor(props) {
//   //     super(props);

//   //     this.state = {
//   //       videoURL: "../assets/video/video.mp4",
//   //     };
//   //   }

//   render() {
//     return (
//       <div>
//         <MyNavbar />
//         <Container style={{ padding: "1rem 4rem 1rem 4rem" }}>
//           <div className="video-box">
//             <video className="back-ground-video" loop autoPlay muted>
//               <source src={introvideo} type="video/mp4" />
//               Your browser does not support the video tag.
//             </video>
//             <div class="video-text">
//               <p>Lorem Ipsum Dolor</p>
//             </div>
//           </div>
//         </Container>
//       </div>
//     );
//   }
// }

export default Intro;
