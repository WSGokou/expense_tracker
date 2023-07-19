import React from 'react';

const Title = ({text}: {text: string}) => {
  return (
    <h1 className='text-3xl md:text-4xl xl:text-5xl font-semibold text-center my-5'>
      {text}
    </h1>
  );
};

export default Title;
