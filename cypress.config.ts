import { defineConfig } from 'cypress'

export default defineConfig({
  projectId: '7h125w',
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
    baseUrl: 'https://houston-staging.pdq.tools',
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
    defaultCommandTimeout: 30000,
    supportFile: 'cypress/support/commands.ts',
    viewportHeight: 1080,
    viewportWidth: 1920,
    video: false
  }
})
