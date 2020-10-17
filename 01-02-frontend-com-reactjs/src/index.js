/**
 * Webpack: Pra cada tipo de arquivo (.js, .css, .png, etc) eu vou converter o código de uma maneira diferente
 * Babel: converter (transpilar) o código do React para um código que o browser entenda
 *
 * Loaders: babel-loader, css-loader, sass-loader, file-loader, image-loader
 *
 * JSX: HTML dentro do JavaScript
 */

import React from "react";
import { render } from "react-dom";

import App from "./App";

render(<App />, document.getElementById("app"));
