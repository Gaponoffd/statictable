
function addRow(table, value1="", value2="", readonly="") {
  let templateRow = ` 
    <div class="tr">
      <div class="td">
        <input type="number" value="${value1}" ${readonly ? "readonly" : ""}>
      </div>
      <div class="td">
        <input type="number" value="${value2}" ${readonly ? "readonly" : ""}>
      </div>
      <div class="td">
        <button class="button" data-button="delete">DELETE</button>
      </div>
    </div>
  `
  let tableBody = table.querySelector('.table-body');
  tableBody.insertAdjacentHTML('beforeend', templateRow);

  //валидация
  let inputs = table.querySelectorAll('.td input');
  inputs.forEach(input => {
    input.addEventListener('change',function () {
      if(this.value < 0 || this.value > 10){
        alert('Введите число от 1 до 10');
        this.value = ""
      }
    })
  });
}

function deletRow(el) {
  let tr = el.closest('.tr');
  tr.remove();
}

function tableChange (event) {
  let target = event.target;
  if(target.getAttribute('data-button') == "add"){
    addRow(this);
  }
  if(target.getAttribute('data-button') == "delete"){
    deletRow(target);
  }
}

function createTrResult(event) {
  let target = event.target;

  let tableTr1 = document.querySelectorAll('#t1 .table-body .tr');
  let tableTr2 = document.querySelectorAll('#t2 .table-body .tr');
  let tableTrResult = this.querySelectorAll('.table-body .tr');

  let data1 = [];
  let data2 = [];
  let dataResult = []

  if(target.getAttribute('data-button') == "calculate"){
    // удаляем все строки
    if (tableTrResult.length) {
      for (let i = 0; i < tableTrResult.length; i++) {
        tableTrResult[i].remove();
      }
    }

    let countTableTrResult;
    if(tableTr1.length == 0){
      alert('Добавьте строки в таблицу 1');
      return
    } else if (tableTr2.length == 0) {
      alert('Добавьте строки в таблицу 2');
      return
    } else if (tableTr1.length <= tableTr2.length) {
      countTableTrResult = tableTr1.length;
    } else if (tableTr2.length < tableTr1.length) {
      countTableTrResult = tableTr2.length;
    }
    
    for (let i = 0; i < countTableTrResult; i++) {
      let valX1 = tableTr1[i].children[0].children[0].value;
      let valX2 = tableTr2[i].children[0].children[0].value;

      let valY1 = tableTr1[i].children[1].children[0].value;
      let valY2 = tableTr2[i].children[1].children[0].value;

      let val1 = (+valX1 + +valX2) / 2;
      let val2 = (+valY1 + +valY2) / 2;

      addRow(this, val1, val2, true);

      // заполняем координаты графика
      data1.push([valX1, valY1]);
      data2.push([valX2, valY2]);
      dataResult.push([val1, val2]);
    }
    
    // отрисовака графиков
    let chart1 = document.getElementById('chart1');
    let chart2 = document.getElementById('chart2');
    let chart3 = document.getElementById('chart3');

    drawChart(chart1, data1);
    drawChart(chart2, data2);
    drawChart(chart3, dataResult);
  }
}

function drawChart(chart, data) {
  chart.style.display = "block";
  const chartWidth = 240;
  const chartHeight = 240;
  chart.width = chartWidth;
  chart.height = chartHeight;
  let ctx = chart.getContext('2d');
  ctx.strokeStyle = "#000";
  ctx.lineWidth = 1;

  // Координаты
  ctx.beginPath();
  ctx.moveTo(20, 20); // стартовая координата
  ctx.lineTo(20, 220); // ось Y
  ctx.lineTo(220, 220); // ось X
  ctx.stroke();
  ctx.closePath(); 

  // риски по Y 
  for(let i = 0; i <= 10; i++) { 
    ctx.fillText(10 - i + "", 2, i * 20 + 24); 
    ctx.beginPath(); 
    ctx.moveTo(16, i * 20 + 20); 
    ctx.lineTo(20, i * 20 + 20); 
    ctx.stroke();
    ctx.closePath();
  }

  // риски по X
  for(let i = 1; i <= 10; i++) { 
    ctx.fillText(i + "", i * 20 + 16, 236); 
    ctx.beginPath(); 
    ctx.lineWidth = 1;
    ctx.moveTo(i * 20 + 20, 224); 
    ctx.lineTo(i * 20 + 20, 220); 
    ctx.stroke();
    ctx.closePath(); 
  } 

  // Цикл для от рисовки графиков
  ctx.beginPath();
  ctx.strokeStyle = "green";
  ctx.lineWidth = 1;
  for(const [x,y] of  data) {
    ctx.lineTo(20 + (x * 20), chartHeight - (y * 20) - 20);
  }
  ctx.stroke();
  ctx.closePath();
}

let table1 = document.getElementById('t1');
let table2 = document.getElementById('t2');
let table1Result = document.getElementById('table-result');

table1.addEventListener('click', tableChange)
table2.addEventListener('click', tableChange)

table1Result.addEventListener('click', createTrResult)