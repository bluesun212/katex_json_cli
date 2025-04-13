#!/usr/bin/env node
const readline = require('readline');
const katex = require('katex');

function main() {
    const cli = readline.createInterface({input: process.stdin, output: process.stdout, terminal: false});
    let opts = {};

    cli.on('line', (line) => {
        var data = JSON.parse(line);

        // Parse options
        temp_opts = Object.assign({}, opts)
        if ('options' in data) {
            Object.assign(temp_opts, data['options']);
            if (!('input' in data)) {
                opts = temp_opts;
            }
        }

        // Render and output
        if ('input' in data) {
            let resp = {}
            try {
                var html = katex.renderToString(data.input, temp_opts);
                resp = {output: html};
            } catch (e) {
                resp = {error: e.message};
            }

            console.log(JSON.stringify(resp));
        }
    });
}

if (require.main === module) {
    main();
}
