import React from "react";

// reactstrap components
import { Carousel, CarouselItem, CarouselIndicators } from "reactstrap";

// core components
const items = [
  {
    src: require("../../assets/img/food1.jpg"),
    altText: "Main Room",
    caption: "Main Room",
  },
  {
    src: require("../../assets/img/food2.jpg"),
    altText: "Small Room",
    caption: "Small Room",
  },
  {
    src: require("../../assets/img/food3.jpg"),
    altText: "Cafeteria",
    caption: "Cafeteria",
  },
];

function IntroArticlePic() {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [animating, setAnimating] = React.useState(false);
  const onExiting = () => {
    setAnimating(true);
  };
  const onExited = () => {
    setAnimating(false);
  };
  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };
  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };
  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };
  return (
    <>
      <Carousel activeIndex={activeIndex} next={next} previous={previous}>
        <CarouselIndicators
          items={items}
          activeIndex={activeIndex}
          onClickHandler={goToIndex}
        />
        {items.map((item) => {
          return (
            <CarouselItem
              onExiting={onExiting}
              onExited={onExited}
              key={item.src}
            >
              <img
                src={item.src}
                width="100%"
                alt={item.altText}
                style={{ filter: "brightness(90%)" }}
              />
              <div className="carousel-caption d-none d-md-block">
                <h5
                  style={{
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  {item.caption}
                </h5>
              </div>
            </CarouselItem>
          );
        })}
        <a
          className="carousel-control-prev"
          data-slide="prev"
          href="#pablo"
          onClick={(e) => {
            e.preventDefault();
            previous();
          }}
          role="button"
        >
          <i className="now-ui-icons arrows-1_minimal-left"></i>
        </a>
        <a
          className="carousel-control-next"
          data-slide="next"
          href="#pablo"
          onClick={(e) => {
            e.preventDefault();
            next();
          }}
          role="button"
        >
          <i className="now-ui-icons arrows-1_minimal-right"></i>
        </a>
      </Carousel>
    </>
  );
}

export default IntroArticlePic;
