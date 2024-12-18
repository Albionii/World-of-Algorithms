import React, { useEffect, useRef, useState } from 'react'

function selectionSort() {
  const [arrayData, setArrayData] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [sortingSpeed, setSortingSpeed] = useState(750);
  const references = useRef([]);
  const [minimumIndex, setMinimumIndex] = useState(null);
  const divRefs = useRef([]);
  const [minimum,setMinimum] = useState(0);

  const handleInputs = ((event) => {
    if (/^[0-9,]*$/.test(event.target.value)) {
      setInputValue(event.target.value);
    }
  })

  const updateElementAtIndex = (index, newValue) => {
    setArrayData((prevArray) =>
      prevArray.map((item, i) => (i === index ? newValue : item))
    );
  };
  const handleSortingSpeed = (speed) => {
    setSortingSpeed(speed.target.value);
  }


  const handleMin = (index) => {
    // references.current[index].style.background = 'red';
    // if (minimumIndex != null) {
    //   const min = minimumIndex;
    //   references.current[min].style.background = '';
    // }

    setMinimumIndex(index);

  }

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

  async function handleText(num) {
    divRefs.current[num].style.backgroundColor = '#219B9D';
    await delay(sortingSpeed);
    divRefs.current[num].style.backgroundColor = '';

  }
  async function selectionSort(arr) {


    let n = arr.length;
    handleMin(0);
    for (let i = 0; i < n - 1; i++) {
      await handleText(0);

      let min_idx = i;
      setMinimum(min_idx);
      await handleText(1);
      references.current[i].style.background = '#219B9D';

      for (let j = i + 1; j < n; j++) {
        references.current[j].style.background = '#4C1F7A';

        await handleText(2);

        await delay(sortingSpeed);

        await handleText(3);

        if (arr[j] < arr[min_idx]) {

          min_idx = j;
          setMinimum(arr[min_idx]);
          await handleText(4);

          await delay(sortingSpeed);
          handleMin(j);



        }
        references.current[j].style.background = '';



      }
      references.current[i].style.background = '';

      handleMin(null);
      let temp = arr[i];
      await handleText(5);

      arr[i] = arr[min_idx];
      await handleText(6);

      // references.current[i].innerHTML  = "<p className='font-semibold text-teal-700 '>"+arr[min_idx]+"</p>";
      updateElementAtIndex(i, arr[min_idx]);

      arr[min_idx] = temp;
      await handleText(7);

      // references.current[min_idx].innerHTML  = "<p className='font-semibold text-teal-700 '>"+temp+"</p>";
      updateElementAtIndex(min_idx, temp);



    }
  }
  function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
  }

  return (
    <div>
      <div className='h-20 w-full flex items-center align-middle justify-evenly' style={{backgroundColor: '#160a2a'}}>
        <div className=''>
          <input className='bg-slate-500 ' type="text" value={inputValue} onChange={handleInputs} />
          <button onClick={sort}
           className='inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong'>
            SORT</button>
          </div>
        <div>
        <label htmlFor="sortSpeed" className='text-white'> Sorting speed in ms:</label>
          <input className='bg-slate-500 ' id='sortSpeed' type="number" value={sortingSpeed} onChange={handleSortingSpeed} />
        
        </div>
      </div>
      <div className='w-full h-screen  flex items-center align-middle justify-center' style={{backgroundColor: '#260f3d'}}>
        {arrayData.map((element, index) => (
          <div
            key={index}
            ref={el => references.current[index] = el}
            className="w-10 h-10 border-2 border-violet-800  flex items-center align-middle justify-center flex-wrap"
            style={{
              backgroundColor: minimumIndex == index ? '#FF8000' : '',
            }}
          >
            <p className='font-semibold text-teal-700 '>{element}</p>
          </div>
        )
        )}
        <p className='fixed bottom-10 right-10 font-mono text-green-800'>
          Current Minimum: {minimum}
          <div ref={(el) => (divRefs.current[0] = el)}> for {'('}let i = 0; i &lt; n - 1; i++{')'} {'{'}<br /></div>
          <div ref={(el) => (divRefs.current[1] = el)}> let min_idx = i;<br /></div>
          <div ref={(el) => (divRefs.current[2] = el)}> &nbsp;&nbsp;&nbsp;&nbsp;for {'('}let j = i; j &lt; n; j++{')'} {'{'}<br /></div>
          <div ref={(el) => (divRefs.current[3] = el)}> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if {'('}arr[j] &lt; arr[min_idx]{')'} {'{'}<br /></div>
          <div ref={(el) => (divRefs.current[4] = el)}> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;min_idx = j;<br /> </div>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{'}'}<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{'}'}<br />
          <div ref={(el) => (divRefs.current[5] = el)}>&nbsp;&nbsp;&nbsp;&nbsp;let temp = arr[i];<br /></div>
          <div ref={(el) => (divRefs.current[6] = el)}>&nbsp;&nbsp;&nbsp;&nbsp;arr[i] = arr[min_idx];<br /></div>
          <div ref={(el) => (divRefs.current[7] = el)}>&nbsp;&nbsp;&nbsp;&nbsp;arr[min_idx] = temp;<br /></div>
          {'}'}
        </p>
      </div>
    </div>
  )
}

export default selectionSort
