/*
=========================================================
ZYK SCRIPTS

Author: hungluong
=========================================================
*/

/*
=========================================================
ZYK GLOBAL VARIABLES
=========================================================
*/

const ZYK_DATA_KEY = 'zyk';

/*
=========================================================
UTIL
=========================================================
*/

const zykKeys = {
    ctrlDown: false,
    shiftDown: false,
    altDown: false,
    ctrl: 17,
    cmd: 91,
    alt: 18,
    space: 32,
    shift: 16,
    escape: 27,
    g: 71,
    z: 90,
    a: 65,
    c: 67,
    v: 86,
    arrowLeft: 37,
    arrowUp: 38,
    arrowRight: 39,
    arrowDown: 40,
    delete: 46,
    backSpace: 8
};

const zykVar = {
    calendarLang: {
        en: {
            today: 'Today',

            daysOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            daysOfWeekShort: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            daysOfWeekLetters: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],

            months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],

            views: {
                year: 'Year',
                month: 'Month',
                week: 'Week',
                day: 'Day'
            }
        },
        vi: {
            today: 'Hôm nay',

            daysOfWeek: ['Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy', 'Chủ nhật'],
            daysOfWeekShort: ['Th2', 'Th3', 'Th4', 'Th5', 'Th6', 'Th7', 'CN'],
            daysOfWeekLetters: ['Th2', 'Th3', 'Th4', 'Th5', 'Th6', 'Th7', 'CN'],

            months: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
            monthsShort: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', '12'],

            views: {
                year: 'Năm',
                month: 'Tháng',
                week: 'Tuần',
                day: 'Ngày'
            }
        }
    },
    basicLang: {
        next: lang['000100_12'],
        prev: lang['000100_13']
    },
    secToMinFormat: {
        DEFAULT: 0, //'HH:mm:ss'
        TEXT: 1 //xxh xxm xxs
    },
    fileTypes: {
        VIDEO: 1,
        YOUTUBE: 2
    }
};

const zykUtil = {
    typeOf(obj) {
        return {}.toString
            .call(obj)
            .match(/\s([a-z]+)/i)[1]
            .toLowerCase();
    },

    configSpread(source) {
        let obj = [];
        for (let i = 0; i < arguments.length; i++) {
            let sourceArg = arguments[i] != null ? arguments[i] : {};

            if (this.typeOf(sourceArg) == 'object') {
                obj.push(sourceArg);
            }
        }

        source = obj.reduce(function (r, c) {
            return Object.assign(r, c);
        }, {});

        return source;
    },

    bodyBlock(option) {
        if (option) {
            $('body').removeClass('overflow-on');
            $('body').addClass('overflow-off');
        } else {
            $('body').removeClass('overflow-off');
            $('body').addClass('overflow-on');
        }
    },

    convertSlug(str) {
        let slug = str.toLowerCase() + '';

        //Đổi ký tự có dấu thành không dấu
        slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a');
        slug = slug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e');
        slug = slug.replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i');
        slug = slug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o');
        slug = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u');
        slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y');
        slug = slug.replace(/đ/gi, 'd');
        //Xóa các ký tự đặt biệt
        slug = slug.replace(/\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi, '');
        //Đổi khoảng trắng thành ký tự gạch ngang
        slug = slug.replace(/ /gi, '-');
        //Đổi nhiều ký tự gạch ngang liên tiếp thành 1 ký tự gạch ngang
        //Phòng trường hợp người nhập vào quá nhiều ký tự trắng
        slug = slug.replace(/\-\-\-\-\-/gi, '-');
        slug = slug.replace(/\-\-\-\-/gi, '-');
        slug = slug.replace(/\-\-\-/gi, '-');
        slug = slug.replace(/\-\-/gi, '-');
        //Xóa các ký tự gạch ngang ở đầu và cuối
        slug = '@' + slug + '@';
        slug = slug.replace(/\@\-|\-\@|\@/gi, '');
        //In slug ra textbox có id “slug”

        return slug;
    },

    checkPopper() {
        let hasPopper = false;

        if (typeof Popper == 'object') {
            hasPopper = true;
        }

        if (!hasPopper) {
            throw new TypeError('Require Popper js');
        }

        return hasPopper;
    },

    replaceAll(string, search, replacement) {
        return string.split(search).join(replacement);
    },

    buildUrl(url, k, v) {
        let key = encodeURIComponent(k),
            value = encodeURIComponent(v);

        let baseUrl = url.split('?')[0],
            newParam = key + '=' + value,
            params = '?' + newParam;

        if (url.split('?')[1] === undefined) {
            urlQueryString = '';
        } else {
            urlQueryString = '?' + url.split('?')[1];
        }
        if (urlQueryString) {
            let updateRegex = new RegExp('([?&])' + key + '[^&]*');
            let removeRegex = new RegExp('([?&])' + key + '=[^&;]+[&;]?');

            if (value === undefined || value === null || value === '') {
                params = urlQueryString.replace(removeRegex, '$1');
                params = params.replace(/[&;]$/, '');
            } else if (urlQueryString.match(updateRegex) !== null) {
                params = urlQueryString.replace(updateRegex, '$1' + newParam);
            } else if (urlQueryString == '') {
                params = '?' + newParam;
            } else {
                params = urlQueryString + '&' + newParam;
            }
        }
        params = params === '?' ? '' : params;
        return baseUrl + params;
    },

    secToMin(seconds, format = zykVar.secToMinFormat.DEFAULT) {
        let hours = Math.floor(seconds / 3600);
        if (Math.floor(hours / 10) == 0) {
            hours = '0' + hours;
        }

        seconds %= 3600;
        let minutes = Math.floor(seconds / 60);
        seconds = Math.round(seconds % 60);

        if (Math.floor(minutes / 10) == 0) {
            minutes = '0' + minutes;
        }

        if (Math.floor(seconds / 10) == 0) {
            seconds = '0' + seconds;
        }

        if (format == SEC_TO_MIN_FORMAT.DEFAULT) {
            return hours + ':' + minutes + ':' + seconds;
        } else if (format == SEC_TO_MIN_FORMAT.TEXT) {
            let label = lang['000200_189'];

            if (hours == 0) {
                label = label.substring(9);
            }

            label = label.replaceAll('!!HOUR!!', hours);
            label = label.replaceAll('!!MIN!!', minutes);
            label = label.replaceAll('!!SEC!!', seconds);

            return label;
        }
    },

    convertHEXToRGB(hex) {
        let rgb = {
            r: 0,
            g: 0,
            b: 0
        };

        var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, function (m, r, g, b) {
            return r + r + g + g + b + b;
        });

        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

        if (result) {
            rgb = {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16)
            };
        }

        return rgb;
    },

    convertHEXToRGBA(hex, transparency) {
        let rgba = {
            r: 0,
            g: 0,
            b: 0,
            a: 1
        };

        var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, function (m, r, g, b) {
            return r + r + g + g + b + b;
        });

        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

        if (result) {
            rgba = {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16),
                a: 1 - transparency
            };
        }

        return rgba;
    },

    convertRGBToHEX(r, g, b) {
        let rgb = [r, g, b];
        let color = '#';

        for (let i = 0; i < 3; i++) {
            let hex = rgb[i].toString(16);
            hex = hex.length == 1 ? '0' + hex : hex;
            color += hex;
        }

        return color;
    }
};

document.addEventListener('DOMContentLoaded', function () {
    document.addEventListener('keydown', function (e) {
        if (e.keyCode == zykKeys.ctrl || e.keyCode == zykKeys.cmd) {
            zykKeys.ctrlDown = true;
        }
        if (e.keyCode == zykKeys.shift) {
            zykKeys.shiftDown = true;
        }
        if (e.keyCode == zykKeys.alt) {
            zykKeys.altDown = true;
        }
    });

    document.addEventListener('keyup', function (e) {
        if (e.keyCode == zykKeys.shift) zykKeys.shiftDown = false;
        if (e.keyCode == zykKeys.ctrl || e.keyCode == zykKeys.cmd) zykKeys.ctrlDown = false;
        if (e.keyCode == zykKeys.alt) zykKeys.altDown = false;
        if (e.keyCode == zykKeys.esc) {
        }
    });
});

/*
=========================================================
Helper functions
=========================================================
*/

/*
=========================================================
CALENDAR
=========================================================
*/

class ZykCalendar {
    constructor(element, options) {
        let defaultOptions = {
            view: 'month', // String 'single-month' 'month' 'week' 'year' 'day'
            lang: 'en',
            bordered: false, // Boolean
            header: {
                today: {
                    class: false,
                    callback: false
                },
                'date-control': {
                    class: false,
                    callback: false
                },
                'switch-view': {
                    class: false,
                    callback: false,
                    layout: 'group' // String | 'group' | 'dropdown'
                }
            }, // Object
            body: {
                showMoreDates: true
            },
            date: null, // Number
            month: null, // Number
            year: null, // Number
            boxDayRatio: 'auto', // Number
            btnControlClass: 'btn-outline-default',
            btnTodayClass: 'btn-primary',
            btnSwitchView: 'btn-outline-default',
            btnSwitchViewActive: 'btn-primary',
            events: {}, // Object
            eventOnClick: false,
            eventOnClickNext: false,
            eventOnClickPrev: false,
            eventOnClickToday: false
        };

        this.config = {
            ...defaultOptions,
            ...options
        };

        this.date = this.config.date != null ? this.config.date : this.getDate();
        this.month = this.config.month != null ? this.config.month : this.getMonth();
        this.year = this.config.year != null ? this.config.year : this.getYear();

        this.currentDate = moment().date();
        this.currentMonth = moment().month();
        this.currentYear = moment().year();

        this.element = element;

        this.prepare();
    }

    getDate() {
        return moment().date();
    }

    getMonth() {
        return moment().month();
    }

    getDaysInMonth(month = false, year = false) {
        const _this = this;

        if (!month) {
            month = _this.month + 1;
        }

        if (!year) {
            year = _this.year;
        }

        let q = `${year}-${month > 10 ? month : '0' + month}`;

        return moment(q).daysInMonth();
    }

    getFirstDayDate(month, year) {
        let firstDay = new Date(year, month).getDay();

        if (firstDay == 0) {
            firstDay = 7;
        }

        return firstDay;
    }

    getPrevMonth() {
        const _this = this;

        _this.month--;

        if (_this.month < 0) {
            _this.month = 11;
            _this.year--;
        }
    }

    getNextMonth() {
        const _this = this;

        _this.month++;

        if (_this.month > 11) {
            _this.month = 0;
            _this.year++;
        }
    }

    getYear() {
        return moment().year();
    }

    getConfig() {
        if (this.config.boxDayRatio <= 0) {
            this.config.boxDayRatio = 1;
        }

        return this.config;
    }

    prepare() {
        const _this = this;

        if (typeof moment == 'undefined') {
            throw new TypeError('Moment js is missing!');
        }

        if (typeof Popper == 'undefined') {
            throw new TypeError('Popper js is missing!');
        }

        _this.render();
    }

    checkToday() {
        const _this = this;

        let isToday = false;

        if (_this.year == _this.currentYear && _this.month == _this.currentMonth && _this.date == _this.currentDate) {
            isToday = true;
        }

        return isToday;
    }

    render() {
        const _this = this;

        let config = _this.getConfig();

        $(_this.element).empty();

        if (config.bordered) {
            $(_this).addClass('zyk-calendar-bordered');
        }

        if (config.view) {
            $(_this.element).addClass(`zyk-calendar-${config.view}`);
        }

        if (config.view == 'single-month') {
            config.header = {};
            config.header.btnNext = {};
            config.header.btnShowDate = {};
            config.header.btnPrev = {};
        }

        if (Object.keys(config.header).length > 0) {
            $(_this.element).append(_this.getCalendarHeader());
        }

        $(_this.element).append(_this.getCalendarBody());

        _this.setTableBodySize();
    }

    getCalendarHeader() {
        const _this = this;

        let config = _this.getConfig();

        let $header = $('<div class="zyk-calendar-header"></div>');

        switch (config.view) {
            case 'single-month':
                let $btnPrev = $(`
                    <button class="btn ${config.btnControlClass} btn-zyk-calendar-control btn-zyk-calendar-prev" type="button">
                        <i class="elo el-caret-left"></i>
                    </button>
                `);
                let $btnNext = $(`
                    <button class="btn ${config.btnControlClass} btn-zyk-calendar-control btn-zyk-calendar-next" type="button">
                        <i class="elo el-caret-right"></i>
                    </button>
                `);

                let $btnShowDate = $(`
                    <button class="btn btn-zyk-calendar-show-date" type="button">
                        ${zykVar.calendarLang[config.lang].months[_this.month]} - ${_this.year}
                    </button>
                `);

                $btnPrev.unbind().on('click', function () {
                    _this.getPrevMonth();

                    let data = {
                        year: _this.year,
                        month: _this.month,
                        date: null
                    };

                    if (config.eventOnClickPrev) {
                        config.eventOnClickPrev(data);
                    }

                    _this.render();
                });

                $btnNext.unbind().on('click', function () {
                    _this.getNextMonth();

                    let data = {
                        year: _this.year,
                        month: _this.month,
                        date: null
                    };

                    if (config.eventOnClickNext) {
                        config.eventOnClickNext(data);
                    }

                    _this.render();
                });

                $header.append($btnPrev);
                $header.append($btnShowDate);
                $header.append($btnNext);

                break;
            case 'month':
                $header = _this.getCommonCalendarHeader();

                break;
            case 'week':
                $header = _this.getCommonCalendarHeader();

                break;
            case 'year':
                $header = _this.getCommonCalendarHeader();

                break;
        }

        return $header;
    }

    getCommonCalendarHeader() {
        const _this = this;

        let config = _this.getConfig();

        let $header = $('<div class="zyk-calendar-header"></div>');

        let $headerLeft = $('<div class="zyk-calendar-header-left"></div>');
        let $headerRight = $('<div class="zyk-calendar-header-right"></div>');

        $.each(config.header, (key, option) => {
            switch (key) {
                case 'today':
                    let btnTodayClass = 'btn-outline-default';

                    if (option.class) {
                        btnTodayClass = option.class;
                    }

                    if (_this.checkToday()) {
                        btnTodayClass = 'btn-primary';
                    }

                    let $btnToday = $(`
                        <button class="btn ${btnTodayClass} btn-zyk-calendar-control btn-zyk-calendar-today" type="button">
                            ${zykVar.calendarLang[config.lang].today}
                        </button>
                    `);

                    $btnToday.unbind().on('click', function () {
                        if (option.callback) {
                            option.callback();
                        }
                    });

                    $headerLeft.append($btnToday);

                    break;

                case 'date-control':
                    let $btnGroup = $('<div class="btn-group btn-group-sm"></div>');

                    let btnDateControlClass = '';

                    if (option.class) {
                        btnDateControlClass = option.class;
                    }

                    let $btnPrev = $(`
                        <button class="btn ${btnDateControlClass} btn-zyk-calendar-control btn-zyk-calendar-prev" type="button">
                            <i class="elo el-caret-left"></i>
                        </button>
                    `);

                    let $btnNext = $(`
                        <button class="btn ${btnDateControlClass} btn-zyk-calendar-control btn-zyk-calendar-next" type="button">
                            <i class="elo el-caret-right"></i>
                        </button>
                    `);

                    let $btnShowDate = $(`
                        <button class="btn btn-zyk-calendar-show-date" type="button">
                            ${zykVar.calendarLang[config.lang].months[_this.month]} - ${_this.year}
                        </button>
                    `);

                    $btnPrev.unbind().on('click', function () {
                        _this.getPrevMonth();

                        let data = {
                            year: _this.year,
                            month: _this.month,
                            date: null
                        };

                        if (config.eventOnClickPrev) {
                            config.eventOnClickPrev(data);
                        }

                        _this.render();
                    });

                    $btnNext.unbind().on('click', function () {
                        _this.getNextMonth();

                        let data = {
                            year: _this.year,
                            month: _this.month,
                            date: null
                        };

                        if (config.eventOnClickNext) {
                            config.eventOnClickNext(data);
                        }

                        _this.render();
                    });

                    $btnGroup.append($btnPrev);
                    $btnGroup.append($btnNext);

                    $headerLeft.append($btnGroup);
                    $headerLeft.append($btnShowDate);
                    break;

                case 'switch-view':
                    if (!option.layout) {
                        option.layout = 'group';
                    }

                    let viewLabels = zykVar.calendarLang[config.lang].views;

                    switch (option.layout) {
                        case 'group':
                            let $btnSwitchGroup = $('<div class="btn-group btn-group-sm"></div>');

                            for (let i = 0; i < Object.keys(viewLabels).length; i++) {
                                let key = Object.keys(viewLabels)[i];

                                let $btnSelectView = $(`
                                    <button class="btn ${key == config.view ? 'btn-primary' : 'btn-outline-default'}" type="button">
                                        ${viewLabels[key]}
                                    </button>
                                `);

                                $btnSelectView.unbind().on('click', function () {
                                    config.view = key;

                                    _this.render();
                                });

                                $btnSwitchGroup.append($btnSelectView);
                            }

                            $headerRight.append($btnSwitchGroup);
                            break;

                        case 'dropdown':
                            let $btnSwitchDropdown = $(`
                                <div class="dropdown">
                                    <button class="btn btn-outline-default dropdown-toggle" data-bs-toggle="dropdown" type="button">
                                        ${zykVar.calendarLang[config.lang].views[config.view]}
                                    </button>
                                </div>
                            `);

                            let $dropdownMenu = $('<div class="dropdown-menu"></div>');

                            for (let i = 0; i < Object.keys(viewLabels).length; i++) {
                                let key = Object.keys(viewLabels)[i];

                                let $dropdownItem = $(`
                                    <a href="#" class="dropdown-item" data-view="${key}">
                                        ${viewLabels[key]}
                                    </div>
                                `);

                                $dropdownItem.unbind().on('click', function (e) {
                                    e.preventDefault();

                                    config.view = key;

                                    _this.render();
                                });

                                $dropdownMenu.append($dropdownItem);
                            }

                            $btnSwitchDropdown.append($dropdownMenu);

                            $headerRight.append($btnSwitchDropdown);

                            break;
                    }

                    break;
            }
        });

        $header.append($headerLeft);
        $header.append($headerRight);

        return $header;
    }

    getCalendarBody() {
        const _this = this;

        let $body = $('<div class="zyk-calendar-body"></div>');

        $body.append(_this.getCalendarTable());

        return $body;
    }

    getCalendarTable() {
        const _this = this;

        let $table = $('<div class="zyk-calendar-table"></div>');

        $table.append(_this.getCalendarTableHeader());
        $table.append(_this.getCalendarTableBody());

        return $table;
    }

    getCalendarTableHeader() {
        const _this = this;

        let config = _this.getConfig();

        let $tableHeader = $('<div class="zyk-calendar-table-header"></div>');

        let $itemHeader;

        switch (config.view) {
            case 'single-month':
                for (let i = 0; i < 7; i++) {
                    $itemHeader = $('<div class="zyk-calendar-table-header-item"></div>');

                    $itemHeader.append(`
                        <p class="zyk-calendar-date-of-week">
                            ${zykVar.calendarLang[config.lang].daysOfWeekShort[i]}
                        </p>
                    `);

                    $tableHeader.append($itemHeader);
                }
                break;
            case 'month':
                for (let i = 0; i < 7; i++) {
                    $itemHeader = $('<div class="zyk-calendar-table-header-item"></div>');

                    $itemHeader.append(`
                        <p class="zyk-calendar-date-of-week">
                            ${zykVar.calendarLang[config.lang].daysOfWeekShort[i]}
                        </p>
                    `);

                    $tableHeader.append($itemHeader);
                }

                break;
            case 'week':
                break;
            case 'year':
                break;
        }

        return $tableHeader;
    }

    getCalendarTableBody() {
        const _this = this;

        let config = _this.getConfig();

        let $tableBody = $('<div class="zyk-calendar-table-body"></div>');

        let $itemBody;

        switch (config.view) {
            case 'single-month':
                for (let i = 0; i < _this.getFirstDayDate(_this.month, _this.year) - 1; i++) {
                    $itemBody = $('<div class="zyk-calendar-table-day"></div>');

                    $tableBody.append($itemBody);
                }

                for (let i = 0; i < _this.getDaysInMonth(); i++) {
                    $itemBody = $('<div class="zyk-calendar-table-day"></div>');

                    if (_this.year == _this.currentYear && _this.month == _this.currentMonth && i + 1 == _this.currentDate) {
                        $itemBody.addClass('zyk-calendar-today');
                    }

                    let $day = $(`
                        <a href="#" class="zyk-calendar-day">
                            ${i + 1}
                        </a>
                    `);

                    $itemBody.append($day);

                    let date = `${_this.year}-${_this.month + 1 >= 10 ? _this.month + 1 : '0' + (_this.month + 1)}-${i + 1 >= 10 ? i + 1 : '0' + (i + 1)}`;
                    if (config.events[date]) {
                        $itemBody.data('event', config.events[date]);
                        $itemBody.addClass('zyk-calendar-day-has-event');
                        $itemBody.append('<span class="circle"></span>');
                    } else {
                        $itemBody.data('event', { date: date });
                    }

                    $day.unbind().on('click', function () {
                        $tableBody.find('.zyk-calendar-table-day').removeClass('zyk-calendar-table-day-selected');

                        if (!$(this).parent().hasClass('zyk-calendar-today')) {
                            $(this).parent().addClass('zyk-calendar-table-day-selected');
                        }

                        if (config.eventOnClick && $(this).parent().data('event')) {
                            config.eventOnClick($(this).parent().data('event'));
                        }
                    });

                    $tableBody.append($itemBody);
                }

                break;
            case 'month':
                if (config.body.showMoreDates) {
                    let prevMonth = _this.month - 1;
                    let prevYear = _this.year;

                    if (prevMonth < 0) {
                        prevMonth = 11;
                        prevYear = _this.year - 1;
                    }

                    console.log(prevMonth, prevYear);
                    let prevDates = _this.getDaysInMonth(prevMonth, prevYear);
                    console.log(prevDates);
                }

                for (let i = 0; i < _this.getFirstDayDate(_this.month, _this.year) - 1; i++) {
                    $itemBody = $('<div class="zyk-calendar-table-day"></div>');

                    $tableBody.append($itemBody);
                }

                for (let i = 0; i < _this.getDaysInMonth(); i++) {
                    $itemBody = $('<div class="zyk-calendar-table-day"></div>');

                    if (_this.year == _this.currentYear && _this.month == _this.currentMonth && i + 1 == _this.currentDate) {
                        $itemBody.addClass('zyk-calendar-today');
                    }

                    let $day = $(`
                        <a href="#" class="zyk-calendar-day">
                            ${i + 1}
                        </a>
                    `);

                    $itemBody.append($day);

                    let date = `${_this.year}-${_this.month + 1 >= 10 ? _this.month + 1 : '0' + (_this.month + 1)}-${i + 1 >= 10 ? i + 1 : '0' + (i + 1)}`;
                    if (config.events[date]) {
                        $itemBody.data('event', config.events[date]);
                        $itemBody.addClass('zyk-calendar-day-has-event');
                        $itemBody.append('<span class="circle"></span>');
                    } else {
                        $itemBody.data('event', { date: date });
                    }

                    $day.unbind().on('click', function () {
                        $tableBody.find('.zyk-calendar-table-day').removeClass('zyk-calendar-table-day-selected');

                        if (!$(this).parent().hasClass('zyk-calendar-today')) {
                            $(this).parent().addClass('zyk-calendar-table-day-selected');
                        }

                        if (config.eventOnClick && $(this).parent().data('event')) {
                            config.eventOnClick($(this).parent().data('event'));
                        }
                    });

                    $tableBody.append($itemBody);
                }

                break;
            case 'week':
                break;
            case 'year':
                break;
        }

        return $tableBody;
    }

