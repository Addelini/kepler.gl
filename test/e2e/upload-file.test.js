// Copyright (c) 2020 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

import {detectModalClosing} from './utils';

const TIMEOUT = process.env.SLOWMO ? 30000 : 10000;
const CONFIRM_BUTTON_CLASS_NAME = '.modal--footer--confirm-button';
const MAP_ACTIONS_CLASS_NAME = 'div[data-for="save-action"]';

beforeAll(async () => {
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(URL, {waitUntil: 'domcontentloaded'});
});

describe('Load map', () => {
  test('Select earthquakes example', async () => {
    await page.waitForSelector('.demo-map-action');

    await page.click('.demo-map-action');

    await page.waitForSelector('.sample-map-gallery');

    await page.waitFor(2000);

    await page.waitForSelector('#earthquakes .sample-map__image');

    await page.click('#earthquakes .sample-map__image');

    await page.waitFor(3000);
  }, TIMEOUT);

  test('Export Image', async () => {
    const selector = '.save-export-dropdown #image';

    await page.click(MAP_ACTIONS_CLASS_NAME);

    await page.waitForSelector(selector);

    await page.click(selector);

    await page.waitForSelector('.preview-image-placeholder');

    await page.click(CONFIRM_BUTTON_CLASS_NAME);

    await detectModalClosing(page);
  }, TIMEOUT);

  test('Export Data - Filtered', async () => {
    const dataSelector = '.save-export-dropdown #data';

    await page.click(MAP_ACTIONS_CLASS_NAME);

    await page.waitForSelector(dataSelector);

    await page.click(dataSelector);

    await page.click(CONFIRM_BUTTON_CLASS_NAME);

    await detectModalClosing(page);
  }, TIMEOUT);

  test('Export Data - Unfiltered', async () => {
    const dataSelector = '.save-export-dropdown #data';

    await page.click(MAP_ACTIONS_CLASS_NAME);

    await page.waitForSelector(dataSelector);

    await page.click(dataSelector);

    await page.click('.unfiltered-option');

    await page.click(CONFIRM_BUTTON_CLASS_NAME);

    await detectModalClosing(page);
  }, TIMEOUT);

  test('Show Legend', async () => {
    await page.click('.show-legend.map-control-button');

    await page.waitForSelector('.map-legend');

    // await takeScreenshot(page);

    await page.waitForSelector('.close-map-control-item');

    await page.click('.close-map-control-item');

    // await takeScreenshot(page);
  }, TIMEOUT);

  test('Split Map', async () => {
    const splitMapButton = '.split-map.map-control-button';
    const closeSplitMapButton = '.split-map.close-map.map-control-button';

    await page.click(splitMapButton);

    await page.waitForSelector(closeSplitMapButton);

    // await takeScreenshot(page);

    await page.click('.split-map.close-map.map-control-button');

    await page.waitForSelector(splitMapButton);

    // await takeScreenshot(page);
  }, TIMEOUT);

  test('Create Geo-Filter', async () => {
    await page.click('div[data-for="map-draw"]');

    await page.waitForSelector('.map-draw-controls .draw-rectangle');

    await page.click('.map-draw-controls .draw-rectangle');

    // top-left
    await page.mouse.click(676, 268, { button: 'left' });

    // bottom-right
    await page.mouse.click(970, 485, { button: 'left' });

    // right click
    await page.mouse.click(850, 350, { button: 'right' });

    // hover layers item
    await page.hover('.editor-layers-list');

    // hover first layer
    await page.hover('.editor-layers-list .layer-panel-item');

    // click first layer
    await page.click('.editor-layers-list .layer-panel-item');

    // click outside polygon
    await page.mouse.click(600, 485, { button: 'left' });

    // await takeScreenshot(page);

    // await detectModalClosing(page);
  }, TIMEOUT);

});
