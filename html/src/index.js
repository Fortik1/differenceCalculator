import parser from "./parser.js";

const after = document.getElementById('after');
const before = document.getElementById('before');
const button = document.getElementById('button');
const output = document.getElementById('output');

const alert = () => {
    const out = parser(JSON.parse(before.value), JSON.parse(after.value));
    output.value = out
};

button.addEventListener('click', alert);
