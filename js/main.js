// jshint esversion:9
(function () {
  "use strict";
  /* jshint validthis: true */

  const questions = [
    {
      id: 1,
      que: "IC chips used in computers are usually made of:",
      yes: 1,
      ch1: "Lead",
      ch2: "Silicon",
      ch3: "Chromium",
      ch4: "Potato"
    },
    {
      id: 2,
      que: "WWW stands for ?",
      yes: 0,
      ch1: "World Wide Web",
      ch2: "Chipmunk",
      ch3: "Children",
      ch4: "Wide World Web"
    },
    {
      id: 3,
      que: "If a computer has more than one processor then it is known as ?",
      yes: 0,
      ch1: "Multiprocessor",
      ch2: "Silicon",
      ch3: "Brouhaha",
      ch4: "Doozy"
    },
    {
      id: 4,
      que: "Full form of URL is ?",
      yes: 1,
      ch1: "Multiprocessor",
      ch2: "Uniform Resource Locator",
      ch3: "Snollygoster",
      ch4: "Uniform Registered Link"
    },
    {
      id: 5,
      que: "What is the Italian word for pie? ",
      yes: 2,
      ch1: "Comeuppance",
      ch2: "Cakes",
      ch3: "Pizza",
      ch4: "Jazz"
    },
    {
      id: 6,
      que: "Which Russian town suffered an infamous nuclear disaster in 1986? ",
      yes: 1,
      ch1: "Donnybrook",
      ch2: "Chernobyl",
      ch3: "Pinocchio",
      ch4: "Nincompoop"
    },
    {
      id: 8,
      que: "What do you see in this picture?",
      img: "https://i.ibb.co/1f0hNdv/car1920x1080.png",
      yes: 2,
      ch1: "fish",
      ch2: "direction",
      ch3: "Car",
      ch4: "umbrella",
      ch5: "something",
      ch6: "Interesting"
    },
    {
      id: 9,
      que: "Second generation of computers consist of which of following ?",
      yes: 1,
      ch1: "Speedy Gonzalez",
      ch2: "Transistors",
      ch3: "Vaccum Tubes",
      ch4: "Diodes"
    },
    {
      id: 10,
      que: "MPG is an file extension of which type of files ?",
      yes: 3,
      ch1: "Image",
      ch2: "Audio",
      ch3: "Flash",
      ch4: "Video"
    }
  ];
  let star;
  let starBtn;
  let getBody;
  let getMainDiv;
  let getImagDiv;
  let getQuestio;
  let transwer;
  let score = 0;
  let getMessage;
  let question = 0;
  let stat;
  let seco;
  let seconds = 30;
  let tim = 0;

  function CreateElem(e, className, id, text, src) {
    if (!(this instanceof CreateElem)) return new CreateElem(e, className, id);
    e = document.createElement(e);
    if (id) e.id = id;
    if (className) e.className = className;
    if (text) e.innerText = text;
    if (src) {
      e.src = src;
      e.setAttribute("alt", "img");
    }
    return e;
  }

  function remElements(elementId) {
    let element = document.getElementById(elementId);
    if (element) {
      if (element.children.length) {
        while (element.firstChild) {
          element.removeChild(element.firstChild);
        }
      } else {
        element.parentNode.removeChild(element);
      }
    }
    return;
  }

  function inits() {
    getBody = document.body;
    getMainDiv = document.getElementById("main");
    getImagDiv = document.getElementById("imag");
    getQuestio = document.getElementById("ques");
    getMessage = document.getElementById("mess");
    starBtn = document.getElementById("starBtn");
    star = document.getElementById("star");
    stat = document.getElementById("stat");
    seco = document.getElementById("seco");
    getMainDiv.addEventListener("mouseup", loopElems);
  }

  function loded() {
    getBody.className = "";
    starBtn.innerHTML = "start";
    starBtn.addEventListener("click", start);
    [question, score] = [+readValue()[0], +readValue()[1]];
    updateStat();
    if (question > 0) starBtn.innerText = "continue";
  }

  function addQuestions(question) {
    const { id, que, img, yes, ...rest } = questions[question]; //destructure variables

    const answer = Object.keys(rest)[yes]; //the real answer variable

    transwer = answer;
    if (typeof img !== "undefined") {
      let imgSrc;
      if (img.indexOf("href") !== -1) {
        imgSrc = "img/" + (img || "d.png");
      } else {
        imgSrc = img;
      }
      let im = new CreateElem("img", "img", "img", "", imgSrc);
      getImagDiv.appendChild(im);
    }
    let qu = new CreateElem("div", "q", "q", que);
    let lenthOfRes = Object.keys(rest).length;
    let ans = [];

    for (let i = 0; i < lenthOfRes; i++) {
      ans.push(
        new CreateElem(
          "button",
          "btn tips trans",
          Object.keys(rest)[i],
          rest[Object.keys(rest)[i]]
        )
      );
    }
    ans.map(el => getMainDiv.appendChild(el));
    getQuestio.appendChild(qu);
  }

  function show() {
    let elems = [...document.getElementsByClassName("tips")];
    for (let i = elems.length - 1; i >= 0; i--) {
      elems[i].classList.toggle("trans");
    }
  }

  function updateStat() {
    let va = question;
    stat.innerText = va + 1 + "/" + questions.length;
  }

  function start() {
    addQuestions(question);
    setTimeout(show, 500);
    hide.call(mess);
    countdown();
    updateStat();
  }

  function loopElems(elem) {
    clearTimeout(tim);
    if (!elem.target.classList.contains("tips")) return;
    sele.call(elem.target);
    const getAllansw = [...document.getElementsByClassName("tips")];
    getAllansw.forEach(element => {
      if (element.id !== transwer) {
        nno.call(element);
      } else {
        yyes.call(element);
        window.navigator.vibrate(30);
      }
      element.disabled = true;
      element.style.pointerEvents = "none";
    });
    let elems = document.getElementById("id" + question);

    if (elem.target.id === transwer) {
      sele.bind(elems);
      score++;
    } else {
      nno.bind(elems);
      window.navigator.vibrate(300);
    }
    nextQuest();
  }

  function nextQuest() {
    seconds = 30;
    question++;
    if (question < questions.length) createItem(question, score);
    setTimeout(() => {
      show();
      setTimeout(() => {
        remElements("img");
        remElements("q");
        remElements("main");
        if (question === questions.length) {
          question = 0;
          star.innerText = "Your score: " + score + "/" + questions.length;
          if (questions.length === score) {
            star.innerText += "\nvictory";
            starBtn.innerText = "Repeat";
          } else {
            starBtn.innerText = "Improve";
          }
          getMessage.classList.remove("hide");
          score = 0;
          createItem(question, score);
        }
        if (question > 0) start();
      }, 0);
    }, 1500);
  }

  function hide() {
    this.classList.add("hide");
  }

  function sele() {
    this.classList.add("sele");
  }

  function yyes() {
    this.classList.add("yyes");
  }

  function nno() {
    if (typeof this !== "undefined") {
      this.classList.add("nno");
    }
  }

  function createItem(q, s) {
    if (storageAvailable("localStorage")) {
      localStorage.setItem("valueOfWhoDaHelQuestion", q);
      localStorage.setItem("valueOfWhoDaHelTrueAnsw", s);
    } else console.log("No localstorage");
  }

  function readValue() {
    if (storageAvailable("localStorage")) {
      let x = localStorage.getItem("valueOfWhoDaHelQuestion");
      let a = localStorage.getItem("valueOfWhoDaHelTrueAnsw");
      return [x, a];
    } else console.log("No localstorage");
  }

  function storageAvailable(type) {
    try {
      var storage = window[type],
        x = "__storage_test__";
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
    } catch (e) {
      return false;
    }
  }

  function countdown() {
    seco.innerText = seconds;
    if (seconds-- > 0) {
      tim = setTimeout(() => {
        countdown();
      }, 1000);
    } else {
      nextQuest();
      clearTimeout(tim);
    }
  }

  document.addEventListener("DOMContentLoaded", inits);
  window.addEventListener("load", loded);
})();
