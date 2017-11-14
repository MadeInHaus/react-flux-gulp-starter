import React from 'react';

export default function Home() {
    return (
        <article>
            <h1>Hello. Greetings.</h1>
            <p>You're viewing barebones UI for our React/Flux/Gulp starter.</p>
            <ul>
                <li>
                    Clone on{' '}
                    <a
                        href="https://github.com/MadeInHaus/react-flux-gulp-starter"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        GitHub
                    </a>
                </li>
                <li>
                    Made in{' '}
                    <a
                        href="https://madeinhaus.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        HAUS
                    </a>
                </li>
            </ul>
        </article>
    );
}