    setTableBodySize() {
        const _this = this;

        let config = _this.getConfig();

        if (config.boxDayRatio != 'auto') {
            $(_this.element)
                .find('.zyk-calendar-table-day')
                .each(function () {
                    $(this).css({
                        height: $(this).width() / config.boxDayRatio
                    });
                });
        }
    }
}

class Calendar {
    constructor(target, options) {
        let defaultOptions = {
            view: 'month',
            lang: 'en',
            bordered: false,

            header: {
                controls: ['today'],
                title: true,
                views: ['month', 'week', 'day']
            },

            body: {
                tableHeader: {
                    type: 'daysOfWeek'
                },
                tableBody: {
                    disablePast: false
                }
            },

            buttonClass: {
                default: 'btn btn-sm btn-default',
                active: 'btn btn-sm btn-primary'
            },

            icons: {
                prev: 'els el-sm el-caret-left',
                next: 'els el-sm el-caret-right'
            },

            dayRatio: 0.5,
            dayFormat: 'd/m/y',

            date: null,
            month: null,
            year: null,

            events: [],
            eventOnClick: false,
            eventOnClickNext: false,
            eventOnClickPrev: false,
            eventOnClickToday: false
        };

        this.config = {
            ...defaultOptions,
            ...options
        };

        this.date = new Date();
        this.currentDate = this.getDate();
        this.currentMonth = this.getMonth();
        this.currentYear = this.getYear();

        this.contentText = zykVar.calendarLang[this.config.lang];

        this.target = target;

        this.render(target);
    }

    render(element) {
        const _this = this;

        // RESET CALENDAR INNER HTML
        $(element).html('');

        // ADD BORDER FOR CALENDAR
        if (_this.config.bordered) {
            $(element).addClass('calendar-bordered');
        }

        // APPEND CALENDAR HEADER
        if (_this.config.header && _this.config.header != '') {
            $(element).append('<div class="calendar-header"></div>');
            $(element).find('.calendar-header').html(_this.getCalendarHeader());
        }

        // APPEND CALENDAR BODY
        let calendarBodyExtra = '';

        if (this.config.view == 'week') {
            calendarBodyExtra = 'calendar-body-week';
        } else if (this.config.view == 'day') {
            calendarBodyExtra = 'calendar-body-day';
        }

        $(element).append(`<div class="calendar-body ${calendarBodyExtra} overflow-y"></div>`);
        $(element).find('.calendar-body').html(_this.getCalendarBody());

        this.setTableColSize();

        this.getEvents();

        this.initActions();
    }

    getYear() {
        let year = this.config.year == null ? this.date.getFullYear() : this.config.year;

        return year;
    }

    getPrevYear() {
        let year = this.currentYear;

        let prevYear = year - 1;

        return prevYear;
    }

    getNextYear() {
        let year = this.currentYear;

        let nextYear = year + 1;

        return nextYear;
    }

    getMonth() {
        let month = this.config.month == null ? this.date.getMonth() : this.config.month;

        return month;
    }

    getPrevMonth() {
        let prevMonth;

        let currentMonth = this.currentMonth;

        if (currentMonth > 0) {
            prevMonth = currentMonth - 1;

            return prevMonth;
        } else {
            prevMonth = 11;

            return prevMonth;
        }
    }

    getNextMonth() {
        let nextMonth;

        let currentMonth = this.currentMonth;

        if (currentMonth < 11) {
            nextMonth = currentMonth + 1;

            return nextMonth;
        } else {
            nextMonth = 0;

            return nextMonth;
        }
    }

    getDate() {
        let date = this.config.date == null ? this.date.getDate() : this.config.date;

        return date;
    }

    getToday(date, month, year) {
        const _this = this;

        if (date == this.date.getDate() && month == this.date.getMonth() && year == this.date.getFullYear()) {
            return true;
        } else {
            return false;
        }
    }

    getDaysInMonth(month, year) {
        return 32 - new Date(year, month, 32).getDate();
    }

    getDaysInWeek(date = this.currentDate, month = this.currentMonth, year = this.currentYear) {
        const _this = this;

        let daysInWeek = [];

        let dayInWeek;

        if (date > _this.getDaysInMonth(month, year)) {
            date = date - _this.getDaysInMonth(month, year);
        }

        if (new Date(`${year}-${month + 1}-${date}`).getDay() - 1 < 0) {
            dayInWeek = 6;
        } else {
            dayInWeek = new Date(`${year}-${month + 1}-${date}`).getDay() - 1;
        }

        for (let i = 0; i < 7; i++) {
            let offset = date - dayInWeek;

            //daysInWeek[i] = i + offset

            if (i + offset > _this.getDaysInMonth(month, year)) {
                daysInWeek[i] = i + offset - _this.getDaysInMonth(month, year);
            } else {
                daysInWeek[i] = i + offset;
            }
        }

        return daysInWeek;
    }

    getFirstDay(month, year) {
        return new Date(year, month).getDay();
    }

    getCalendarHeader() {
        const _this = this;

        let calendarHeader = '';

        if (_this.config.header && _this.config.header != '') {
            $.each(_this.config.header, (key) => {
                calendarHeader += `
                    <div class="calendar-header-${key}">
                        ${_this.getCalendarHeaderElements(key)}
                    </div>
                `;
            });
        }

        return calendarHeader;
    }

    getCalendarHeaderElements(part) {
        const _this = this;

        let partElements = ``;

        if (part == 'controls') {
            if (_this.config.header && _this.config.header != '') {
                if (_this.config.header.controls.indexOf('today') > -1) {
                    partElements += `
                        <button class="${_this.config.buttonClass.default} btn-calendar-today" type="button">
                            ${_this.contentText.today}
                        </button>
                    `;
                }
            } else {
                throw new TypeError('Calendar configs header controls failed!');
            }
        } else if (part == 'title') {
            if (_this.date != null || _this.config.header.title) {
                if (_this.config.view == 'month') {
                    partElements += `
                        <button class="${_this.config.buttonClass.default} btn-calendar-prev" type="button">
                            <i class="${_this.config.icons.prev}"></i>
                        </button>
                    `;

                    if (_this.config.view == 'month') {
                        let monthpickerButtons = '';

                        $.each(_this.contentText.monthsShort, function (key, value) {
                            monthpickerButtons += `
                                <button class="${_this.config.buttonClass.default} btn-calendar-monthpicker" data-month="${key}" type="button">
                                    ${value}
                                </button>
                            `;
                        });
                        partElements += `
                            <div class="dropdown">
                                <button class="${_this.config.buttonClass.default}" data-toggle="dropdown" data-placement="bottom" type="button">
                                    ${_this.contentText.months[_this.currentMonth]} ${_this.currentYear}
                                </button>

                                <div class="dropdown-menu">
                                    <div class="calendar-monthpicker-wrapper">
                                        <div class="calendar-monthpicker-header">
                                            <button class="${_this.config.buttonClass.default} btn-calendar-monthpicker-year-prev" type="button">
                                                <i class="els el-sm el-caret-left"></i>
                                            </button>

                                            <h6 class="subtitle-md">
                                                ${_this.currentYear}
                                            </h6>

                                            <button class="${_this.config.buttonClass.default} btn-calendar-monthpicker-year-next" type="button">
                                                <i class="els el-sm el-caret-right"></i>
                                            </button>
                                        </div>
                                        <div class="calendar-monthpicker-body">
                                            ${monthpickerButtons}
                                        </div>
                                    </div>

                                    <input type="hidden" value="${_this.currentMonth}">
                                    <input type="hidden" value="${_this.currentYear}">
                                </div>
                            </div>
                        `;
                    } else {
                        partElements += `
                            <h6>
                                ${_this.contentText.months[_this.currentMonth]} ${_this.currentYear}
                            </h6>
                        `;
                    }

                    partElements += `
                        <button class="${_this.config.buttonClass.default} btn-calendar-next" type="button">
                            <i class="${_this.config.icons.next}"></i>
                        </button>
                    `;
                } else if (_this.config.view == 'week') {
                    if (_this.config.dayFormat == 'd/m/y') {
                        partElements += `
                            <h6>${_this.getDaysInWeek()[0]} - ${_this.getDaysInWeek()[6]} ${_this.contentText.months[_this.currentMonth]} ${_this.currentYear}</h6>
                        `;
                    } else if (_this.config.dayFormat == 'm/d/y') {
                        partElements += `
                            <h6>${_this.contentText.months[_this.currentMonth]} ${_this.getDaysInWeek()[0]} - ${_this.getDaysInWeek()[6]}, ${_this.currentYear}</h6>
                        `;
                    } else {
                        partElements += `
                            <h6>${_this.getDaysInWeek()[0]} - ${_this.getDaysInWeek()[6]} ${_this.contentText.months[_this.currentMonth]} ${_this.currentYear}</h6>
                        `;

                        console.log("Calendar Day Format isn't not supported! Calendar Day Format changed into 'd/m/y '");
                    }
                }
            } else if (_this.date == null) {
                throw new TypeError("Can't get Date from your computer!");
            }
        } else if (part == 'views') {
            let buttons = '';

            if (_this.config.header.views && _this.config.header.views != '') {
                $.each(_this.config.header.views, (key, value) => {
                    if (_this.config.header.views.indexOf(value) > -1) {
                        buttons += `<button class="${_this.config.view == value ? _this.config.buttonClass.active : _this.config.buttonClass.default} btn-calendar-view" type="button" data-view="${value}">${value}</button>`;
                    }
                });
            }

            partElements += `
                <div class="btn-group">
                    ${buttons}
                </div>
            `;
        }

        return partElements;
    }

    getCalendarBody() {
        const _this = this;

        let tableHeader = '';
        let tableHeaderContent = '';
        let tableBody = '';

        if (this.config.view == 'month') {
            if (Object.keys(_this.contentText).indexOf(_this.config.body.tableHeader.type) > -1) {
                $.each(_this.contentText[_this.config.body.tableHeader.type], (key, value) => {
                    tableHeaderContent += _this.getTableCol(value, '', '', false);
                });

                tableHeader += _this.getTableRow(tableHeaderContent);
            } else {
                throw new TypeError('There is no type of Calendar Table Header Type');
            }
        } else if (this.config.view == 'week') {
            tableHeaderContent += _this.getTableCol('', '', '', false, 'calendar-table-col-hour');

            $.each(_this.contentText[_this.config.body.tableHeader.type], (key, value) => {
                tableHeaderContent += _this.getTableCol(value, '', '', false, 'calendar-table-col-day');
            });

            tableHeaderContent += _this.getTableCol('', '', '', false, 'calendar-table-col-hour');
            $.each(_this.getDaysInWeek(), function (key, value) {
                tableHeaderContent += _this.getTableCol(value, _this.currentMonth, _this.currentYear, false);
            });

            tableHeader += _this.getTableRow(tableHeaderContent);
        } else if (this.config.view == 'day') {
        }

        tableBody += _this.getTable(_this.config.view);

        let table = `
            <div class="calendar-table">
                <div class="calendar-table-header">${tableHeader}</div>
                <div class="calendar-table-body">${tableBody}</div>
            </div>
        `;

        return table;
    }

    getTable(view, month = this.currentMonth, year = this.currentYear) {
        const _this = this;

        let tableContent = '';

        if (view == 'month') {
            let date = 1;
            let firstDay;

            if (_this.getFirstDay(month, year) - 1 < 0) {
                firstDay = 6;
            } else {
                firstDay = _this.getFirstDay(month, year) - 1;
            }

            for (let r = 0; r < 6; r++) {
                let rowContent = '';

                for (let c = 0; c < 7; c++) {
                    if (r == 0 && c < firstDay) {
                        // GET DATE OF PREV MONTH ON VIEW
                        let prevDays;

                        if (month == 0) {
                            prevDays = _this.getDaysInMonth(_this.getPrevMonth(), _this.getPrevYear());

                            rowContent += _this.getTableCol(prevDays + firstDay * -1 + 1 + c, _this.getPrevMonth(), _this.getPrevYear());
                        } else {
                            prevDays = _this.getDaysInMonth(_this.getPrevMonth(), year);

                            rowContent += _this.getTableCol(prevDays + firstDay * -1 + 1 + c, _this.getPrevMonth(), year);
                        }

                        prevDays--;
                    } else if (r > 0 && date > _this.getDaysInMonth(month, year)) {
                        // GET DATE OF NEXT MONTH ON VIEW
                        if (month == 11) {
                            rowContent += _this.getTableCol(date - _this.getDaysInMonth(month, year), _this.getNextMonth(), _this.getNextYear());
                        } else {
                            rowContent += _this.getTableCol(date - _this.getDaysInMonth(month, year), _this.getNextMonth(), year);
                        }

                        date++;
                    } else {
                        // GET DATE OF MONTH ON VIEW
                        rowContent += _this.getTableCol(date, month, year);
                        date++;
                    }
                }

                tableContent += _this.getTableRow(rowContent);
            }
        } else if (view == 'week') {
            for (let h = 0; h < 24; h++) {
                let rowContent = '';
                let timeText;
                if (h < 10) {
                    timeText = '0' + h + ':' + '00';
                } else {
                    timeText = h + ':' + '00';
                }

                rowContent += _this.getTableCol(timeText, _this.currentMonth, '', false, 'calendar-table-col-hour');

                for (let c = 0; c < 7; c++) {
                    rowContent += _this.getTableCol('', _this.currentMonth, '');
                }

                tableContent += _this.getTableRow(rowContent);
            }
        }

        return tableContent;
    }

    getTableRow(rowContent) {
        return `
            <div class="calendar-table-row">${rowContent}</div>
        `;
    }

    getTableCol(colContent, month, year, tableBodyDays = true, extraClass = '') {
        const _this = this;

        return `
            <div class = "calendar-table-col ${extraClass} ${tableBodyDays && month != _this.currentMonth ? 'calendar-table-col-disabled' : ''}">
                ${(() => {
                    if (tableBodyDays) {
                        return `
                            <a href="#" class="calendar-table-day ${_this.getToday(colContent, month, year) ? 'calendar-table-today' : ''}" data-calendar-day="${year}-${month + 1 >= 10 ? month + 1 : '0' + (month + 1)}-${colContent >= 10 ? colContent : '0' + colContent}">
                                <span class="day-text">${colContent}</span>
                            </a>
                        `;
                    } else {
                        return `
                            <span class="${_this.getToday(colContent, month, year) ? 'calendar-span-today' : ''}" data-calendar-day="${year}-${month + 1 >= 10 ? month + 1 : '0' + (month + 1)}-${colContent >= 10 ? colContent : '0' + colContent}">
                                ${colContent}
                            </span>
                        `;
                    }
                })()}
            </div>
        `;
    }

    setTableColSize() {
        const _this = this;

        $(this.target)
            .find('.calendar-table-day')
            .each(function () {
                if (_this.config.view == 'month') {
                    if (_this.config.dayRatio != 'auto') {
                        $(this).css({
                            height: $(this).width() * _this.config.dayRatio + 'px'
                        });
                    }
                } else if (_this.config.view == 'week') {
                    $(this).css({
                        height: $(this).width() * 1 + 'px'
                    });
                }
            });
    }

    getEvents() {
        const _this = this;

        let eventsKeys = Object.keys(_this.config.events);
        let eventsLength = eventsKeys.length;

        if (eventsLength > 0) {
            $(_this.target)
                .find('.calendar-table-day')
                .each(function () {
                    let eventDay = $(this).data('calendar-day');

                    if (eventsKeys.indexOf(eventDay) > -1) {
                        $(this).append(`
                        <span class="day-events"></span>
                    `);

                        for (let i = 0; i < Object.keys(_this.config.events[eventDay]).length; i++) {
                            $(this).find('span.day-events').append(`
                            <i>
                                ${Object.keys(_this.config.events[eventDay][i]).length}
                            </i>
                        `);
                        }
                    }
                });
        }

        $(_this.target)
            .find('.calendar-table-day')
            .each(function () {
                $(this)
                    .unbind()
                    .on('click', function () {
                        if (_this.config.eventOnClick) {
                            _this.config.eventOnClick(this);
                        }
                    });
            });
    }

    initActions() {
        this.actionHeader();
    }

    actionHeader() {
        this.getCalendarNext();
        this.getCalendarPrev();
        this.getCalendarToday();

        this.changeCalendarView();

        this.monthPicker();
    }

    getCalendarNext() {
        const _this = this;

        $(this.target)
            .find('.btn-calendar-next')
            .unbind()
            .on('click', function () {
                if (_this.config.view == 'month') {
                    if (_this.currentMonth == 11) {
                        _this.currentYear = _this.getNextYear();
                        _this.config.year = _this.currentYear;
                    }

                    _this.currentMonth = _this.getNextMonth();
                    _this.config.month = _this.currentMonth;
                } else if (_this.config.view == 'week') {
                    if (_this.currentDate + 7 > _this.getDaysInMonth(_this.currentMonth, _this.currentYear)) {
                        _this.currentDate = _this.currentDate + 7 - _this.getDaysInMonth(_this.currentMonth, _this.currentYear);
                    } else {
                        _this.currentDate = _this.currentDate + 7;
                    }
                }

                if (typeof _this.currentDate == 'undefined') {
                    _this.currentDate = '';
                }

                if (_this.config.eventOnClickNext) {
                    _this.config.eventOnClickNext(_this.config);
                }

                _this.render(_this.target);
            });
    }

    getCalendarPrev() {
        const _this = this;

        $(this.target)
            .find('.btn-calendar-prev')
            .unbind()
            .on('click', function () {
                if (_this.config.view == 'month') {
                    if (_this.currentMonth == 0) {
                        _this.currentYear = _this.getPrevYear();
                        _this.config.year = _this.currentYear;
                    }

                    _this.currentMonth = _this.getPrevMonth();
                    _this.config.month = _this.currentMonth;
                }

                if (typeof _this.currentDate == 'undefined') {
                    _this.currentDate = '';
                }

                if (_this.config.eventOnClickPrev) {
                    _this.config.eventOnClickPrev(_this.config);
                }

                _this.render(_this.target);
            });
    }

    getCalendarToday() {
        const _this = this;

        $(_this.target)
            .find('.btn-calendar-today')
            .unbind()
            .on('click', function () {
                if (_this.config.view == 'month') {
                    _this.currentMonth = _this.date.getMonth();
                    _this.currentYear = _this.date.getFullYear();

                    _this.config.month = _this.currentMonth;
                    _this.config.year = _this.currentYear;
                }

                if (_this.config.eventOnClickToday) {
                    _this.config.eventOnClickToday(_this.config);
                }

                _this.render(_this.target);
            });
    }

    changeCalendarView() {
        const _this = this;

        $(_this.target)
            .find('.btn-calendar-view')
            .unbind()
            .on('click', function () {
                let dataView = $(this).data('view');

                _this.config.view = dataView;

                _this.render(_this.target);
            });
    }

    monthPicker() {
        const _this = this;

        let year = _this.currentYear;

        $(_this.target)
            .find('.btn-calendar-monthpicker-year-next')
            .unbind()
            .on('click', function (e) {
                e.preventDefault();
                e.stopPropagation();

                year++;
                $(this).siblings('h6').text(year);
            });

        $(_this.target)
            .find('.btn-calendar-monthpicker-year-prev')
            .unbind()
            .on('click', function (e) {
                e.preventDefault();
                e.stopPropagation();

                year--;
                $(this).siblings('h6').text(year);
            });

        $(_this.target)
            .find('.btn-calendar-monthpicker')
            .unbind()
            .on('click', function (e) {
                e.preventDefault();
                e.stopPropagation();

                _this.currentMonth = $(this).data('month');
                _this.currentYear = year;

                _this.render(_this.target);
            });
    }
}

/*
=========================================================
TIMELINER
=========================================================
*/
class ZykTimeliner {
    constructor(options) {
        let defaultOptions = {
            labels: {
                default: 'Timeliner',
                close: 'Close timeliner',
                collapse: 'Collapse timerliner',
                addLayer: 'Add layer group',
                play: 'Play',
                stop: 'Stop',
                start: 'Start time:',
                end: 'End time:',
                duration: 'Duration:',
                controlPreview: 'Show preview'
            },
            classes: {
                timelinerCollapsed: 'timeliner-collapsed'
            },
            timeline: {
                classes: ['timeline-025', 'timeline-05', 'timeline-1', 'timeline-5', 'timeline-30'],
                scales: [4, 2, 1, 0.2, 1 / 30],
                scaleIndex: 2,
                scale: 1,
                duration: 60,
                step: 10,
                pixelPerSecond: 160,
                defaultPixelPerSecond: 160,
                currentTime: 0,
                isPlaying: false,
                offsetLeft: 0
            },
            events: {
                onPrepareConfig: false,
                onBeforeRender: false,
                onRendered: false,
                onPlayTimeline: false,
                onPlayingTimeline: false,
                onPauseTimeline: false,
                onStopTimeline: false,
                onAddLayerGroup: false,
                onEditLayerGroup: false,
                onRemoveLayerGroup: false,
                onAddLayer: false,
                onEditLayer: false,
                onRemoveLayer: false,
                onDblClickFrame: false,
                onUpdateGroupFrame: false,
                onUpdateFrame: false,
                onShown: false,
                onStopSortLayerGroup: false,
                onStopSortLayerItem: false,
                onRequestPlayAudioUrl: false,
                onRequestPlayVideoUrl: false,
                onSendMessage: false,
                onAddMediaCondition: false,
                onRemoveMediaCondition: false,
                onSelectMediaCondition: false,
                onCheckShowPreview: false
            },
            layers: {
                version: 1,
                data: {}
            },
            requestAnimation: null
        };

        this.defaultOptions = defaultOptions;
        this.options = options;

        this.config = {};

        this.element = null;

        this.isShown = false;

        this.openedGroup = [];

        this.activeGroup = null;
        this.activeLayer = [];

        this.audio = null;
        this.layerPlayingAudio = null;

        this.video = null;
        this.videoType = null;
        this.layerPlayingVideo = null;

        this.getConfig();
    }

    getConfig() {
        const _this = this;

        if (!eldraw) {
            throw new Error('eldraw is missing!');
        }

        let merged = _this.defaultOptions;

        if (Object.keys(_this.options).length > 0) {
            for (let key in _this.options) {
                if (merged[key]) {
                    merged[key] = {
                        ..._this.defaultOptions[key],
                        ..._this.options[key]
                    };
                }
            }
        }

        _this.config = merged;

        if (Object.keys(_this.config.layers.data).length == 0) {
            let newGroupId = eldraw.util.randomId();

            _this.config.layers.data[newGroupId] = {
                index: 1,
                id: newGroupId,
                label: lang['010205_76'],
                children: []
            };
        }

        if (_this.config.events.onPrepareConfig) {
            _this.config.events.onPrepareConfig(_this.config);
        }

        _this.prepare();
    }

    toggle() {
        const _this = this;

        return _this.isShown ? _this.hide() : _this.show();
    }

    show() {
        const _this = this;
        const _config = _this.config;

        _this.isShown = true;

        $(_this.element).show();

        _config.events.onShown && _config.events.onShown();
    }

