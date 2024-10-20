import React from 'react';
import Slider from 'react-slick';
import lorryOrange from '@assets/images/lorry1.png';
import lorryWhite from '@assets/images/lorry2.png';

const Carousel: React.FC = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true, // Optional for auto sliding
    };

    return (
        <div className="w-full overflow-hidden">
            <Slider {...settings}>
                <div>
                    <img src={lorryOrange} alt="Slide 1" className="w-full h-72 md:h-64 object-cover" />
                </div>
                <div>
                    <img src={lorryWhite} alt="Slide 2" className="w-full h-72 md:h-64 object-cover" />
                </div>
            </Slider>
        </div>
    );
};

export default Carousel;