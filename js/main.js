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
              calendarHtml += '<td class="disabled">' + num + '</td>';
          } else if (dayCount > endDay) {
              calendarHtml += '<td></td>';
          } else {
              calendarHtml += '<td class="modalCell">' + dayCount + '<li></li></td>';
              dayCount += 1;
          }
      }
      calendarHtml += '</tr>'
  }

  $("#title").text(year + '-' + month + '月');
  $('#calendar').prepend(calendarHtml);
  $(".modalCell").on('click', openModal);

  $('.submit-btn').on('click', function(e) {
    const click =  $(this).text();
    $('.mask').children('li').html(click);
    hideModal(e);
  });
}

// モーダルを表示
function openModal() {
  const setLeft = $(this).position().left - 700; // モーダルのleft座標を設置
  const setTop = $(this).position().top + 70; // モーダルのtop座標を設置
  $('#modal').css("left", setLeft);
  $('#modal').css("top", setTop);
  $('#modal').appendTo($(this));
  $('td').removeClass('mask');
  $('#modal').removeClass('hidden');
  $(this).addClass('mask');
  $('#close').on('click', hideModal);
}

// モーダルを非表示
function hideModal(ele) {
  $('#modal').addClass('hidden');
  $('td').removeClass('mask');
  ele.stopPropagation();
}

// 月の移動
function moveCalendar(moveNum) {
  $('#modal').appendTo('body');
  $('#calendar').text('');

  month += moveNum

  if (month < 1) {
    year -= 1
    month = 12
  }

  if (month > 12) {
    year += 1
    month = 1
  }
  create(year, month)
};

const date = new Date()
let year = date.getFullYear()
let month = date.getMonth() + 1

create(year, month);
$('#prev').on('click', () => moveCalendar(-1));
$('#next').on('click', () => moveCalendar(1));