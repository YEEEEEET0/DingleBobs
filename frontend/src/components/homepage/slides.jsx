import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import ExampleCarouselImage from '../../assets/images/borgerMIAU.jpg';

const carouselData = [
  { id: 1, imageSrc: ExampleCarouselImage, caption: 'caption here 1' },
  { id: 2, imageSrc: ExampleCarouselImage, caption: 'caption here 2' },
  { id: 3, imageSrc: ExampleCarouselImage, caption: 'caption here 3' },
];

const CarouselComponent = ({ items }) => (
  <Carousel interval={7000}>
    {items.map((item, index) => (
      <Carousel.Item key={item.id}>
        <div className='food-image'>
          <img src={item.imageSrc} alt='Food' />
        </div>
        <Carousel.Caption>
          <h3>{item.caption}</h3>
        </Carousel.Caption>
      </Carousel.Item>
    ))}
  </Carousel>
);

const UncontrolledExample = () => <CarouselComponent items={carouselData} />;

export default UncontrolledExample;    