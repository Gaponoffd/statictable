
function addRow(table, value1="", value2="") {
  let templateRow = ` 
    <div class="tr">
      <div class="td">
        <input type="number" value="${value1}">
      </div>
      <div class="td">
        <input type="number" value="${value2}">
      </div>
      <div class="td">
        <button class="button" data-button="delete">DELETE</button>
      </div>
    </div>
  `
  let tableBody = table.querySelector('.table-body');
  tableBody.insertAdjacentHTML('beforeend', templateRow);
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

  if(target.getAttribute('data-button') == "calculate"){

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

      addRow(this, val1, val2);
    }

  }

}


let table1 = document.getElementById('t1');
let table2 = document.getElementById('t2');
let table1Result = document.getElementById('table-result');

table1.addEventListener('click', tableChange)
table2.addEventListener('click', tableChange)

table1Result.addEventListener('click', createTrResult)



