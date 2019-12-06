import packageJson from './package.json'

const banner = `
// ==UserScript==
// @name         Drafts in TweetDeck
// @namespace    https://ciffelia.com/
// @version      ${packageJson.version}
// @description  ${packageJson.description}
// @author       ${packageJson.author}
// @license      ${packageJson.license}
// @homepage     ${packageJson.homepage}
// @supportURL   ${packageJson.bugs}
// @include      https://tweetdeck.twitter.com/
// @require      https://code.jquery.com/jquery-3.4.1.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/arrive/2.4.1/arrive.min.js
// @grant        none
// ==/UserScript==
`.trim() + '\n'

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/bundle.js',
    format: 'iife',
    banner
  }
}
