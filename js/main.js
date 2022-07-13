let fromTimeArray = []
const start1 = new Date()
start1.setHours(9, 0, 0)
const end1 = new Date()
end1.setHours(18, 0, 0)
while (start1 <= end1) {
  fromTimeArray.push(
    start1.toLocaleString('en-US', { hour: '2-digit', minute: '2-digit' }),
  )
  start1.setMinutes(start1.getMinutes() + 30)
}
opt1 += '<option>' + `Choose Time` + '</option>'

for (var j = 0; j < fromTimeArray.length; j++) {
  var opt1

  opt1 +=
    '<option  id="fromtime' +
    (j + 1) +
    '" value="' +
    fromTimeArray[j] +
    '">' +
    fromTimeArray[j] +
    '</option>'
}

document.getElementById('fromtime').innerHTML = opt1

let toTimeArray = []
const start = new Date()
start.setHours(9, 0, 0)
const end = new Date()
end.setHours(18, 0, 0)
while (start <= end) {
  toTimeArray.push(
    start.toLocaleString('en-US', { hour: '2-digit', minute: '2-digit' }),
  )
  start.setMinutes(start.getMinutes() + 30)
}

opt2 += '<option>' + `Choose Time` + '</option>'

for (var k = 0; k < toTimeArray.length; k++) {
  var opt2

  opt2 +=
    '<option  id="totime' +
    (k + 1) +
    '" value="' +
    toTimeArray[k] +
    '">' +
    toTimeArray[k] +
    '</option>'
}
document.getElementById('totime').innerHTML = opt2

document
  .getElementById('addtabledata')
  .addEventListener('click', function (event) {
    var fname = document.getElementById('inputname').value
    var email = document.getElementById('inputEmail').value
    var date = document.getElementById('inputDate').value
    var ftime = document.getElementById('fromtime').value
    var ttime = document.getElementById('totime').value
    var des = document.getElementById('description').value
    var data = {
      name: fname,
      email: email,
      date: date,
      ftime: ftime,
      ttime: ttime,
      des: des,
    }

    var today = new Date()
    var dd = String(today.getDate()).padStart(2, '0')
    var mm = String(today.getMonth() + 1).padStart(2, '0')
    var yyyy = today.getFullYear()

    today = yyyy + '-' + mm + '-' + dd

    var d1 = Date.parse(today)

    var d2 = Date.parse(date)
    if (d1 > d2) {
      event.preventDefault()
      return alert('Please Enter Valide Date')
    }

    var ft = ftime
    var tt = ttime

    const startTime = moment(ftime, 'HH:mm a')
    const endTime = moment(ttime, 'HH:mm a')
    const duration = moment.duration(endTime.diff(startTime))
    const hours = parseInt(duration.asHours())
    const minutes = parseInt(duration.asMinutes()) % 60

    if (hours !== 0) {
      event.preventDefault()
      return alert('Please Enter valid Apointment Time..!')
    }

    if (ft === 'Choose Time') {
      event.preventDefault()
      return alert('Please Enter From Time ..!')
    } else if (tt === 'Choose Time') {
      event.preventDefault()
      return alert('Please Enter To Time ..!')
    } else if (ft === tt) {
      event.preventDefault()
      return alert('Please Check Time Slot ..!')
    }
    var Fromtimed = new Date(date + ' ' + ft)

    var Totimed = new Date(date + ' ' + tt)

    if (Fromtimed > Totimed) {
      event.preventDefault()
      alert('Please Enter valid Apointment Time....!')
      return
    }

    let getData = JSON.parse(localStorage.getItem('userDetails'))

    if (getData)
      for (let index = 0; index < getData.length; index++) {
        if (
          getData[index].ttime === ttime &&
          getData[index].ftime === ftime &&
          getData[index].date === date
        ) {
          event.preventDefault()
          return alert('This Time Slot Is Alraedy Book.....!')
        }
      }

    if (document.querySelector('form').checkValidity()) {
      event.preventDefault()
      alert('Appointment Book SuccessFully....!')

      let oldData = localStorage.getItem('userDetails')
      const namesArr = oldData ? JSON.parse(oldData) : []

      namesArr.push(data)
      localStorage.setItem('userDetails', JSON.stringify(namesArr))

      window.location.replace('index.html')
    }
  })
