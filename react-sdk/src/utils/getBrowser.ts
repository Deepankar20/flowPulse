import Bowser from "bowser";

export function getParsedBrowserInfo() {
  const parser = Bowser.getParser(window.navigator.userAgent);
  return parser.getBrowser().name; // { name: 'Chrome', version: '123.0' }
}