var userdetails = JSON.parse(window.localStorage.getItem('userDetails'))
userdetails = userdetails.map((element) => {
  element.timestamp = new Date(element.date + ' ' + element.ftime)
  return element
})

userdetails.sort(function (a, b) {
  return a.timestamp - b.timestamp
})
var html2 = '<div class="box">'
html2 += '<div class="color-box">'

html2 += ' <span class="Gray-colorbox"></span>'
html2 += ' <p>' + `&nbsp;Past Appointments&nbsp; ` + '</p>'
html2 += ' </div>'
html2 += ' <div class="color-box">'
html2 += ' <span class="green-colorbox"></span>'
html2 += ' <p>' + `&nbsp;Running Appointments&nbsp;` + '</p>'
html2 += '</div>'
html2 += '<div class="color-box">'
html2 += '<span class="blue-colorbox"></span>'
html2 += '<p>' + `&nbsp;Upcoming Appointments&nbsp;` + '</p>'
html2 += '</div>'
html2 += '</div>'

document.getElementById('color-line').innerHTML = html2

var html = '<table>'
html += '<thead>'
html += '<tr>'
html += '<th>' + `Date` + '</th>'
html += '<th>' + `Name` + '</th>'
html += '<th>' + `Email` + '</th>'
html += '<th>' + `From time` + '</th>'
html += '<th>' + `To time` + '</th>'
html += '<th>' + `Description` + '</th>'
html += '</tr>'
html += '</thead>'
html += '<tbody id="trbody">'

for (var i = 0; i < userdetails.length; i++) {
  html += '<tr id ="tr' + (i + 1) + '">'
  html += '<td>' + userdetails[i].date + '</td>'
  html += '<td>' + userdetails[i].name + '</td>'
  html += '<td>' + userdetails[i].email + '</td>'
  html += '<td>' + userdetails[i].ftime + '</td>'
  html += '<td>' + userdetails[i].ttime + '</td>'
  html += '<td>' + userdetails[i].des + '</td>'
  html += '</tr>'
}
html += '</tbody>'
html += '</table>'

document.getElementById('table').innerHTML = html

for (var i = 0; i < userdetails.length; i++) {
  fromtimed = new Date(userdetails[i].date + ' ' + userdetails[i].ftime)

  totimed = new Date(userdetails[i].date + ' ' + userdetails[i].ttime)

  var getdate = new Date()

  if (getdate >= fromtimed && getdate <= totimed) {
    var rnAppointment = document.getElementById('tr' + (i + 1))
    rnAppointment.style.backgroundColor = 'green'
    rnAppointment.style.color = '#ffff'
  }
  if (getdate > totimed) {
    var pastAppointment = document.getElementById('tr' + (i + 1))
    pastAppointment.style.backgroundColor = 'grey'
  }
  if (getdate < fromtimed) {
    var nextAppointment = document.getElementById('tr' + (i + 1))
    nextAppointment.style.backgroundColor = 'blue'
  }
}