    hide() {
        const _this = this;
        const _config = _this.config;

        _this.isShown = false;

        $(_this.element).hide();

        _config.events.onHidden && _config.events.onHidden();
    }

    async prepare() {
        const _this = this;
        const _config = _this.config;
        const _timeline = _config.timeline;

        if ($('body').find('.zyk-timeliner').length == 0) {
            let div = document.createElement('div');

            $(div).addClass('zyk-timeliner theme-dark');

            _this.element = div;
            _this.isShown = true;

            _config.events.onShown && _config.events.onShown();

            $('body').append($(div));
        } else {
            _this.element = $('body').find('.zyk-timeliner')[0];

            $(_this.element).empty();
        }

        _timeline.scale = _timeline.scales[_timeline.scaleIndex];

        _timeline.pixelPerSecond = _timeline.defaultPixelPerSecond * _timeline.scale;

        await _this.renderBasic();

        _this.renderTimeline();
        _this.renderScrollTimeline();

        _this.render();
    }

    async renderBasic() {
        const _this = this;

        let $header = await _this.renderHeader();
        let $body = await _this.renderBody();
        let $footer = await _this.renderFooter();
        let $prepare = await _this.renderPrepare();

        let wrapper = document.createElement('div');
        $(wrapper).addClass('zyk-timeliner-wrapper');

        let inner = document.createElement('div');
        $(inner).addClass('zyk-timeliner-inner');

        $(inner).append($header);
        $(inner).append($body);
        $(inner).append($footer);
        $(inner).append($prepare);

        $(wrapper).append($(inner));

        $(_this.element).append($(wrapper));
    }

    renderHeader() {
        const _this = this;
        const _config = _this.config;

        let $header = $('<div class="timeliner-header"></div>');
        let $headerLeft = $('<div class="timeliner-header-left"></div>');
        let $headerRight = $('<div class="timeliner-header-right"></div>');

        let $controlPreview = $(`
            <div class="timeliner-control-preview">
                <p>
                    ${_config.labels.controlPreview}
                </p>

                <div class="form-check">
                    <input type="checkbox">
                    <label data-toggle="check" data-type="switch">
                        <div class="btn-switch btn-switch-primary">
                            <div class="control"></div>
                        </div>
                    </label>
                </div>
            </div>
        `);

        $controlPreview
            .find('[data-toggle="check"]')
            .unbind()
            .on('check.zyk.check', function () {
                if (_config.events.onCheckShowPreview) {
                    _config.events.onCheckShowPreview(true, _config.timeline.currentTime);
                }
            })
            .on('uncheck.zyk.check', function () {
                if (_config.events.onCheckShowPreview) {
                    _config.events.onCheckShowPreview(false);
                }
            });

        $headerLeft.append($controlPreview);

        $header.append($headerLeft);

        let $btnCollapse = $(`
            <button class="btn btn-sm btn-timeliner-action btn-collapse-timeliner" data-bs-toggle="tooltip" title="${_config.labels.collapse}" type="button">
                <i class="elo el-caret-down el-animation"></i>
            </button>
        `);

        $btnCollapse.unbind().on('click', function () {
            $(this).find('i').toggleClass('el-flip-y');

            $(_this.element).find('.zyk-timeliner-inner').toggleClass(_config.classes.timelinerCollapsed);

            if ($(this).data('bsToggle') && $(this).data('bsToggle') == 'tooltip') $(this).tooltip('hide');
        });

        let $btnClose = $(`
            <button class="btn btn-sm btn-timeliner-action btn-close-timeliner" data-bs-toggle="tooltip" title="${_config.labels.close}" type="button">
                <i class="elo el-close"></i>
            </button>
        `);

        $btnClose.unbind().on('click', function () {
            _this.toggle();

            if ($(this).data('bsToggle') && $(this).data('bsToggle') == 'tooltip') $(this).tooltip('hide');
        });

        $headerRight.append($btnCollapse);
        $headerRight.append($btnClose);

        $header.append($headerRight);

        let $videoPreview = $(`
            <div class="timeliner-video-preview">
                <div class="timeliner-video-preview-header">
                    <button class="btn btn-sm btn-close-video-preview" type="button">
                        <i class="elo el-close"></i>
                    </button>
                </div>

                <div class="timeliner-video-preview-body">
                    <div class="preview-video"></div>
                    <div class="preview-video-youtube">
                        <div id="timelinerYoutube"></div>
                    </div>
                </div>
            </div>
        `);

        $videoPreview
            .find('.btn-close-video-preview')
            .unbind()
            .on('click', function () {
                $videoPreview.find('.preview-video').empty();

                $videoPreview.find('.preview-video').hide();
                $videoPreview.find('.preview-video-youtube').hide();

                $videoPreview.hide();
            });

        $header.append($videoPreview);

        $header.find('[data-bs-toggle="tooltip"]').tooltip();

        return $header;
    }

    renderBody() {
        const _this = this;
        const _config = _this.config;

        let $body = $('<div class="timeliner-body"></div>');

        let $wrapper = $('<div class="timeliner-wrapper"></div>');

        let $content = $('<div class="timeliner-wrapper-content"></div>');

        let $controls = $('<div class="timeliner-controls"></div>');

        let $btnPlay = $(`
            <button class="btn btn-sm btn-timeliner-action btn-play-timeliner" data-bs-toggle="tooltip" title="${_config.labels.play}" type="button">
                <i class="els el-play"></i>
            </button>
        `);

        $btnPlay.unbind().on('click', function () {
            if ($(this).data('bsToggle') && $(this).data('bsToggle') == 'tooltip') $(this).tooltip('hide');

            if ($(this).find('i').hasClass('el-play')) {
                $(this).find('i').removeClass('els el-play').addClass('elo el-pause');

                _this.playTimeline();

                if (_config.events.onPlayTimeline) {
                    _config.events.onPlayTimeline();
                }
            } else {
                $(this).find('i').removeClass('elo el-pause').addClass('els el-play');

                _this.pauseTimeline();

                if (_config.events.onPauseTimeline) {
                    _config.events.onPauseTimeline();
                }
            }
        });

        $controls.append($btnPlay);

        let $btnStop = $(`
            <button class="btn btn-sm btn-timeliner-action btn-stop-timeliner" data-bs-toggle="tooltip" title="${_config.labels.stop}" type="button">
                <i class="els el-square"></i>
            </button>
        `);

        $btnStop.unbind().on('click', function () {
            if ($(this).data('bsToggle') && $(this).data('bsToggle') == 'tooltip') $(this).tooltip('hide');

            _this.stopTimeline();

            if (_config.events.onStopTimeline) {
                _config.events.onStopTimeline();
            }
        });

        $controls.append($btnStop);

        $controls.append(`<p class="p-overline timeliner-main-label">00:00:00</p>`);

        let $btnAddLayerGroup = $(`
            <button class="btn btn-sm btn-timeliner-action btn-add-layer-group" data-bs-toggle="tooltip" title="${_config.labels.addLayer}" type="button">
                <i class="elo el-plus"></i>
            </button>
        `);

        $btnAddLayerGroup.unbind().on('click', function () {
            if ($(this).data('bsToggle') && $(this).data('bsToggle') == 'tooltip') $(this).tooltip('hide');

            if (_config.events.onAddLayerGroup) {
                _config.events.onAddLayerGroup();
            }
        });

        $controls.append($btnAddLayerGroup);

        $content.append($controls);

        let $labelsWrapper = $('<div class="timeliner-labels-wrapper"></div>');
        let $labels = $('<div class="timeliner-labels"></div>');

        $labelsWrapper.append($labels);
        $content.append($labelsWrapper);

        $wrapper.append($content);

        let $timeline = $('<div class="timeliner-wrapper-timeline"></div>');

        let $mainTimelineWrapper = $('<div class="timeliner-main-timeline-wrapper"></div>');
        let $mainTimeline = $('<div class="timeliner-main-timeline"></div>');
        $mainTimelineWrapper.append($mainTimeline);
        $timeline.append($mainTimelineWrapper);

        let $timelineLayers = $('<div class="timeliner-timeline-layers"></div>');

        $timeline.append($timelineLayers);

        let $timelineScroll = $('<div class="timeliner-scroll-wrapper"></div>');
        let $timelineScrollInner = $('<div class="timeliner-scroll-inner"></div>');

        $timelineScroll.append($timelineScrollInner);
        $timeline.append($timelineScroll);

        $wrapper.append($timeline);

        let $floatMenuOptionVideo = $(`
            <div class="timeliner-float-menu float-menu-video">
                <ul class="list-group">
                    <li class="list-group-item">
                        <a href="#" class="timeliner-media-add-condition">
                            ${lang['010116_37']}
                        </a>
                    </li>
                </ul>
            </div>
        `);

        $wrapper.append($floatMenuOptionVideo);

        let $floatMenuOptionVideoCondition = $(`
            <div class="timeliner-float-menu float-menu-video-condition">
                <ul class="list-group">
                    <li class="list-group-item">
                        <a href="#" class="timeliner-media-remove-condition">
                            ${lang['010116_112']}
                        </a>
                    </li>
                </ul>
            </div>
        `);

        $wrapper.append($floatMenuOptionVideoCondition);

        $body.append($wrapper);

        $body.find('[data-bs-toggle="tooltip"]').tooltip();

        return $body;
    }

    renderTimeline() {
        const _this = this;
        const _config = _this.config;
        const _timeline = _config.timeline;

        let $timeline = $(_this.element).find('.timeliner-main-timeline');
        $timeline.empty();

        $timeline.removeClass((index, className) => {
            return (className.match(/(^|\s)timeline-\S+/g) || []).join(' ');
        });

        $timeline.addClass(_timeline.classes[_timeline.scaleIndex]);

        $timeline.css({
            width: _timeline.duration * _timeline.pixelPerSecond,
            'background-size': _timeline.pixelPerSecond
        });

        for (let i = 0; i < _timeline.duration; i++) {
            let span = document.createElement('span');

            if (_timeline.scale == 0.2 && i % 5 != 0) {
                $(span).text('');
            } else if (_timeline.scale == 1 / 30 && i % 30 != 0) {
                $(span).text('');
            } else {
                $(span).text(zykUtil.secToMin(i));
            }

            $(span).css({
                width: _timeline.pixelPerSecond
            });

            $timeline.append($(span));
        }

        _this.initMainTimelineActions($timeline);
    }

    renderScrollTimeline() {
        const _this = this;
        const _config = _this.config;
        const _timeline = _config.timeline;

        let $timelineWrapper = $(_this.element).find('.timeliner-wrapper-timeline');
        let timeline = $(_this.element).find('.timeliner-main-timeline')[0];

        let $scrollWrapper = $(_this.element).find('.timeliner-scroll-wrapper .timeliner-scroll-inner');
        $scrollWrapper.empty();

        let control = document.createElement('div');
        $(control).addClass('scroll-control');

        $(control).css({
            width: ($timelineWrapper.width() * $scrollWrapper.width()) / $(timeline).width(),
            left: _timeline.offsetLeft
        });

        $scrollWrapper.append($(control));

        $(control)
            .unbind()
            .draggable({
                containment: 'parent',
                axis: 'x',
                scroll: false,
                start: (event, ui) => {},
                drag: (event, ui) => {
                    _timeline.offsetLeft = ui.position.left;

                    $(_this.element)
                        .find('.timeliner-main-timeline-wrapper')
                        .scrollLeft((ui.position.left * $(timeline).width()) / $scrollWrapper.width());

                    $(_this.element)
                        .find('.timeliner-timeline-layers')
                        .scrollLeft((ui.position.left * $(timeline).width()) / $scrollWrapper.width());

                    $(_this.element)
                        .find('.timeliner-current-marker')
                        .css({
                            left: _timeline.currentTime * _timeline.pixelPerSecond - $(_this.element).find('.timeliner-timeline-layers').scrollLeft()
                        });

                    $(_this.element)
                        .find('.timeliner-current-liner')
                        .css({
                            left: _timeline.currentTime * _timeline.pixelPerSecond - $(_this.element).find('.timeliner-timeline-layers').scrollLeft()
                        });
                },
                stop: (event, ui) => {}
            });
    }

    renderFooter() {
        const _this = this;
        const _config = _this.config;
        const _timeline = _config.timeline;

        let $footer = $('<div class="timeliner-header"></div>');
        let $footerLeft = $('<div class="timeliner-header-left"></div>');
        let $footerRight = $('<div class="timeliner-header-right"></div>');

        let $layerLabel = $('<p class="p-sm timeline-layer-label"></p>');
        let $layerStatus = $('<p class="p-sm timeline-layer-status"></p>');

        $footerLeft.append($layerLabel);
        $footerLeft.append($layerStatus);

        $footer.append($footerLeft);

        let $zoomControl = $('<div class="timeliner-zoom-control"></div>');
        let $btnZoomDown = $(`
            <button class="btn btn-timeliner-zoom" type="button">
                <i class="elo el-minus"></i>
            </button>
        `);

        let $btnZoomUp = $(`
            <button class="btn btn-timeliner-zoom" type="button">
                <i class="elo el-plus"></i>
            </button>
        `);

        $btnZoomUp.unbind().on('click', function () {
            if (_timeline.scaleIndex == 0) {
                return;
            }

            _timeline.scaleIndex--;
            _timeline.scale = _timeline.scales[_timeline.scaleIndex];

            _timeline.pixelPerSecond = _timeline.defaultPixelPerSecond * _timeline.scale;

            _this.renderTimeline();
            _this.renderScrollTimeline();

            _this.render();
        });

        $btnZoomDown.unbind().on('click', function () {
            if (_timeline.scaleIndex == _timeline.scales.length - 1) {
                return;
            }

            _timeline.scaleIndex++;
            _timeline.scale = _timeline.scales[_timeline.scaleIndex];

            _timeline.pixelPerSecond = _timeline.defaultPixelPerSecond * _timeline.scale;

            _this.renderTimeline();
            _this.renderScrollTimeline();

            _this.render();
        });

        $zoomControl.append($btnZoomDown);
        $zoomControl.append($btnZoomUp);

        $footerRight.append($zoomControl);

        $footer.append($footerRight);

        return $footer;
    }

    renderPrepare() {
        const _this = this;
        const _config = _this.config;

        let $prepare = $('<div class="timeliner-prepare"></div>');

        let $itemGroupPrepare = $(`
            <div class="timeliner-label-group timeliner-label-group-prepare" style="display: none">
                <div class="timeliner-label-group-header">
                </div>
                <div class="timeliner-label-group-body">
                </div>
            </div>
        `);

        $prepare.append($itemGroupPrepare);

        let $itemPrepare = $(`
            <div class="timeliner-label-item timeliner-label-item-prepare" style="display: none">
                <button class="btn btn-expand-timeliner-group" type="button">
                    <i class="elo el-sm el-caret-right el-animation"></i>
                </button>

                <p class="group-label"></p>
                <h6 class="subtitle-sm group-label"></h6>

                <div class="btn-group">
                    <button class="btn btn-sm btn-timeliner-action btn-add-action" type="button">
                        <i class="elo el-plus"></i>
                    </button>
                    <button class="btn btn-sm btn-timeliner-action btn-play-audio" data-bs-toggle="dropdown" type="button">
                        <i class="els el-play"></i>
                    </button>
                    <ul class="dropdown-menu dropdown-menu-play"></ul>
                    <button class="btn btn-sm btn-timeliner-action btn-edit" data-bs-toggle="dropdown" type="button">
                        <i class="elo el-pencil"></i>
                    </button>
                    <ul class="dropdown-menu dropdown-menu-edit"></ul>
                    <button class="btn btn-sm btn-timeliner-action btn-remove" data-bs-toggle="dropdown" type="button">
                        <i class="elo el-trash"></i>
                    </button>
                    <ul class="dropdown-menu dropdown-menu-remove"></ul>
                    <button class="btn btn-sm btn-timeliner-action btn-more" data-bs-toggle="dropdown" type="button">
                        <i class="elo el-ellipsis-v"></i>
                    </button>
                    <ul class="dropdown-menu dropdown-menu-more">
                        <li>
                            <a href="#" class="dropdown-item btn-ungroup">
                                ${lang['010116_5']}
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        `);

        $prepare.append($itemPrepare);

        let $layerGroupPrepare = $(`
            <div class="timeliner-layer-group timeliner-layer-group-prepare" style="display: none">
                <div class="timeliner-layer-group-header">
                </div>
                <div class="timeliner-layer-group-body">
                </div>
            </div>
        `);

        $prepare.append($layerGroupPrepare);

        let $layerGroupItemPrepare = $('<div class="timeliner-layer-group-item timeliner-layer-group-item-prepare" style="display: none"></div>');

        $prepare.append($layerGroupItemPrepare);

        let $layerTimelineFrame = $(`
            <div class="timeline-layer-frame timeline-layer-frame-prepare" style="display: none">
                <div class="timeline-layer-frame-inner"></div>
            </div>
        `);

        $prepare.append($layerTimelineFrame);

        let audio = document.createElement('audio');
        audio.controls = false;
        audio.autoplay = false;
        // audio.src = null;

        audio.onpause = () => {
            $(_this.element)
                .find('.timeliner-label-item')
                .each(function () {
                    $(this).find('.btn-play-audio i').removeClass('elo el-pause').addClass('els el-play');
                });
        };

        audio.onended = () => {
            $(_this.element)
                .find('.timeliner-label-item')
                .each(function () {
                    if ($(this).data('id') == _this.layerPlayingAudio) {
                        $(this).find('.btn-play-audio i').removeClass('elo el-pause').addClass('els el-play');
                    }
                });
        };

        _this.audio = audio;

        $prepare.append($(audio));

        return $prepare;
    }

    async render() {
        const _this = this;
        const _config = _this.config;

        if (_config.events.onBeforeRender) {
            await _config.events.onBeforeRender();
        }

        let time = await _this.getLongestTimer();

        if (time > _config.timeline.duration) {
            _config.timeline.duration = time;

            return _this.prepare();
        }

        await _this.updateChildren();

        await _this.renderLabels();
        await _this.renderLayers();

        if (_config.events.onRendered) {
            await _config.events.onRendered();
        }

        $(_this.element)
            .find('.zyk-timeliner-inner')
            .unbind()
            .on('click', function (e) {
                if ($(e.target).parents('.timeliner-float-menu').length == 0) {
                    _this.removeFloatMenu();
                }

                if ($(_this.element).find('.timeline-layers-action').length > 0) {
                    $(_this.element).find('.timeline-layers-action').remove();
                }
            })
            .on('click', '.timeliner-media-add-condition', async function (e) {
                e.preventDefault();
                e.stopPropagation();

                let $floatMenu = $(this).parents('.timeliner-float-menu');
                let actionId = $floatMenu.data('action-id');

                _this.removeFloatMenu();

                if (_config.events.onAddMediaCondition && actionId) {
                    let layer = await _this.getLayerByActionId(actionId);

                    if (layer) {
                        let time = Number((_config.timeline.currentTime - layer.start).toFixed(1));

                        if (time < 0) {
                            time = 0;
                        }

                        _config.events.onAddMediaCondition(actionId, time);
                    }
                }
            })
            .on('click', '.timeliner-media-remove-condition', function (e) {
                e.preventDefault();
                e.stopPropagation();

                let $floatMenu = $(this).parents('.timeliner-float-menu');
                let conditionId = $floatMenu.data('condition-id');
                let actionId = $floatMenu.data('action-id');

                _this.removeFloatMenu();

                if (_config.events.onRemoveMediaCondition && conditionId) {
                    _config.events.onRemoveMediaCondition(conditionId, actionId);
                }
            });
    }

    updateChildren() {
        const _this = this;
        const _config = _this.config;

        if (Object.keys(_config.layers.data).length > 0) {
            for (let key in _config.layers.data) {
                let group = _config.layers.data[key];

                if (group.children.length > 0) {
                    for (let i = 0; i < group.children.length; i++) {
                        let layer = group.children[i];

                        if (!layer.parentId) {
                            layer.parentId = key;
                        }
                    }
                }
            }
        }
    }

    renderLabels() {
        const _this = this;
        const _config = _this.config;

        $(_this.element).find('.timeliner-labels').empty();

        if (Object.keys(_config.layers.data).length > 0) {
            let sortedGroups = [];

            for (let i = 0; i < Object.keys(_config.layers.data).length; i++) {
                let key = Object.keys(_config.layers.data)[i];
                let group = _config.layers.data[key];

                sortedGroups.push(group);
            }

            sortedGroups = sortedGroups.sort((a, b) => {
                return b.index - a.index;
            });

            for (let i = 0; i < sortedGroups.length; i++) {
                let group = sortedGroups[i];

                let $group = _this.getLabelGroup(group);
                $(_this.element).find('.timeliner-labels').append($group);

                $(_this.element)
                    .find('.timeliner-labels .timeliner-label-group')
                    .each(function () {
                        let groupId = $(this).data('id');

                        if (_this.openedGroup.indexOf(groupId) > -1) {
                            $(this).find('.timeliner-label-group-body').addClass('shown');

                            $(this).find('.btn-expand-timeliner-group i').addClass('el-rotate-90');
                        }
                    });
            }

            _this.initTimelineLabelsActions();
        }
    }

    renderLayers() {
        const _this = this;
        const _config = _this.config;

        $(_this.element).find('.timeliner-timeline-layers').empty();

        if (Object.keys(_config.layers.data).length > 0) {
            let sortedGroups = [];

            for (let i = 0; i < Object.keys(_config.layers.data).length; i++) {
                let key = Object.keys(_config.layers.data)[i];
                let group = _config.layers.data[key];

                sortedGroups.push(group);
            }

            sortedGroups = sortedGroups.sort((a, b) => {
                return a.index - b.index;
            });

            for (let i = 0; i < sortedGroups.length; i++) {
                let group = sortedGroups[i];

                let $layerGroup = _this.getLayerGroup(group);
                $(_this.element).find('.timeliner-timeline-layers').append($layerGroup);
            }

            $(_this.element)
                .find('.timeliner-timeline-layers .timeliner-layer-group')
                .each(function () {
                    let groupId = $(this).data('linked-id');

                    if (_this.openedGroup.indexOf(groupId) > -1) {
                        $(this).find('.timeliner-layer-group-body').addClass('shown');
                    }
                });
        }
    }

