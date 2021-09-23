
function addRow() {
  let table = this.closest('.table');
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

function deletRow() {
  let tr = this.closest('.tr');
  tr.remove();
}

function disputch() {
  let table = this.closest('.table');
  let buttonsRemove = table.querySelectorAll('[data-button="delete"]');
  buttonsRemove.forEach(button => {
    button.addEventListener('click', function(){
      deletRow.bind(this)();
    })
  });
}


let buttonsAdd = document.querySelectorAll('[data-button="add"]');

buttonsAdd.forEach(button => {
  button.addEventListener('click', function () {
    addRow.bind(this)();

    disputch.bind(this)();
  })
});



