import React from 'react'
import fetch from 'isomorphic-fetch'
import News from './newsList'


//Class NewsList sets an empty news list, page limit size and offset per scroll
class NewsList extends React.Component {
  state = {
    news: [],
    offset: 0,
    limit: 10,
    totaloffset: 100,
    scrolling: false,
  }

  //When component is mounted it will load news with a scroll event listener
  componentWillMount() {
    this.loadNews()
    this.scrollListener = window.addEventListener('scroll', (e) => {
      this.handleScroll(e)
    })
  }

  //When the user scrolls past the total number off offets at the bottom of the page, it will call the load more function
  handleScroll = () => {
    const { scrolling, offset, totaloffset} = this.state
    if (scrolling) return
    if (totaloffset <= offset) return
    var lastLi = document.querySelector('ul.news > li:last-child')
    var lastLiOffset = lastLi.offsetTop + lastLi.clientHeight
    var pageOffset = window.pageYOffset + window.innerHeight
    var bottomOffset = 20
    if (pageOffset > lastLiOffset - bottomOffset) {
      this.loadMore()
    }

  }

  //loadNews will fetch the url with json data. It will return news key tag and flatten array
  loadNews = () => {
    const { offset, limit, news } = this.state
    const url = `https://www.stellarbiotechnologies.com/media/press-releases/json?offset=${offset}&limit=${limit}`
    fetch(url)
      .then(response => response.json())
      .then(json => this.setState({
        news: [...news, ...json.news],
        scrolling: false,
      }))
  }

//Once user scrolls to the bottom of the page it will set an offset of 5 and load 5 more news listings at the bottom
  loadMore = () => {
    this.setState(prevState => ({
      offset: prevState.offset+5,
      scrolling: true,
    }), this.loadNews)
  }

//This will render a ul with the news items in li keys
  render() {
    return <ul className="news news-item-container">
      {
        this.state.news.map(news_item => <li key={news_item.id}>
          <News {...news_item} />
        </li>)
      }
    </ul>
  }
}

export default NewsList
