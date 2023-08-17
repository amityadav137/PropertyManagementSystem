import ReactDOM from "react-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

export default function ImageCarousel(props) {
  console.log(props.detail);
  return (
    <Carousel showArrows={true}>
      <div>
        <img src={"data:image/jpeg;base64," + props.detail.image} />
      </div>
      <div>
        <img src={"data:image/jpeg;base64," + props.detail.image} />
      </div>
      <div>
        <img src={"data:image/jpeg;base64," + props.detail.image} />
      </div>
      <div>
        <img src={"data:image/jpeg;base64," + props.detail.image} />
      </div>
      <div>
        <img src={"data:image/jpeg;base64," + props.detail.image} />
      </div>
    </Carousel>
  );
}
