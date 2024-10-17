import React from 'react';
import Slider from 'react-slick'; // react-slick or any other carousel library

const Carousel: React.FC = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <div className="carousel-container">
            <Slider {...settings}>
                <div>
                    <img src="/path/to/lorry-image1.png" alt="Slide 1" className="w-full" />
                </div>
                <div>
                    <img src="/path/to/lorry-image2.png" alt="Slide 2" className="w-full" />
                </div>
            </Slider>
        </div>
    );
};

export default Carousel;