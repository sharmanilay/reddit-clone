export function abbreviateNumber(num) {
  const symbols = ['', 'k', 'm', 'g', 't', 'p', 'e'];
  const tier = Math.floor(Math.log10(num) / 3) || 0;
  let result = ''+num;
  if (tier > 0) {
    const suffix = symbols[tier];
    const scale = Math.pow(10, tier * 3);
    const scaled = parseInt(num)/scale;
    result = scaled.toFixed(1).replace('.0', '') + suffix;
  }
  return result;
}

export function readableDate(dateString) {
  const inputDate = new Date(parseInt(dateString)* 1000)
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const date = inputDate.getDate()
  const month = months[parseInt(inputDate.getMonth())-1]
  const year = inputDate.getFullYear()
  return `${date} ${month} ${year}`
}