import React from 'react'

const Rotate = ({Icon,rot,setrotate,rotate}) => {

const angle=()=>{
  if(rot=='hor'){
    setrotate({...rotate,hor:rotate.hor===1 ? -1 :1})
     }
    else if(rot==='ver'){
      setrotate({...rotate,ver:rotate.ver===1 ? -1 :1})
    }
    else if(rot==='left'){
      setrotate({...rotate,left:rotate.left===0 ? 270 :rotate.left-90})
    }
    else{
      setrotate({...rotate,left:rotate.left===270 ? 0 :rotate.left+90})
    }
}

  return (
    <div onClick={angle} className='bg-gray-800 border-[1px] z-10 cursor-pointer border-gray-500 rounded-full w-11 aspect-square grid place-items-center text-white text-3xl'>
    <Icon />
    </div>
  )
}

export default Rotate