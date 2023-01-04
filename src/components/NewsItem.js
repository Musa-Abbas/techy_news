import React, { Component } from 'react'

class NewsItem extends Component {

  // constructor(){
  //   super()
  //   console.log("This is a constructor.");
  // }

  render() {
    let {title, description, imgUrl, newsUrl} = this.props
    return (
      <div><div className="card" style={{width: "18rem"}}>
      <img src={imgUrl} className="card-img-top" alt="..."/>
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
        <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
      </div>
    </div></div>
    )
  }
}

export default NewsItem