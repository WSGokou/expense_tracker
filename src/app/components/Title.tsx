import React from 'react';

const Title = ({text}: {text: string}) => {
  return <h1 className='text-3xl font-semibold text-center my-5'>{text}</h1>;
};

export default Title;
