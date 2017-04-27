/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const express = require('express');
const favicon = require('serve-favicon');
// serializes any type including functions
const serialize = require('serialize-javascript');
const vueSR = require('vue-server-renderer');

const app = express();
const port = process.env.PORT || 8080;
const production = process.env.NODE_ENV === 'production';
const layoutFile = path.resolve('./dist/index.html');

const envFile = path.resolve(process.cwd(), '.env.js');
const env = fs.existsSync(envFile) ? require(envFile) : {};

let layout, renderer;

function parseLayout(html) {
	let layout = html.split('<html>');

	const start = layout[0] + '<html';
	layout = layout[1].split('</head>');
	const head = '>' + layout[0];
	layout = layout[1].split('<body>');
	const body = '</head>' + layout[0] + '<body';
	layout = layout[1].split('<!--APP-->');
	const afterBody = '>' + layout[0];
	const end = layout[1];

	return [
		// before app layout
		(headMeta, htmlAttrs, bodyAttrs) => {
			headMeta = headMeta || '';
			htmlAttrs = htmlAttrs.replace('data-meta=""', '');
			bodyAttrs = bodyAttrs.replace('data-meta=""', '');

			htmlAttrs = ' data-meta-ssr' + (htmlAttrs ? (' ' + htmlAttrs) : '');
			bodyAttrs = bodyAttrs ? (' ' + bodyAttrs.replace('data-meta=""', '')) : '';
			return start + htmlAttrs +
					head + headMeta +
					body + bodyAttrs +
					afterBody;
		},
		// after app layout
		end
	];
}

if (production) {
	layout = parseLayout(fs.readFileSync(layoutFile, 'utf-8'));
	renderer = vueSR.createBundleRenderer(fs.readFileSync(path.resolve('./dist/server-bundle.js'), 'utf-8'));
}
else {
	require('./build/setup-dev-server')(app, {
		bundleUpdated(bundle) {
			renderer = vueSR.createBundleRenderer(bundle);
		},
		layoutUpdated(html) {
			layout = parseLayout(html);
		}
	});
}

app.get('/dist/server-bundle.js', (req, res, next) => { next(); });
app.use('/dist', express.static('./dist'));
app.use(favicon(path.join(process.cwd(), 'favicon.ico')));

// optional api proxy
if (env.apiProxy) {
	app.use(env.apiProxy.prefix, require('http-proxy-middleware')(env.apiProxy));
}

app.get('*', (req, res) => {
	if (!renderer || !layout) return res.end('Compiling app, refresh in a moment...');
	res.setHeader('Content-Type', 'text/html');

	const context = { url: req.url };
	const stream = renderer.renderToStream(context);

	stream.once('data', () => {
		const {
			meta, title, link, style, script, noscript,
			htmlAttrs,
			bodyAttrs
		} = context.meta.inject();

		res.write(layout[0](
			// <head> ...
			[meta, title, link, style, script, noscript].reduce((acc, el) => acc + el.text(), ''),
			// <html ATTRS>
			htmlAttrs.text(),
			// <body ATTRS>
			bodyAttrs.text()
		));
	});

	stream.on('data', chunk => {
		res.write(chunk);
	});

	stream.on('end', () => {
		if (context.initialState) {
			res.write(`<script>window.__INITIAL_STATE__=${serialize(context.initialState)}</script>`);
		}
		if (context.initialState.serverError) {
			// let application handle server error if possible
			console.error((new Date()).toUTCString() + ': data prefetching error');
			console.error(context.initialState.serverError);
			res.status(500);
		}
		res.end(layout[1]);
	});

	stream.on('error', err => {
		console.error((new Date()).toUTCString() + ': page render error');
		console.error(err);
		res.status(500).end('Something went wrong...');
	});
});

app.listen(port);