import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import ExampleCarouselImage from '../../assets/images/borgerMIAU.jpg';

const carouselData = [
  { id: 1, imageSrc: ExampleCarouselImage, caption: 'Caption 1' },
  { id: 2, imageSrc: ExampleCarouselImage, caption: 'Caption 2' },
  { id: 3, imageSrc: ExampleCarouselImage, caption: 'Caption 3' },
];

// View
const CarouselItem = ({ imageSrc, caption }) => (
  <Carousel.Item>
    <div className='food-image'>
      <img src={imageSrc} alt='Food' />
    </div>
    <Carousel.Caption>
      {caption && <p>{caption}</p>}
    </Carousel.Caption>
  </Carousel.Item>
);

const CarouselComponent = ({ items }) => (
  <div className='food-container-slides'>
    <Carousel>
      {items.map(item => (
        <CarouselItem key={item.id} {...item} />
      ))}
    </Carousel>
  </div>
);

// Controller
function UncontrolledExample() {
  return <CarouselComponent items={carouselData} />;
}

export default UncontrolledExample;