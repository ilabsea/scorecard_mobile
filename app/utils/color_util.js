const colorUtil = (() => {
  return {
    getRandomColor,
  }

  function getRandomColor() {
    const randomHex = _getRandomHex();

    return `#${randomHex}`;

    // return { background_color: `#${randomHex}`, text_color: _invertColor(randomHex) }
  }

  // private method
  function _getRandomHex() {
    const maxVal = 0xFFFFFF; // 16777215 (is the maximum number for color code)
    let randomNumber = Math.random() * maxVal; // return a floating point random number
    randomNumber = Math.floor(randomNumber); // convert the floating point to integer

    return randomNumber.toString(16); // convert the integer to hexadecimal
  }

  function _invertColor(colorCode) {
    return `#${(Number(`0x1${colorCode}`) ^ 0xFFFFFF).toString(16).substring(1)}`;
  }
})()

export default colorUtil;