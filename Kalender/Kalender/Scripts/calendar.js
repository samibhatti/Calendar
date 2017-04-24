$.extend({
    quicktmpl: function (template)
    { return new Function("obj", "var p=[], print=function() {p.push.apply (p,arguments);}; with(obj){ p.push('" + template.replace(/[\r\t\n]/g, " ").split("{{").join("\t").replace(/((^|\}\})[^\t]*)'/g, "$1\r").replace(/\t:(.*?)\}\}/g, "',$1,'").split("\t").join("');").split("}}").join("p.push('").split("\r").join("\\'") + "');}return p.join('');") }
});

$.extend(Date.prototype, {

    toDateCssClass: function () {
        return '_' + this.getFullYear() + '_' + (this.getMonth() + 1) + '_' + this.getDate();
    },

    toDateInt: function () {
        return ((this.getFullYear() * 12) + this.getMonth()) * 32 + this.getDate();
    },
   
    toTimeString: function () {
        var hours = this.getHours(),
            minutes = this.getMinutes();           
        if (hours === 0 && minutes === 0) { return ''; }
        if (minutes > 0) {
            return hours + ':' + minutes;
        }
        return hours;
    }
});

(function ($) {

    var t = $.quicktmpl($('#tmpl').get(0).innerHTML);

    function calendar($el, options) {
        $el.on('click', '.js-cal-prev', function () {
            options.date.setMonth(options.date.getMonth() - 1);
                draw();
        }).on('click', '.js-cal-next', function () {
            options.date.setMonth(options.date.getMonth() + 1);
            draw();
        }).on('click', '.js-cal-option', function () {
            var $t = $(this), o = $t.data();
            if (o.date) { o.date = new Date(o.date); }
            $.extend(options, o);
            draw();
        })
        function dayAddEvent(index, event) {
            if (!!event.allDay) {
                monthAddEvent(index, event);
                return;
            }
            var $event = $('<div/>', { 'class': 'event', text: event.title, title: event.title , 'data-index': index }),
                start = event.start,
                end = event.end || start,
                time = event.start.toTimeString(),
                hour = start.getHours(),
                timeclass = '.time-22-0',
                startint = start.toDateInt(),
                dateint = options.date.toDateInt(),
                endint = end.toDateInt();
            if (startint > dateint || endint < dateint) { return; }

            if (!!time) {
                $event.html('<strong>' + time + '</strong> ' + $event.html());
            }
            $event.toggleClass('begin', startint === dateint);
            $event.toggleClass('end', endint === dateint);
            if (hour < 6) {
                timeclass = '.time-0-0';
            }
            if (hour < 22) {
                timeclass = '.time-' + hour + '-' + (start.getMinutes() < 30 ? '0' : '30');
            }
            $(timeclass).append($event);
        }

        function monthAddEvent(index, event) {
            var $event = $('<div/>', { 'class': 'event', text: event.title, title: event.title, 'data-index': index }),
                e = new Date(event.start),
                dateclass = e.toDateCssClass(),
                day = $('.' + e.toDateCssClass()),
                empty = $('<div/>', { 'class': 'clear event', html: '&nbsp;' }),
                numbevents = 0,
                time = event.start.toTimeString(),
                endday = event.end && $('.' + event.end.toDateCssClass()).length > 0,
                checkanyway = new Date(e.getFullYear(), e.getMonth(), e.getDate() + 40),
                existing,
                i;
            $event.toggleClass('all-day', !!event.allDay);
            if (!!time) {
                $event.html('<strong>' + time + '</strong> ' + $event.html());
            }
            if (!event.end) {
                $event.addClass('begin end');
                $('.' + event.start.toDateCssClass()).append($event);
                return;
            }

            while (e <= event.end && (day.length || endday || options.date < checkanyway)) {
                if (day.length) {
                    existing = day.find('.event').length;
                    numbevents = Math.max(numbevents, existing);
                    for (i = 0; i < numbevents - existing; i++) {
                        day.append(empty.clone());
                    }
                    day.append(
                      $event.
                      toggleClass('begin', dateclass === event.start.toDateCssClass()).
                      toggleClass('end', dateclass === event.end.toDateCssClass())
                    );
                    $event = $event.clone();
                    $event.html('&nbsp;');
                }
                e.setDate(e.getDate() + 1);
                dateclass = e.toDateCssClass();
                day = $('.' + dateclass);
            }
        }
        function yearAddEvents(events, year) {
            var counts = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            $.each(events, function (i, v) {
                if (v.start.getFullYear() === year) {
                    counts[v.start.getMonth()]++;
                }
            });
            $.each(counts, function (i, v) {
                if (v !== 0) {
                    $('.month-' + i).append('<span class="badge">' + v + '</span>');
                }
            });
        }

        function draw() {
            $el.html(t(options));
            $('.' + (new Date()).toDateCssClass()).addClass('today');
            if (options.data && options.data.length) {
                if (options.mode === 'month') {
                    $.each(options.data, monthAddEvent);
                } else {
                    $.each(options.data, dayAddEvent);
                }
            }
        }

        draw();
    }

    ; (function (defaults, $, window, document) {
        $.extend({
            calendar: function (options) {
                return $.extend(defaults, options);
            }
        }).fn.extend({
            calendar: function (options) {
                options = $.extend({}, defaults, options);
                return $(this).each(function () {
                    var $this = $(this);
                    calendar($this, options);
                });
            }
        });
    })({
        days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        date: (new Date()),
        daycss: ["", "", "", "", "", "c-saturday", "c-sunday"],
        todayname: "Today",
        thismonthcss: "current",
        lastmonthcss: "outside",
        nextmonthcss: "outside",
        mode: "month",
        data: []
    }, jQuery, window, document);

})(jQuery);

var data = [],
    date = new Date(),
    d = date.getDate(),
    d1 = d,
    m = date.getMonth(),
    y = date.getFullYear(),
    i,
    end,
    j,
    c = 1063,
    c1 = 3329,
    h,
    m;

$.ajax({
    type: "GET",
    dataType: "json",
    url: "http://localhost:50519/api/events",
    success: function (events) {      

        for (var c = 0; c < events.length; c++)
        {
            var datestr = events[c].start.toString();
            var dateAr = datestr.split('-');
            var year = parseInt(dateAr[0]);
            var month = parseInt(dateAr[1])-1;
            var day = parseInt(dateAr[2].substring(0, dateAr[2].indexOf("T")));
            var timestring = dateAr[2].substring(dateAr[2].indexOf("T") + 1);
            var timeAr = timestring.split(":");
            var hour = parseInt(timeAr[0]);
            var min = parseInt(timeAr[1]);
            var sek = parseInt(timeAr[2]);
            var date = new Date(year, month, day, hour, min, sek, 0);
            data.push({ title: events[c].title, start: date, end: date });
            
        }
        console.dir(data);
    }
    
});

data.sort(function (a, b) { return (+a.start) - (+b.start); });

$('#holder').calendar({
    data: data
});


