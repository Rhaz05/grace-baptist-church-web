import React from 'react'
import { Carousel } from 'antd'
import log from '../../assets/images/log.jpg'
import log1 from '../../assets/images/log1.jpg'
import log2 from '../../assets/images/log2.jpg'
import log3 from '../../assets/images/log3.jpg'
import log4 from '../../assets/images/log4.jpg'
import log5 from '../../assets/images/log5.jpg'
import log6 from '../../assets/images/log6.jpg'

const carouselImages = [log, log1, log2, log3, log4, log5, log6]

function Log() {
  return (
    <div className='w-full flex flex-col gap-10'>
      <div>
        <span className="text-sm font-bold tracking-wider text-church-red uppercase">
          Ministry Highlight
        </span>
        <h2 className="mt-2 text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
          Serving At Ladies Of Grace
        </h2>
        <div className="w-16 h-1 bg-church-red mx-auto mt-4 rounded-full"></div>
      </div>
      
      <div className="text-left relative pl-6 border-l-4 border-church-red">
        <p className="text-slate-700 leading-relaxed text-lg md:text-xl font-medium text-justify">
        
      Through organized gatherings, Bible studies, and ministry involvement, the Ladies 
      of Grace Ministry cultivates spiritual maturity, unity, and purposeful service among women.
    </p>
      </div>
      <div className="w-full rounded-2xl overflow-hidden shadow-lg bg-slate-100">
        <Carousel autoplay effect="fade" dotPosition="bottom">
          {carouselImages.map((src, index) => (
            <div key={index}>
              <div className="w-full aspect-[1.618/1]">
                <img
                  src={src}
                  alt={`log ministry moment ${index + 1}`}
                  className="w-full h-full object-cover block"
                />
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  )
}

export default Log
