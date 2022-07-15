import Slider from "react-slick";
import { useState } from "react";
import { BsPlayCircle } from "react-icons/bs"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function NextArrow(props) {
  const { style, onClick } = props
  return (
    <div
      className="hidden"
      style={{ ...style }}
      onClick={onClick}
    />
  );
}

function PrevArrow(props) {
  const { style, onClick } = props
  return (
    <div
      className="hidden"
      style={{ ...style }}
      onClick={onClick}
    />
  );
}

var settings = {
  dots: false,
  infinite: true,
  autoplay: true,
  autoplaySpeed: 3000,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 3,
  initialSlide: 0,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: false
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
};

const shorter = (size, str) => {
  let result = null
  if (str?.length > size) {
    result = str?.slice(0, size - 3) + "..."
  } else result = str
  return result
}

export default function Scroll({ children }) {
  return <Slider className="w-[375px] md:w-[600px] lg:w-[1024px]" {...settings}>

    {children}

  </Slider>
}

Scroll.Item = function __Item__({ data, play, ...params }) {

  const [overlay, showOverlay] = useState(false)
  return <div onClick={() => play(data)} {...params} className="cursor-pointer w-full flex items-center justify-center p-4" onMouseEnter={() => showOverlay(true)} onMouseLeave={() => showOverlay(false)} >
    <div style={{backgroundImage:`url(${data.image || data.thumbnail})`}} className={`bg-gray-600 bg-center bg-cover bg-opacity-60 h-[165px] bg-opacity-60 flex items-center gap-2`}>
      { overlay && <div className="flex flex-col items-center justify-center bg-black bg-opacity-30 w-full h-full">
        <h1 className="text-center max-w-[100%] text-xs lg:text-sm text-white font-bold">{data.title}</h1>
        <h2 className="text-center w-full text-left text-xs lg:text-sm text-[0.8rem] text-gray-200">{shorter(33, data.author.name)}</h2>
      </div>}
      { !overlay && <div className="flex flex-col items-center justify-center w-full h-full">
          <BsPlayCircle className="text-4xl text-amber-500 playbtn"/>
        </div>}
    </div>
  </div>
}