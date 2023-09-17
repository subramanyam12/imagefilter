import React, { useEffect, useRef,forwardRef,useImperativeHandle } from 'react'
import { useState } from 'react'


const list=['','cover','contain']
const Image = forwardRef(({imagebool,setimagebool,down,ranges,rotate,setranges},ref) => {
    const [fit, setfit] = useState(0);
    const img=useRef()
    const open =useRef()

    useEffect(()=>{
        if(!imagebool){
            img.current.style.filter=`saturate(${ranges.Saturation}%) brightness(${ranges.Brightness}%) blur(${ranges.Blur}px) contrast(${ranges.Contrast}%)`;
            img.current.style.transform=`scale(${rotate.hor},${rotate.ver}) rotate(${rotate.left}deg) `
        }
    },[ranges,rotate])
    
    useImperativeHandle(ref,()=>({
        click:()=>{
            return open.current.click()
        }
    }))
      
    const file=()=>{
        open.current.click()
    }

    const media =(e)=>{
        setimagebool(false)
        setranges({Saturation:100,Blur:0,Brightness:100,Contrast:100})
        let file=e.files[0]
        if(!file){
            setimagebool(true)
            return
        }
        let url=URL.createObjectURL(file)
        setTimeout(()=>{
            img.current.src=url
            down(img.current)
        })
    }

    
    const drop=(e)=>{
       e.preventDefault()
       open.current.files=e.dataTransfer.files;
       media(open.current)
    }

    const imagefit =()=>{
        setfit(fit<list.length-1 ?fit+1 :0)
    }
  return (
   <>
   <input type="file" onChange={(e)=>media(e.target)} ref={open} accept='image/*' hidden/>
    {imagebool ? (
      <div onClick={file} onDragOver={(e)=>e.preventDefault()} onDrop={drop} className='w-full h-[250px] text-white flex gap-4 justify-center items-center flex-col outline-dashed outline-2 outline-gray-400'>
        <img className='w-32' src='src\assets\drag-drop.png'/>
       <p className='text-lg text-center '>Drag and Drop or Click Here<br /> to Upload Image</p>
      </div>
      ):(
       <img src="" ref={img} onClick={imagefit} className={`w-full h-[250px] ${list[fit]}`} />
      )}
   </>
  )
})

export default Image