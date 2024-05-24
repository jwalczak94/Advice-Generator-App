"use strict";

const btn = document.querySelector(".btn");
const adviceNumber = document.querySelector(".advice-number");
const quote = document.querySelector(".quote");

class AdviceGenerator {
  constructor() {
    this._updateImageSrc();
    this._generateRandomNumber = this._generateRandomNumber.bind(this);
    this._generateRandomAdvice = this._generateRandomAdvice.bind(this);

    // resize image based on vw
    window.addEventListener("resize", this._updateImageSrc);

    // generate random number
    btn.addEventListener("click", this._generateRandomNumber);

    // init advice
    this._generateRandomNumber();
  }

  _updateImageSrc() {
    const dividerImage = document.querySelector(".divider");
    const viewportWidth = window.innerWidth;

    if (viewportWidth < 600) {
      dividerImage.src = "./src/images/pattern-divider-mobile.svg";
    } else if (viewportWidth < 768) {
      dividerImage.src = "./src/images/pattern-divider-desktop.svg";
    }
  }

  _generateRandomNumber() {
    const min = 1;
    const max = 200;

    let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    adviceNumber.textContent = randomNumber;

    this._generateRandomAdvice(randomNumber);
  }

  _generateRandomAdvice(number) {
    fetch(`https://api.adviceslip.com/advice/${number}`)
      .then((response) => {
        if (!response.ok)
          throw new Error(`Advice not found (${response.status})`);
        return response.json();
      })
      .then((data) => {
        let advice = `"${data.slip.advice}"`;
        quote.textContent = advice;
      })
      .catch((err) => {
        this._renderError(`Something went wrong ${err.message} Try again!`);
      });
  }

  _renderError(message) {
    if (quote.hasChildNodes()) {
      const child = document.querySelector(".warning");
      quote.removeChild(child);
    }

    let html = `
    <span class="warning text-red-600 text-center">${message}</span>
    `;

    quote.insertAdjacentHTML("afterbegin", html);
  }
}

//const app = new AdviceGenerator();
new AdviceGenerator();
