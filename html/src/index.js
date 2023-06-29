import parser from "./parser.js";

const after = document.getElementById('after');
const before = document.getElementById('before');
const button = document.querySelector('.c-button');
const output = document.getElementById('output');

const alert = () => {
    const out = parser(JSON.parse(after.value) || "", JSON.parse(before.value) || "");
    output.value = out
};

button.addEventListener('click', alert);
