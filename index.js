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
});