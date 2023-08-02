import React from 'react'
import './Widgets.css'
import InfoIcon from '@mui/icons-material/Info'
import FiberManualRecord from '@mui/icons-material/FiberManualRecord'

function Widgets() {

const newsArticle = (heading, subtitle) => {
  return(
    <div className="widgets_article">
      <div className="widgets_article_left">
        <FiberManualRecord />
      </div>

      <div className="widgets_article_right">
        <h4>{heading}</h4>
        <p>{subtitle}</p>
      </div>
    </div>
  )
}

  return (
    <div className='widgets'>
      <div className="widgets_header">
        <h2>LinkedIn News</h2>
        <InfoIcon />
      </div>

      {newsArticle("Papa react is back", "top news lol")}
      {newsArticle("Papa react is back", "top news lol")}
      {newsArticle("Papa react is back", "top news lol")}
      {newsArticle("Papa react is back", "top news lol")}
    </div>
  )
}

export default Widgets