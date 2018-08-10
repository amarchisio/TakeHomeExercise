import React from 'react'


//Put title and published tags of news list into a div called news_item
const News = (props) => <div className="news_item">
  <div>{ props.title } </div>
  <div> { props.published }</div>
</div>

export default News
