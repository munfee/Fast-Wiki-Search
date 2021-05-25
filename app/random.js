const React = require('react');

function Random(props) {
    const url = `https://${props.language}.wikipedia.org/wiki/Special:Random`;
    return (
      <h2>
        <a href={url} target="_blank">
          Click me for a random article!
        </a>
      </h2>
    );
  }

  module.exports = Random;