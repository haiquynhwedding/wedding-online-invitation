$(document).ready(function() {
  function updateCountdown() {
    const now = new Date().getTime();
    const targetDate = new Date("2025-11-08T18:00:00").getTime();
    const distance = targetDate - now;
    if (distance < 0) {
      $("#countdown").text("Đã hết thời gian!");
      clearInterval(timer);
      return;
    }
    const totalSeconds = Math.floor(distance / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    $("#hours").text(hours.toString().padStart(2, '0'));
    $("#minutes").text(minutes.toString().padStart(2, '0'));
    $("#seconds").text(seconds.toString().padStart(2, '0'));
  }
  // Cập nhật mỗi giây
  updateCountdown(); // chạy ngay lần đầu
  const interval = setInterval(updateCountdown, 1000);

  function checkSectionInView() {
    $('.fade-section').each(function () {
      const $section = $(this);
      const sectionTop = $section.offset().top;
      const sectionHeight = $section.outerHeight();
      const scrollTop = $(window).scrollTop();
      const windowHeight = $(window).height();
      const scrollBottom = scrollTop + windowHeight;

      if (
        scrollBottom > sectionTop + 50 &&
        scrollTop < sectionTop + sectionHeight &&
        $section.data('shown') === false
      ) {
        $section.addClass('visible');
        $section.data('shown', true);
      }
    });
  }
  
  function animateImagesOnScroll() {
    const photoSectionTop = $('.image-container').offset().top;
    const windowTop = $(window).scrollTop() + $(window).height();
    if (windowTop > photoSectionTop + 100) {
      $('.image-container .image-bride')
        .removeClass('hidden-left')
        .addClass('visible');
      $('.image-container .image-groom')
        .removeClass('hidden-right')
        .addClass('visible');
    }
  }

  function animateImageSaveTheDateOnScroll() {
    const imageSectionTop = $('.image-save-the-date').offset().top;
    const windowTop = $(window).scrollTop() + $(window).height();
    if (windowTop > imageSectionTop + 100) {
      $('.image-save-the-date').addClass("active");
    }
  }

  // Gán data-shown cho tất cả section
  $('.fade-section').data('shown', false);

  // Chạy khi scroll
  $(window).on('scroll', function () {
    checkSectionInView();
    animateImagesOnScroll();
    animateImageSaveTheDateOnScroll();
  });

  // Gọi khi load trang (phòng trường hợp đã cuộn sẵn)
  animateImagesOnScroll();
  checkSectionInView();

  var queryString = window.location.search.split("?")[1];
  
  var guestList = {
    '1HE69R': "Đức Anh",
    'BXI97Z': "Thành Trung",
    'MNP4V5': "Ngọc Bảo"
  };

  if (queryString === "" || queryString === undefined || guestList[queryString] === undefined) {
    $(".content-3").remove();
  } else {
    $(".name-guest").text(guestList[queryString]);
  }
});