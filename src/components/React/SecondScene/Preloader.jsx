import React from 'react'

import './preloader.css'

const Preloader = ({isLoaded}) => {
  const innerHtml = `<?xml version="1.0" encoding="utf-8"?>
  <!-- Generator: Adobe Illustrator 24.0.3, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
  <svg version="1.1" id="Ebene_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
     viewBox="0 0 32 103" style="enable-background:new 0 0 32 103;" xml:space="preserve">
  <g id="sceptre-loader">
    <path d="M24.4,72.8c-3,0-5.2-2.2-5.2-5.2V33.5h-6.4v34.1c0,3-2.2,5.2-5.2,5.2H2.8v6h4.9c3,0,5.2,2.2,5.2,5.2v18.1h6.4V84
      c0-3,2.2-5.2,5.2-5.2h4.8v-6H24.4z"/>
    <path d="M20.9,1.6L19.2,1l1.5,1c2.4,1.6,3.9,4.3,3.9,7.3c0,4.8-3.9,8.7-8.7,8.7s-8.7-3.9-8.7-8.7c0-2.9,1.5-5.6,3.9-7.3l1.5-1
      L11,1.6C5,3.7,1,9.4,1,15.7c0,8.2,6.7,15,14.9,15s14.9-6.7,14.9-15C30.9,9.4,26.9,3.7,20.9,1.6z"/>
  </g>
  </svg>`
  return (
    <div id="loader2-wrapper" className={isLoaded ? 'loaded2' : ''}>
      <div id="loader2">
        <div dangerouslySetInnerHTML={{ __html: innerHtml }} />
      </div>
    </div>
  )
}

export { Preloader }
