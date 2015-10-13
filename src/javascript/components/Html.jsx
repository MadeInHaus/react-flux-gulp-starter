import React, {PropTypes} from 'react';

class Html extends React.Component{
    render () {
        return (
            <html>
                <head>
                    <meta charSet="utf-8" />
                    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                    <title>{this.props.title}</title>
                    <meta name="description" content="" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <meta property="og:title" content={this.props.title} />
                    <meta property="og:type" content="article" />
                    <meta property="og:url" content={this.context.siteUrl()} />
                    <meta property="og:image" content={this.context.assetUrl("/image.jpg")} />
                    <meta property="og:description" content="Description Here" />
                    <link rel="shortcut icon" href={this.context.assetUrl("favicon.ico")} />
                    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Dosis:400,600" />
                    <link rel="stylesheet" href={this.context.assetUrl("/css/styles.css")} />
                </head>
                <body>
                    <div id="app" className="app" dangerouslySetInnerHTML={{__html: this.props.markup}}></div>
                    <script dangerouslySetInnerHTML={{__html: this.props.state}}></script>
                    <script src={this.context.assetUrl("/js/client.js")} defer></script>
                </body>
            </html>
        );
    }
}

Html.contextTypes = {
    assetUrl: PropTypes.func.isRequired,
    siteUrl: PropTypes.func.isRequired
};

export default Html
