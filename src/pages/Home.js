import React, { Component } from "react";
import {
  API_URL,
  API_KEY,
  IMAGE_BASE_URL,
  POSTER_SIZE,
  BACKDROP_SIZE
} from "../helpers/api";

import HeroImage from "../components/HeroImage/HeroImage";
import HomeLayer from "../components/HomeLayer/HomeLayer";
import SearchBar from "../components/SearchBar/SearchBar";
import MovieThumb from "../components/MovieThumb/MovieThumb";
import LoadMoreButton from "../components/LoadMoreButton/LoadMoreButton";
import Spinner from "../components/Spinner/Spinner";

class Home extends Component {
  state = {
    movies: [],
    heroImage: null,
    loading: false,
    currentPage: 0,
    totalPages: 0,
    searchTerm: ""
  };

  componentDidMount() {
    this.setState({ loading: true });
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=pl-PL&page=1`;
    this.fetchItems(endpoint);
  }

  searchItems = searchTerm => {
    let endpoint = "";
    this.setState({
      movies: [],
      loading: true,
      searchTerm
    });

    if (searchTerm === "") {
      endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=pl-PL&page=1`;
    } else {
      endpoint = `${API_URL}search/movie?api_key=${API_KEY}&language=pl-PL&query=${searchTerm}`;
    }
    this.fetchItems(endpoint);
  };

  loadMoreItems = () => {
    let endpoint = "";
    this.setState({ loading: true });

    if (this.state.searchTerm === "") {
      endpoint = `${API_URL}movie/popular/?api_key=${API_KEY}$language=pl-PL&page=${this
        .state.currentPage + 1}`;
    } else {
      endpoint = `${API_URL}search/movie?api_key=${API_KEY}&language=pl-PL&query${
        this.state.searchTerm
      }&page=${this.state.currentPage + 1}`;
    }
    this.fetchItems(endpoint);
  };

  fetchItems = endpoint => {
    fetch(endpoint)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({
          movies: [...this.state.movies, ...data.results],
          heroImage: this.state.heroImage || data.results[0],
          loading: false,
          currentPage: data.page,
          totalPages: data.total_pages
        });
      });
  };

  render() {
    return (
      <div className="homeContainer">
        {this.state.heroImage ? (
          <div>
            <HeroImage
              image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${this.state.heroImage.backdrop_path}`}
              title={this.state.heroImage.original_title}
              text={this.state.heroImage.overview}
            />
            <SearchBar callback={this.searchItems} />
          </div>
        ) : null}
        <div className="home-grid">
          <HomeLayer
            header={
              this.state.searchTerm ? "Wyniki wyszukania" : "Popularne filmy"
            }
            loading={this.state.loading}
          >
            {this.state.movies.map((element, i) => {
              return (
                <MovieThumb
                  key={i}
                  clickable={true}
                  image={
                    element.poster_path
                      ? `${IMAGE_BASE_URL}${POSTER_SIZE}${element.poster_path}`
                      : null
                  }
                  movieId={element.id}
                  movieName={element.original_title}
                />
              );
            })}
          </HomeLayer>
        </div>
        <Spinner />
        <LoadMoreButton />
      </div>
    );
  }
}

export default Home;