    getLabelGroup(group) {
        const _this = this;
        const _config = _this.config;
        const _timeline = _config.timeline;

        let $group = $(_this.element).find('.timeliner-label-group-prepare').clone().show();
        $group.removeClass('timeliner-label-group-prepare');

        let $groupLabel = $(_this.element).find('.timeliner-label-item-prepare').clone().show();
        $groupLabel.removeClass('timeliner-label-item-prepare');

        $group.data('id', group.id);

        $groupLabel.find('.btn-play-audio').remove();
        $groupLabel.find('.dropdown-menu-play').remove();

        $groupLabel.find('.btn-more').remove();
        $groupLabel.find('.dropdown-menu-more').remove();

        $groupLabel.find('p.group-label').remove();
        $groupLabel.find('h6.group-label').text(group.label);

        if (group.children.length > 0) {
            $group.find('.timeliner-label-group-body').empty();

            group.children = group.children.sort((a, b) => {
                return b.index - a.index;
            });

            for (let j = 0; j < group.children.length; j++) {
                let child = group.children[j];

                let $groupItem = _this.getLabelGroupItem(child);

                $group.find('.timeliner-label-group-body').append($groupItem);

                $group.find('.timeliner-label-group-body').sortable({
                    items: '.timeliner-label-item',
                    placeholder: 'timeliner-label-item-placeholder',
                    stop: () => {
                        for (let i = 0; i < $group.find('.timeliner-label-group-body .timeliner-label-item').length; i++) {
                            let $item = $($group.find('.timeliner-label-group-body .timeliner-label-item')[i]);
                            let childId = $item.data('id');

                            let groupChild = group.children.find((c) => {
                                return c.id == childId;
                            });

                            if (groupChild) {
                                groupChild.index = (i - $group.find('.timeliner-label-group-body .timeliner-label-item').length) * -1;
                            }
                        }

                        _this.render();

                        _config.events.onStopSortLayerItem && _config.events.onStopSortLayerItem();
                    }
                });
            }
        }

        $group.find('.timeliner-label-group-header').append($groupLabel);

        $group
            .unbind()
            .on('click', function () {
                _this.activeGroup = group.id;
                _this.activeLayer = [];

                _this.updateActiveLayer();
            })
            .on('click', '.btn-expand-timeliner-group', function (e) {
                e.stopPropagation();

                let groupId = $(this).parents('.timeliner-label-group').data('id');

                if (_this.openedGroup.indexOf(groupId) == -1) {
                    _this.openedGroup.push(groupId);
                } else {
                    _this.openedGroup = _this.openedGroup.filter((id) => {
                        return id != groupId;
                    });
                }

                $(this).find('i').toggleClass('el-rotate-90');

                $group.find('.timeliner-label-group-body').toggleClass('shown');

                $(_this.element).find(`.timeliner-timeline-layers`).find(`.timeliner-layer-group[data-linked-id=${group.id}] .timeliner-layer-group-body`).toggleClass('shown');

                _this.updateTimelineLinerHeight();
            })
            .on('click', '.btn-add-action', function (e) {
                e.stopPropagation();

                _this.activeGroup = group.id;
                _this.activeLayer = [];

                if (_config.events.onAddLayer) {
                    _config.events.onAddLayer(group.id, _timeline.currentTime);
                }
            })
            .on('click', '.btn-edit', function (e) {
                e.stopPropagation();

                if (_config.events.onEditLayerGroup) {
                    _config.events.onEditLayerGroup(group.id);
                }
            })
            .on('click', '.btn-remove', function (e) {
                e.stopPropagation();

                showModalConfirm(lang['000200_93'], () => {
                    let childActions = [];

                    if (_config.layers.data[group.id] && _config.layers.data[group.id].children.length > 0) {
                        for (let i = 0; i < _config.layers.data[group.id].children.length; i++) {
                            let child = _config.layers.data[group.id].children[i];

                            if (child.timer && child.timer.length > 0) {
                                for (let j = 0; j < child.timer.length; j++) {
                                    childActions.push(child.timer[j].actionId);
                                }
                            }
                        }
                    }

                    let data = JSON.stringify(childActions);

                    delete _config.layers.data[group.id];

                    $(this).parents('.timeliner-label-group').remove();

                    $(_this.element).find(`.timeliner-timeline-layers .timeliner-layer-group[data-linked-id=${group.id}]`).remove();

                    if (_config.events.onRemoveLayerGroup) {
                        _config.events.onRemoveLayerGroup(data);
                    }

                    if (Object.keys(_config.layers.data).length == 0) {
                        let newGroupId = eldraw.util.randomId();

                        _config.layers.data[newGroupId] = {
                            index: 1,
                            id: newGroupId,
                            label: lang['010205_76'],
                            children: []
                        };

                        _this.updateLayers(_config.layers);
                    }
                });
            });

        return $group;
    }

    getLabelGroupItem(item) {
        const _this = this;
        const _config = _this.config;
        const _timeline = _config.timeline;

        let $groupItem = $(_this.element).find('.timeliner-label-item-prepare').clone().show();
        $groupItem.removeClass('timeliner-label-item-prepare');

        $groupItem.data('id', item.id);

        $groupItem.find('h6.group-label').remove();

        let label = '';

        if (item.timer && item.timer.length > 0) {
            for (let i = 0; i < item.timer.length; i++) {
                label += item.timer[i].label;

                if (i < item.timer.length - 1) {
                    label += ' | ';
                }
            }
        }

        $groupItem.find('p.group-label').text(label);

        $groupItem.find('.btn-expand-timeliner-group').remove();
        $groupItem.find('.btn-add-action').remove();

        if (item.timer && item.timer.length > 0) {
            if (item.timer.length == 1) {
                $groupItem.find('.btn-more').remove();
                $groupItem.find('.dropdown-menu-more').remove();
            }

            for (let i = 0; i < item.timer.length; i++) {
                let child = item.timer[i];

                if (child.actionType != 'audio' && child.actionType != 'video') {
                    $groupItem.find('.btn-play-audio').remove();
                    $groupItem.find('.dropdown-menu-play').remove();
                }

                let $edit = $('<li></li>');
                let $btnEdit = $(`
                    <a href="#" class="dropdown-item">
                        ${child.label}
                    </a>
                `);

                $btnEdit.unbind().on('click', function (e) {
                    e.stopPropagation();
                    e.preventDefault();

                    if (_config.events.onEditLayer) {
                        _config.events.onEditLayer(child.actionId);
                    }
                });

                $btnEdit.appendTo($edit);
                $groupItem.find('.dropdown-menu-edit').append($edit);

                let $remove = $('<li></li>');
                let $btnRemove = $(`
                    <a href="#" class="dropdown-item">
                        ${child.label}
                    </a>
                `);

                $btnRemove.unbind().on('click', function (e) {
                    e.stopPropagation();
                    e.preventDefault();

                    showModalConfirm(lang['000200_93'], () => {
                        if (item.timer && item.timer.length > 0) {
                            let index = item.timer.findIndex((a) => {
                                return (a.actionId = child.actionId);
                            });

                            if (index > -1) {
                                item.timer.splice(index, 1);
                            }

                            if (item.timer.length == 0) {
                                let group = _config.layers.data[item.parentId];

                                if (group && group.children && group.children.length > 0) {
                                    let indexLayer = group.children.findIndex((l) => {
                                        return l.id == item.id;
                                    });

                                    if (indexLayer > -1) {
                                        group.children.splice(indexLayer, 1);
                                    }
                                }
                            }
                        }

                        $(this).parents('.timeliner-label-item').remove();

                        $(_this.element)
                            .find('.timeline-layer-frame')
                            .each(function () {
                                if ($(this).data('action-id') == child.actionId) {
                                    $(this).parent().remove();
                                }
                            });

                        if (_config.layers.data[item.parentId].children.length == 0) {
                            $(_this.element).find(`.timeliner-layer-group[data-linked-id="${item.parentId}"]`).find('.timeliner-layer-group-header .timeliner-layer-group-item').empty();
                        }

                        if (_config.events.onRemoveLayer) {
                            _config.events.onRemoveLayer(child.actionId);
                        }
                    });
                });

                $btnRemove.appendTo($remove);
                $groupItem.find('.dropdown-menu-remove').append($remove);

                let $play = $('<li></li>');
                let $btnPlay = $(`
                    <a href="#" class="dropdown-item">
                        ${child.label}
                    </a>
                `);

                $btnPlay.unbind().on('click', function (e) {
                    e.preventDefault();

                    if ($(this).parents('.dropdown-menu').prev().find('i').hasClass('el-play')) {
                        if (child.actionType == 'audio') {
                            if (_this.audio.src) {
                                _this.pauseAudio();
                            }

                            $(_this.element)
                                .find('.timeliner-label-item')
                                .each(function () {
                                    $(this).find('.btn-play-audio i').removeClass('elo el-pause').addClass('els el-play');
                                });

                            $(this).parents('.dropdown-menu').prev().find('i').removeClass('els el-play').addClass('elo el-pause');

                            _this.layerPlayingAudio = item.id;

                            if (_timeline.currentTime < child.start || _timeline.currentTime >= child.end) {
                                _this.moveTimelinerLinerToTime(child.start);
                                _timeline.currentTime = child.start;
                            }

                            if (_config.events.onRequestPlayAudioUrl) {
                                _config.events.onRequestPlayAudioUrl(child.actionId);
                            }
                        } else if (child.actionType == 'video') {
                            if (_this.video) {
                                _this.pauseVideo();
                            }

                            $(_this.element)
                                .find('.timeliner-label-item')
                                .each(function () {
                                    $(this).find('.btn-play-audio i').removeClass('elo el-pause').addClass('els el-play');
                                });

                            $(this).parents('.dropdown-menu').prev().find('i').removeClass('els el-play').addClass('elo el-pause');

                            _this.layerPlayingVideo = item.id;

                            if (_timeline.currentTime < child.start || _timeline.currentTime >= child.end) {
                                _this.moveTimelinerLinerToTime(child.start);
                                _timeline.currentTime = child.start;
                            }

                            if (_config.events.onRequestPlayVideoUrl) {
                                _config.events.onRequestPlayVideoUrl(child.actionId);
                            }
                        }
                    } else {
                        $(this).parents('.dropdown-menu').prev().find('i').removeClass('elo el-pause').addClass('els el-play');

                        if (child.actionType == 'audio') {
                            _this.pauseAudio();
                        } else if (child.actionType == 'video') {
                            _this.pauseVideo();
                        }
                    }
                });

                $btnPlay.appendTo($play);
                $groupItem.find('.dropdown-menu-play').append($play);
            }
        }

        $groupItem
            .unbind()
            .on('click', function (e) {
                e.stopPropagation();

                if ($(_this.element).find('.timeline-layers-action').length > 0) {
                    $(_this.element).find('.timeline-layers-action').remove();
                }

                _this.activeGroup = null;

                if (zykKeys.shiftDown) {
                    if (_this.activeLayer.indexOf(item.id) == -1) {
                        _this.activeLayer.push(item.id);
                    } else {
                        _this.activeLayer = _this.activeLayer.filter((id) => {
                            return id != item.id;
                        });
                    }
                } else {
                    _this.activeLayer = [item.id];
                }

                _this.updateActiveLayer();
            })
            .on('contextmenu', function (e) {
                e.preventDefault();
                e.stopPropagation();

                let $itemClick;

                if ($(e.target).hasClass('timeliner-label-item')) {
                    $itemClick = $(this);
                } else {
                    $itemClick = $(e.target).parents('.timeliner-label-item');
                }

                if ($(_this.element).find('.timeline-layers-action').length > 0) {
                    $(_this.element).find('.timeline-layers-action').remove();
                }

                if (_this.activeLayer.length > 1) {
                    let menuAction = document.createElement('div');
                    $(menuAction).addClass('timeline-layers-action');

                    let $a = $(`<a href="#">${lang['010116_7']}</a>`);

                    $a.unbind().on('click', function (e) {
                        e.preventDefault();

                        $(menuAction).remove();

                        _this.groupLayers();
                    });

                    $(menuAction).append($a);

                    $(_this.element).find('.zyk-timeliner-wrapper').append($(menuAction));

                    Popper.createPopper($itemClick[0], menuAction, {
                        placement: 'top-end',
                        modifiers: [
                            {
                                name: 'flip',
                                enabled: true,
                                options: {
                                    // boundary: _this.config.boundary
                                }
                            }
                        ]
                    });
                }
            })
            .on('click', '.btn-ungroup', function (e) {
                e.stopPropagation();

                let group = _config.layers.data[item.parentId];

                if (group) {
                    let target = group.children.find((l) => {
                        return l.id == item.id;
                    });

                    if (target) {
                        let timers = target.timer;

                        for (let i = 0; i < timers.length; i++) {
                            let timer = timers[i];

                            let layer = {
                                id: eldraw.util.randomId(),
                                timer: [
                                    {
                                        actionId: timer.actionId,
                                        label: timer.label,
                                        actionType: timer.actionType,
                                        objectId: timer.objectId,
                                        start: timer.start,
                                        end: timer.end
                                    }
                                ]
                            };

                            _this.addLayer(layer, item.parentId);
                        }

                        _this.removeLayer(item.id);

                        _this.render();
                    }
                }
            });

        return $groupItem;
    }

    getLayerGroup(group) {
        const _this = this;
        const _config = _this.config;
        const _timeline = _config.timeline;

        let $group = $(_this.element).find('.timeliner-layer-group-prepare').clone().show();
        $group.removeClass('timeliner-layer-group-prepare');

        $group.css({
            width: _timeline.duration * _timeline.pixelPerSecond
        });

        let $groupLabel = $(_this.element).find('.timeliner-layer-group-item-prepare').clone().show();
        $groupLabel.removeClass('timeliner-layer-group-item-prepare');

        $group.find('.timeliner-layer-group-header').append($groupLabel);

        $group.attr('data-linked-id', group.id);

        if (group.children.length > 0) {
            $group.find('.timeliner-layer-group-body').empty();

            let groupTimer = _this.getGroupTimer(group.id);

            if (groupTimer) {
                let timerDuration = groupTimer.end - groupTimer.start;

                if (timerDuration < 0) {
                    timerDuration = 0;
                }

                let $frame = $(_this.element).find('.timeline-layer-frame-prepare').clone().show();
                $frame.removeClass('timeline-layer-frame-prepare');

                $frame.data('id', group.id);

                $frame.css({
                    width: timerDuration * _timeline.pixelPerSecond,
                    left: groupTimer.start * _timeline.pixelPerSecond
                });

                let originStartTime;

                $frame
                    .unbind()
                    .on('dblclick', function () {})
                    .draggable({
                        containment: 'parent',
                        grid: [_timeline.pixelPerSecond / (_timeline.step / _timeline.scale), 0],
                        axis: 'x',
                        start: (event, ui) => {
                            originStartTime = Number((Math.ceil(ui.position.left) / _timeline.pixelPerSecond).toFixed(1));
                        },
                        drag: (event, ui) => {
                            let newStartTime = Number((Math.ceil(ui.position.left) / _timeline.pixelPerSecond).toFixed(1));
                            let newDuration = Number(($(ui.helper[0]).width() / _timeline.pixelPerSecond).toFixed(1));
                            let newEndTime = Number((newStartTime + newDuration).toFixed(1));

                            $(_this.element).find('.timeline-layer-status').text(`${_config.labels.start}: ${newStartTime} | ${_config.labels.duration}: ${newDuration} | ${_config.labels.end}: ${newEndTime}`);
                        },
                        stop: (event, ui) => {
                            let newStartTime = Number((Math.ceil(ui.position.left) / _timeline.pixelPerSecond).toFixed(1));
                            let newDuration = Number(($(ui.helper[0]).width() / _timeline.pixelPerSecond).toFixed(1));
                            let newEndTime = Number((newStartTime + newDuration).toFixed(1));
                            let layerGroupId = $(ui.helper[0]).data('id');
                            let group = _config.layers.data[layerGroupId];

                            $(_this.element).find('.timeline-layer-status').text('');

                            groupTimer = [newStartTime, newEndTime];

                            let offsetTime = Number((newStartTime - originStartTime).toFixed(1));

                            if (_config.layers.data[layerGroupId] && _config.layers.data[layerGroupId].children.length > 0) {
                                for (let i = 0; i < _config.layers.data[layerGroupId].children.length; i++) {
                                    let child = _config.layers.data[layerGroupId].children[i];

                                    if (child.timer && child.timer.length > 0) {
                                        for (let j = 0; j < child.timer.length; j++) {
                                            let timer = child.timer[j];

                                            timer.start = Number((timer.start + offsetTime).toFixed(1));
                                            timer.end = Number((timer.end + offsetTime).toFixed(1));

                                            timer.duration = Number((timer.end - timer.start).toFixed(1));

                                            let data = {
                                                actionId: timer.actionId,
                                                start: timer.start,
                                                duration: timer.duration,
                                                end: timer.end
                                            };

                                            if (_config.events.onUpdateFrame) {
                                                _config.events.onUpdateFrame(data);
                                            }
                                        }
                                    }
                                }
                            }

                            $(ui.helper[0])
                                .parents('.timeliner-layer-group')
                                .find('.timeliner-layer-group-body .timeliner-layer-group-item')
                                .each(function () {
                                    let $frame = $(this).find('.timeline-layer-frame');
                                    let left = $frame.position().left;

                                    $frame.css({
                                        left: left + offsetTime * _timeline.pixelPerSecond
                                    });
                                });

                            _config.events.onUpdateGroupFrame && _config.events.onUpdateGroupFrame(group);
                        }
                    });

                $group.find('.timeliner-layer-group-header .timeliner-layer-group-item').append($frame);
            }

            group.children = group.children.sort((a, b) => {
                return b.index - a.index;
            });

            for (let j = 0; j < group.children.length; j++) {
                let child = group.children[j];

                let $groupItem = _this.getLayerGroupItem(child);

                $group.find('.timeliner-layer-group-body').append($groupItem);
            }
        }

        return $group;
    }

    getLayerGroupItem(item) {
        const _this = this;
        const _config = _this.config;
        const _timeline = _config.timeline;

        let $groupItem = $(_this.element).find('.timeliner-layer-group-item-prepare').clone().show();
        $groupItem.removeClass('timeliner-layer-group-item-prepare');

        if (item.timer && item.timer.length > 0) {
            for (let i = 0; i < item.timer.length; i++) {
                let timer = item.timer[i];

                let timerDuration = Number((timer.end - timer.start).toFixed(1));

                if (timerDuration < 0) {
                    timerDuration = 0;
                }

                let $frame = $(_this.element).find('.timeline-layer-frame-prepare').clone().show();
                $frame.removeClass('timeline-layer-frame-prepare');

                $frame.data('action-id', timer.actionId);
                $frame.data('id', item.id);

                if (timer.actionType == 'object') {
                    $frame.addClass('frame-object');
                } else if (timer.actionType == 'audio') {
                    $frame.addClass('frame-audio');
                } else if (timer.actionType == 'video') {
                    $frame.addClass('frame-video');
                } else if (timer.actionType == 'slide') {
                    $frame.addClass('frame-slide');
                } else if (timer.actionType == 'object-non-duration') {
                    $frame.addClass('frame-object-non-duration');
                } else if (timer.actionType == 'audio-non-duration') {
                    $frame.addClass('frame-audio-non-duration');
                } else if (timer.actionType == 'video-non-duration') {
                    $frame.addClass('frame-video-non-duration');
                } else if (timer.actionType == 'slide-non-duration') {
                    $frame.addClass('frame-slide-non-duration');
                }

                $frame.css({
                    width: timerDuration * _timeline.pixelPerSecond,
                    left: timer.start * _timeline.pixelPerSecond
                });

                if (timer.actionType == 'video' || timer.actionType == 'audio') {
                    if (timer.conditions && timer.conditions.length > 0) {
                        for (let j = 0; j < timer.conditions.length; j++) {
                            let condition = timer.conditions[j];
                            let $condition = $('<div class="timeline-media-condition-marker"></div>');
                            $condition.data('condition-id', condition.conditionId);

                            let left = (condition.time / (timer.end - timer.start)) * 100;

                            $condition.css({
                                left: `${left}%`
                            });

                            let conditionLabel = lang['010216_217'];

                            if (timer.actionType == 'video') {
                                conditionLabel = conditionLabel.replaceAll('!!MEDIA!!', `${action_sheet.getVideoNameByMediaId(timer.objectId)}`);
                            } else if (timer.actionType == 'audio') {
                                conditionLabel = conditionLabel.replaceAll('!!MEDIA!!', `${action_sheet.getAudioNameByMediaId(timer.objectId)}`);
                            }

                            conditionLabel = conditionLabel.replaceAll('!!TIME!!', condition.time);
                            conditionLabel += 's';

                            $condition
                                .unbind()
                                .tooltip({
                                    title: conditionLabel,
                                    trigger: 'manual'
                                })
                                .on('mouseenter', function () {
                                    $(this).tooltip('show');
                                })
                                .on('mouseleave', function () {
                                    $(this).tooltip('hide');
                                })
                                .on('click', function (e) {
                                    e.stopPropagation();

                                    $(this).tooltip('hide');

                                    if (_config.events.onSelectMediaCondition) {
                                        _config.events.onSelectMediaCondition(condition.conditionId);
                                    }
                                })
                                .on('contextmenu', function (e) {
                                    e.preventDefault();
                                    e.stopPropagation();

                                    _this.removeFloatMenu();

                                    let $floatMenu;

                                    if (timer.actionType == 'video') {
                                        $floatMenu = $(_this.element).find('.float-menu-video-condition');

                                        $floatMenu.css({
                                            top: e.clientY - $(_this.element).find('.timeliner-wrapper').offset().top,
                                            left: e.clientX
                                        });

                                        $floatMenu.data('condition-id', condition.conditionId);
                                        $floatMenu.data('action-id', timer.actionId);
                                        $floatMenu.show();
                                    }
                                });

                            $frame.find('.timeline-layer-frame-inner').append($condition);
                        }
                    }
                }

                $frame
                    .unbind()
                    .on('contextmenu', function (e) {
                        e.preventDefault();
                        e.stopPropagation();

                        _this.removeFloatMenu();

                        let $floatMenu;

                        if (timer.actionType == 'video' || timer.actionType == 'audio') {
                            $floatMenu = $(_this.element).find('.float-menu-video');

                            $floatMenu.css({
                                top: e.clientY - $(_this.element).find('.timeliner-wrapper').offset().top,
                                left: e.clientX
                            });

                            $floatMenu.data('action-id', timer.actionId);
                            $floatMenu.show();
                        }
                    })
                    .on('click', function (e) {
                        e.stopPropagation();

                        _this.activeGroup = null;
                        _this.activeLayer = [timer.id];

                        _this.updateActiveLayer();
                    })
                    .on('dblclick', function (e) {
                        e.stopPropagation();

                        let actionId = $(this).data('action-id');

                        if (_config.events.onDblClickFrame) {
                            _config.events.onDblClickFrame(actionId);
                        }
                    })
                    .resizable({
                        containment: 'parent',
                        grid: _timeline.pixelPerSecond / _timeline.step,
                        handles: 'e,w',
                        start: (event, ui) => {},
                        resize: (event, ui) => {
                            if ($(ui.helper[0]).hasClass('frame-audio') || $(ui.helper[0]).hasClass('frame-video') || $(ui.helper[0]).hasClass('frame-object-non-duration') || $(ui.helper[0]).hasClass('frame-audio-non-duration') || $(ui.helper[0]).hasClass('frame-video-non-duration') || $(ui.helper[0]).hasClass('frame-slide-non-duration')) {
                                ui.size.width = ui.originalSize.width;
                            }

                            ui.size.height = ui.originalSize.height;

                            let newStartTime = Number((Math.ceil(ui.position.left) / _timeline.pixelPerSecond).toFixed(1));
                            let newDuration = Number(($(ui.helper[0]).width() / _timeline.pixelPerSecond).toFixed(1));
                            let newEndTime = Number((newStartTime + newDuration).toFixed(1));

                            $(_this.element).find('.timeline-layer-status').text(`${_config.labels.start}: ${newStartTime} | ${_config.labels.duration}: ${newDuration} | ${_config.labels.end}: ${newEndTime}`);
                        },
                        stop: (event, ui) => {
                            let newStartTime = Number((Math.ceil(ui.position.left) / _timeline.pixelPerSecond).toFixed(1));
                            let newDuration = Number(($(ui.helper[0]).width() / _timeline.pixelPerSecond).toFixed(1));
                            let newEndTime = Number((newStartTime + newDuration).toFixed(1));
                            let layerGroupId = $(ui.helper[0]).closest('.timeliner-layer-group').data('linked-id');
                            let id = $(ui.helper[0]).data('action-id');
                            let layerId = $(ui.helper[0]).data('id');

                            $(_this.element).find('.timeline-layer-status').text('');

                            if (_config.layers.data[layerGroupId] && _config.layers.data[layerGroupId].children.length > 0) {
                                let layer = _config.layers.data[layerGroupId].children.find((l) => {
                                    return l.id == layerId;
                                });

                                if (layer && layer.timer && layer.timer.length > 0) {
                                    let timer = layer.timer.find((t) => {
                                        return t.actionId == id;
                                    });

                                    if (timer) {
                                        timer.start = newStartTime;
                                        timer.end = newEndTime;
                                    }
                                }
                            }

                            let data = {
                                actionId: id,
                                start: newStartTime,
                                duration: newDuration,
                                end: newEndTime
                            };

                            if (_config.events.onUpdateFrame) {
                                _config.events.onUpdateFrame(data);
                            }
                        }
                    })
                    .draggable({
                        containment: 'parent',
                        grid: [_timeline.pixelPerSecond / (_timeline.step / _timeline.scale), 0],
                        axis: 'x',
                        start: (event, ui) => {
                            if ($('body').find('.tooltip').length > 0) {
                                $('body').find('.tooltip').remove();
                            }
                        },
                        drag: (event, ui) => {
                            let newStartTime = Number((Math.ceil(ui.position.left) / _timeline.pixelPerSecond).toFixed(1));
                            let newDuration = Number(($(ui.helper[0]).width() / _timeline.pixelPerSecond).toFixed(1));
                            let newEndTime = Number((newStartTime + newDuration).toFixed(1));

                            $(_this.element).find('.timeline-layer-status').text(`${_config.labels.start}: ${newStartTime} | ${_config.labels.duration}: ${newDuration} | ${_config.labels.end}: ${newEndTime}`);
                        },
                        stop: (event, ui) => {
                            let newStartTime = Number((Math.ceil(ui.position.left) / _timeline.pixelPerSecond).toFixed(1));
                            let newDuration = Number(($(ui.helper[0]).width() / _timeline.pixelPerSecond).toFixed(1));
                            let newEndTime = Number((newStartTime + newDuration).toFixed(1));
                            let layerGroupId = $(ui.helper[0]).closest('.timeliner-layer-group').data('linked-id');
                            let id = $(ui.helper[0]).data('action-id');
                            let layerId = $(ui.helper[0]).data('id');

                            $(_this.element).find('.timeline-layer-status').text('');

                            if (_config.layers.data[layerGroupId] && _config.layers.data[layerGroupId].children.length > 0) {
                                let layer = _config.layers.data[layerGroupId].children.find((l) => {
                                    return l.id == layerId;
                                });

                                if (layer && layer.timer && layer.timer.length > 0) {
                                    let timer = layer.timer.find((t) => {
                                        return t.actionId == id;
                                    });

                                    if (timer) {
                                        timer.start = newStartTime;
                                        timer.end = newEndTime;
                                    }
                                }
                            }

                            let data = {
                                actionId: id,
                                start: newStartTime,
                                duration: newDuration,
                                end: newEndTime
                            };

                            if (_config.events.onUpdateFrame) {
                                _config.events.onUpdateFrame(data);
                            }
                        }
                    });

                $groupItem.append($frame);
            }
        }

        return $groupItem;
    }

