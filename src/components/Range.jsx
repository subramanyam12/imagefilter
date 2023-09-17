import { useEffect, useState } from 'react'


const Range = ({name,ranges,value,val}) => {
    const [range, setrange] = useState(ranges[name])
    
    useEffect(()=>{
        setrange(ranges[name])
    },[ranges])

    const afterchange=(e)=>{
        setrange(e.target.value)
        val(name,e.target.value)
    }

  return (
        <div className='flex items-center text-white gap-5 justify-between'>
          <span className='font-medium text-xl'>{name}</span>
          <div className='flex w-[185px] justify-between items-center'>
            <input type="range" max={value} onChange={afterchange} value={range} className='h-[5px] range w-[160px]' />
            <small className='font-medium'>{range}</small>
          </div>
        </div>
  )
}

export default Range