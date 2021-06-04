window.addEventListener('load', function () {
  var slideshow = document.querySelector('.home-hero .slideshow');
  var slideshow_radios = slideshow.querySelectorAll('.slideshow>.input-radio');
  var slideshow_num = 0;
  // 节流阀防止轮播图快速切换
  for (var i = 0; i < slideshow_radios.length; i++) {
    slideshow_radios[i].addEventListener('click', function () {
      for (var i = 0; i < slideshow_radios.length; i++) {
        slideshow_radios[i].disabled = true;
      }
      setTimeout(function () {
        for (var i = 0; i < slideshow_radios.length; i++) {
          slideshow_radios[i].disabled = false;
        }
      }, 500);
    });
  }
  // 鼠标进入轮播图就停止计时器
  slideshow.addEventListener('mouseenter', function () {
    clearInterval(timer_slideshow);
    timer_slideshow = null;
  });
  // 鼠标离开轮播图就打开计时器
  slideshow.addEventListener('mouseleave', function () {
    timer_slideshow = setInterval(function () {
      change_slideshow();
    }, 6000);
  });
  // 为radio添加索引号
  for (var i = 0; i < slideshow_radios.length; i++) {
    slideshow_radios[i].setAttribute('index', i);
  }
  // 轮播图播放函数
  // 获取当前选中的radio的索引号，并选中下一个radio，选中最后一个radio时，回到第一个radio
  function change_slideshow() {
    var current_radio = document.querySelector('.home-hero .slideshow>.input-radio:checked');
    slideshow_num = current_radio.getAttribute('index');
    slideshow_num++;
    if (slideshow_num == 4) {
      slideshow_num = 0;
    }
    slideshow_radios[slideshow_num].checked = true;
  }
  // 轮播图计时器
  var timer_slideshow = setInterval(function () {
    change_slideshow();
  }, 6000);

  //小米秒杀盒子横向轮播图切换功能
  var sliderow_label_left = document.querySelector('.xm-seckill-box .slide-row-label-left');
  var sliderow_label_right = document.querySelector('.xm-seckill-box .slide-row-label-right');
  var sliderow_radios = document.querySelectorAll('.xm-seckill-box .slide-row-radio');
  var current_num;
  for (var i = 0; i < sliderow_radios.length; i++) {
    sliderow_radios[i].setAttribute('index', i);
  }
  sliderow_label_right.addEventListener('click', function () {
    current_num = document.querySelector('.xm-seckill-box .slide-row-radio:checked').getAttribute('index');
    current_num++;
    if (current_num >= 2) {
      current_num = 2;
      sliderow_label_right.classList.add('slide-row-label-disabled');
    } else {
      sliderow_label_right.classList.remove('slide-row-label-disabled');
      sliderow_label_left.classList.remove('slide-row-label-disabled');
    }
    sliderow_radios[current_num].checked = true;
  });
  sliderow_label_left.addEventListener('click', function () {
    current_num = document.querySelector('.xm-seckill-box .slide-row-radio:checked').getAttribute('index');
    current_num--;
    if (current_num <= 0) {
      current_num = 0;
      sliderow_label_left.classList.add('slide-row-label-disabled');
    } else {
      sliderow_label_right.classList.remove('slide-row-label-disabled');
      sliderow_label_left.classList.remove('slide-row-label-disabled');
    }
    sliderow_radios[current_num].checked = true;
  });
  //小米秒杀盒子横向轮播图自动播放功能
  function change_sliderow() {
    current_num = document.querySelector('.xm-seckill-box .slide-row-radio:checked').getAttribute('index');
    current_num++;
    sliderow_label_right.classList.remove('slide-row-label-disabled');
    sliderow_label_left.classList.remove('slide-row-label-disabled');
    if (current_num == 2) {
      sliderow_label_right.classList.add('slide-row-label-disabled');
    }
    if (current_num == 3) {
      current_num = 0;
    }
    if (current_num == 0) {
      sliderow_label_left.classList.add('slide-row-label-disabled');
    }
    sliderow_radios[current_num].checked = true;
  }
  var timer_sliderow = setInterval(function () {
    change_sliderow();
  }, 8000);
  // 鼠标进入轮播图就停止计时器
  sliderow_label_left.addEventListener('mouseenter', function () {
    clearInterval(timer_sliderow);
    timer_sliderow = null;
  });
  sliderow_label_right.addEventListener('mouseenter', function () {
    clearInterval(timer_sliderow);
    timer_sliderow = null;
  });
  // 鼠标离开轮播图就打开计时器
  sliderow_label_left.addEventListener('mouseleave', function () {
    timer_sliderow = setInterval(function () {
      change_sliderow();
    }, 8000);
  });
  sliderow_label_right.addEventListener('mouseleave', function () {
    timer_sliderow = setInterval(function () {
      change_sliderow();
    }, 8000);
  });

  // 主体商品双栏卡片盒子切换内容功能
  var home_main_labels = document.querySelectorAll('.home-main .home-main-label');
  var home_main_radios = document.querySelectorAll('.home-main .home-main-radio');
  var radio_id;
  console.log(home_main_labels);
  console.log(home_main_radios);
  for (var i = 0; i < home_main_labels.length; i++) {
    home_main_labels[i].addEventListener('mouseenter', function () {
      radio_id = "#" + this.getAttribute('for');
      console.log(radio_id);
      document.querySelector('' + radio_id + '').checked = true;
    });
  }
})