    createTimelineMarker($timeline, currentTime = false) {
        const _this = this;
        const _config = _this.config;
        const _timeline = _config.timeline;

        if (!currentTime) currentTime = _timeline.currentTime;

        let marker = document.createElement('div');

        $(marker).addClass('timeliner-current-marker');

        $timeline.parent().append($(marker));

        $(marker).css({
            left: currentTime * _timeline.pixelPerSecond
        });

        return $(marker);
    }

    createTimelineLiner($timeline, currentTime = false) {
        const _this = this;
        const _config = _this.config;
        const _timeline = _config.timeline;

        if (!currentTime) currentTime = _timeline.currentTime;

        if ($timeline.parent().find('.timeliner-current-liner').length > 0) {
            $timeline.parent().find('.timeliner-current-liner').remove();
        }

        let liner = document.createElement('div');

        $(liner).addClass('timeliner-current-liner');

        $timeline.parent().append($(liner));

        $(liner).css({
            left: currentTime * _timeline.pixelPerSecond
        });

        _this.updateTimelineLinerHeight();

        return $(liner);
    }

    moveTimelinerLinerToTime(time) {
        console.log(time);
        const _this = this;
        const _config = _this.config;
        const _timeline = _config.timeline;

        const $liner = $(_this.element).find('.timeliner-current-liner');
        const $marker = $(_this.element).find('.timeliner-current-marker');

        $(_this.element)
            .find('.timeliner-timeline-layers')
            .scrollLeft(time * _timeline.pixelPerSecond);

        $liner.css({
            left: 0
            // left: time * _timeline.pixelPerSecond - $(_this.element).find('.timeliner-timeline-layers').scrollLeft()
        });

        $marker.css({
            left: 0
            // left: time * _timeline.pixelPerSecond - $(_this.element).find('.timeliner-timeline-layers').scrollLeft()
        });
    }

    initMainTimelineActions() {
        const _this = this;
        const _config = _this.config;
        const _timeline = _config.timeline;

        let $timeline = $(_this.element).find('.timeliner-main-timeline');

        let $currenMarker = _this.createTimelineMarker($timeline, _timeline.currentTime);
        let $currenLiner = _this.createTimelineLiner($timeline, _timeline.currentTime);

        $timeline.unbind().on('click', function (e) {
            let left = e.pageX - $timeline.offset().left;
            let currentTime = Number((Math.ceil(left) / _timeline.pixelPerSecond).toFixed(1));

            $currenMarker.css({
                left: currentTime * _timeline.pixelPerSecond - $(_this.element).find('.timeliner-timeline-layers').scrollLeft()
            });

            $currenLiner.css({
                left: currentTime * _timeline.pixelPerSecond - $(_this.element).find('.timeliner-timeline-layers').scrollLeft()
            });

            _timeline.currentTime = currentTime;

            $currenMarker.draggable({
                containment: 'parent',
                axis: 'x',
                start: () => {},
                drag: (event, ui) => {
                    // let newCurrentTime = Number((Math.ceil(ui.position.left) / _timeline.pixelPerSecond).toFixed(1));
                    $currenLiner.css({
                        left: ui.position.left
                    });
                },
                stop: (event, ui) => {
                    let newCurrentTime = Number((Math.ceil(ui.position.left + $(_this.element).find('.timeliner-timeline-layers').scrollLeft()) / _timeline.pixelPerSecond).toFixed(1));

                    $currenMarker.css({
                        left: newCurrentTime * _timeline.pixelPerSecond - $(_this.element).find('.timeliner-timeline-layers').scrollLeft()
                    });

                    $currenLiner.css({
                        left: newCurrentTime * _timeline.pixelPerSecond - $(_this.element).find('.timeliner-timeline-layers').scrollLeft()
                    });

                    _timeline.currentTime = newCurrentTime;
                }
            });
        });
    }

    initTimelineLabelsActions() {
        const _this = this;
        const _config = _this.config;

        let $labelsWrapper = $(_this.element).find('.timeliner-labels-wrapper');
        let $labels = $(_this.element).find('.timeliner-labels');
        let $timeline = $(_this.element).find('.timeliner-timeline-layers');

        $labelsWrapper.on('scroll', function (e) {
            let scrollTop = $(this).scrollTop();

            $timeline.scrollTop(scrollTop);
        });

        $timeline.on('scroll', function (e) {
            let scrollTop = $(this).scrollTop();

            $labels.scrollTop(scrollTop);
        });

        $labels.sortable({
            items: '.timeliner-label-group',
            placeholder: 'timeliner-label-group-placeholder',
            stop: () => {
                $labels.find('.timeliner-label-group').each(function (i) {
                    let groupId = $(this).data('id');

                    if (_config.layers.data[groupId]) {
                        _config.layers.data[groupId].index = i + 1;
                    }
                });

                _this.renderLayers();

                _config.events.onStopSortLayerGroup && _config.events.onStopSortLayerGroup();
            }
        });
    }

    updateTimelineLinerHeight() {
        const _this = this;

        let $liner = $(_this.element).find('.timeliner-current-liner');

        $liner.css({
            height: $(_this.element).find('.timeliner-wrapper-timeline')[0].scrollHeight - 12
        });
    }

    updateActiveLayer() {
        const _this = this;
        const _config = _this.config;

        $(_this.element).find('.timeliner-labels .timeliner-label-group').removeClass('active');
        $(_this.element).find('.timeliner-labels .timeliner-label-item').removeClass('active');

        $(_this.element).find('.timeliner-timeline-layers .timeliner-layer-group').removeClass('active');
        $(_this.element).find('.timeliner-timeline-layers .timeliner-layer-group .timeliner-layer-group-item').removeClass('active');

        if (_this.activeGroup) {
            $(_this.element)
                .find('.timeliner-labels .timeliner-label-group')
                .each(function () {
                    if ($(this).data('id') == _this.activeGroup) {
                        $(this).addClass('active');
                    }
                });

            $(_this.element)
                .find('.timeliner-timeline-layers .timeliner-layer-group')
                .each(function () {
                    if ($(this).data('linked-id') == _this.activeGroup) {
                        $(this).addClass('active');
                    }
                });
        }

        if (_this.activeLayer.length > 0) {
            $(_this.element)
                .find('.timeliner-labels .timeliner-label-group-body .timeliner-label-item')
                .each(function () {
                    if (_this.activeLayer.indexOf($(this).data('id')) > -1) {
                        $(this).addClass('active');
                    }
                });

            $(_this.element)
                .find('.timeliner-timeline-layers .timeliner-layer-group .timeliner-layer-group-item')
                .each(function () {
                    if (_this.activeLayer.indexOf($(this).find('.timeline-layer-frame').data('id')) > -1) {
                        $(this).addClass('active');
                    }
                });
        }
    }

    async groupLayers() {
        const _this = this;
        const _config = _this.config;

        let lastGroupId;
        let layers = [],
            min = 0,
            indexs = [],
            appendLayer;

        for (let i = 0; i < _this.activeLayer.length; i++) {
            let layerId = _this.activeLayer[i];

            let layer = await _this.getLayerById(layerId);

            if (layer) {
                if (!lastGroupId) {
                    lastGroupId = layer.parentId;

                    layers.push(layer);
                    indexs.push(layer.index);
                } else {
                    if (lastGroupId != layer.parentId) {
                        layers = [];
                        indexs = [];

                        if (_config.events.onSendMessage) {
                            let message = {
                                type: 'warning',
                                content: 'Layers are not in the same group'
                            };

                            _config.events.onSendMessage(message);
                        }
                        break;
                    } else {
                        lastGroupId = layer.parentId;

                        layers.push(layer);
                        indexs.push(layer.index);
                    }
                }
            }
        }

        min = Math.min(...indexs);

        let timers = [];
        let lastLayerType;

        if (layers.length > 0) {
            for (let i = 0; i < layers.length; i++) {
                let layer = layers[i];

                if (layer.index == min) {
                    appendLayer = layer;
                }

                if (!lastLayerType) {
                    if (layer.timer.length > 0) {
                        lastLayerType = layer.timer[0].actionType;
                        timers = timers.concat(layer.timer);
                    }
                } else {
                    if (lastLayerType != layer.timer[0].actionType) {
                        if (_config.events.onSendMessage) {
                            let message = {
                                type: 'warning',
                                content: 'Layers are not the same type'
                            };

                            _config.events.onSendMessage(message);
                        }
                    } else {
                        lastLayerType = layer.timer[0].actionType;
                        timers = timers.concat(layer.timer);
                    }
                }
            }

            if (timers.length > 0) {
                timers = timers.sort((a, b) => {
                    return a.start - b.start;
                });

                for (let i = 0; i < timers.length; i++) {
                    let timer = timers[i];

                    if (timers[i - 1]) {
                        let duration = Number((timer.end - timer.start).toFixed(1));

                        if (timer.start < timers[i - 1].end) {
                            timer.start = timers[i - 1].end;
                            timer.end = Number((timer.start + duration).toFixed(1));

                            let data = {
                                actionId: timer.actionId,
                                start: timer.start,
                                end: timer.end,
                                duration: duration
                            };

                            if (_config.events.onUpdateFrame) {
                                _config.events.onUpdateFrame(data);
                            }
                        }
                    }
                }
            }

            if (appendLayer) {
                appendLayer.timer = timers;
            }

            for (let i = 0; i < layers.length; i++) {
                let layer = layers[i];

                if (layer.id != appendLayer.id) {
                    await _this.removeLayer(layer.id);
                }
            }

            _this.render();
        }
    }

    getLayerById(id) {
        const _this = this;
        const _config = _this.config;

        return new Promise((resolve) => {
            let result = false;

            for (let key in _config.layers.data) {
                let group = _config.layers.data[key];

                if (group.children.length > 0) {
                    let layer = group.children.find((l) => {
                        return l.id == id;
                    });

                    if (layer) {
                        result = layer;
                    }
                }
            }

            resolve(result);
        });
    }

    getLayerByActionId(actionId) {
        const _this = this;
        const _config = _this.config;

        return new Promise((resolve) => {
            if (Object.keys(_config.layers.data).length > 0) {
                for (let key in _config.layers.data) {
                    let group = _config.layers.data[key];

                    if (group.children.length > 0) {
                        for (let i = 0; i < group.children.length; i++) {
                            let timer = group.children[i].timer;

                            if (timer && timer.length > 0) {
                                let child = timer.find((c) => {
                                    return c.actionId == actionId;
                                });

                                if (child) {
                                    resolve(child);
                                }
                            } else {
                                resolve(false);
                            }
                        }
                    } else {
                        resolve(false);
                    }
                }
            }
        });
    }

    getGroupTimer(groupId) {
        const _this = this;
        const _config = _this.config;

        let group = _config.layers.data[groupId];
        let timer = {};

        if (group) {
            let children = group.children;

            let start = [],
                end = [];

            for (let i = 0; i < children.length; i++) {
                let child = children[i];

                if (child.timer && child.timer.length > 0) {
                    for (let j = 0; j < child.timer.length; j++) {
                        start.push(child.timer[j].start);
                        end.push(child.timer[j].end);
                    }
                }
            }

            timer.start = Math.min(...start);
            timer.end = Math.max(...end);
        }

        return timer;
    }

    getLayerGroupHighestIndex() {
        const _this = this;
        const _config = _this.config;

        return new Promise((resolve) => {
            let index = 0;
            let indexs = [];

            if (Object.keys(_config.layers.data).length > 0) {
                for (let key in _config.layers.data) {
                    indexs.push(_config.layers.data[key].index);
                }

                index = Math.max(...indexs);
            }

            resolve(index + 1);
        });
    }

    getLayerHighestIndex(groupId) {
        const _this = this;
        const _config = _this.config;

        return new Promise((resolve) => {
            let indexs = [];
            let group = _config.layers.data[groupId];

            let index = 0;

            if (group.children.length > 0) {
                for (let i = 0; i < group.children.length; i++) {
                    let child = group.children[i];

                    indexs.push(child.index);
                }

                index = Math.max(...indexs);
            }

            resolve(index);
        });
    }

    getLongestTimer() {
        const _this = this;
        const _config = _this.config;
        const _timeline = _config.timeline;

        let time = _timeline.duration;
        let timeArr = [];

        return new Promise((resolve) => {
            if (Object.keys(_config.layers.data).length > 0) {
                for (let key in _config.layers.data) {
                    let group = _config.layers.data[key];

                    if (group.children.length > 0) {
                        for (let i = 0; i < group.children.length; i++) {
                            let layer = group.children[i];

                            if (layer.timer && layer.timer.length > 0) {
                                for (let j = 0; j < layer.timer.length; j++) {
                                    let timer = layer.timer[j];

                                    if (timer.end) {
                                        timeArr.push(timer.end);
                                    }
                                }
                            }
                        }
                    }
                }
            }

            if (timeArr.length > 0) {
                let max = Math.max(...timeArr);

                if (max > time) {
                    time = max;
                }
            }

            resolve(time);
        });
    }

    playTimeline(duration = false) {
        const _this = this;
        const _config = _this.config;
        const _timeline = _config.timeline;

        let $timeline = $(_this.element).find('.timeliner-main-timeline');

        let startTime, distance, currentLeft;

        if (!duration) {
            duration = (_timeline.duration - _timeline.currentTime) * 1000;
        } else {
            duration = duration * 1000;
        }

        distance = (duration / 1000) * _timeline.pixelPerSecond;
        currentLeft = _timeline.currentTime * _timeline.pixelPerSecond;

        function play(timestamp, $element, distance, duration) {
            var timestamp = timestamp || new Date().getTime();
            let runtime = timestamp - startTime;
            let progress = runtime / duration;

            progress = Math.min(progress, 1);

            let newLeft = currentLeft + distance * progress;

            $element.parent().find('.timeliner-current-marker').css({
                left: newLeft
            });

            $element.parent().find('.timeliner-current-liner').css({
                left: newLeft
            });

            _timeline.currentTime = newLeft / _timeline.pixelPerSecond;

            if (newLeft > $element.parent().width()) {
                let offsetLeft = newLeft - $element.parent().width();

                $element
                    .parent()
                    .find('.timeliner-current-marker')
                    .css({
                        left: newLeft - (offsetLeft + 100)
                    });

                $element
                    .parent()
                    .find('.timeliner-current-liner')
                    .css({
                        left: newLeft - (offsetLeft + 100)
                    });

                $(_this.element)
                    .find('.timeliner-main-timeline-wrapper')
                    .scrollLeft(offsetLeft + 100);

                $(_this.element)
                    .find('.timeliner-timeline-layers')
                    .scrollLeft(offsetLeft + 100);
            }

            $(_this.element).find('.timeliner-main-label').text(zykUtil.secToMin(_timeline.currentTime));

            if (runtime < duration) {
                _this.requestAnimation = requestAnimationFrame((timestamp) => {
                    play(timestamp, $element, distance, duration);
                });
            }
        }

        _this.requestAnimation = requestAnimationFrame((timestamp) => {
            startTime = timestamp || new Date().getTime();

            play(timestamp, $timeline, distance, duration);
        });
    }

    pauseTimeline() {
        const _this = this;

        cancelAnimationFrame(_this.requestAnimation);
    }

    stopTimeline() {
        const _this = this;
        const _config = _this.config;
        const _timeline = _config.timeline;

        _timeline.currentTime = 0;

        let $currenMarker = $(_this.element).find('.timeliner-current-marker');
        let $currenLiner = $(_this.element).find('.timeliner-current-liner');

        $currenMarker.css({
            left: 0 - $(_this.element).find('.timeliner-timeline-layers').scrollLeft()
        });

        $currenLiner.css({
            left: 0 - $(_this.element).find('.timeliner-timeline-layers').scrollLeft()
        });

        $(_this.element).find('.btn-play-timeliner').find('i').removeClass('elo el-pause').addClass('els el-play');

        $(_this.element).find('.timeliner-main-label').text(zykUtil.secToMin(0));

        cancelAnimationFrame(_this.requestAnimation);
    }

    async playAudio(audioUrl, actionId, newDuration) {
        const _this = this;
        const _config = _this.config;
        const _timeline = _config.timeline;

        let layer = await _this.getLayerByActionId(actionId);

        if (layer) {
            let duration = Number((layer.end - layer.start).toFixed(1));

            if (duration != newDuration) {
                duration = newDuration;

                layer.end = Number((layer.start + newDuration).toFixed(1));

                await _this.render();
            }

            if (_timeline.currentTime > layer.start) {
                duration = Number((layer.end - _timeline.currentTime).toFixed(1));
            }

            _this.playTimeline(duration);

            let audioCurrentTime = 0;

            if (_timeline.currentTime > layer.start) {
                audioCurrentTime = Number((_timeline.currentTime - layer.start).toFixed(1));
            }

            _this.audio.src = audioUrl;
            _this.audio.currentTime = audioCurrentTime;

            _this.audio.play();
        }
    }

    pauseAudio() {
        const _this = this;

        _this.pauseTimeline();
        _this.audio.pause();
    }

    async playVideo(video, actionId) {
        const _this = this;
        const _config = _this.config;
        const _timeline = _config.timeline;

        let layer = await _this.getLayerByActionId(actionId);

        if (layer) {
            let duration = Number((layer.end - layer.start).toFixed(1));

            if (duration != video.duration) {
                duration = video.duration;

                layer.end = Number((layer.start + video.duration).toFixed(1));

                await _this.render();
            }

            if (_timeline.currentTime > layer.start) {
                duration = Number((layer.end - _timeline.currentTime).toFixed(1));
            }

            let videoCurrentTime = 0;

            if (_timeline.currentTime > layer.start) {
                videoCurrentTime = Number((_timeline.currentTime - layer.start).toFixed(1));
            }

            let $videoWrapper = $(_this.element).find('.timeliner-video-preview').show();
            $videoWrapper.find('.preview-video').empty();

            if (_this.videoType != video.type) {
                _this.video = null;
            }

            if (video.type == zykVar.fileTypes.VIDEO) {
                if (!Hls) {
                    throw new Error('Hls is not defined');
                }

                $videoWrapper.find('.preview-video').show();
                $videoWrapper.find('.preview-video-youtube').hide();

                if (Hls.isSupported()) {
                    var hls = new Hls();

                    let videoDOM = document.createElement('video');
                    videoDOM.autoplay = true;
                    videoDOM.controls = false;
                    videoDOM.style.width = '100%';
                    videoDOM.currentTime = videoCurrentTime;

                    hls.attachMedia(videoDOM);
                    hls.on(Hls.Events.MEDIA_ATTACHED, function () {
                        hls.loadSource(video.url);
                    });

                    videoDOM.onseeked = function () {
                        videoDOM.play();
                    };

                    videoDOM.ontimeupdate = function (e) {};

                    videoDOM.onplay = function () {
                        _this.playTimeline(duration);
                    };

                    videoDOM.onpause = function () {
                        _this.pauseVideo();
                    };

                    videoDOM.onended = function () {
                        _this.pauseVideo();
                    };

                    _this.video = videoDOM;
                    _this.videoType = zykVar.fileTypes.VIDEO;

                    $videoWrapper.find('.preview-video').append(videoDOM);
                }
            } else if (video.type == zykVar.fileTypes.YOUTUBE) {
                if (!YT) {
                    throw new Error('Youtube API is not found');
                }

                $videoWrapper.find('.preview-video').hide();
                $videoWrapper.find('.preview-video-youtube').show();

                if (!_this.video) {
                    _this.video = new YT.Player('timelinerYoutube', {
                        height: '390',
                        width: '640',
                        videoId: video.url,
                        playerVars: {
                            controls: 0,
                            start: videoCurrentTime
                        },
                        events: {
                            onReady: function (event) {
                                event.target.playVideo();
                            },
                            onStateChange: function (event) {
                                switch (event.data) {
                                    case YT.PlayerState.PLAYING:
                                        _this.playTimeline(duration);
                                        break;
                                    case YT.PlayerState.PAUSED:
                                        _this.pauseVideo();
                                        break;
                                    case YT.PlayerState.ENDED:
                                        _this.pauseVideo();
                                        break;
                                    case YT.PlayerState.BUFFERING:
                                        break;
                                    case YT.PlayerState.CUED:
                                        break;
                                }
                            }
                        }
                    });
                    _this.videoType = zykVar.fileTypes.YOUTUBE;
                } else {
                    _this.video.loadVideoById({
                        videoId: video.url,
                        startSeconds: videoCurrentTime
                    });
                    _this.videoType = zykVar.fileTypes.YOUTUBE;
                }
            }
        }
    }

