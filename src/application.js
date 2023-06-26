export default () => {
    const after = document.getElementById('after');
    const before = document.getElementById('before');
    const button = document.getElementsByClassName('c-button');
    const output = document.getElementById('output');
    const alert = () => {
        console.log('1')
    }
    button.addEventListener('click', alert)
}
