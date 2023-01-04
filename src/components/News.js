import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";

class News extends Component {
  constructor() {
    super();
    console.log("This is a constructor from News.");
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
  }

  async fetchArticles() {
    console.log("Component did mount");
    let url =
      `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=b369d8e3d5e84d8c8bf85718ea55e849&page=1&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
    });
  }

  handleNextClick = async () => {
    console.log("Next");
    if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {
      let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=b369d8e3d5e84d8c8bf85718ea55e849&page=${
        this.state.page + 1
      }&pageSize=${this.props.pageSize}`;
      this.setState({loading: true})
      let data = await fetch(url);
      let parsedData = await data.json();
      this.setState({loading: false})
      this.setState({
        page: this.state.page + 1,
        articles: parsedData.articles,
      });
    }
  };

  handlePrevClick = async () => {
    console.log("Prev");
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=b369d8e3d5e84d8c8bf85718ea55e849&page=${
      this.state.page - 1
    }&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
    });
  };

  componentDidMount() {
    this.fetchArticles();
  }

  render() {
    return (
      <div className="container my-5">
        <h2>Techy - Top Stories</h2>
        {this.state.loading && <Spinner/>}
        <div className="row my-4">
          {this.state.articles.map((element, index) => {
            return (
              <div className="col-md-4" key={index}>
                <NewsItem
                  title={element.title}
                  description={element.description}
                  imgUrl={element.urlToImage}
                  newsUrl={element.url}
                />
              </div>
            );
          })}
        </div>
        <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            onClick={this.handlePrevClick}
            className="btn btn-dark"
          >
            Previous
          </button>
          <button
            disabled={
              this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)
            }
            type="button"
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}

export default News;
