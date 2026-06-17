// Workaround: @tinacms/cli bin has no extension in a "type":"module" package,
// which Node 22 refuses to load. This calls the CLI dist directly.
const cli = await import('./node_modules/@tinacms/cli/dist/index.js');
cli.default.runExit(process.argv.slice(2));
