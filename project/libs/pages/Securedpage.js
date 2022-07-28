import React from 'react';


const Secured = ({ name }) => {

 return (
   <div>
     <h1 className="text-black text-4xl">Welcome to the Protected Page of {name}</h1>
   </div>
 );
};

export default Secured;
