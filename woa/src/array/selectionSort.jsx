import React, { useEffect, useState } from 'react'

function selectionSort() {

    const[arrayData,setArrayData] = useState([]);
    const[inputValue, setInputValue] = useState('');

    const handleInputs = ((event)=>{
        if (/^[0-9,]*$/.test(event.target.value)) {
            setInputValue(event.target.value);
          }
    })

    


    useEffect(() => {
        const aux = inputValue.split(",").map(Number);


        setArrayData(aux);

        
      }, [inputValue]);

      const sort = (() => {
            arrayData.sort((a, b) => a - b);

            let tempS = '';

            arrayData.forEach((num) => {
                tempS += num + ',';
              });


            setInputValue(tempS.slice(0, -1)
        );

      })

  return (
    <div>
        <div className='h-20 w-full bg-slate-700 flex items-center align-middle justify-center'>
            <div className=''>
                <input className='bg-slate-500 ' type="text" value={inputValue} onChange={handleInputs}/>
                <button onClick={sort}>SORT</button>
            </div>

        </div>
        <div className='w-full h-screen bg-blue-950 flex items-center align-middle justify-center'>
            {arrayData.map((element, index) => (
        <div 
          key={index} 
          className="w-10 h-10 border-2 border-violet-800  flex items-center align-middle justify-center flex-wrap" 
        >
         <p className='font-semibold text-teal-700 '>{element}</p>
        </div>
      )
    )}

        </div>
    </div>
  )
}

export default selectionSort
