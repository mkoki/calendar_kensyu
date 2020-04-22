const weeks = ['日', '月', '火', '水', '木', '金', '土']
const date = new Date()
let year = date.getFullYear()
let month = date.getMonth() + 1

function create(year, month) {
  let start_date = new Date(year, month - 1, 1) 
  let end_date = new Date(year, month,  0) 
  let end_day_count = end_date.getDate() 
  let start_day = start_date.getDay()
  let day_count = 1
  let calendar_html = ''
  const last_month_end_date = new Date(year, month - 1, 0)

  calendar_html += '<h1 id="title">' + year  + '年' + month + '月' + '</h1>'
  calendar_html += '<p>'
  calendar_html += '<table>'

  for (let i = 0; i < weeks.length; i++) {
    calendar_html += '<td>' + weeks[i] + '</td>'
  }

  for (let w = 0; w < 6; w++) {
      calendar_html += '<tr>'

      for (let d = 0; d < 7; d++) {
          if (w == 0 && d < start_day) {
              let num = last_month_end_date.getDate() - start_day + d + 1
              calendar_html += '<td id="disabled">' + num + '</td>'
          } else if (day_count > end_day_count) {
              calendar_html += '<td></td>'
          } else {
              calendar_html += '<td class="modal-btn">' + day_count + '</td><div class="modal"></div>'
              day_count += 1
          }
      }
      calendar_html += '</tr>'
  }
  calendar_html += '</table>'

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
