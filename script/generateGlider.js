const generateGlider = (divGlider) => {
  new Glider(document.querySelector(`.glider_${divGlider}`), {
    arrows: {
      prev: `.glider-prev_${divGlider}`,
      next: `.glider-next_${divGlider}`,
    },
    responsive: [
      {
        breakpoint: 414,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          itemWidth: 70,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 6.2,
          slidesToScroll: 3,
          itemWidth: 155,
        },
      },
    ],
  });
};

export { generateGlider };
