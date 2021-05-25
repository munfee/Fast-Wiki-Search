const React = require('react');
const ItemsList = require('./itemslist.js')

class Search extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        searchResults: [],
        prevSearch: ""
      };
  
      this.handleUserSearchEnter = this.handleUserSearchEnter.bind(this);
    }
  
    handleUserSearchEnter(e) {
      let str = e.target.value.toLowerCase();
      if (e.keyCode === 13) {
        this.setState({
          prevSearch: str,
          searchResults: "loading"
        });
        str = [...str].map((x) => (x === " " ? "%20" : x)).join(""); //replace spaces with URL formatting
  
        fetch(
          `https://${this.props.language}.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=${str}&origin=*`,
          {
            mode: "cors"
          }
        )
          .then((response) => response.json())
          .then((data) => {
            let results = data.query?.pages
              ? Object.values(data.query.pages).map((x) => {
                  x.language = this.props.language;
                  return x;
                })
              : []; // TODO!!!!
  
            console.log(results);
            this.setState({
              searchResults: results
            });
          });
      }
    }
    render() {
      return (
        <React.Fragment>
          <input
            type="text"
            placeholder="Or search for an article...."
            onKeyUp={this.handleUserSearchEnter}
          />
          <ItemsList results={this.state.searchResults} />
        </React.Fragment>
      );
    }
  }

  module.exports = Search;