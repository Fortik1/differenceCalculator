import parser from "./parser.js";

const after = document.getElementById('after');
const before = document.getElementById('before');
const button = document.getElementById('button');
const output = document.getElementById('output');

const alert = () => {
    const out = parser(before.value, after.value);
};

button.addEventListener('click', alert);