    pauseVideo() {
        const _this = this;

        _this.pauseTimeline();

        if (_this.videoType == zykVar.fileTypes.VIDEO) {
            _this.video.pause();
        } else if (_this.videoType == zykVar.fileTypes.YOUTUBE) {
            _this.video.pauseVideo();
        }
    }

    updateLayers(layers) {
        const _this = this;
        const _config = _this.config;

        if (!layers) {
            layers = {
                version: 1,
                data: {}
            };

            let newGroupId = eldraw.util.randomId();

            layers.data[newGroupId] = {
                index: 1,
                id: newGroupId,
                label: lang['010205_76'],
                children: []
            };
        }

        _config.layers = {};
        _config.layers = layers;

        _this.render();
    }

    exportLayers() {
        const _this = this;
        const _config = _this.config;

        return _config.layers;
    }

    addLayerGroup(group, callback = false) {
        const _this = this;
        const _config = _this.config;

        _config.layers.data[group.id] = group;

        _this.render();

        if (callback) {
            callback();
        }
    }

    updateLayerGroup(groupId, name, callback = false) {
        const _this = this;
        const _config = _this.config;

        let group = _config.layers.data[groupId];

        if (group) {
            group.label = name;
            _this.render();

            if (callback) {
                callback();
            }
        }
    }

    async addLayer(layer, groupId = false) {
        const _this = this;
        const _config = _this.config;

        if (!groupId) {
            groupId = _this.activeGroup;
        }

        if (groupId) {
            let newIndex = await _this.getLayerHighestIndex(groupId);

            if (_this.openedGroup.indexOf(groupId) == -1) {
                _this.openedGroup.push(groupId);
            }

            layer.index = newIndex + 1;

            if (_config.layers.data[groupId]) {
                _config.layers.data[groupId].children.push(layer);
            }

            _this.render();
        }
    }

    async removeLayer(id) {
        const _this = this;
        const _config = _this.config;

        let layer = await _this.getLayerById(id);

        if (layer) {
            let parent = _config.layers.data[layer.parentId];

            if (parent) {
                parent.children = parent.children.filter((l) => {
                    return l.id != id;
                });
            }
        }
    }

    removeFloatMenu() {
        const _this = this;

        if ($(_this.element).find('.timeliner-float-menu').data('action-id')) {
            $(_this.element).find('.timeliner-float-menu').removeData('action-id');
        }

        if ($(_this.element).find('.timeliner-float-menu').data('condition-id')) {
            $(_this.element).find('.timeliner-float-menu').removeData('condition-id');
        }

        $(_this.element).find('.timeliner-float-menu').hide();
    }

    async addConditionOnMedia(actionId, conditionId, time, callback = false) {
        const _this = this;

        let layer = await _this.getLayerByActionId(actionId);

        if (layer) {
            if (!layer.conditions) {
                layer.conditions = [];
            }

            let existed = layer.conditions.find((con) => {
                return con.time == time;
            });

            if (existed) {
                return;
            }

            layer.conditions.push({
                time: time,
                conditionId: conditionId
            });

            _this.render();

            if (callback) {
                callback();
            }
        }
    }

    async removeMediaCondition(conditionId, actionId, callback = false) {
        const _this = this;

        let layer = await _this.getLayerByActionId(actionId);

        if (layer) {
            $(_this.element)
                .find('.timeline-media-condition-marker')
                .each(function () {
                    if ($(this).data('condition-id') == conditionId) {
                        $(this).remove();
                    }
                });

            if (layer.conditions && layer.conditions.length > 0) {
                let index = layer.conditions.findIndex((con) => {
                    return con.conditionId == conditionId;
                });

                if (index > -1) {
                    layer.conditions.splice(index, 1);

                    if (callback) {
                        callback();
                    }
                }
            }
        }
    }
}

/*
=========================================================
ZYK DIALOG
=========================================================
*/

const DIALOG_NAME = 'zyk-dialog';
const DIALOG_EVENT_KEY = `${ZYK_DATA_KEY}.${DIALOG_NAME}`;

const DIALOG_EVENT = {
    CLICK: `click.${DIALOG_EVENT_KEY}`,
    SHOW: `show.${DIALOG_EVENT_KEY}`,
    SHOWN: `shown.${DIALOG_EVENT_KEY}`,
    HIDE: `hide.${DIALOG_EVENT_KEY}`,
    HIDDEN: `hidden.${DIALOG_EVENT_KEY}`
};

const DIALOG_CLASSES = {
    BUTTON_CLOSE: 'btn-close-zyk-dialog',
    DIALOG: 'zyk-dialog'
};

const DIALOG_SELECTOR = {
    BUTTON_CLOSE: `.${DIALOG_CLASSES.BUTTON_CLOSE}`,
    DIALOG: `.${DIALOG_CLASSES.DIALOG}`
};

const DIALOG_CONFIG_DEFAULT = {
    popper: {
        placement: 'bottom',
        offset: [0, 0],
        flip: true,
        boundary: 'viewport'
    }
};
class ZykDialog {
    constructor(element, target, config) {
        this.config = {
            ...DIALOG_CONFIG_DEFAULT,
            ...config
        };

        this.element = element;
        this.target = target;

        this.isShown = false;
        this.popper = null;

        this.prepare();
    }

    prepare() {
        const _this = this;
        let config = _this.config;

        if (!zykUtil.checkPopper()) {
            return;
        }

        let buttons = config.buttons;

        if (!buttons) {
            return;
        }

        for (let i = 0; i < Object.keys(buttons).length; i++) {
            let button = Object.keys(buttons)[i];

            $(_this.element)
                .find(button)
                .unbind()
                .on('click', function () {
                    if (buttons[button] && typeof buttons[button] == 'function') {
                        buttons[button]();
                    }
                });
        }

        $(document)
            .on(DIALOG_EVENT.CLICK, function (e) {
                if ($(e.target).parents(DIALOG_SELECTOR.DIALOG).length == 0 && $(e.target).parents(_this.target).length == 0 && !$(e.target).is($(_this.target))) {
                    _this.hide();
                }
            })
            .on(DIALOG_EVENT.CLICK, DIALOG_SELECTOR.BUTTON_CLOSE, function (e) {
                e.preventDefault();
                e.stopPropagation();

                _this.hide();
            });
    }

    toggle() {
        const _this = this;

        return _this.isShown ? _this.hide() : _this.show();
    }

    show() {
        const _this = this;

        _this.popper = Popper.createPopper($(_this.target)[0], $(_this.element)[0], _this.getPopperConfig());

        $(_this.element).trigger(DIALOG_EVENT.SHOW);

        $(_this.element).addClass('show');
        _this.isShown = true;

        $(_this.element).trigger(DIALOG_EVENT.SHOWN);
    }

    hide() {
        const _this = this;

        $(_this.element).trigger(DIALOG_EVENT.HIDE);

        $(_this.element).removeClass('show');
        _this.isShown = false;
        _this.popper = null;

        $(_this.element).trigger(DIALOG_EVENT.HIDDEN);
    }

    getOffset() {
        const _this = this;

        let offset = _this.config.offset;

        if (typeof offset == 'string') {
            offset.replace(',', ' ');
            offset = offset.split(',').map(Number);
        }

        return offset;
    }

    getPopperConfig() {
        const _this = this;

        let popperConfig = {
            placement: _this.config.popper.placement,
            modifiers: [
                {
                    name: 'offset',
                    options: {
                        offset: _this.getOffset()
                    }
                },
                {
                    name: 'flip',
                    enabled: _this.config.popper.flip,
                    options: {
                        boundary: _this.config.boundary
                    }
                }
            ]
        };

        return popperConfig;
    }
}

/*
=========================================================
MENU GROUP
=========================================================
*/

class MenuGroup {
    constructor(target, options) {
        let defaultOptions = {
            classes: {
                header: 'menu-group-header',
                body: 'menu-group-body',
                item: 'menu-group-item',
                link: 'menu-group-link',
                collapse: 'menu-group-collapse',
                parent: 'menu-group-parent',
                child: 'menu-group-child',
                iconRotate: 'el-rotate-90',
                active: 'active'
            },
            attribute: false,
            onSelectItem: false
        };

        this.config = {
            ...defaultOptions,
            ...options
        };

        this.element = target;
        this.body = $(this.element).find(`.${this.config.classes.body}`)[0];

        this.init();
    }

    init() {
        const _this = this;

        $(_this.element)
            .find(`.${_this.config.classes.collapse}`)
            .unbind()
            .on('click', function (e) {
                e.preventDefault();

                $(this).closest(`.${_this.config.classes.parent}`).next().slideToggle();
                $(this).find('i').toggleClass(_this.config.classes.iconRotate);
            });

        $(_this.element)
            .find(`.${_this.config.classes.link}`)
            .unbind()
            .on('click', function (e) {
                e.preventDefault();

                $(_this.body).find(`.${_this.config.classes.parent}`).removeClass(_this.config.classes.active);
                $(this).closest(`.${_this.config.classes.parent}`).addClass(_this.config.classes.active);

                let attribute = false;

                if (_this.config.attribute) {
                    attribute = $(this).data(_this.config.attribute);
                }

                if (_this.config.onSelectItem) {
                    _this.config.onSelectItem(attribute);
                } else {
                    let href = $(this).attr('href');

                    window.location.href = href;
                }
            });
    }
}

/*
=========================================================
POPUP
=========================================================
*/

const POPUP_NAME = 'popup';
const POPUP_EVENT_KEY = `${ZYK_DATA_KEY}.${POPUP_NAME}`;

const POPUP_CLASSNAME = {
    SHOW: 'show',
    HIDE: 'hide',
    FADE: 'fade',
    FOCUS: 'focus',
    DARK: 'dark',
    DIALOG: 'popup-dialog',
    BACKDROP: 'popup-backdrop',
    BODY: 'popup-body'
};

const POPUP_SELECTOR = {
    DIALOG: `.${POPUP_CLASSNAME.DIALOG}`,
    BACKDROP: `.${POPUP_CLASSNAME.BACKDROP}`,
    POPUP_BODY: `.${POPUP_CLASSNAME.BODY}`,
    TOGGLE: '[data-toggle="popup"]',
    DISMISS: '[data-dismiss="popup"]'
};

const POPUP_DEFAULT = {
    backdrop: true,
    focus: true,
    keyboard: true
};

const POPUP_DEFAULT_TYPE = {
    backdrop: '(boolean|string)',
    focus: 'boolean',
    keyboard: 'boolean'
};

const POPUP_EVENT = {
    SHOW: `show.${POPUP_EVENT_KEY}`,
    SHOWN: `shown.${POPUP_EVENT_KEY}`,
    HIDE: `hide.${POPUP_EVENT_KEY}`,
    HIDDEN: `hidden.${POPUP_EVENT_KEY}`,
    CLICK_DISMISS: `click.dismiss.${POPUP_EVENT_KEY}`,
    MOUSEDOWN_DISMISS: `mousedown.dismiss.${POPUP_EVENT_KEY}`,
    MOUSEUP_DISMISS: `mouseup.dismiss.${POPUP_EVENT_KEY}`,
    CLICK: `click.${POPUP_EVENT_KEY}`,
    KEYDOWN_DISMISS: `keydown.dismiss.${POPUP_EVENT_KEY}`,
    FOCUSIN: `focusin.${POPUP_EVENT_KEY}`
};

const POPUP_VAR = {
    BACKDROP: null,
    IS_SHOWN: false,
    IGNOREBACKDROPCLICK: false,
    IS_TRANSITION: false,
    TRANSITION: 100
};

var Popup = (function () {
    function Popup(element, config) {
        this.config = this.getConfig(config);

        this.backdrop = POPUP_VAR.BACKDROP;
        this.isShown = POPUP_VAR.IS_SHOWN;
        this.ignoreBackdropClick = POPUP_VAR.IGNOREBACKDROPCLICK;
        this.isTransition = POPUP_VAR.IS_TRANSITION;

        this.element = element;
        this.dialog = element.querySelector(POPUP_SELECTOR.DIALOG);

        this.hasFade = $(this.element).hasClass(POPUP_CLASSNAME.FADE);
    }

    const _proto = Popup.prototype;

    _proto.getConfig = function getConfig(config) {
        config = zykUtil.configSpread(POPUP_DEFAULT, config);

        return config;
    };

    _proto.toggle = function toggle(target) {
        return this.isShown ? this.hide() : this.show(target);
    };

    _proto.show = function show(target) {
        const _this = this;

        if (this.isShown) {
            return;
        }

        // Block body
        zykUtil.bodyBlock(true);

        let showEvent = $.Event(POPUP_EVENT.SHOW, {
            target: target
        });

        $(this.element).trigger(showEvent);

        this.isShown = true;

        this.keepOnViewPort();

        this.setEscapeEvent();

        $(this.element).one(POPUP_EVENT.CLICK_DISMISS, POPUP_SELECTOR.DISMISS, function (e) {
            return _this.hide(e);
        });

        $(this.dialog).off(POPUP_EVENT.CLICK_DISMISS);
        $(this.dialog).on(POPUP_EVENT.CLICK_DISMISS, function (e) {
            if ($(_this.dialog).is(e.target)) {
                if (_this.config.backdrop == 'static') {
                    return;
                } else {
                    return _this.hide(e);
                }
            }
        });

        this.showBackdrop(function () {
            return _this.showElement(target);
        });
    };

    _proto.hide = function hide(e) {
        const _this = this;

        if (e) {
            e.preventDefault();
        }

        let hideEvent = $.Event(POPUP_EVENT.HIDE);

        $(this.element).trigger(hideEvent);

        this.isShown = false;

        this.hideElement();
    };

    _proto.showElement = function showElement(target) {
        const _this = this;

        this.element.style.display = 'block';

        if (this.hasFade) {
            setTimeout(function () {
                $(_this.element).addClass(POPUP_CLASSNAME.SHOW);
            }, POPUP_VAR.TRANSITION);
        } else {
            $(this.element).addClass(POPUP_CLASSNAME.SHOW);
        }

        if ($(this.element).attr('tabindex') == null) {
            $(this.element).attr('tabindex', -1);
        }

        if (this.config.focus) {
            this.forceFocus();
        }

        let shownEvent = $.Event(POPUP_EVENT.SHOWN, {
            target: target
        });

        $(_this.element).trigger(shownEvent);
    };

    _proto.hideElement = function hideElement() {
        const _this = this;

        $(this.element).removeClass(POPUP_CLASSNAME.SHOW);

        if (this.hasFade) {
            setTimeout(function () {
                _this.element.style.display = 'none';
            }, POPUP_VAR.TRANSITION);
        } else {
            this.element.style.display = 'none';
        }

        this.removeBackdrop();

        $(this.element).trigger(POPUP_EVENT.HIDDEN);

        // Unlock body
        zykUtil.bodyBlock(false);
    };

    _proto.showBackdrop = function showBackdrop(callback) {
        const _this = this;

        let focus = $(this.element).hasClass(POPUP_CLASSNAME.FOCUS);

        if (this.isShown && this.config.backdrop) {
            this.backdrop = $(`<div class="${POPUP_CLASSNAME.BACKDROP}"></div>`);

            if (focus) {
                $(this.backdrop).addClass(POPUP_CLASSNAME.FOCUS);
            }

            // Append POPUP BACKDROP to BODY
            $(this.backdrop).appendTo($('body'));

            if (this.hasFade) {
                setTimeout(function () {
                    $(_this.backdrop).addClass(POPUP_CLASSNAME.FADE);
                }, POPUP_VAR.TRANSITION);
            } else {
                $(this.backdrop).addClass(POPUP_CLASSNAME.SHOW);
            }

            $(this.backdrop).on(POPUP_EVENT.CLICK_DISMISS, function (e) {
                if (_this.config.backdrop == 'static') {
                    return;
                } else {
                    _this.hide();
                }
            });
        }

        if (callback) {
            callback();
        }
    };

    _proto.removeBackdrop = function removeBackdrop() {
        const _this = this;

        if (this.backdrop) {
            $(this.backdrop).remove();

            this.backdrop = null;
        }
    };

    _proto.keepOnViewPort = function keepOnViewPort() {
        const _this = this;

        let offsetTop = $(this.element).offset().top;
        let vpHeight = window.innerHeight;

        if (offsetTop > vpHeight) {
            let scrollTop = offsetTop - (vpHeight * 10) / 100;

            $(window).scrollTop(scrollTop);
        }
    };

    _proto.forceFocus = function forceFocus() {
        const _this = this;

        $(document)
            .off(POPUP_EVENT.FOCUSIN)
            .on(POPUP_EVENT.FOCUSIN, function (e) {
                if (document !== e.target && _this.element !== e.target && $(_this.element).has(e.target).length === 0) {
                    $(_this.element).focusin();
                }
            });
    };

    _proto.setEscapeEvent = function setEscapeEvent() {
        const _this = this;

        if (this.isShown && this.config.keyboard) {
            $(this.element).on(POPUP_EVENT.KEYDOWN_DISMISS, function (e) {
                if (e.which === zykKeys.escape) {
                    e.preventDefault();

                    _this.hide();
                }
            });
        } else if (!this.isShown) {
            $(this.element).off(POPUP_EVENT.KEYDOWN_DISMISS);
        }
    };

    Popup.jqueryInterface = function jqueryInterface(config, target) {
        return this.each(function () {
            let data = $(this).data(POPUP_EVENT_KEY);

            let _config = zykUtil.configSpread(POPUP_DEFAULT, $(this).data(), typeof config == 'object' && config ? config : {});

            if (!data) {
                data = new Popup(this, _config);
                $(this).data(POPUP_EVENT_KEY, data);
            }

            if (typeof config == 'string') {
                if (typeof data[config] == 'undefined') {
                    throw new TypeError('No method named ' + '"' + config + '"');
                }

                data[config](target);
            } else if (_config.toggle) {
                data.show(target);
            }
        });
    };

    return Popup;
})();

$(document).on(POPUP_EVENT.CLICK, POPUP_SELECTOR.TOGGLE, function (e) {
    const _this = this;

    let target = $(this).data('target');

    let config = $(target).data(POPUP_EVENT_KEY) ? 'toggle' : zykUtil.configSpread($(target).data(), $(this).data());

    if (this.tagName == 'a') {
        e.preventDefault();
    }

    var $target = $(target).one(POPUP_EVENT.SHOW, function (showEvent) {
        if (showEvent.isDefaultPrevented()) {
            return;
        }

        $target.one(POPUP_EVENT.HIDDEN, function () {
            // if($(_this).is(':visible')){
            //     console.log('visible');
            // }
        });
    });

    Popup.jqueryInterface.call($(target), config, this);
});

$.fn[POPUP_NAME] = Popup.jqueryInterface;
$.fn[POPUP_NAME].constructor = Popup;

/*
=========================================================
SLIDER
=========================================================
*/
const SLIDER_NAME = 'slider';
const SLIDER_EVENT_KEY = `${ZYK_DATA_KEY}.${SLIDER_NAME}`;

const SLIDER_CLASSNAME = {
    ACTIVE: 'active',
    ITEM: 'slider-item',
    ITEM_ACTIVE: 'slider-item.active',
    ITEM_PREV: 'slider-item-prev',
    ITEM_NEXT: 'slider-item-next',
    ITEM_PREPARE: 'slider-item-prepare'
};

const SLIDER_SELECTOR = {
    SLIDER: `.zyk-${SLIDER_NAME}`,

    ITEM: `.${SLIDER_CLASSNAME.ITEM}`,
    ITEM_ACTIVE: `.${SLIDER_CLASSNAME.ITEM_ACTIVE}`,
    ITEM_NEXT: `.${SLIDER_CLASSNAME.ITEM_NEXT}`,
    ITEM_PREV: `.${SLIDER_CLASSNAME.ITEM_PREV}`,
    ITEM_FIRST: `.${SLIDER_CLASSNAME.ITEM}:first-child`,
    ITEM_LAST: `.${SLIDER_CLASSNAME.ITEM}:last-child`,

    CONTROL_NEXT: `[data-slider-control="next"]`,
    CONTROL_PREV: `[data-slider-control="prev"]`
};

const SLIDER_MOVEMENT = {
    NEXT: 'next',
    PREV: 'prev'
};

const SLIDER_DEFAULT = {
    transition: 1000,
    loop: true,
    autoplay: true,
    indicator: true
};

const SLIDER_EVENT = {
    CLICK: `click.${SLIDER_EVENT_KEY}`,

    SWITCH: `switch.${SLIDER_EVENT_KEY}`,
    SWITCHED: `switched.${SLIDER_EVENT_KEY}`
};

