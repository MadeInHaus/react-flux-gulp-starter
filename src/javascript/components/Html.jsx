import React, { PropTypes } from 'react';

const Html = (props, context) => {
    return (
        <html>
            <head>
                <meta charSet="utf-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <title>
                    {props.title}
                </title>
                <meta name="description" content="" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <meta property="og:title" content={props.title} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={context.siteUrl()} />
                <meta
                    property="og:image"
                    content={context.assetUrl('/image.jpg')}
                />
                <meta property="og:description" content="Description Here" />
                <link
                    rel="shortcut icon"
                    href={context.assetUrl('/images/favicon.ico')}
                />
                <link
                    rel="stylesheet"
                    href={context.assetUrl('/css/styles.css')}
                />
            </head>
            <body>
                <div
                    id="app"
                    className="app"
                    dangerouslySetInnerHTML={{ __html: props.markup }}
                />
                <script dangerouslySetInnerHTML={{ __html: props.state }} />
                <script
                    defer
                    src={context.assetUrl('/js/modernizr-custom.js')}
                />
                <script defer src={context.assetUrl('/js/client.js')} />
            </body>
        </html>
    );
};

Html.propTypes = {
    markup: PropTypes.string.isRequired,
    state: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
};

Html.contextTypes = {
    assetUrl: PropTypes.func.isRequired,
    siteUrl: PropTypes.func.isRequired,
};

export default Html;
