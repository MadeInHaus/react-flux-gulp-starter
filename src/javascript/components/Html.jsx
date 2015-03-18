'use strict';

var React = require('react');

var Html = React.createClass({
    render: function() {
        return (
            <html lang={this.props.locale}>
            <head>
                <meta charSet="utf-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <title>{this.props.title}</title>
                <meta name="description" content="" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta property="og:title" content="Title Here" />
                <meta property="og:type" content="article" />
                <meta property="og:url" content="http://www.example.com/" />
                <meta property="og:image" content="http://example.com/image.jpg" />
                <meta property="og:description" content="Description Here" />
                <link rel="stylesheet" href="/css/styles.css" />
            </head>
            <body>
                <div id="app" dangerouslySetInnerHTML={{__html: this.props.markup}}></div>
                <script dangerouslySetInnerHTML={{__html: this.props.state}}></script>
                <script src="/js/client.js" defer></script>
            </body>
            </html>
        );
    }
});

module.exports = Html;
