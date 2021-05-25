const React = require('react');

class ItemsList extends React.Component {
    constructor(props) {
      super(props);
    }
      shouldComponentUpdate(nextProps, nextState) { // prevents the list from rendering again as the random colors
          return nextProps.results !== this.props.results; //would change every time the language is modified
      }
  
    render() {
      const h3SpanStyle = {
        h3: {
          textAlign: "center",
          fontFamily: "'Bungee Outline', cursive",
          fontSize: "5vw",
          marginTop: "3vw",
          fontWeight: "bold"
        },
        span(color) {
          return {
            color: `${color}`,
            textShadow: `0px 0px 0px ${color}`,
            animationName: "neon",
            animationDuration: "500ms",
            animationIterationCount: "infinite"
          };
        }
      };
      const items =
        this.props.results === "loading" ? (
          <h3 style={h3SpanStyle.h3}>
            <span style={h3SpanStyle.span("red")}>Lo</span>
            <span style={h3SpanStyle.span("blue")}>ad</span>
            <span style={h3SpanStyle.span("green")}>in</span>
            <span style={h3SpanStyle.span("purple")}>g!</span>
          </h3>
        ) : (
          this.props.results
            .sort((a, b) => a.index - b.index)
            .map((result) => {
              let random = (num) => Math.floor(Math.random() * num);
              let col = `rgba(${random(256)},${random(256)},${random(256)}`;
              let link = `https://${result.language}.wikipedia.org/wiki/${[
                ...result.title
              ]
                .map((x) => (x === " " ? "_" : x))
                .join("")}`;
  
              let style = {
                div: {
                  margin: "2vw 5vw",
                  padding: "2vw 20vw 2vw 2vw",
                  border: "4px solid",
                  textAlign: "justify",
                  animationName: "fadeIn",
                  borderRadius: "10px",
                  animationDuration: "1s",
                  animationDelay: `${result.id / 10}s`,
                  backgroundImage: `linear-gradient(to right,
                  rgb(255, 255, 255),rgb(255, 255, 255),
                  ${col},0.5),
                  ${col},1)`
                },
                p: {
                  fontWeight: "bold",
                  fontSize: "1.5vw"
                }
              };
  
              return (
                <a href={link} key={result.title} target="_blank">
                  <div style={style.div}>
                    <h3>{result.title}</h3>
                    <p style={style.p}>{result.extract}</p>
                  </div>
                </a>
              );
            })
        );
      return <div className="list_box">{items}</div>;
    }
  }
  
  module.exports = ItemsList;