require('dotenv').config();

const config = ({
  testDir: './tests',
  retries: parseInt(process.env.RETRY_COUNT) || 1,
  workers: parseInt(process.env.WORKERS) || 2,
  timeout: parseInt(process.env.TIMEOUT) || 40 * 1000,
  expect: {
    timeout: parseInt(process.env.EXPECT_TIMEOUT) || 5000,
  },
  reporter: [
    ['html'],
    ['json', { outputFile: 'test-results/results.json' }],
    ['junit', { outputFile: 'test-results/junit.xml' }],
  ],
  use: {
    baseURL: process.env.BASE_URL || 'https://www.saucedemo.com/',
    headless: process.env.HEADLESS === 'true',
    launchOptions: {
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    },
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chrome',
      use: {
        browserName: 'chromium',
        headless: process.env.HEADLESS === 'true',
        screenshot: process.env.SCREENSHOT_MODE || 'on',
        video: process.env.VIDEO_MODE || 'on-first-retry',
        ignoreHTTPSErrors: true,
        trace: 'retain-on-failure',
      },
    },
    {
      name: 'firefox',
      use: {
        browserName: 'firefox',
        headless: process.env.HEADLESS === 'true',
        screenshot: 'on-failure',
        video: process.env.VIDEO_MODE || 'on-first-retry',
        ignoreHTTPSErrors: true,
        trace: 'retain-on-failure',
      },
    },
    {
      name: 'webkit',
      use: {
        browserName: 'webkit',
        headless: process.env.HEADLESS === 'true',
        screenshot: 'on-failure',
        video: process.env.VIDEO_MODE || 'on-first-retry',
        ignoreHTTPSErrors: true,
        trace: 'retain-on-failure',
      },
    },
  ],

});

module.exports = config;


