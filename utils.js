function formatDate(date, format) {
  const map = {
    hh: date.getHours().toString().padStart(2, '0'),
    mm: date.getMinutes().toString().padStart(2, '0'),
    ss: date.getSeconds().toString().padStart(2, '0'),
    dd: date.getDate().toString().padStart(2, '0'),
    MM: (date.getMonth() + 1).toString().padStart(2, '0'),
    yy: date.getFullYear().toString().slice(-2),
    yyyy: date.getFullYear(),
  };

  return format.replace(/hh|mm|ss|dd|MM|yy|yyy/gi, (matched) => map[matched]);
}

export default formatDate;
