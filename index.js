$(document).ready(function () {
  var $music = $("#bg-music");
  var musicPlayed = false;

  function playMusic() {
    if (!musicPlayed) {
      $music[0].play().then(function () {
        console.log("🎵 Nhạc phát khi lướt trang!");
        musicPlayed = true;
      }).catch(function (err) {
        console.error("Không phát được nhạc:", err);
      });
    }
  }

  // Bắt sự kiện lướt trang (scroll)
  $(window).one("scroll", playMusic);

  // Có thể thêm fallback: nếu user click vẫn phát nhạc
  $(document).one("click", playMusic);

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
    'MNP4V5': "Ngọc Bảo",
    'BWrfkT': "Vợ chồng Anh Bạch Ngọc Thạch",
    'TAaNbL': "Vợ chồng Anh Phạm Phúc Hà",
    'zoRtxu': "Vợ chồng Anh Trần Ngọc Tú",
    'Gwp2bY': "Gia đình bạn Kết",
    'atD6HC': "Gia đình em Hiếu",
    'r85RDB': "Gia đình chị Hồng",
    'kvpCOU': "Gia đình bạn Châu",
    'ZTpfhj': "Gia đình bạn Bích",
    'ubmYvz': "Gia đình bạn Nam",
    '8ydfOC': "Gia đình em Nghiệp",
    'dlaybB': "Gia đình em Lời",
    'Nf61Aw': "Gia đình bạn Đông",
    'HmFQ0I': "Gia đình bạn Phi Long",
    'GPAL1T': "Bạn Hân",
    'Y3Bwia': "Em Hồng và người thương",
    'Vp7izj': "Anh Huy và người thương",
    'AApZON': "Bạn Bảo và người thương",
    'Je18OG': "Hai em Lộc và Trang"
  };

  if (queryString === "" || queryString === undefined || guestList[queryString] === undefined) {
    $(".content-3").remove();
  } else {
    $(".name-guest").text(guestList[queryString]);
  }
});