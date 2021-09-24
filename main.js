
function addRow(table) {
  let templateRow = ` 
    <div class="tr">
      <div class="td">
        <input type="text">
      </div>
      <div class="td">
        <input type="text">
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

function observeAddRow() {
  let table = this.closest('.table');
  let buttonsRemove = table.querySelectorAll('[data-button="delete"]');
  buttonsRemove.forEach(button => {
    button.addEventListener('click', function(){
      deletRow(this);
      observeTableResult();
    })
  });
}

let buttonsAdd = document.querySelectorAll('[data-button="add"]');

buttonsAdd.forEach(button => {
  button.addEventListener('click', function () {

    let table = this.closest('.table');
    
    addRow(table);

    observeAddRow.bind(this)();

    observeTableResult()
  })
});



function observeTableResult(){
  let table = document.getElementById('table-result');

  let tableBody1 = document.querySelector('#t1 .table-body');
  let tableBodyTr1 = tableBody1.querySelectorAll('.tr');

  let tableBody2 = document.querySelector('#t2 .table-body');
  let tableBodyTr2 = tableBody2.querySelectorAll('.tr');

  let countTr;

  if(tableBodyTr1.length == 0){
    countTr = tableBodyTr2.length
  } else if (tableBodyTr2.length == 0) {
    countTr = tableBodyTr1.length;
  } else if (tableBodyTr1.length < tableBodyTr2.length) {
    countTr = tableBodyTr1.length;
  } else if (tableBodyTr2.length < tableBodyTr1.length) {
    countTr = tableBodyTr2.length;
  }


  let tableBodyResult = table.querySelector('.table-body');
  let tableBodyResultTr = tableBodyResult.querySelectorAll('.tr');
  let countResultTr = tableBodyResultTr.length;

  
  if(countTr > countResultTr){
    let addTr = +countTr - +countResultTr;

    for (let i = 0; i < addTr; i++) {
      addRow(table);
    }
  }

  

  if(countTr < countResultTr){
    let dellTr = countResultTr - countTr;
    console.log('dellTr', dellTr);
    console.log('countResultTr', countResultTr);

    for (let y = countResultTr; y <= +countResultTr - +dellTr; i--) {
      //tableBodyResultTr[y].remove();
      deletRow(tableBodyResultTr[y])
      //console.log(tableBodyResultTr[y]);
    }
  }

  
};
