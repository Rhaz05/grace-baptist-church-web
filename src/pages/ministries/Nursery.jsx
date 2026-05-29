import React from 'react'
// import { Carousel } from 'antd'
// import cavalry from '../../assets/images/cavalry.jpg'
// import cavalry1 from '../../assets/images/cavalry1.jpg'

// const carouselImages = [cavalry, cavalry1]

function Nursery() {
  return (
    <div className="w-full flex flex-col gap-10">
      <div>
        <span className="text-sm font-bold tracking-wider text-church-red uppercase">
          Ministry Highlight
        </span>
        <h2 className="mt-2 text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
          Serving the Nursery
        </h2>
        <div className="w-16 h-1 bg-church-red mx-auto mt-4 rounded-full"></div>
      </div>
      
      <div className="text-left relative pl-6 border-l-4 border-church-red">
        <p className="text-slate-700 leading-relaxed text-lg md:text-xl font-medium text-justify">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam accusamus placeat quis
          hic. Cum quidem accusantium, voluptate eveniet odit, nisi officia, dolores numquam autem
          incidunt porro labore sapiente ad id!
        </p>
      </div>
      {/* <div className="w-full rounded-2xl overflow-hidden shadow-lg bg-slate-100">
        <Carousel autoplay effect="fade" dotPosition="bottom">
          {carouselImages.map((src, index) => (
            <div key={index}>
              <div className="w-full aspect-[1.618/1]">
                <img
                  src={src}
                  alt={`Cavalry ministry moment ${index + 1}`}
                  className="w-full h-full object-cover block"
                />
              </div>
            </div>
          ))}
        </Carousel>
      </div> */}
    </div>
  )
}

export default Nursery
