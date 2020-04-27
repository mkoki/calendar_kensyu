const date = new Date()
let year = date.getFullYear()
let month = date.getMonth() + 1

function create(year, month) {
  let startDate = new Date(year, month - 1, 1); //#月の初めの年月日
  let endDate = new Date(year, month,  0); //#月の終わりの年月日
  let endDay = endDate.getDate(); //#月の終わりの日
  let startYoubi = startDate.getDay(); //#月の初めの曜日
  let dayCount = 1;
  const lastMonthEndDate = new Date(year, month - 1, 0); //#先月の終わりの年月日
  calendarHtml = ''

  for (let w = 0; w < 6; w++) {
      calendarHtml += '<tr>'

      if (endDay < dayCount) {break;}

      for (let d = 0; d < 7; d++) {
          if (w == 0 && d < startYoubi) {
              let num = lastMonthEndDate.getDate() - startYoubi + d + 1;
              calendarHtml += '<td id="disabled">' + num + '</td>';
          } else if (dayCount > endDay) {
              calendarHtml += '<td></td>';
          } else {
              calendarHtml += '<td>' + dayCount + '</td>';
              dayCount += 1;
          }
      }
      calendarHtml += '</tr>'
  }

  document.getElementById("title").innerText = month + '月';
  document.querySelector('#calendar').insertAdjacentHTML('afterbegin', calendarHtml)
  document.querySelector('#prev').addEventListener('click', move_calendar)
  document.querySelector('#next').addEventListener('click', move_calendar)
  document.getElementById('close').addEventListener('click', () => {
    modal.classList.add('hidden');
  })
  $("td").click(function () {
    modal.classList.remove('hidden');
  });
  // mbtns = document.getElementsByClassName('modal-btn');
  // for(i = 0; i < mbtns.length; i++) {
  //   mbtns[i].addEventListener("click", (e) => {
  //     document.getElementById('modal').classList.remove('hidden');
  // });
  // }
}

function move_calendar(ele) {
  document.querySelector('#calendar').innerHTML = ''

  if (ele.target.id === 'prev') {
    month -= 1
    if (month < 1) {
      year -= 1
      month = 12
    }
  }

  else if (ele.target.id === 'next') {
    month += 1
    if (month > 12) {
      year += 1
      month = 1
    }
  }
  create(year, month)

};

create(year, month);
