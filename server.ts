import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr/node';
import { createCache } from 'cache-manager';
import compression from 'compression';
import express from 'express';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import zlib from 'node:zlib';
import bootstrap from './src/main.server';

const CACHE_TTL = +(process.env['CACHE_TTL_IN_MIN'] ?? 5) * 60 * 1_000;

const cache = createCache({ ttl: CACHE_TTL });

// The Express app is exported so that it can be used by serverless Functions.
export function app() {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(serverDistFolder, 'index.server.html');

  const commonEngine = new CommonEngine();

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  server.use(compression({ level: zlib.constants.Z_BEST_COMPRESSION }));

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get('*.*', express.static(browserDistFolder, { maxAge: '1y' }));

  // All regular routes use the Angular engine
  server.get(
    '*',
    (req, res, next) => {
      console.log('Looking for route in cache: ' + req.originalUrl);

      cache
        .get(req.originalUrl)
        .then((cachedHtml) => {
          if (cachedHtml) {
            // Cached page exists. Send it.
            console.log(`Page found in cache: ${req.originalUrl}`);
            res.send(cachedHtml);
          } else {
            console.warn(`Page not found in cache: ${req.originalUrl}`);
            next();
          }
        })
        .catch((error: unknown) => {
          console.warn(
            `Error while looking for route in cache: ${String(error)}`,
          );
          next();
        });
    },
    (req, res, next) => {
      const { protocol, originalUrl, baseUrl, headers } = req;

      commonEngine
        .render({
          bootstrap,
          documentFilePath: indexHtml,
          url: `${protocol}://${headers.host}${originalUrl}`,
          publicPath: browserDistFolder,
          providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
        })
        .then((html) => {
          console.log(`Caching the request: ${req.originalUrl}`);

          cache
            .set(req.originalUrl, html, CACHE_TTL)
            .then(() => res.send(html))
            .catch((error: unknown) => {
              console.warn(`Could not cache the request: ${String(error)}`);
            });
        })
        .catch((error: unknown) => {
          next(error);
        });
    },
  );

  return server;
}

function run(): void {
  const port = process.env['PORT'] ?? 4200;

  // Start up the Node server
  const server = app();

  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

run();