var Slider = (function () {
    function Slider(element, config) {
        this.config = this.getConfig(config);
        this.element = element;
        this.slideLength = $(this.element).find(SLIDER_SELECTOR.ITEM).length;
    }

    const _proto = Slider.prototype;

    _proto.getConfig = function getConfig(config) {
        config = zykUtil.configSpread(SLIDER_DEFAULT, config);

        return config;
    };

    _proto.getActiveSlide = function getActiveSlide() {
        let activeSlide = $(this.element).find(SLIDER_SELECTOR.ITEM_ACTIVE);
        return activeSlide;
    };

    _proto.autoplay = function autoplay(target) {
        // console.log('AUTOPLAY')
        // this.getPrepare()
        // this.next()
    };

    _proto.getPrepare = function getPrepare(movement) {
        const _this = this;

        if (typeof movement == 'string') {
            if (movement == SLIDER_MOVEMENT.NEXT || movement == SLIDER_MOVEMENT.PREV) {
                let activeSlide = this.getActiveSlide();

                if (movement == SLIDER_MOVEMENT.NEXT) {
                    if ($(activeSlide).index() < _this.slideLength - 1) {
                        $(activeSlide).next().addClass(SLIDER_CLASSNAME.ITEM_PREPARE).addClass(SLIDER_CLASSNAME.ITEM_NEXT);
                    } else {
                        if (_this.config.loop == true) {
                            $(_this.element).find(SLIDER_SELECTOR.ITEM_FIRST).addClass(SLIDER_CLASSNAME.ITEM_PREPARE).addClass(SLIDER_CLASSNAME.ITEM_NEXT);
                        } else {
                            return;
                        }
                    }

                    setTimeout(function () {
                        _this.switchSlide(SLIDER_MOVEMENT.NEXT);
                    }, 100);
                } else if (movement == SLIDER_MOVEMENT.PREV) {
                    if ($(activeSlide).index() > 0) {
                        $(activeSlide).prev().addClass(SLIDER_CLASSNAME.ITEM_PREPARE).addClass(SLIDER_CLASSNAME.ITEM_PREV);
                    } else if ($(activeSlide).index() == 0) {
                        if (_this.config.loop == true) {
                            $(_this.element).find(SLIDER_SELECTOR.ITEM_LAST).addClass(SLIDER_CLASSNAME.ITEM_PREPARE).addClass(SLIDER_CLASSNAME.ITEM_PREV);
                        } else {
                            return;
                        }
                    }

                    setTimeout(function () {
                        _this.switchSlide(SLIDER_MOVEMENT.PREV);
                    }, 100);
                } else {
                    throw new TypeError('Wrong Request');
                }
            }
        } else if (typeof movement == 'number') {
            if (movement < 0) {
                throw new TypeError('Wrong Request');
            }
        }
    };

    _proto.getSliderId = function getSliderId(element) {
        let sliderId = $(element).closest('.slider');
        return sliderId;
    };

    _proto.next = function next(target) {
        let switchEvent = $.Event(SLIDER_EVENT.SWITCH, {
            target: target
        });

        $(this.element).trigger(switchEvent);

        this.getPrepare(SLIDER_MOVEMENT.NEXT);
    };

    _proto.prev = function prev(target) {
        let switchEvent = $.Event(SLIDER_EVENT.SWITCH, {
            target: target
        });

        $(this.element).trigger(switchEvent);

        this.getPrepare(SLIDER_MOVEMENT.PREV);
    };

    _proto.switchSlide = function switchSlide(movement, target) {
        let activeSlide = this.getActiveSlide();
        activeSlide.removeClass(SLIDER_CLASSNAME.ACTIVE);

        if (typeof movement == 'string') {
            if (movement == SLIDER_MOVEMENT.NEXT) {
                let $currentSlide = $(this.element).find(SLIDER_SELECTOR.ITEM_NEXT);

                $currentSlide.removeClass(SLIDER_CLASSNAME.ITEM_NEXT).removeClass(SLIDER_CLASSNAME.ITEM_PREPARE).addClass(SLIDER_CLASSNAME.ACTIVE);
            } else if (movement == SLIDER_MOVEMENT.PREV) {
                let $currentSlide = $(this.element).find(SLIDER_SELECTOR.ITEM_PREV);

                $currentSlide.removeClass(SLIDER_CLASSNAME.ITEM_PREV).removeClass(SLIDER_CLASSNAME.ITEM_PREPARE).addClass(SLIDER_CLASSNAME.ACTIVE);
            }
        } else if (typeof movement == 'number') {
        }

        let switchedEvent = $.Event(SLIDER_EVENT.SWITCHED, {
            target: target
        });

        $(this.element).trigger(switchedEvent);

        this.setControlVisible();
    };

    _proto.setControlVisible = function setControlVisible() {
        if (this.config.loop === false) {
            if ($(this.getActiveSlide()).index() == this.slideLength - 1) {
                $(this.element).find(SLIDER_SELECTOR.CONTROL_NEXT).hide();
            } else {
                $(this.element).find(SLIDER_SELECTOR.CONTROL_NEXT).show();
            }

            if ($(this.getActiveSlide()).index() == 0) {
                $(this.element).find(SLIDER_SELECTOR.CONTROL_PREV).hide();
            } else {
                $(this.element).find(SLIDER_SELECTOR.CONTROL_PREV).show();
            }
        }
    };

    Slider.jqueryInterface = function jqueryInterface(config, target) {
        return this.each(function () {
            let data = $(this).data(SLIDER_EVENT_KEY);

            let _config = zykUtil.configSpread(SLIDER_DEFAULT, $(this).data(), typeof config == 'object' && config ? config : {});

            if (!data) {
                data = new Slider(this, _config);
                $(this).data(SLIDER_EVENT_KEY, data);
            }

            if (typeof config == 'string') {
                if (typeof data[config] == 'undefined') {
                    throw new TypeError('No method named ' + '"' + config + '"');
                }

                data[config](target);
            } else if (data.config.autoplay) {
                data.autoplay(target);
            }
        });
    };

    return Slider;
})();

$(document).on(SLIDER_EVENT.CLICK, SLIDER_SELECTOR.CONTROL_NEXT, function (e) {
    let target = $(this).data('target');

    let config = $(target).data(SLIDER_EVENT_KEY) ? $(target).data(SLIDER_EVENT_KEY) : zykUtil.configSpread($(target).data(), $(this).data());

    if (this.tagName == 'A') {
        e.preventDefault();
    }

    let data = $(target).data(SLIDER_EVENT_KEY);
    data.next(target);

    Slider.jqueryInterface.call($(target), config, this);
});

$(document).on(SLIDER_EVENT.CLICK, SLIDER_SELECTOR.CONTROL_PREV, function (e) {
    let target = $(this).data('target');

    let config = $(target).data(SLIDER_EVENT_KEY) ? $(target).data(SLIDER_EVENT_KEY) : zykUtil.configSpread($(target).data(), $(this).data());

    if (this.tagName == 'A') {
        e.preventDefault();
    }

    let data = $(target).data(SLIDER_EVENT_KEY);
    data.prev(target);

    Slider.jqueryInterface.call($(target), config, this);
});

$.fn[SLIDER_NAME] = Slider.jqueryInterface;
$.fn[SLIDER_NAME].constructor = Slider;

/*
=========================================================
FILTER EXPAND
=========================================================
*/

const FILTER_NAME = 'filterexpand';
const FILTER_EVENT_KEY = `${ZYK_DATA_KEY}.${FILTER_NAME}`;

const FILTER_CLASSNAME = {
    WRAPPER: 'view-body-filter',
    BUTTON_DEFAULT: 'elo',
    BUTTON_ACTIVE: 'els'
};

const FILTER_SELECTOR = {
    WRAPPER: `.${FILTER_CLASSNAME.WRAPPER}`,
    TOGGLE: `[data-toggle="filter"]`,
    ICON: `i`
};

const FILTER_EVENT = {
    CLICK: `click.${FILTER_EVENT_KEY}`,
    SHOW: `show.${FILTER_EVENT_KEY}`,
    SHOWN: `shown.${FILTER_EVENT_KEY}`,
    HIDE: `hide.${FILTER_EVENT_KEY}`,
    HIDDEN: `hidden.${FILTER_EVENT_KEY}`
};

const FILTER_DEFAULT = {
    IS_SHOWN: false
};

var Filter = (function () {
    function Filter(element, options) {
        this.config = this.getConfig(options);

        this.element = element;

        this.is_shown = FILTER_DEFAULT.IS_SHOWN;
    }

    const _proto = Filter.prototype;

    _proto.getConfig = function getConfig(config) {
        config = zykUtil.configSpread(FILTER_DEFAULT, config);

        return config;
    };

    _proto.toggle = function toggle(target) {
        return this.is_shown ? this.hide(target) : this.show(target);
    };

    _proto.show = function show(target) {
        let showEvent = $.Event(FILTER_EVENT.SHOW, {
            target: target
        });

        $(this.element).trigger(showEvent);

        $(this.element).slideDown();

        $(this.element).trigger(FILTER_EVENT.SHOWN);

        $(target).find(FILTER_SELECTOR.ICON).removeClass(FILTER_CLASSNAME.BUTTON_DEFAULT).addClass(FILTER_CLASSNAME.BUTTON_ACTIVE);

        this.is_shown = true;
    };

    _proto.hide = function hide(target) {
        $(this.element).trigger(FILTER_EVENT.HIDE);

        $(this.element).slideUp();

        $(this.element).trigger(FILTER_EVENT.HIDDEN);

        $(target).find(FILTER_SELECTOR.ICON).removeClass(FILTER_CLASSNAME.BUTTON_ACTIVE).addClass(FILTER_CLASSNAME.BUTTON_DEFAULT);

        this.is_shown = false;
    };

    Filter.jqueryInterface = function jqueryInterface(config, target) {
        return this.each(function () {
            let data = $(this).data(FILTER_EVENT_KEY);

            let _config = zykUtil.configSpread(FILTER_DEFAULT, $(this).data(), typeof config == 'object' && config ? config : {});

            if (!data) {
                data = new Filter(this, _config);
                $(this).data(FILTER_EVENT_KEY, data);

                if ($(target).find('i').hasClass('els')) {
                    data.is_shown = true;
                }
            }

            if (typeof config == 'string') {
                if (typeof data[config] == 'undefined') {
                    throw new TypeError('No method named ' + '"' + config + '"');
                }

                data[config](target);
            } else if (_config.toggle) {
                data.toggle(target);
            }
        });
    };

    return Filter;
})();

$(document).on(FILTER_EVENT.CLICK, FILTER_SELECTOR.TOGGLE, function (e) {
    let target = $(this).data('target');

    let config = $(target).data(FILTER_EVENT_KEY) ? 'toggle' : zykUtil.configSpread($(target).data(), $(this).data());

    if (this.tagName == 'a') {
        e.preventDefault();
    }

    Filter.jqueryInterface.call($(target), config, this);
});

$.fn[FILTER_NAME] = Filter.jqueryInterface;
$.fn[FILTER_NAME].constructor = Filter;

/*
=========================================================
CHECKBOX, RADIO, SWITCH
=========================================================
*/

const CHECK_NAME = 'check';
const CHECK_EVENT_KEY = `${ZYK_DATA_KEY}.${CHECK_NAME}`;

const CHECK_TYPE = {
    CHECKBOX: 'checkbox',
    RADIO: 'radio',
    SWITCH: 'switch'
};

const CHECK_EVENT = {
    CLICK: `click.${CHECK_EVENT_KEY}`,
    CHECK: `check.${CHECK_EVENT_KEY}`,
    UNCHECK: `uncheck.${CHECK_EVENT_KEY}`,
    CHANGE: `change.${CHECK_EVENT_KEY}`
};

const CHECK_DEFAULT = {};

const CHECK_SELECTOR = {
    TOGGLE: '[data-toggle="check"]',
    ICON: 'i'
};

var Check = (function () {
    function Check(element, options) {
        this.config = this.getConfig(options);

        this.element = element;
        this.input = $(this.element).siblings('input');
        this.type = $(this.element).data('type');
        this.disabled = $(this.input).prop('disabled');
    }

    const _proto = Check.prototype;

    _proto.getConfig = function getConfig(config) {
        config = zykUtil.configSpread(CHECK_DEFAULT, config);

        return config;
    };

    _proto.toggle = function toggle() {
        const _this = this;

        if (_this.disabled) {
            return;
        } else {
            let prop = _this.input.prop('checked');
            return prop ? _this.uncheck() : _this.check();
        }
    };

    _proto.check = function () {
        const _this = this;

        switch (_this.type) {
            case CHECK_TYPE.CHECKBOX:
                _this.input.prop('checked', true);

                $(_this.element).find(CHECK_SELECTOR.ICON).removeClass('elo el-square-rounded').addClass('els el-check-square');
                break;
            case CHECK_TYPE.SWITCH:
                _this.input.prop('checked', true);

                $(_this.element).find('.btn-switch').addClass('active');
                break;
            case CHECK_TYPE.RADIO:
                $(_this.element).closest('.form-check-group').find(CHECK_SELECTOR.ICON).removeClass('els el-check-circle').addClass('elo el-circle');
                $(_this.element).closest('.form-check-group').find('input[type="radio"]').prop('checked', false);

                $(_this.element).find(CHECK_SELECTOR.ICON).removeClass('elo el-circle').addClass('els el-check-circle');
                $(_this.element).siblings('input[type="radio"]').prop('checked', true);
                break;
        }

        $(_this.element).trigger(CHECK_EVENT.CHANGE);
        $(_this.element).trigger(CHECK_EVENT.CHECK);
    };

    _proto.uncheck = function () {
        const _this = this;

        switch (_this.type) {
            case CHECK_TYPE.CHECKBOX:
                _this.input.prop('checked', false);

                $(_this.element).find(CHECK_SELECTOR.ICON).removeClass('els el-check-square').addClass('elo el-square-rounded');
                break;
            case CHECK_TYPE.SWITCH:
                _this.input.prop('checked', false);

                $(_this.element).find('.btn-switch').removeClass('active');
                break;
            case CHECK_TYPE.RADIO:
                break;
        }

        $(_this.element).trigger(CHECK_EVENT.CHANGE);
        $(_this.element).trigger(CHECK_EVENT.UNCHECK);
    };

    _proto.toggleIcon = function () {
        const _this = this;

        let prop = _this.input.prop('checked');

        switch (_this.type) {
            case CHECK_TYPE.CHECKBOX:
                if (!prop) {
                    _this.input.prop('checked', true);

                    $(_this.element).find(CHECK_SELECTOR.ICON).removeClass('elo el-square-rounded').addClass('els el-check-square');
                } else {
                    _this.input.prop('checked', false);

                    $(_this.element).find(CHECK_SELECTOR.ICON).removeClass('els el-check-square').addClass('elo el-square-rounded');
                }
                break;
            case CHECK_TYPE.SWITCH:
                if (!prop) {
                    _this.input.prop('checked', true);

                    $(_this.element).find('.btn-switch').addClass('active');
                } else {
                    _this.input.prop('checked', false);

                    $(_this.element).find('.btn-switch').removeClass('active');
                }
                break;
            case CHECK_TYPE.RADIO:
                if (!prop) {
                    $(_this.element).find(CHECK_SELECTOR.ICON).removeClass('elo el-circle').addClass('els el-check-circle');
                    $(_this.element).siblings('input[type="radio"]').prop('checked', true);
                } else {
                    $(_this.element).find(CHECK_SELECTOR.ICON).removeClass('els el-check-circle').addClass('elo el-circle');
                    $(_this.element).siblings('input[type="radio"]').prop('checked', false);
                }
                break;
        }
    };

    Check.jqueryInterface = function jqueryInterface(config, target) {
        return this.each(function () {
            let data = $(this).data(CHECK_EVENT_KEY);

            let _config = zykUtil.configSpread(CHECK_DEFAULT, $(this).data(), typeof config == 'object' && config ? config : {});

            if (!data) {
                data = new Check(this, _config);
                $(this).data(CHECK_EVENT_KEY, data);
            }

            if (typeof config == 'string') {
                if (typeof data[config] == 'undefined') {
                    throw new TypeError('No method named ' + '"' + config + '"');
                }

                data[config]();
            } else if (_config.toggle) {
                data.toggle();
            }
        });
    };

    return Check;
})();

$(document).on(CHECK_EVENT.CLICK, CHECK_SELECTOR.TOGGLE, function (e) {
    let config = $(this).data(CHECK_EVENT_KEY) ? 'toggle' : $(this).data();

    if (this.tagName == 'a') {
        e.preventDefault();
    }

    if ($(this).attr('disabled')) {
        return;
    }

    Check.jqueryInterface.call($(this), config, this);
});

$.fn[CHECK_NAME] = Check.jqueryInterface;
$.fn[CHECK_NAME].constructor = Check;

/*
=========================================================
SELECT
=========================================================
*/

let SELECT_NAME = 'zykselect';
let SELECT_EVENT_KEY = `${ZYK_DATA_KEY}.${SELECT_NAME}`;

let SELECT_DEFAULT = {
    data: {},
    selected: -1,
    searchPlaceholder: `Search...`,
    resetSearchLabel: `Reset`,
    disableSearch: false,
    arrowUp: 'elo el-caret-up',
    arrowDown: 'elo el-caret-down',
    defaultLabel: 'Select one',
    menuRight: false,
    onSelect: false,
    onSearch: false,
    onResetSearch: false
};

let SELECT_EVENT = {
    INIT: `init.${SELECT_EVENT_KEY}`,
    CLICK: `click.${SELECT_EVENT_KEY}`,
    SELECT: `select.${SELECT_EVENT_KEY}`,
    CHANGE: `change.${SELECT_EVENT_KEY}`,
    SEARCH: `search.${SELECT_EVENT_KEY}`,
    RESET_SEARCH: `resetsearch.${SELECT_EVENT_KEY}`,
    SHOW: `show.${SELECT_EVENT_KEY}`,
    SHOWN: `shown.${SELECT_EVENT_KEY}`,
    HIDE: `hide.${SELECT_EVENT_KEY}`,
    HIDDEN: `hidden.${SELECT_EVENT_KEY}`
};

let SELECT_CLASS = {
    WRAPPER: 'zyk-select-wrapper',
    TOGGLE: 'zyk-select-btn',
    TOGGLE_LABEL: 'zyk-select-label',
    MENU: 'zyk-select-menu',
    MENU_HEADER: 'zyk-select-menu-header',
    MENU_BODY: 'zyk-select-menu-body',
    SEARCH_INPUT: 'zyk-select-menu-search',
    SEARCH_BUTTON: 'zyk-select-menu-search-button',
    SEARCH_RESET: 'zyk-select-menu-reset-search',
    SHOW: 'show',
    LIST_ITEM_LABEL: 'zyk-select-item-label'
};

let SELECT_SELECTOR = {
    WRAPPER: `.${SELECT_CLASS.WRAPPER}`,
    TOGGLE: `[data-toggle="select"]`,
    TOGGLE_LABEL: `.${SELECT_CLASS.TOGGLE_LABEL}`,
    TOGGLE_ICON: 'i',
    MENU: `.${SELECT_CLASS.MENU}`,
    MENU_HEADER: `.${SELECT_CLASS.MENU_HEADER}`,
    MENU_BODY: `.${SELECT_CLASS.MENU_BODY}`,
    SEARCH_INPUT: `.${SELECT_CLASS.SEARCH_INPUT}`,
    SEARCH_BUTTON: `.${SELECT_CLASS.SEARCH_BUTTON}`,
    SEARCH_RESET: `.${SELECT_CLASS.SEARCH_RESET}`,
    LIST: `ul`,
    LIST_ITEM: `li`,
    LIST_ITEM_LABEL: `.${SELECT_CLASS.LIST_ITEM_LABEL}`
};

let Select = (function () {
    function Select(element, config) {
        this.config = this.getConfig(config);

        this.element = element;
        this.parent = this.element.parentElement;
        this.menu = this.parent.querySelector(SELECT_SELECTOR.MENU);
        this.toggleLabel = this.parent.querySelector(SELECT_SELECTOR.TOGGLE_LABEL);
        this.onSelect = this.config.onSelect;
        this.selected = this.config.selected;

        this.isShown = false;
    }

    const _proto = Select.prototype;

    _proto.getConfig = function (options) {
        let config = {};

        config = {
            ...SELECT_DEFAULT,
            ...options
        };

        return config;
    };

    _proto.getValue = function () {
        const _this = this;

        return $(_this.element).val();
    };

    _proto.init = function (data) {
        const _this = this;

        $(_this.parent).find(SELECT_SELECTOR.MENU).remove();
        $(_this.parent).append(_this.generateMenu(data));

        if (_this.selected != -1) {
            let selectedItem = _this.checkSelected(data);

            if (typeof selectedItem != 'undefined') {
                $(_this.toggleLabel).text(selectedItem.label);
                $(_this.element).data('selected-item', selectedItem);
            } else {
                $(_this.toggleLabel).text(_this.config.defaultLabel);
                $(_this.element).removeData('selected-item');
            }

            $(_this.element).data('selected', _this.selected);
        }

        _this.initSearch();

        $(_this.parent).trigger(SELECT_EVENT.INIT);
    };

    _proto.generateMenu = function (data) {
        const _this = this;

        let $dataList = false;

        if (data.length > 0) {
            $dataList = _this.generateChild(data);
        } else {
            $dataList = $(`<p class="p-overline no-data">No data</p>`);
        }

        let $menu = $(`
            <div class="zyk-select-menu ${_this.config.menuRight ? 'zyk-select-menu-right' : ''}">
                <div class="zyk-select-menu-header">
                    ${(() => {
                        if (!_this.config.disableSearch) {
                            return `
                                <div class="input-group input-group-sm">
                                    <span class="input-group-text">
                                        <i class="elo el-search"></i>
                                    </span>

                                    <input type="search" class="form-control zyk-select-menu-search" placeholder="${_this.config.searchPlaceholder}">
                                </div>`;
                        } else {
                            return '';
                        }
                    })()}

                    <button class="btn btn-sm btn-outline-default zyk-select-menu-reset-search" type="button">
                        <i class="elo el-lg el-undo"></i> ${_this.config.disableSearch ? _this.config.resetSearchLabel : ''}
                    </button>
                </div>

                <div class="zyk-select-menu-body"></div>
            </div>
        `);

        if ($dataList) {
            $menu.find(SELECT_SELECTOR.MENU_BODY).empty();
            $menu.find(SELECT_SELECTOR.MENU_BODY).append($dataList);
        }

        return $menu[0];
    };

    _proto.generateChild = function (group, level = 0) {
        const _this = this;

        let $output = $(`<ul style="--level: ${level}"></ul>`);

        group.forEach((item) => {
            let $item = $('<li></li>');

            let $child = $(`
                <a href="#" class="zyk-select-item-label">
                   ${item.label.escapeXSS()}
                </a>
            `);

            $child.unbind().on('click', function () {
                _this.selected = item.id;
                _this.change(item.label);
                $(_this.element).data('selected', item.id);

                $(_this.parent).trigger(SELECT_EVENT.SELECT);

                if (_this.onSelect) {
                    _this.onSelect(item.id, item);
                }
            });

            $item.append($child);

            if (item.subgroup && item.subgroup.length > 0) {
                let subGroup = item.subgroup;

                let $groupChild = _this.generateChild(subGroup, level + 1);

                $item.append($groupChild);
            }

            $output.append($item);
        });

        return $output;
    };

    _proto.checkSelected = function (data) {
        const _this = this;

        let output;

        output = data.find((child) => {
            return child.id == _this.selected;
        });

        if (typeof output == 'undefined') {
            data.forEach((child) => {
                if (typeof output == 'undefined' && child.subgroup) {
                    output = _this.checkSelected(child.subgroup);
                }
            });
        }

        return output;
    };

    _proto.toggle = function () {
        const _this = this;

        let isShown = $(_this.menu).hasClass(SELECT_CLASS.SHOW);

        Select.clearMenus();

        if (isShown) {
            return;
        }

        _this.show();
    };

    _proto.show = function () {
        const _this = this;

        // RESET SEARCH
        $(_this.parent).find(SELECT_SELECTOR.SEARCH_INPUT).val('');

        // RESHOW ALL ITEMS
        $(_this.parent).find(SELECT_SELECTOR.LIST_ITEM).show();

        _this.isShown = true;

        $(_this.parent).trigger(SELECT_EVENT.SHOW);

        $(_this.menu).addClass(SELECT_CLASS.SHOW);

        $(_this.element).find(SELECT_SELECTOR.TOGGLE_ICON).removeClass(_this.config.arrowDown).addClass(_this.config.arrowUp);

        $(_this.parent).trigger(SELECT_EVENT.SHOWN);
    };

    _proto.hide = function () {
        const _this = this;

        _this.isShown = false;

        $(_this.parent).trigger(SELECT_EVENT.HIDE);

        $(_this.menu).removeClass(SELECT_CLASS.SHOW);

        $(_this.element).find(SELECT_SELECTOR.TOGGLE_ICON).removeClass(_this.config.arrowUp).addClass(_this.config.arrowDown);

        $(_this.parent).trigger(SELECT_EVENT.HIDDEN);
    };

    _proto.change = function (label) {
        const _this = this;

        $(_this.element).find(SELECT_SELECTOR.TOGGLE_LABEL).text(label);
        $(_this.parent).trigger(SELECT_EVENT.CHANGE);
    };

    _proto.initSearch = function () {
        const _this = this;

        $(_this.parent)
            .unbind()
            .on(SELECT_EVENT.CLICK, SELECT_SELECTOR.SEARCH_RESET, function () {
                $(_this.parent).find(SELECT_SELECTOR.SEARCH_INPUT).val('');

                if (!_this.config.onResetSearch) {
                    _this.change(_this.config.defaultLabel);
                    _this.selected = -1;
                } else {
                    _this.config.onResetSearch();
                }

                $(_this.parent).trigger(SELECT_EVENT.RESET_SEARCH);
            })
            .on(SELECT_EVENT.SEARCH, SELECT_SELECTOR.SEARCH_INPUT, function () {
                let searchKey = $(this).val();
                searchKey = zykUtil.convertSlug(searchKey);

                $(_this.parent)
                    .find(SELECT_SELECTOR.LIST_ITEM)
                    .filter(function () {
                        $(this).toggle(zykUtil.convertSlug($(this).find(SELECT_SELECTOR.LIST_ITEM_LABEL).text()).indexOf(searchKey) > -1);
                    });
            });
    };

    Select.jqueryInterface = function (config = 'init') {
        return this.each(function () {
            let data = $(this).data(SELECT_EVENT_KEY);

            if (data) {
                $(this).removeData(SELECT_EVENT_KEY);
            }

            let _config = zykUtil.configSpread(SELECT_DEFAULT, $(this).data(), typeof config == 'object' && config ? config : {});

            data = new Select(this, _config);
            $(this).data(SELECT_EVENT_KEY, data);

            if (typeof config == 'string') {
                if (typeof data[config] == 'undefined') {
                    throw new TypeError(`No method named ${config}`);
                }

                data[config]();
            } else if (typeof config == 'object') {
                data['init'](config.data);
            }
        });
    };

    return Select;
})();

