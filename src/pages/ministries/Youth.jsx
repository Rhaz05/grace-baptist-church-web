import React from 'react'
import { Carousel } from 'antd'
import youth from '../../assets/images/youth.jpg'
import youth1 from '../../assets/images/youth1.jpg'
import youth2 from '../../assets/images/youth2.jpg'
import youth3 from '../../assets/images/youth3.jpg'
import youth4 from '../../assets/images/youth4.jpg'
import youth5 from '../../assets/images/youth5.jpg'
import youth6 from '../../assets/images/youth6.jpg'

const carouselImages = [youth, youth1, youth2, youth3, youth4, youth5, youth6]

function Youth() {
  return (
    <div className="w-full flex flex-col gap-10">
      <div>
        <span className="text-sm font-bold tracking-wider text-church-red uppercase">
          Ministry Highlight
        </span>
        <h2 className="mt-2 text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
          Serving the Youth
        </h2>
        <div className="w-16 h-1 bg-church-red mx-auto mt-4 rounded-full"></div>
      </div>
      
      <div className="text-left relative pl-6 border-l-4 border-church-red">
        <p className="text-slate-700 leading-relaxed text-lg md:text-xl font-medium text-justify">
          Dedicated to equipping the next generation, the Youth Ministry provides a Christ-centered
          environment where young people develop strong faith, godly character, and a heart for
          ministry.
        </p>
      </div>
      <div className="w-full rounded-2xl overflow-hidden shadow-lg bg-slate-100">
        <Carousel autoplay effect="fade" dotPosition="bottom">
          {carouselImages.map((src, index) => (
            <div key={index}>
              <div className="w-full aspect-[1.618/1]">
                <img
                  src={src}
                  alt={`youth ministry moment ${index + 1}`}
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

export default Youth
