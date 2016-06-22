const assetUrl = {
    name: 'assetUrl',
    env: null,
    bucket: null,
    prefix: null,
    cloudfront: false,

    plugContext(options) {
        if (!this.rehydrated) {
            this.env = options.env;
            this.siteUrl = options.siteUrl;

            if (options.aws) {
                this.useS3 = options.aws.useS3;
                this.bucket = options.aws.bucket;
                this.prefix = options.aws.prefix;
                this.folder = options.aws.folder;
                this.cloudfront = options.aws.cloudfront;
                this.bypassCdn = options.aws.bypassCdn;
                this.urlHash = options.aws.urlHash;
            }
        }

        const useS3 = this.useS3;
        const env = this.env;
        const siteUrl = this.siteUrl;
        const bucket = this.bucket;
        const prefix = this.prefix;
        const folder = this.folder;
        const cloudfront = this.cloudfront;
        const bypassCdn = this.bypassCdn;
        const urlHash = this.urlHash;

        let urlBase;

        if (cloudfront && !bypassCdn) {
            urlBase = `${cloudfront}${urlHash}/`;
        } else {
            urlBase = `http://${bucket}.s3.amazonaws.com/${prefix}/${folder}/`;
        }

        const slashRegex = /([^:])\/{1,}/g;

        // Returns a context plugin
        return {
            plugComponentContext(componentContext) {
                return Object.assign(componentContext, {
                    assetUrl(path) {
                        if (env === 'local' || !useS3) {
                            return path;
                        }

                        if (path.indexOf('http') === 0 || path.indexOf(urlBase) === 0) {
                            return path;
                        }

                        const cleanPath = (path.slice(0, 1) === '/') ? path.slice(1) : path;

                        // Prepend the urlBase and remove any incidences of multiple
                        // slashes after the initial http://
                        return (`${urlBase}${cleanPath}`).replace(slashRegex, '$1/');
                    },
                    siteUrl() {
                        return siteUrl;
                    },
                });
            },
        };
    },

    dehydrate() {
        return {
            env: this.env,
            siteUrl: this.siteUrl,
            useS3: this.useS3,
            bucket: this.bucket,
            prefix: this.prefix,
            folder: this.folder,
            cloudfront: this.cloudfront,
            bypassCdn: this.bypassCdn,
            urlHash: this.urlHash,
        };
    },

    rehydrate(state) {
        this.env = state.env;
        this.siteUrl = state.siteUrl;
        this.useS3 = state.useS3;
        this.bucket = state.bucket;
        this.prefix = state.prefix;
        this.folder = state.folder;
        this.cloudfront = state.cloudfront;
        this.bypassCdn = state.bypassCdn;
        this.urlHash = state.urlHash;
        this.rehydrated = true;
    },
};

export default assetUrl;
