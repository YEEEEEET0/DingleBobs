import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import ExampleCarouselImage from '../../assets/images/borgerMIAU.jpg';

const carouselData = [
  { id: 1, imageSrc: ExampleCarouselImage, caption: 'caption here' },
  { id: 2, imageSrc: ExampleCarouselImage, caption: 'caption here' },
  { id: 3, imageSrc: ExampleCarouselImage, caption: 'caption here' },
];

// View
const CarouselItem = ({ imageSrc, caption }) => (
  <Carousel.Item className='active'>
    <div className='food-image'>
      <img src={imageSrc} alt='Food' />
    </div>
    <Carousel.Caption>
      {caption && <p>{caption}</p>}
    </Carousel.Caption>
  </Carousel.Item>
);
let activeidx = 0;
const CarouselComponent = ({ items }) => (
    <Carousel activeIndex={activeidx}>
      {items.map(item => (
        <CarouselItem key={item.id} {...item} />
      ))}
    </Carousel>
);

// Controller
const UncontrolledExample = () => <CarouselComponent items={carouselData} />;

export default UncontrolledExample;