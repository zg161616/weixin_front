const formatTime = date => {
  var date = new Date(date)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const formatHour = time =>{
  var time = time / 1000;
  var hour = Math.floor(time/(60*60))+"时";
  var minutes = Math.floor(time/60)+"分";
  var seconds = Math.floor(time%60)+"秒";
  return [hour,minutes,seconds].join("")
}

module.exports = {
  formatTime: formatTime,
  formatNumber:formatNumber,
  formatHour: formatHour
}
