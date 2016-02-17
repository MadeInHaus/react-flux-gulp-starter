import React from 'react';
import doStuff from 'actions/doStuff';

class About extends React.Component {

    // See https://github.com/yahoo/fluxible-action-utils#executemultiple-context-actions-done
    static load = (/** context, props **/) => ({
        doStuff: {
            action: doStuff,
        },
    });

    render() {
        return (
            <div>
                <h1>About</h1>
                <p>
                    Salvia irony slow-carb readymade, forage Etsy small batch aesthetic hoodie.
                    Pop-up leggings sartorial jean shorts flexitarian. Meggings narwhal Neutra,
                    plaid before they sold out cardigan taxidermy pour-over disrupt. Mixtape
                    Intelligentsia Neutra letterpress food truck, distillery keffiyeh mumblecore
                    retro Truffaut kogi synth ugh XOXO lo-fi. Mlkshk ethical swag, artisan twee pug
                    Portland freegan fanny pack distillery Carles Schlitz Bushwick bicycle rights
                    +1. Master cleanse four loko taxidermy dreamcatcher Tumblr art party. Flannel
                    cornhole XOXO synth cardigan, Helvetica bitters art party small batch
                    flexitarian McSweeney's wayfarers blog quinoa street art.
                </p>
                <p>
                    Ugh kogi YOLO artisan blog Neutra literally. Occupy fap readymade PBR&B.
                    Chillwave Williamsburg paleo vegan put a bird on it salvia. Authentic fixie
                    butcher squid, freegan lo-fi Etsy Brooklyn 90's viral. Art party Intelligentsia
                    meditation Banksy keytar Carles. Pinterest taxidermy brunch, Odd Future irony
                    iPhone small batch 3 wolf moon pork belly PBR narwhal church-key fashion axe
                    semiotics. Fingerstache street art single-origin coffee lo-fi brunch chia, High
                    Life fap locavore.
                </p>
            </div>
        );
    }

}

export default About;
