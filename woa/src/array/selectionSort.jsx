import React, { useEffect, useRef, useState } from 'react'

function selectionSort() {
    const[arrayData,setArrayData] = useState([]);
    const[inputValue, setInputValue] = useState('');
    const references = useRef([]);

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
            // arrayData.sort((a, b) => a - b);
            selectionSort(arrayData).then(() => {
                let tempS = '';

                arrayData.forEach((num) => {
                    tempS += num + ',';
                  });
    
    
                
                setInputValue(tempS.slice(0, -1));
    
    
            });

           
      });
      async function selectionSort(arr) {
        let n = arr.length;
        for (let i = 0; i < n - 1; i++) {
            let min_idx = i;
            for (let j = i; j < n; j++) {
                references.current[j].style.background = 'green';
                await delay(100);


                if (arr[j] < arr[min_idx]) {
                    references.current[min_idx].style.background = '';
                    await delay(100);
                    min_idx = j;
                    references.current[min_idx].style.background = 'red';
                    await delay(100);


                }
                references.current[j].style.background = '';

            }
            let temp = arr[i];
            arr[i] = arr[min_idx];
            references.current[i].innerHTML  = "<p className='font-semibold text-teal-700 '>"+arr[min_idx]+"</p>";

            arr[min_idx] = temp;
            references.current[min_idx].innerHTML  = "<p className='font-semibold text-teal-700 '>"+temp+"</p>";
           

        }
    }
    function delay(time) {
        return new Promise(resolve => setTimeout(resolve, time));
    }

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
          ref={el => references.current[index] = el}
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
