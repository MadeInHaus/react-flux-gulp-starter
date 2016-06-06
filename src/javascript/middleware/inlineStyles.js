import fs from 'fs';
import inject from 'connect-inject';

const append = (w, s) => {
    return s + w;
};

const template = (css, cssFile) => {
    return `<style>
/* Styles embedded from ${cssFile} */
${css}
</style>`;
};

const inlineStyles = (cssFile) => {
    let error = '';

    try {
        const css = fs.readFileSync(cssFile);
        return inject({
            rules: [{
                match: /<\/head>/,
                fn: append,
            }],
            snippet: template(css, cssFile),
        });
    } catch (e) {
        switch (e.code) {
            case 'ENOENT':
                error = 'File not found';
                break;
            default:
                error = 'Unknown';
        }
        return inject({
            rules: [{
                match: /<\/head>/,
                fn: append,
            }],
            snippet: `<script type="text/javascript">
                    if (typeof console !== "undefined") {
                        console.warn('Warning: Inline styles could not be embedded from: ${cssFile}. Error: ${error}.');
                    }
                    </script>`,
        });
    }
};

export default inlineStyles;
