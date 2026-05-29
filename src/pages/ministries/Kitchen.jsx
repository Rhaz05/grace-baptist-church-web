import React from 'react'
import { Carousel } from 'antd'
import kitchen from '../../assets/images/kitchen.jpg'
import kitchen1 from '../../assets/images/kitchen1.jpg'
import kitchen2 from '../../assets/images/kitchen2.jpg'
import kitchen3 from '../../assets/images/kitchen3.jpg'
import kitchen4 from '../../assets/images/kitchen4.jpg'
import kitchen5 from '../../assets/images/kitchen5.jpg'

const carouselImages = [kitchen, kitchen1, kitchen2, kitchen3, kitchen4, kitchen5]

function Kitchen() {
  return (
    <div className="w-full flex flex-col gap-10">
      <div>
        <span className="text-sm font-bold tracking-wider text-church-red uppercase">
          Ministry Highlight
        </span>
        <h2 className="mt-2 text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
          Serving At the Kitchen
        </h2>
        <div className="w-16 h-1 bg-church-red mx-auto mt-4 rounded-full"></div>
      </div>
      
      <div className="text-left relative pl-6 border-l-4 border-church-red">
        <p className="text-slate-700 leading-relaxed text-lg md:text-xl font-medium text-justify">
          Behind every meal served with love is a heart willing to serve the Lord. Our Kitchen
          Ministry at Grace Baptist Church is a blessing led by faithful ladies who joyfully prepare
          food, serve with kindness, and work together in Christian fellowship. Through every dish
          prepared and every helping hand, they minister not only to the body but also to the soul.
          <span className="font-bold">
            <br />
            <br />
            “Serving the Lord with gladness.” - Psalm 100:2
          </span>
        </p>
      </div>
      <div className="w-full rounded-2xl overflow-hidden shadow-lg bg-slate-100">
        <Carousel autoplay effect="fade" dotPosition="bottom">
          {carouselImages.map((src, index) => (
            <div key={index}>
              <div className="w-full aspect-[1.618/1]">
                <img
                  src={src}
                  alt={`kitchen ministry moment ${index + 1}`}
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

export default Kitchen