Select.clearMenus = function (event) {
    const _this = this;

    let toggles = [].slice.call(document.querySelectorAll(SELECT_SELECTOR.TOGGLE));

    for (let i = 0; i < toggles.length; i++) {
        let parent = $(toggles[i]).parent();
        let context = $(toggles[i]).data(SELECT_EVENT_KEY);

        $(parent).trigger(SELECT_EVENT.HIDE);

        if (!context) {
            continue;
        }

        let menu = context.menu;

        if (!$(menu).hasClass(SELECT_CLASS.SHOW)) {
            continue;
        }

        if (event && event.type === 'click' && /input|textarea|select/i.test(event.target.tagName)) {
            continue;
        }

        context.isShown = false;

        $(parent).find(SELECT_SELECTOR.TOGGLE_ICON).removeClass(context.config.arrowUp).addClass(context.config.arrowDown);
        $(menu).removeClass(SELECT_CLASS.SHOW);
        $(parent).trigger(SELECT_EVENT.HIDDEN);
    }
};

$(document)
    .on(SELECT_EVENT.CLICK, Select.clearMenus)
    .on(SELECT_EVENT.CLICK, SELECT_SELECTOR.TOGGLE, function (e) {
        e.preventDefault();
        e.stopPropagation();

        Select.jqueryInterface.call($(this), 'toggle', this);
    });

$.fn[SELECT_NAME] = Select.jqueryInterface;
$.fn[SELECT_NAME].constructor = Select;

/*
=========================================================
SELECT2
=========================================================
*/

let SELECT2_NAME = 'zykselect2';
let SELECT2_EVENT_KEY = `${ZYK_DATA_KEY}.${SELECT2_NAME}`;

let SELECT2_DEFAULT = {
    searchPlaceholder: `${lang['000100_25']}...`
};

let SELECT2_EVENT = {
    INIT: `init.${SELECT2_EVENT_KEY}`,
    CLICK: `click.${SELECT2_EVENT_KEY}`,
    SELECT: `select.${SELECT2_EVENT_KEY}`,
    CHANGE: `change.${SELECT2_EVENT_KEY}`,
    SEARCH: `search.${SELECT2_EVENT_KEY}`,
    RESET_SEARCH: `resetsearch.${SELECT2_EVENT_KEY}`,
    BLUR_INPUT: `blur.${SELECT2_EVENT_KEY}`,
    EDIT_INPUT: `editinput.${SELECT2_EVENT_KEY}`,
    CLICK_ADDITION_BUTTON: `clickaddtionbutton.${SELECT2_EVENT_KEY}`,
    SHOW: `show.${SELECT2_EVENT_KEY}`,
    SHOWN: `shown.${SELECT2_EVENT_KEY}`,
    HIDE: `hide.${SELECT2_EVENT_KEY}`,
    HIDDEN: `hidden.${SELECT2_EVENT_KEY}`
};

let SELECT2_CLASS = {
    WRAPPER: 'zyk-select-2-wrapper',
    WRAPPER_ITEM: 'zyk-select-2-item',
    MENU: 'zyk-select-2-menu',
    MENU_HEADER: 'zyk-select-2-menu-header',
    MENU_BODY: 'zyk-select-2-menu-body',
    SEARCH_INPUT: 'zyk-select-2-menu-search',
    SEARCH_BUTTON: 'zyk-select-2-menu-search-button',
    SEARCH_RESET: 'zyk-select-2-menu-reset-search',
    SHOW: 'show',
    GET_VALUE: 'zyk-select-2-get-value'
};

let SELECT2_SELECTOR = {
    TOGGLE: '[data-toggle="zykselect2"]',
    DISMISS: '[data-dismiss="zyk-select-2-item"]',
    WRAPPER: `.${SELECT2_CLASS.WRAPPER}`,
    WRAPPER_ITEM: `.${SELECT2_CLASS.WRAPPER_ITEM}`,
    MENU: `.${SELECT2_CLASS.MENU}`,
    MENU_HEADER: `.${SELECT2_CLASS.MENU_HEADER}`,
    MENU_BODY: `.${SELECT2_CLASS.MENU_BODY}`,
    SEARCH_INPUT: `.${SELECT2_CLASS.SEARCH_INPUT}`,
    SEARCH_BUTTON: `.${SELECT2_CLASS.SEARCH_BUTTON}`,
    SEARCH_RESET: `.${SELECT2_CLASS.SEARCH_RESET}`,
    GET_VALUE: `.${SELECT2_CLASS.GET_VALUE}`,
    OPTGROUP: 'optgroup',
    OPTION: 'option'
};

let Select2 = (function () {
    function Select2(element, config) {
        this.config = this.getConfig(config);

        this.element = element;
        this.parent = this.element.parentElement.parentElement;
        this.wrapper = this.parent.querySelector(SELECT2_SELECTOR.WRAPPER);
        this.menu = this.parent.querySelector(SELECT2_SELECTOR.MENU);

        this.selected = {};
        this.isShown = false;
    }

    const _proto = Select2.prototype;

    _proto.getConfig = function (config) {
        config = zykUtil.configSpread(SELECT2_DEFAULT, config);

        return config;
    };

    _proto.toggle = function () {
        const _this = this;

        let isActive = $(_this.menu).hasClass(SELECT2_CLASS.SHOW);

        Select2.clearMenus();

        if (isActive) {
            return;
        }

        _this.show();
    };

    _proto.show = function () {
        const _this = this;

        $(_this.menu).addClass(SELECT2_CLASS.SHOW);
        $(_this.parent).trigger(SELECT2_EVENT.SHOWN);

        this.isShown = true;

        this.initActions();
    };

    _proto.hide = function () {
        const _this = this;

        $(_this.menu).removeClass(SELECT2_CLASS.SHOW);
        $(_this.parent).trigger(SELECT2_EVENT.HIDDEN);

        this.isShown = false;
    };

    _proto.initActions = function () {
        const _this = this;

        $(_this.menu)
            .find(SELECT2_SELECTOR.GET_VALUE)
            .unbind()
            .on('click', function (e) {
                e.preventDefault();

                let value = $(this).data('value');
                let name = $(this).text().trim();

                if (_this.config.selectSingle) {
                    _this.selected = [];

                    _this.selected.push({
                        name: name,
                        value: value
                    });

                    if (_this.config.input) {
                        _this.selected[0].input = '';
                    }

                    if (_this.config.button) {
                        _this.selected[0].button = {
                            label: _this.config.button,
                            value: ''
                        };
                    }
                } else {
                    if (typeof _this.selected[value] == 'undefined') {
                        _this.selected[value] = {
                            name: name,
                            value: value
                        };
                    }

                    if (_this.config.input) {
                        _this.selected[value].input = '';
                    }

                    if (_this.config.button) {
                        _this.selected[value].button = {
                            label: _this.config.button,
                            value: ''
                        };
                    }
                }

                _this.hide();

                _this.updateWrapper();
            });

        $(_this.menu).on(SELECT2_EVENT.SEARCH, SELECT2_SELECTOR.SEARCH_INPUT, function () {
            let searchKey = $(this).val();
            searchKey = zykUtil.convertSlug(searchKey);

            $(_this.parent)
                .find(SELECT2_SELECTOR.GET_VALUE)
                .filter(function () {
                    $(this)
                        .parent()
                        .toggle(zykUtil.convertSlug($(this).text()).indexOf(searchKey) > -1);
                });

            $(_this.parent).trigger(SELECT2_EVENT.SEARCH);
        });

        $(_this.menu).on(SELECT_EVENT.CLICK, SELECT2_SELECTOR.SEARCH_RESET, function () {
            $(_this.menu).find(SELECT2_SELECTOR.SEARCH_INPUT).val('');
            $(_this.menu).find(SELECT2_SELECTOR.SEARCH_INPUT).trigger(SELECT2_EVENT.SEARCH);
        });
    };

    _proto.updateWrapper = function () {
        const _this = this;

        $(_this.wrapper).find(SELECT2_SELECTOR.WRAPPER_ITEM).remove();

        $.each(_this.selected, (index, item) => {
            let $item = _this.generateItem(item);

            $item.insertBefore($(_this.wrapper).find(SELECT2_SELECTOR.TOGGLE));
        });

        $(_this.parent).trigger(SELECT2_EVENT.CHANGE, [_this.selected]);
    };

    _proto.generateItem = function (data) {
        const _this = this;
        let $item = $('<div class="zyk-select-2-item"></div>');

        $item.append(`
            <p class="p-sm">
                ${data.name}
            </p>
        `);

        if (typeof data.input != 'undefined') {
            if (data.input != '') {
                $item.append(`
                    <div class="input-wrapper">
                        <div class="input-overlay"></div>
                        <input type="text" class="form-control disabled" value="${data.input}" disabled>
                    </div>
                `);
            } else {
                $item.append(`
                    <div class="input-wrapper">
                        <div class="input-overlay"></div>
                        <input type="text" class="form-control disabled" value="Text" disabled>
                    </div>
                `);
            }
        }

        if (typeof data.button != 'undefined') {
            $item.append(`
                <button class="btn btn-addition-button" type="button">
                    ${data.button.label}
                </button>
            `);
        }

        $item.append(`
            <button class="btn" data-dismiss="zyk-select-2-item" type="button">
                <i class="elo el-lg el-close"></i>
            </button>
        `);

        $item
            .unbind()
            .on(SELECT2_EVENT.CLICK, '.input-overlay', function () {
                let disabled = $(this).siblings('input').attr('disabled');

                if (disabled) {
                    $(this).hide();
                    $(this).siblings('input').removeAttr('disabled');
                    $(this).siblings('input').removeClass('disabled');
                } else {
                    $(this).show();
                    $(this).siblings('input').attr('disabled', true);
                    $(this).siblings('input').addClass('disabled');

                    $(this).siblings('input').focus();
                }
            })
            .on(SELECT2_EVENT.BLUR_INPUT, 'input', function () {
                let target = _this.selected.find((item) => {
                    return data.value == item.value;
                });

                target.input = $(this).val();

                $(this).siblings('.input-overlay').show();
                $(this).attr('disabled', true);
                $(this).addClass('disabled');
            })
            .on(SELECT2_EVENT.EDIT_INPUT, 'input', function () {
                $(this).trigger(SELECT2_EVENT.BLUR_INPUT);
            })
            .on(SELECT2_EVENT.CLICK, '.btn-addition-button', function () {
                $(_this.parent).trigger(SELECT2_EVENT.CLICK_ADDITION_BUTTON, [this]);
            })
            .on(SELECT2_EVENT.CLICK, SELECT2_SELECTOR.DISMISS, function () {
                $item.remove();

                let target = _this.selected.find((item) => {
                    return data.value == item.value;
                });

                // delete target

                $(_this.parent).trigger(SELECT2_EVENT.CHANGE, [_this.selected]);
            });

        return $item;
    };

    Select2.jqueryInterface = function (config) {
        return this.each(function () {
            let data = $(this).data(SELECT2_EVENT_KEY);

            let _config = zykUtil.configSpread(SELECT2_DEFAULT, $(this).data(), typeof config == 'object' && config ? config : {});

            if (!data) {
                data = new Select2(this, _config);
                $(this).data(SELECT2_EVENT_KEY, data);
            }

            if (typeof config == 'string') {
                if (typeof data[config] == 'undefined') {
                    throw new TypeError(`No method named ${config}`);
                }

                data[config]();
            } else if (typeof config == 'object') {
                if (Object.keys(config).length > 0) {
                    Object.keys(config).forEach((key) => {
                        if (key === 'selected') {
                            data.selected = config[key];

                            data.updateWrapper();
                        }
                    });
                }
            }
        });
    };

    Select2.clearMenus = function clearMenus(event) {
        let toggles = [].slice.call(document.querySelectorAll(SELECT2_SELECTOR.TOGGLE));

        for (let i = 0; i < toggles.length; i++) {
            let parent = $(toggles[i]).parent();
            let context = $(toggles[i]).data(SELECT2_EVENT_KEY);

            if (!context) {
                continue;
            }

            let dropdownMenu = context.menu;

            if (!$(dropdownMenu).hasClass(SELECT2_CLASS.SHOW)) {
                continue;
            }

            if (event && event.type === 'click' && /input|textarea|select/i.test(event.target.tagName)) {
                continue;
            }

            context.isShown = false;

            $(dropdownMenu).removeClass(SELECT2_CLASS.SHOW);
            $(parent).trigger(SELECT2_EVENT.HIDDEN);
        }
    };

    return Select2;
})();

$(document)
    .on(SELECT2_EVENT.CLICK, Select2.clearMenus)
    .on(SELECT2_EVENT.CLICK, SELECT2_SELECTOR.TOGGLE, function (e) {
        e.preventDefault();
        e.stopPropagation();

        Select2.jqueryInterface.call($(this), 'toggle', this);
    });

$.fn[SELECT2_NAME] = Select2.jqueryInterface;
$.fn[SELECT2_NAME].constructor = Select2;

/*
=========================================================
ZYK TYPE SUGGEST
=========================================================
*/

let TYPE_SUGGEST_NAME = 'zyktypesuggest';
let TYPE_SUGGEST_EVENT_KEY = `${ZYK_DATA_KEY}.${TYPE_SUGGEST_NAME}`;

let TYPE_SUGGEST_KEYCODE = {
    ENTER: 13,
    TAB: 9
};

let TYPE_SUGGEST_EVENT = {
    CLICK: `click.${TYPE_SUGGEST_EVENT_KEY}`,
    INPUT: `input.${TYPE_SUGGEST_EVENT_KEY}`,
    KEYUP: `keyup.${TYPE_SUGGEST_EVENT_KEY}`,
    CHANGE: `change.${TYPE_SUGGEST_EVENT_KEY}`,
    SEARCH: `search.${TYPE_SUGGEST_EVENT_KEY}`,
    RESET_SEARCH: `restsearch.${TYPE_SUGGEST_EVENT_KEY}`,
    SELECT: `selectitem.${TYPE_SUGGEST_EVENT_KEY}`,
    FOCUS: `focus.${TYPE_SUGGEST_EVENT_KEY}`,
    BLUR: `blur.${TYPE_SUGGEST_EVENT_KEY}`
};

let TYPE_SUGGEST_CLASS = {
    INPUT: 'zyk-type-suggest',
    MENU: 'zyk-type-suggest-menu',
    MENU_ITEM: 'zyk-type-suggest-menu-item',
    SHOW: 'show'
};

let TYPE_SUGGEST_SELECTOR = {
    INPUT: `.${TYPE_SUGGEST_CLASS.INPUT}`,
    MENU: `.${TYPE_SUGGEST_CLASS.MENU}`,
    MENU_ITEM: `.${TYPE_SUGGEST_CLASS.MENU_ITEM}`
};

let TYPE_SUGGEST_PLACEMENT = {
    DOWN: 'bottom-start',
    DOWNEND: 'bottom-end',
    UP: 'top-start',
    UPEND: 'top-end',
    LEFT: 'left-start',
    RIGHT: 'right-start'
};

let TYPE_SUGGEST_DEFAULT = {
    queryUrl: '',
    placement: TYPE_SUGGEST_PLACEMENT.DOWN,
    flip: true,
    offset: [0, 0],
    boundary: 'viewport',
    labelNoData: 'No data'
};

let Typesuggest = (function () {
    function Typesuggest(element, config) {
        this.config = this.getConfig(config);

        this.popper = null;
        this.menu = null;

        this.isShowMenu = false;
        this.isRequestingAjax = false;
        this.timeOutQuery = null;

        this.element = element;
    }

    const _proto = Typesuggest.prototype;

    _proto.getConfig = function (config) {
        config = zykUtil.configSpread(TYPE_SUGGEST_DEFAULT, config);

        return config;
    };

    _proto.fire = function () {
        console.log('fire');
    };

    _proto.select = function (key) {
        const _this = this;

        $(_this.element).trigger(TYPE_SUGGEST_EVENT.SELECT, key);
    };

    _proto.search = function () {
        const _this = this;

        Typesuggest.clearMenus();

        let searchKey = $(_this.element).val();

        if (searchKey.trim().length > 0) {
            $(_this.element).trigger(TYPE_SUGGEST_EVENT.SEARCH, searchKey);
        } else {
            return _this.resetSearch();
        }
    };

    _proto.resetSearch = function () {
        const _this = this;

        Typesuggest.clearMenus();
        $(_this.element).trigger(TYPE_SUGGEST_EVENT.RESET_SEARCH);
    };

    _proto.querySearch = function () {
        const _this = this;

        if (_this.timeOutQuery) {
            clearTimeout(_this.timeOutQuery);
        }

        _this.timeOutQuery = setTimeout(() => {
            if (!_this.isRequestingAjax) {
                _this.queryAjax((results) => {
                    _this.getSuggestList(results);
                });
            }
        }, 300);
    };

    _proto.queryAjax = function (callback) {
        const _this = this;

        let results = null;

        let url = _this.config.queryUrl;

        let searchKey = $(_this.element).val();

        if (searchKey.trim().length > 0) {
            url = zykUtil.buildUrl(url, 'q', searchKey);
        } else {
            return _this.resetSearch();
        }

        $.ajax({
            url: url,
            type: 'GET',
            dataType: 'json',
            data: {},
            beforeSend: () => {
                _this.isRequestingAjax = true;
            },
            success: (res) => {
                _this.isRequestingAjax = false;

                if (res.length > 0) {
                    results = [];

                    for (let i = 0; i < res.length; i++) {
                        results.push(res[i]);
                    }
                }

                callback(results);
            },
            error: () => {
                callback(results);
            }
        });
    };

    _proto.getSuggestList = function (data) {
        const _this = this;

        if (data && Array.isArray(data)) {
        } else {
            data = [];
        }

        _this.getSuggestMenu(data);
    };

    _proto.getSuggestMenu = function (data) {
        const _this = this;

        let searchKey = $(_this.element).val();

        Typesuggest.clearMenus();

        if (!zykUtil.checkPopper()) {
            return;
        }

        let $menu;
        _this.menu = document.createElement('div');
        _this.menu.classList.add('zyk-type-suggest-menu');

        _this.popper = Popper.createPopper(_this.element, _this.menu, _this.getPopperConfig());

        $menu = $(_this.menu);

        if (data.length > 0) {
            data.forEach((item) => {
                let $item = $(`
                    <a href="#" class="zyk-type-suggest-menu-item">
                        ${zykUtil.replaceAll(item, searchKey, `<b>${searchKey}</b>`)}
                    </a>
                `);

                $item.unbind().on('click', function () {
                    Typesuggest.clearMenus();

                    return _this.select(item);
                });

                $menu.append($item);
            });
        } else {
            $menu.append(`
              <a href="javascript:void(0);" class="zyk-type-suggest-menu-item disabled">
                    ${_this.config.labelNoData}
                </a>
            `);
        }

        $('body').append($menu);

        $menu.css({
            width: $(_this.element).width()
        });

        $menu.addClass('show');

        _this.isShowMenu = true;
    };

    _proto.getOffset = function () {
        const _this = this;

        let offset = _this.config.offset;

        if (typeof offset == 'string') {
            offset.replace(',', ' ');
            offset = offset.split(',').map(Number);
        }

        return offset;
    };

    _proto.getPlacement = function () {
        const _this = this;

        let placement = _this.config.placement;

        return placement;
    };

    _proto.getPopperConfig = function () {
        const _this = this;

        let popperConfig = {
            placement: _this.getPlacement(),
            modifiers: [
                {
                    name: 'offset',
                    options: {
                        offset: _this.getOffset()
                    }
                },
                {
                    name: 'flip',
                    enabled: _this.config.flip,
                    options: {
                        boundary: _this.config.boundary
                    }
                }
            ]
        };

        return popperConfig;
    };

    Typesuggest.jqueryInterface = function (config) {
        return this.each(function () {
            let data = $(this).data(TYPE_SUGGEST_EVENT_KEY);

            let _config = zykUtil.configSpread(TYPE_SUGGEST_DEFAULT, $(this).data(), typeof config == 'object' && config ? config : {});

            if (!data) {
                data = new Typesuggest(this, _config);
                $(this).data(TYPE_SUGGEST_EVENT_KEY, data);
            }

            if (typeof config == 'string') {
                if (typeof data[config] == 'undefined') {
                    throw new TypeError(`No method named ${config}`);
                }

                data[config]();
            }
        });
    };

    Typesuggest.clearMenus = function () {
        let toggles = [].slice.call(document.querySelectorAll(TYPE_SUGGEST_SELECTOR.INPUT));

        for (let i = 0; i < toggles.length; i++) {
            let context = $(toggles[i]).data(TYPE_SUGGEST_EVENT_KEY);

            if (!context) {
                continue;
            }

            let suggestMenu = context.menu;

            if (!$(suggestMenu).hasClass(TYPE_SUGGEST_CLASS.SHOW)) {
                continue;
            }

            if (event && event.type === 'click' && /input|textarea|select/i.test(event.target.tagName)) {
                continue;
            }

            if (context.popper) {
                context.popper.destroy();
            }

            context.isShowMenu = false;

            $(suggestMenu).removeClass(TYPE_SUGGEST_CLASS.SHOW);
            $(suggestMenu).remove();
        }
    };

    return Typesuggest;
})();

$(document)
    .on(TYPE_SUGGEST_EVENT.CLICK, Typesuggest.clearMenus)
    .on(TYPE_SUGGEST_EVENT.KEYUP, TYPE_SUGGEST_SELECTOR.INPUT, function (e) {
        if (e.keyCode === TYPE_SUGGEST_KEYCODE.ENTER) {
            Typesuggest.jqueryInterface.call($(this), 'search');
            Typesuggest.clearMenus();

            return;
        } else if (e.keyCode === TYPE_SUGGEST_KEYCODE.TAB) {
            Typesuggest.clearMenus();

            return;
        }

        Typesuggest.jqueryInterface.call($(this), 'querySearch');
    })
    .on(TYPE_SUGGEST_EVENT.FOCUS, TYPE_SUGGEST_SELECTOR.INPUT, function () {
        Typesuggest.clearMenus();
    });

$.fn[TYPE_SUGGEST_NAME] = Typesuggest.jqueryInterface;
$.fn[TYPE_SUGGEST_NAME].constructor = Typesuggest;
