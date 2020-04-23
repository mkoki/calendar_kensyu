const date = new Date()
let year = date.getFullYear()
let month = date.getMonth() + 1

function create(year, month) {
  let start_date = new Date(year, month - 1, 1); //#月の初めの年月日
  let end_date = new Date(year, month,  0); //#月の終わりの年月日
  let end_day = end_date.getDate(); //#月の終わりの日
  let start_youbi = start_date.getDay(); //#月の初めの曜日
  let day_count = 1;
  const last_month_end_date = new Date(year, month - 1, 0); //#先月の終わりの年月日
  calendar_html = ''

  for (let w = 0; w < 6; w++) {
      calendar_html += '<tr>'

      for (let d = 0; d < 7; d++) {
          if (w == 0 && d < start_youbi) {
              let prev_num = last_month_end_date.getDate() - start_youbi + d + 1;
              calendar_html += '<td id="disabled">' + prev_num + '</td>';
          } else if (day_count > end_day) {
              calendar_html += '<td></td>';
          } else {
              calendar_html += '<td class="modal-btn">' + day_count + '</td><div class="modal"></div>';
              day_count += 1;
          }
      }
      calendar_html += '</tr>'
  }

  document.getElementById("title").innerText = month + '月';
  document.querySelector('#calendar').insertAdjacentHTML('afterbegin', calendar_html)
  document.querySelector('#prev').addEventListener('click', move_calendar)
  document.querySelector('#next').addEventListener('click', move_calendar)
  document.addEventListener("click", function(e) {
    if(e.target.classList.contains("modal-btn")) {
      document.getElementById('modal').style.display = 'block';
    }
  })
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
