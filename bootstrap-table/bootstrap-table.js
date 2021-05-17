window.addEventListener('load', function () {

  var class_table = document.querySelector('#class_table');
  var class_table_dark = document.querySelector('#class_table-dark');
  var class_table_striped = document.querySelector('#class_table-striped');
  var class_table_hover = document.querySelector('#class_table-hover');
  var class_table_bordered = document.querySelector('#class_table-bordered');
  var class_table_borderless = document.querySelector('#class_table-borderless');

  var table = document.querySelector('.table_container table');
  var current_name = document.querySelector('.change_class p span');

  class_table.onclick = function () {
    if (this.checked) {
      table.classList.add('table');
    } else {
      table.classList.remove('table');
    }
    update();
  }
  class_table_dark.onclick = function () {
    if (this.checked) {
      table.classList.add('table-dark');
    } else {
      table.classList.remove('table-dark');
    }
    update();
  }
  class_table_striped.onclick = function () {
    if (this.checked) {
      table.classList.add('table-striped');
    } else {
      table.classList.remove('table-striped');
    }
    update();
  }
  class_table_hover.onclick = function () {
    if (this.checked) {
      table.classList.add('table-hover');
    } else {
      table.classList.remove('table-hover');
    }
    update();
  }
  class_table_bordered.onclick = function () {
    if (this.checked) {
      table.classList.add('table-bordered');
    } else {
      table.classList.remove('table-bordered');
    }
    update();
  }
  class_table_borderless.onclick = function () {
    if (this.checked) {
      table.classList.add('table-borderless');
    } else {
      table.classList.remove('table-borderless');
    }
    update();
  }

  function update() {
    var classname_array = Array.from(table.classList).join(" ");
    current_name.innerHTML = '' + classname_array + '';
  }
})