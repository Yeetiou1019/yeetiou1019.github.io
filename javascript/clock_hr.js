$(document).ready(function () {
    $.fn.downCount = function (options, callback) {
        var settings = $.extend({
            date: null,
            offset: null
        }, options);

        // Save container
        var container = this;

        /**
         * Change client's local date to match offset timezone
         * @return {Object} Fixed Date object.
         */
        var currentDate = function () {
            // get client's current date
            //var date = new Date();
            // turn date to utc
            //var utc = date.getTime() + (date.getTimezoneOffset() * 60000);
            // set new Date object
            var new_date = new Date();
            return new_date;
        };

        /**
         * Main downCount function that calculates everything
         */
        var original_date; //設定當前主機時間
        var target_date = new Date('02/08/2020 19:10:00').getTime(); // 計算到此時間
        var current_date;
        var difference = 0;

        var _millisecond,
            _KF,
            _second,
            _minute,
            _hour,
            _GP,
            _X,
            _day;
        var days,
            xs,
            gps,
            hours,
            minutes,
            seconds,
            kfs,
            milliseconds;
        function zeroing() {
            _millisecond = 0,
                _KF = 0,
                _second = 0,
                _minute = 0,
                _hour = 0,
                _GP = 0,
                _X = 0,
                _day = 0,
                days = "00",
                xs = "00",
                gps = "00",
                hours = "00",
                minutes = "00",
                seconds = "00",
                kfs = "000",
                milliseconds = "000";
            container.find('.days').text(days);
            container.find('.xs').text(xs);
            container.find('.gps').text(gps);
            container.find('.hours').text(hours);
            container.find('.minutes').text(minutes);
            container.find('.seconds').text(seconds);
            container.find('.kfs').text(kfs);
            container.find('.milliseconds').text(milliseconds);
        }

        function countdown() {
            //達目標時間時停止
            // if (current_date >= target_date) {
            //     clearInterval(interval);
            //     if (callback && typeof callback === 'function') callback();
            //     return;
            // }

            // basic math variables
            // _millisecond = 1,
            //     _KF = _millisecond * 102,
            //     _second = _KF * 128,
            //     _minute = _second * 64,
            //     _hour = _minute * 64,
            //     _GP = _hour * 8,
            //     _X = _GP * 2,
            //     _day = _X * 2;
            _millisecond = 1/19.8,
                _KF = _millisecond * 102,
                _second = _KF * 128,
                _minute = _second * 64,
                _hour = _minute * 64 ,
            // 進位
                hours = Math.floor(difference / _hour),
                minutes = Math.floor((difference % _hour) / _minute),
                seconds = Math.floor((difference % _minute) / _second),
                kfs = Math.floor((difference % _second) / _KF),
                milliseconds = Math.floor((difference % _KF) / _millisecond);

            // 補零
            //days = (String(days).length >= 2) ? days : '0' + days;
            hours = (String(hours).length >= 2) ? hours : '0' + hours;
            minutes = (String(minutes).length >= 2) ? minutes : '0' + minutes;
            seconds = (String(seconds).length >= 2) ? seconds : '0' + seconds;
            if (String(kfs).length <= 3 && String(kfs).length > 2) {
                kfs
            } else if (String(kfs).length <= 2 && String(kfs).length > 1) {
                kfs = '0' + kfs
            } else {
                kfs = '00' + kfs
            };
            if (String(milliseconds).length <= 3 && String(milliseconds).length > 2) {
                milliseconds
            } else if (String(milliseconds).length <= 2 && String(milliseconds).length > 1) {
                milliseconds = '0' + milliseconds
            } else {
                milliseconds = '00' + milliseconds
            };

            // 單、複數字串判斷
            var ref_days = (days === 1) ? 'Day' : 'Day',
                ref_xs = (xs === 1) ? 'X' : 'X',
                ref_gps = (gps === 1) ? 'GP' : 'GP',
                ref_hours = (hours === 1) ? 'HR' : 'HR',
                ref_minutes = (minutes === 1) ? 'MN' : 'MN',
                ref_seconds = (seconds === 1) ? 'SC' : 'SC',
                ref_kfs = (kfs === 1) ? 'kf' : 'kf',
                ref_milliseconds = (milliseconds === 1) ? 'i' : 'i';
            // DOM物件
            //container.find('.days').text(days);
            container.find('.xs').text(xs);
            container.find('.gps').text(gps);
            container.find('.hours').text(hours);
            container.find('.minutes').text(minutes);
            container.find('.seconds').text(seconds);
            container.find('.kfs').text(kfs);
            container.find('.milliseconds').text(milliseconds);

            //container.find('.days_ref').text(ref_days);
            container.find('.xs_ref').text(ref_xs);
            container.find('.gps_ref').text(ref_gps);
            container.find('.hours_ref').text(ref_hours);
            container.find('.minutes_ref').text(ref_minutes);
            container.find('.seconds_ref').text(ref_seconds);
            container.find('.kfs_ref').text(ref_kfs);
            container.find('.milliseconds_ref').text(ref_milliseconds);
            //console.log("downCount");
        };

        var interval;
        var interval2;
        var status;
        var test ;
        
        function timeCount() {
            
            if (status == "start") {
                test= new Date();
                test = test.setHours(0, 0, 0, 0)
                current_date = currentDate(); // 取得固定的當前時間
                difference = current_date - test; // 時間差異計算
                if (current_date.getHours() == 0 && current_date.getMinutes() == 0 && current_date.getSeconds() == 0  && current_date.getMilliseconds() < 100) {
                    zeroing();
                    original_date = currentDate();
                }
                // if(days == 1){
                //     zeroing();
                //     original_date = currentDate();
                // }

            } else if (status == "again") {
                current_date = currentDate();
                difference = current_date - test;
                if (current_date.getHours() == 0 && current_date.getMinutes() == 0 && current_date.getSeconds() == 25) {
                    zeroing();
                    original_date = currentDate();
                }
            } else if (status == "reset") {
                current_date = currentDate();
                difference = current_date - original_date;
            };

            //console.log(current_date);
            //console.log("timeCount");
        }

        function startClick() {
            if (original_date == null) {
                original_date = currentDate();
                interval = setInterval(countdown, 1);
                interval2 = setInterval(timeCount, 1);
                status = "start";
            } else {
                interval = setInterval(countdown, 1);
                interval2 = setInterval(timeCount, 1);
                status = "again";
            }
        }
        if (original_date == null) {
            original_date = currentDate();
            interval = setInterval(countdown, 100);
            interval2 = setInterval(timeCount, 100);
            status = "start";
        } else {
            interval = setInterval(countdown, 1);
            interval2 = setInterval(timeCount, 1);
            status = "again";
        }

        function resetClick() {
            original_date = currentDate();
            status = "reset";
        }

        function pauseClick() {
            if (status == "start" || status == "again" || status == "reset") {
                clearInterval(interval);
                clearInterval(interval2);
                current_date = currentDate();
            }
        }

        // // 重置事件
        // $('.reset').click(function () {
        //     resetClick();
        //     zeroing();
        // });

        // // 暫停事件
        // $('.pause').click(function () {
        //     pauseClick();
        //     $('.pause').attr('disabled', true);
        //     $('.start').attr('disabled', false);
        // });

        // // 開始/繼續事件
        // $('.start').click(function () {
        //     startClick();
        //     $('.start').attr('disabled', true);
        //     $('.pause').attr('disabled', false);
        // });
    };

    //
    $('.countdown').downCount();
    
});

