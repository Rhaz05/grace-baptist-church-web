import React from 'react'
function BandOfBrother() {
  return (
    <div className='w-full flex flex-col gap-10'>
      <div>
        <span className="text-sm font-bold tracking-wider text-church-red uppercase">
          Ministry Highlight
        </span>
        <h2 className="mt-2 text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
          Serving the Band Of Brother
        </h2>
        <div className="w-16 h-1 bg-church-red mx-auto mt-4 rounded-full"></div>
      </div>

      <div className="text-left relative pl-6 border-l-4 border-church-red">
        <p className="text-slate-700 leading-relaxed text-lg md:text-xl font-medium text-justify">
        Committed to discipleship and spiritual growth, the Band of Brothers Ministry provides a
        Christ-centered environment where men are challenged to live faithfully, mentor one another,
        and serve God wholeheartedly.
        </p>
      </div>
    </div>
  )
}

export default BandOfBrother
