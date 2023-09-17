import { useEffect, useRef, useState } from 'react'
import './App.css'
import Image from './components/Image'
import Range from './components/Range'
import Rotate from './components/Rotate'
import {GiHorizontalFlip,GiVerticalFlip} from 'react-icons/gi'
import {MdOutlineRotate90DegreesCw,MdOutlineRotate90DegreesCcw} from 'react-icons/md'

function App() {
  const [imagebool, setimagebool] = useState(true)
  const [ranges, setranges] = useState({Saturation:100,Blur:0,Brightness:100,Contrast:100})
  const [rotate, setrotate] = useState({hor:1,ver:1,left:0})
  const [downdata, setdowndata] = useState('')
 
  const nextref=useRef()
 
 
  const val=(name,val)=>{
    setranges({...ranges,[name]:val})
  }
  
  const next=()=>{
    nextref.current.click()
    setrotate({hor:1,ver:1,left:0})
    setranges({Saturation:100,Blur:0,Brightness:100,Contrast:100})
     
  }

  const reset=()=>{
    setrotate({hor:1,ver:1,left:0})
    setranges({Saturation:100,Blur:0,Brightness:100,Contrast:100})
  }

  const download=()=>{
    let c=document.createElement('canvas');
    c.width=downdata.naturalWidth
    c.height=downdata.naturalHeight
    c.style='border:1px solid black'
    let ctx=c.getContext('2d');
    ctx.filter=`saturate(${ranges.Saturation}%) brightness(${ranges.Brightness}%) blur(${ranges.Blur}px) contrast(${ranges.Contrast}%)` 
    
    ctx.rotate(rotate.left*(Math.PI / 180));
    if(rotate.left>0){
        const rotobj={
          90:[0,-c.width],
          180:[-c.width,-c.width],
          270:[-c.width,0]
        }
         
        ctx.translate(...rotobj[rotate.left])
      }
      if(rotate.left<0){
        const minrotobj={
          90:[-c.width,0],
         180:[-c.width,-c.width],
         270:[0,-c.width]
        }
        ctx.translate(...minrotobj[parseInt(rotate.left)])
      }
     
      ctx.scale(rotate.hor,rotate.ver)

      if(rotate.hor===-1 && rotate.ver===1){
        ctx.translate(-c.width,1)
      }
      else if(rotate.hor===1 && rotate.ver===-1){
        ctx.translate(1,-c.height)
      }
      else if(rotate.hor===-1 && rotate.ver===-1){
        ctx.translate(-c.width,-c.height)
      }
    ctx.drawImage(downdata,0,0)
    //document.body.append(c)
    
     let url=c.toDataURL()
      let link=document.createElement('a');
      link.href=url;
      link.download='edited'
      link.click();
      setimagebool(true)
   }

  const down=(src)=>{
    setdowndata(src)
  }
 

  return (
    <div className='bg-gray-700 flex flex-col gap-5 items-center px-7 pb-5 pt-10'>
      <Image imagebool={imagebool} ref={nextref} rotate={rotate} down={down} ranges={ranges} setranges={setranges} setimagebool={setimagebool} />
      
      <div className='flex gap-1 flex-col'>
        <Range name='Saturation' ranges={ranges} value='200' val={val}/>
        <Range name='Blur' ranges={ranges} value='20' val={val}/>      
        <Range name='Brightness'ranges={ranges} value='200' val={val}/>      
        <Range name='Contrast' ranges={ranges} value='200' val={val}/>      
      </div>

      <div className='flex w-full border-[1px] py-1 rounded-full border-gray-400 justify-evenly'>
        <Rotate rot='hor' Icon={GiHorizontalFlip} rotate={rotate} setrotate={setrotate}/>
        <Rotate rot='ver' Icon={GiVerticalFlip} rotate={rotate} setrotate={setrotate}/>
        <Rotate rot='right' Icon={MdOutlineRotate90DegreesCw} rotate={rotate} setrotate={setrotate}/>
        <Rotate rot='left' Icon={MdOutlineRotate90DegreesCcw} rotate={rotate} setrotate={setrotate}/>
      </div>

      <div className='text-white w-full flex items-center justify-around'>
        <button onClick={reset} className='bg-red-500 font-bold w-8 h-8 text-xl border-dashed border-[1px] border-gray-300 rounded-full'>R</button>
        <button onClick={next} className='font-bold text-xl px-5 py-1 bg-blue-700'>Image</button>
        <button onClick={download} className='font-bold text-xl px-5 py-1 bg-green-600'>Download</button>
      </div>
    </div>
  )
}

export default App
