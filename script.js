const main = document.querySelector('main');
const voicesSelect = document.getElementById('voices');
const textarea = document.getElementById('text');
const textBox = document.getElementById('text-box');
const readBtn = document.getElementById('read');
const toggleBtn = document.getElementById('toggle');
const closeBtn = document.getElementById('close');

// Data entry for main
const data = [
    {
      image: './images/drink.jpg',
      text: "I'm Thirsty"
    },
    {
      image: './images/food.jpg',
      text: "I'm Hungry"
    },
    {
      image: './images/tired.jpg',
      text: "I'm Tired"
    },
    {
      image: './images/hurt.jpg',
      text: "I'm Hurt"
    },
    {
      image: './images/happy.jpg',
      text: "I'm Happy"
    },
    {
      image: './images/angry.jpg',
      text: "I'm Angry"
    },
    {
      image: './images/sad.jpg',
      text: "I'm Sad"
    },
    {
      image: './images/scared.jpg',
      text: "I'm Scared"
    },
    {
      image: './images/outside.jpg',
      text: 'I Want To Go Outside'
    },
    {
      image: './images/home.jpg',
      text: 'I Want To Go Home'
    },
    {
      image: './images/school.jpg',
      text: 'I Want To Go To School'
    },
    {
      image: './images/grandma.jpg',
      text: 'I Want To Go To Grandmas'
    }
];
  
// Init display of boxes
data.forEach(createBox);

// Store voices
let voices = [];

// Functions
// 1. To create the small text boxes
function createBox(item) {
    const box = document.createElement('div');

    const { image, text } = item;

    box.classList.add('box');
    box.innerHTML = `
        <img src="${image}" alt="${text}"/>
        <p class="info"> ${text} </p>
    `;

    // Adding event listeners
  box.addEventListener('click', () => {
    setTextMessage(text);
    speakText();

    box.classList.add('active');
    setTimeout(() => box.classList.remove('active'), 800);
  });

    main.appendChild(box);
}

// 2. Get voices from speechSynthesis
function getVoices() {
  voices = speechSynthesis.getVoices();
  
  voices.forEach(voice => {
    const option = document.createElement('option');
    option.value = voice.voiceURI;
    option.innerText = `${voice.name} ${voice.lang}`;

    voicesSelect.appendChild(option);
  })
}

// 3. For speechSynthesis to work
function setTextMessage(text) {
  message.text = text;
}

// 4. Speech text conversion
function speakText() {
  speechSynthesis.speak(message);
}

// 5. Setting the voice option in textArea
function setVoice(e) {
  message.voice = voices.find(voice => voice.voiceURI === e.target.value);
}

// 6. For custom message synthesis
function customMessageRead() {
  setTextMessage(textarea.value);
  speakText();
}

// Event Listeners
// 1. Toggle the text area
toggleBtn.addEventListener('click', () => {
  textBox.classList.toggle('show');
})

// 2. Remove the text area
closeBtn.addEventListener('click', () => {
  textBox.classList.remove('show');
})

// 3. Speech synthesis
speechSynthesis.addEventListener('voiceschanged', getVoices);

// 4. Selecting voice options
voicesSelect.addEventListener('change', setVoice);

// 5. For custom message synthesis
readBtn.addEventListener('click', customMessageRead)

// Init functions
// 1. For textArea options
getVoices();

// 2. For speech synth
const message = new SpeechSynthesisUtterance();
