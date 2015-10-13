
var assetUrl = {
    name: 'assetUrl',
    env: null,
    bucket: null,
    prefix: null,
    cloudfront: false,

    plugContext: function (options, context, app) {
        // `options` is the same as what is passed into `Fluxible.createContext(options)`

        if(!this.rehydrated){
            this.env = options.env;
            this.siteUrl = options.siteUrl;

            if(options.aws){
                this.useAws = true;
                this.bucket = options.aws.bucket;
                this.prefix = options.aws.prefix;
                this.folder = options.aws.folder;
                this.cloudfront = options.aws.cloudfront;
                this.bypassCdn = options.aws.bypassCdn;
                this.urlHash = options.aws.urlHash;
            }
        }

        var useAws = this.useAws;
        var env = this.env;
        var siteUrl = this.siteUrl;
        var bucket = this.bucket;
        var prefix = this.prefix;
        var folder = this.folder;
        var cloudfront = this.cloudfront;
        var bypassCdn = this.bypassCdn;
        var urlHash = this.urlHash;

        var urlBase;

        if(cloudfront && !bypassCdn){
            urlBase = cloudfront + urlHash + '/';
        } else {
            urlBase = 'http://' + bucket + '.s3.amazonaws.com/' + prefix + '/'+ folder +'/';
        }

        var slashRegex = /([^:])\/{1,}/g;

        // Returns a context plugin
        return {
            plugComponentContext: (componentContext, context, app) => {
                // debugger;
                componentContext.assetUrl = function(path){
                    if(env === 'local' || !useAws){
                        return path;
                    }

                    if(path.indexOf('http') === 0 || path.indexOf(urlBase) === 0){
                        return path;
                    }

                    if(path.slice(0, 1) === '/'){
                        path = path.slice(1);
                    }

                    //Prepend the urlBase and remove any incidences of multiple
                    //slashes after the initial http://
                    return (urlBase + path).replace(slashRegex, '$1/');
                };

                componentContext.siteUrl = () => {
                    return siteUrl;
                };

                return componentContext;
            },
        };
    },

    dehydrate: function () {
        return {
            env: this.env,
            siteUrl: this.siteUrl,
            bucket: this.bucket,
            prefix: this.prefix,
            folder: this.folder,
            cloudfront: this.cloudfront,
            bypassCdn: this.bypassCdn,
            urlHash: this.urlHash,
        };
    },

    rehydrate: function (state) {
        this.env = state.env;
        this.siteUrl = state.siteUrl;
        this.bucket = state.bucket;
        this.prefix = state.prefix;
        this.folder = state.folder;
        this.cloudfront = state.cloudfront;
        this.bypassCdn = state.bypassCdn;
        this.urlHash = state.urlHash;
        this.rehydrated = true;
        this.useAws = state.useAws;
    },
};

module.exports = assetUrl;
