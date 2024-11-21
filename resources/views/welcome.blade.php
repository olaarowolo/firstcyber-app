<!DOCTYPE html>
<html lang="en">


@include('components.head')


<body>
    <!-- Header -->
    @include('components.header')

    <script>
        // Change the value of countDownEndDate to the day you want to end the count down
        var countDownEndDate = "December 10, 2024 09:00:00";

        var endDate = new Date(countDownEndDate).getTime();

        var x = setInterval(function() {

            var timeNow = new Date().getTime();

            var timeLeft = endDate - timeNow;

            var days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            var hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

            if (days < 10) {
                days = "0" + days;
            }

            if (hours < 10) {
                hours = "0" + hours;
            }

            if (minutes < 10) {
                minutes = "0" + minutes;
            }

            if (seconds < 10) {
                seconds = "0" + seconds;
            }

            if (timeLeft > 0) {
                document.getElementById("cdD").innerHTML = days;
                document.getElementById("cdH").innerHTML = hours;
                document.getElementById("cdM").innerHTML = minutes;
                document.getElementById("cdS").innerHTML = seconds;
            }
        }, 1000);
    </script>
    <!-- Scripts -->
    <script src="wp-includes/js/jquery/jquery.minf43b.js?ver=3.7.1" id="jquery-core-js"></script>
    <script src="wp-includes/js/jquery/jquery-migrate.min5589.js?ver=3.4.1" id="jquery-migrate-js"></script>
</body>

</html>
