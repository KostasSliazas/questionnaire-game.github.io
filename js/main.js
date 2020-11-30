// jshint esversion:9
(function (w) {
  'use strict'
  /* jshint validthis: true */
  const URL = '../api/main.php'
  let questions = [{
    id: 1,
    que: 'IC chips used in computers are usually made of:',
    yes: 1,
    ch1: 'Lead',
    ch2: 'Silicon',
    ch3: 'Chromium',
    ch4: 'Potato'
  },
  {
    id: 2,
    que: 'WWW stands for ?',
    yes: 0,
    ch1: 'World Wide Web',
    ch2: 'Chipmunk',
    ch3: 'Children',
    ch4: 'Wide World Web'
  },
  {
    id: 3,
    que: 'If a computer has more than one processor then it is known as ?',
    yes: 0,
    ch1: 'Multiprocessor',
    ch2: 'Silicon',
    ch3: 'Brouhaha',
    ch4: 'Doozy'
  },
  {
    id: 4,
    que: 'Full form of URL is ?',
    yes: 1,
    ch1: 'Multiprocessor',
    ch2: 'Uniform Resource Locator',
    ch3: 'Snollygoster',
    ch4: 'Uniform Registered Link'
  },
  {
    id: 5,
    que: 'What is the Italian word for pie? ',
    yes: 2,
    ch1: 'Comeuppance',
    ch2: 'Cakes',
    ch3: 'Pizza',
    ch4: 'Jazz'
  },
  {
    id: 5,
    que: 'Which country flag is it?',
    yes: 2,
    ch1: 'Lithuania',
    ch2: 'Estonia',
    ch3: 'Latvia',
    ch4: 'Polska',
    img: '19.jpg'
  }
  ]
  w.fetch(URL).then((response) => response.json())
    .then((response) => {
      questions = response
    }).catch((e) => {
      console.log(`failed to load DB default 9 questions loaded: ${e}`)
    })

  let star
  let starBtn
  let getMainDiv
  let getImagDiv
  let getQuestio
  let transwer
  let score = 0
  let getMessage
  let question = 0
  let stat
  let seco
  let seconds = 30
  let tim = 0

  function CreateElem (e, className, id, text, src) {
    if (!(this instanceof CreateElem)) return new CreateElem(e, className, id)
    e = document.createElement(e)
    if (id) e.id = id
    if (className) e.className = className
    if (text) e.innerText = text
    if (src) {
      e.src = src
      e.setAttribute('alt', 'img')
    }
    return e
  }

  function remElements (elementId) {
    const element = document.getElementById(elementId)
    if (element) {
      if (element.children.length) {
        while (element.firstChild) {
          element.removeChild(element.firstChild)
        }
      } else {
        element.parentNode.removeChild(element)
      }
    }
  }

  function inits () {
    getMainDiv = document.getElementById('main')
    getImagDiv = document.getElementById('imag')
    getQuestio = document.getElementById('ques')
    getMessage = document.getElementById('mess')
    starBtn = document.getElementById('starBtn')
    star = document.getElementById('star')
    stat = document.getElementById('stat')
    seco = document.getElementById('seco')
    getMainDiv.addEventListener('mouseup', loopElems)
  }

  function loded () {
    starBtn.innerHTML = 'start'
    if (!w.localStorage.wZfZrT2N14M6NdG9bbrI) {
      const el = document.createElement('p')
      const di = document.createElement('div')
      el.innerHTML = 'This game is using <a href="https://en.wikipedia.org/wiki/Web_storage#Local_and_session_storage" target="_blank" rel="noopener noreferrer">localStorage</a>. By playing you agree to store data in localStorage'
      di.appendChild(el)
      starBtn.parentNode.insertBefore(di, starBtn.nextSibling)
    }
    starBtn.addEventListener('click', start);
    [question, score] = [+readValue()[0], +readValue()[1]]
    if (question > 0) starBtn.innerText = 'continue'
  }

  function addQuestions (question) {
    if (!questions[question]) question = 0
    const {
      id,
      que,
      img,
      yes,
      ...rest
    } = questions[question] // destructure variables
    const answer = Object.keys(rest)[yes] // the real answer variable

    transwer = answer
    if (typeof img !== 'undefined') {
      let imgSrc
      if (img.indexOf('href') !== -1) {
        imgSrc = 'img/' + (img || 'd.png')
      } else {
        imgSrc = img
      }
      const im = new CreateElem('img', 'img', 'img', '', imgSrc)
      getImagDiv.appendChild(im)
    }

    const qu = new CreateElem('div', 'q', 'q', que)
    const lenthOfRes = Object.keys(rest).length
    const ans = []

    for (let i = 0; i < lenthOfRes; i++) {
      if (rest[Object.keys(rest)[i]]) {
        ans.push(
          new CreateElem(
            'button',
            'btn tips trans',
            Object.keys(rest)[i],
            rest[Object.keys(rest)[i]]
          )
        )
      }
    }
    ans.map(el => getMainDiv.appendChild(el))
    getQuestio.appendChild(qu)
  }

  function show () {
    const elems = [...document.getElementsByClassName('tips')]
    for (let i = elems.length - 1; i >= 0; i--) {
      elems[i].classList.toggle('trans')
    }
  }

  function updateStat () {
    const va = question
    stat.innerText = va + 1 + '/' + questions.length
  }

  function start () {
    addQuestions(question)
    setTimeout(show, 500)
    hide.call(getMessage)
    countdown()
    updateStat()
  }

  function loopElems (elem) {
    clearTimeout(tim)
    if (!elem.target.classList.contains('tips')) return
    sele.call(elem.target)
    const getAllansw = [...document.getElementsByClassName('tips')]
    getAllansw.forEach(element => {
      if (element.id !== transwer) {
        nno.call(element)
      } else {
        yyes.call(element)
      }
      element.disabled = true
      element.style.pointerEvents = 'none'
    })
    const elems = document.getElementById('id' + question)

    if (elem.target.id === transwer) {
      sele.bind(elems)
      yyes.call(getQuestio)
      score++
    } else {
      nno.call(getQuestio)
      nno.bind(elems)
      w.navigator.vibrate(300)
    }
    nextQuest()
  }

  function nextQuest () {
    seconds = 30
    question++
    if (question < questions.length) createItem(question, score)
    setTimeout(() => {
      show()
      setTimeout(() => {
        remElements('img')
        remElements('q')
        remElements('main')
        getQuestio.className = 'bg'
        if (question === questions.length) {
          question = 0
          star.innerText = 'Your score: ' + score + '/' + questions.length
          if (questions.length === score) {
            star.innerText += '\nvictory'
            starBtn.innerText = 'Repeat'
          } else {
            starBtn.innerText = 'Improve'
          }
          getMessage.classList.remove('hide')
          score = 0
          createItem(question, score)
        }
        if (question > 0) start()
      }, 0)
    }, 1500)
  }

  function hide () {
    this.classList.add('hide')
  }

  function sele () {
    this.classList.add('sele')
  }

  function yyes () {
    this.classList.add('yyes')
  }

  function nno () {
    if (typeof this !== 'undefined') {
      this.classList.add('nno')
    }
  }

  function createItem (q, s) {
    if (storageAvailable('localStorage')) {
      w.localStorage.setItem('wZfZrT2N14M6NdG9bbrI', q)
      w.localStorage.setItem('d2SemiF4K6jUP1rrLI9j', s)
    } else console.log('No localstorage')
  }

  function readValue () {
    if (storageAvailable('localStorage')) {
      const x = w.localStorage.getItem('wZfZrT2N14M6NdG9bbrI')
      const a = w.localStorage.getItem('d2SemiF4K6jUP1rrLI9j')
      return [x, a]
    } else console.log('No localstorage')
  }

  function storageAvailable (type) {
    try {
      const storage = w[type]
      const x = '__storage_test__'
      storage.setItem(x, x)
      storage.removeItem(x)
      return true
    } catch (e) {
      return false
    }
  }

  function countdown () {
    seco.innerText = seconds
    if (--seconds > 0) {
      tim = setTimeout(() => {
        countdown()
      }, 1000)
    } else {
      nextQuest()
      clearTimeout(tim)
    }
  }

  document.addEventListener('DOMContentLoaded', inits)
  w.addEventListener('load', loded)
})(window)
