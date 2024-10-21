import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
  <div className='bg-neutral-800 h-screen flex flex-col justify-center items-center'>
    <h1 className='text-white text-[40px]'>What would you like to do, Sire?</h1>
    <div className='flex flex-col gap-2 m-10 text-white'>
      <Link to={'/tree'} className='border hover:border-blue-400 bg-black p-5 px-20 rounded-xl text-center'>Generate Tree</Link>
      <Link to={'/tree'} className='border hover:border-blue-400 bg-black p-5 px-20 rounded-xl text-center'>Dijkstra Algorithm</Link>
      <Link to={'/tree'} className='border hover:border-blue-400 bg-black p-5 px-20 rounded-xl text-center'>A*</Link>
      <Link to={'/tree'} className='border hover:border-blue-400 bg-black p-5 px-20 rounded-xl text-center'>Depth First Search</Link>
      <Link to={'/tree'} className='border hover:border-blue-400 bg-black p-5 px-20 rounded-xl text-center'>Breadth First Search</Link>
    </div>
  </div>
  )
}
