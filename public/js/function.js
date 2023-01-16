include_ext('/edulive_draw/drawlib.js');
include('/js/slide_common.js');

let currentElement = localStorage.getItem('edulive_current_element');

let canvas_size = 700;
let canvas = null;

$(document).ready(function () {
    if (typeof currentElement != 'undefined') {
        $(`.btn-load-content[data-content="${currentElement}"]`).parent().show();
        $(`.btn-load-content[data-content="${currentElement}"]`).parent().siblings('.btn-expand-item').addClass('active');

        loadContent(currentElement);
    }

    $('.btn-expand-item')
        .unbind()
        .on('click', function () {
            $(this).siblings('.nav-item-wrapper').slideToggle();
            $(this).toggleClass('active');
        });

    $('.btn-load-content')
        .unbind()
        .on('click', function () {
            let content = $(this).data('content');

            localStorage.setItem('edulive_current_element', content);

            loadContent(content);
        });
});

function loadContent(content) {
    let url = '/elements/loadContent';
    url = elApp.buildUrl(url, 'content', content);

    elApp.callAjax({
        url: url,
        method: 'GET',
        success: (res) => {
            $('#appendContent').html(res.html);

            switch (content) {
                case 'icon':
                    initIcon();
                    break;
                case 'icon-generate':
                    initIconGenerate();
                    break;
                case 'autosuggest':
                    break;
                case 'zykselect':
                    initZykSelect();
                    break;
                case 'zykmultiselect':
                    initZykMultiSelect();
                    break;
                case 'form-check':
                    initFormCheck();
                    break;
                case 'do-calendar':
                    initDoCalendar();
                    break;
                case 'type-suggest':
                    initTypeSuggest();
                    break;
                case 'zyk-calendar':
                    initCalendar();
                    break;
                case 'zyk-dialog':
                    initDialog();
                    break;
                case 'zyk-timeliner':
                    initTimeliner();
                    break;
                case 'zyk-gradient':
                    initGradient();
                    break;
                case 'ppt-xml-reader':
                    initPptXmlReader();
                    break;
            }

            highlightCode();

            // hljs.highlightAll();
        },
        error: () => {
            new Notification({
                type: 'danger',
                content: 'Error'
            });
        }
    });
}

function highlightCode() {
    $('.view-source')
        .find('.need-highlight')
        .each(function () {
            let language = $(this).data('language');

            let code = $(this).find('.code').html();

            let html = hljs.highlight(code, { language: language });

            let value = html.value;

            $(this)
                .find('.btn-copy')
                .unbind()
                .on('click', function () {
                    let textarea = document.createElement('textarea');
                    textarea.setAttribute('value', code);
                    textarea.innerHTML = code;
                    document.body.appendChild(textarea);
                    textarea.select();
                    document.execCommand('copy');
                    document.body.removeChild(textarea);
                });

            $(this).find('.code').replaceWith(`
                <div class="highlight">
                    <pre>
                        <code>
                            ${value}
                        </code>
                    </pre>
                </div>
            `);
        });
}

function initIcon() {
    let elo = {
        'el-add-event': 'e900',
        'el-add-gv': 'e901',
        'el-add-resource': 'e902',
        'el-add-sv': 'e903',
        'el-add-timer': 'e904',
        'el-align-bottom': 'e905',
        'el-align-center': 'e906',
        'el-align-justify': 'e907',
        'el-align-left': 'e908',
        'el-align-middle': 'e909',
        'el-align-right': 'e90a',
        'el-align-top': 'e90b',
        'el-angle': 'e90c',
        'el-application': 'e90d',
        'el-arrow-down': 'e90e',
        'el-arrow-left': 'e90f',
        'el-arrow-right': 'e910',
        'el-arrow-up': 'e911',
        'el-as-collision': 'e912',
        'el-as-drag': 'e913',
        'el-as-object-select': 'e914',
        'el-as-ref-action': 'e915',
        'el-as-resource-select': 'e916',
        'el-as-run-on-path': 'e917',
        'el-as-slide-load': 'e918',
        'el-as-text-change': 'e919',
        'el-as-to-slide': 'e91a',
        'el-as-value-change': 'e91b',
        'el-attachment': 'e91c',
        'el-background': 'e91d',
        'el-backward': 'e91e',
        'el-badge': 'e91f',
        'el-bell': 'e920',
        'el-book': 'e921',
        'el-book-info': 'e922',
        'el-book-open': 'e923',
        'el-book-open-quiz': 'e924',
        'el-book-window': 'e925',
        'el-book-window-2': 'e926',
        'el-bookmark': 'e927',
        'el-bring-back': 'e928',
        'el-bring-bottom': 'e929',
        'el-bring-front': 'e92a',
        'el-bring-top': 'e92b',
        'el-buy-online': 'e92c',
        'el-calendar': 'e92d',
        'el-camera': 'e92e',
        'el-canvas': 'e92f',
        'el-caret-down': 'e930',
        'el-caret-left': 'e931',
        'el-caret-right': 'e932',
        'el-caret-up': 'e933',
        'el-caret-up-down': 'e934',
        'el-cart': 'e935',
        'el-cart-window': 'e936',
        'el-chalkboard': 'e937',
        'el-chalkboard-users': 'e938',
        'el-change': 'e939',
        'el-change-lock': 'e93a',
        'el-chart': 'e93b',
        'el-chart-bar': 'e93c',
        'el-chart-bubble': 'e93d',
        'el-chart-line': 'e93e',
        'el-chart-pie': 'e93f',
        'el-chart-polar': 'e940',
        'el-chart-radar': 'e941',
        'el-chat': 'e942',
        'el-chat-plus': 'e943',
        'el-chats': 'e944',
        'el-check': 'e945',
        'el-check-circle': 'e946',
        'el-check-shield': 'e947',
        'el-check-square': 'e948',
        'el-checklist': 'e949',
        'el-circle': 'e94a',
        'el-class-live': 'e94b',
        'el-class-tree': 'e94c',
        'el-classroom': 'e94d',
        'el-click': 'e94e',
        'el-clock': 'e94f',
        'el-clock-warning': 'e950',
        'el-close': 'e951',
        'el-cloud': 'e952',
        'el-code-window': 'e953',
        'el-cog': 'e954',
        'el-cogs': 'e955',
        'el-column-1': 'e956',
        'el-column-2': 'e957',
        'el-column-3': 'e958',
        'el-column-4': 'e959',
        'el-comment': 'e95a',
        'el-component': 'e95b',
        'el-config': 'e95c',
        'el-copy': 'e95d',
        'el-copy-property': 'e95e',
        'el-course': 'e95f',
        'el-crm': 'e960',
        'el-cross-inner': 'e961',
        'el-cross-outer': 'e962',
        'el-cursor': 'e963',
        'el-dashboard': 'e964',
        'el-desktop': 'e965',
        'el-document': 'e966',
        'el-document-box': 'e967',
        'el-document-plus': 'e968',
        'el-double-caret-down': 'e969',
        'el-double-caret-left': 'e96a',
        'el-double-caret-right': 'e96b',
        'el-double-caret-up': 'e96c',
        'el-double-check': 'e96d',
        'el-download': 'e96e',
        'el-download-2': 'e96f',
        'el-draw': 'e970',
        'el-dropdown': 'e971',
        'el-edit': 'e972',
        'el-effect': 'e973',
        'el-ellipsis-h': 'e974',
        'el-ellipsis-v': 'e975',
        'el-emotions': 'e976',
        'el-envelope': 'e977',
        'el-eraser': 'e978',
        'el-exam': 'e979',
        'el-exercise': 'e97a',
        'el-exit': 'e97b',
        'el-eye': 'e97c',
        'el-eye-dropper': 'e97d',
        'el-file-lms': 'e97e',
        'el-file-report': 'e97f',
        'el-fill': 'e980',
        'el-filter': 'e981',
        'el-firework': 'e982',
        'el-flag': 'e983',
        'el-folder': 'e984',
        'el-folder-move': 'e985',
        'el-folder-plus': 'e986',
        'el-font': 'e987',
        'el-forward': 'e988',
        'el-fullview': 'e989',
        'el-global': 'e98a',
        'el-google-drive': 'e98b',
        'el-grid': 'e98c',
        'el-group': 'e98d',
        'el-hand': 'e98e',
        'el-heart': 'e98f',
        'el-history': 'e990',
        'el-holder': 'e991',
        'el-home': 'e992',
        'el-home-2': 'e993',
        'el-image': 'e994',
        'el-images': 'e995',
        'el-inbox': 'e996',
        'el-indent-left': 'e997',
        'el-indent-right': 'e998',
        'el-info-circle': 'e999',
        'el-laptop': 'e99a',
        'el-layer': 'e99b',
        'el-learner': 'e99c',
        'el-learner-close': 'e99d',
        'el-learner-plus': 'e99e',
        'el-like': 'e99f',
        'el-lipsync': 'e9a0',
        'el-list': 'e9a1',
        'el-list-edit': 'e9a2',
        'el-list-plus': 'e9a3',
        'el-list-quiz': 'e9a4',
        'el-lock': 'e9a5',
        'el-medal': 'e9a6',
        'el-media': 'e9a7',
        'el-microphone': 'e9a8',
        'el-minus': 'e9a9',
        'el-mobile-rotate': 'e9aa',
        'el-money': 'e9ab',
        'el-move': 'e9ac',
        'el-news': 'e9ad',
        'el-next': 'e9ae',
        'el-note': 'e9af',
        'el-note-edit': 'e9b0',
        'el-note-pin': 'e9b1',
        'el-obj-align-bottom': 'e9b2',
        'el-obj-align-center': 'e9b3',
        'el-obj-align-h': 'e9b4',
        'el-obj-align-left': 'e9b5',
        'el-obj-align-middle': 'e9b6',
        'el-obj-align-right': 'e9b7',
        'el-obj-align-top': 'e9b8',
        'el-obj-align-v': 'e9b9',
        'el-opacity': 'e9ba',
        'el-outbox': 'e9bb',
        'el-pallete': 'e9bc',
        'el-paper-plane': 'e9bd',
        'el-paste': 'e9be',
        'el-paste-property': 'e9bf',
        'el-pause': 'e9c0',
        'el-pencil': 'e9c1',
        'el-pencil-change': 'e9c2',
        'el-pens': 'e9c3',
        'el-phone': 'e9c4',
        'el-pin': 'e9c5',
        'el-play': 'e9c6',
        'el-play-circle': 'e9c7',
        'el-play-square': 'e9c8',
        'el-plus': 'e9c9',
        'el-plus-circle': 'e9ca',
        'el-prev': 'e9cb',
        'el-preview': 'e9cc',
        'el-print': 'e9cd',
        'el-process': 'e9ce',
        'el-puzzle': 'e9cf',
        'el-question-mark': 'e9d0',
        'el-quiz-circle': 'e9d1',
        'el-quiz-drag': 'e9d2',
        'el-quiz-essay': 'e9d3',
        'el-quiz-image': 'e9d4',
        'el-quiz-match': 'e9d5',
        'el-quiz-multi': 'e9d6',
        'el-quiz-single': 'e9d7',
        'el-quiz-yes-no': 'e9d8',
        'el-quizs': 'e9d9',
        'el-quizs-2': 'e9da',
        'el-random': 'e9db',
        'el-ranking': 'e9dc',
        'el-rating': 'e9dd',
        'el-record': 'e9de',
        'el-redo': 'e9df',
        'el-reply': 'e9e0',
        'el-rotate-view': 'eac8',
        'el-save': 'e9e1',
        'el-scale-down': 'e9e2',
        'el-scale-up': 'e9e3',
        'el-scroll-h': 'e9e4',
        'el-scroll-v': 'e9e5',
        'el-search': 'e9e6',
        'el-shapes': 'e9e7',
        'el-share': 'e9e8',
        'el-share-screen': 'e9e9',
        'el-shopping-cart': 'e9ea',
        'el-slide': 'e9eb',
        'el-slide-plus': 'e9ec',
        'el-source-tree': 'e9ed',
        'el-sprite': 'e9ee',
        'el-square': 'e9ef',
        'el-square-circle': 'e9f0',
        'el-square-rounded': 'e9f1',
        'el-stair': 'e9f2',
        'el-star': 'e9f3',
        'el-stop-watch': 'e9f4',
        'el-store': 'e9f5',
        'el-sub-add': 'e9f6',
        'el-submit-exercise': 'e9f7',
        'el-table': 'e9f8',
        'el-tag': 'e9f9',
        'el-text-edit': 'e9fa',
        'el-text-line-height': 'e9fb',
        'el-text-spacing': 'eac7',
        'el-textbox': 'e9fc',
        'el-ticket': 'e9fd',
        'el-tool-advanced-path': 'e9fe',
        'el-tool-advanced-slider': 'e9ff',
        'el-tool-anchor': 'ea00',
        'el-tool-animation-path': 'ea01',
        'el-tool-arrow': 'ea02',
        'el-tool-arrow-2': 'ea03',
        'el-tool-box': 'ea04',
        'el-tool-draw': 'ea05',
        'el-tool-hightlight': 'ea06',
        'el-tool-mindmap-1': 'ea07',
        'el-tool-mindmap-2': 'ea08',
        'el-tool-orbit': 'ea09',
        'el-tool-path': 'ea0a',
        'el-tool-path-point-s': 'ea0b',
        'el-tool-path-point-v': 'ea0c',
        'el-tool-region': 'ea0d',
        'el-tool-shape-1': 'ea0e',
        'el-tool-shape-1-a': 'ea0f',
        'el-tool-shape-10': 'ea10',
        'el-tool-shape-100': 'ea11',
        'el-tool-shape-101': 'ea12',
        'el-tool-shape-102': 'ea13',
        'el-tool-shape-103': 'ea14',
        'el-tool-shape-104': 'ea15',
        'el-tool-shape-108': 'ea16',
        'el-tool-shape-109': 'ea17',
        'el-tool-shape-11': 'ea18',
        'el-tool-shape-110': 'ea19',
        'el-tool-shape-111': 'ea1a',
        'el-tool-shape-112': 'ea1b',
        'el-tool-shape-116': 'ea1c',
        'el-tool-shape-117': 'ea1d',
        'el-tool-shape-118': 'ea1e',
        'el-tool-shape-119': 'ea1f',
        'el-tool-shape-12': 'ea20',
        'el-tool-shape-120': 'ea21',
        'el-tool-shape-121': 'ea22',
        'el-tool-shape-122': 'ea23',
        'el-tool-shape-123': 'ea24',
        'el-tool-shape-124': 'ea25',
        'el-tool-shape-125': 'ea26',
        'el-tool-shape-126': 'ea27',
        'el-tool-shape-127': 'ea28',
        'el-tool-shape-128': 'ea29',
        'el-tool-shape-129': 'ea2a',
        'el-tool-shape-13': 'ea2b',
        'el-tool-shape-130': 'ea2c',
        'el-tool-shape-131': 'ea2d',
        'el-tool-shape-132': 'ea2e',
        'el-tool-shape-133': 'ea2f',
        'el-tool-shape-134': 'ea30',
        'el-tool-shape-135': 'ea31',
        'el-tool-shape-136': 'ea32',
        'el-tool-shape-137': 'ea33',
        'el-tool-shape-138': 'ea34',
        'el-tool-shape-139': 'ea35',
        'el-tool-shape-14': 'ea36',
        'el-tool-shape-140': 'ea37',
        'el-tool-shape-141': 'ea38',
        'el-tool-shape-142': 'ea39',
        'el-tool-shape-143': 'ea3a',
        'el-tool-shape-144': 'ea3b',
        'el-tool-shape-145': 'ea3c',
        'el-tool-shape-146': 'ea3d',
        'el-tool-shape-147': 'ea3e',
        'el-tool-shape-148': 'ea3f',
        'el-tool-shape-149': 'ea40',
        'el-tool-shape-15': 'ea41',
        'el-tool-shape-150': 'ea42',
        'el-tool-shape-151': 'ea43',
        'el-tool-shape-152': 'ea44',
        'el-tool-shape-153': 'ea45',
        'el-tool-shape-154': 'ea46',
        'el-tool-shape-155': 'ea47',
        'el-tool-shape-156': 'ea48',
        'el-tool-shape-157': 'ea49',
        'el-tool-shape-158': 'ea4a',
        'el-tool-shape-159': 'ea4b',
        'el-tool-shape-16': 'ea4c',
        'el-tool-shape-160': 'ea4d',
        'el-tool-shape-161': 'ea4e',
        'el-tool-shape-162': 'ea4f',
        'el-tool-shape-163': 'ea50',
        'el-tool-shape-164': 'ea51',
        'el-tool-shape-165': 'ea52',
        'el-tool-shape-166': 'ea53',
        'el-tool-shape-167': 'ea54',
        'el-tool-shape-168': 'ea55',
        'el-tool-shape-169': 'ea56',
        'el-tool-shape-17': 'ea57',
        'el-tool-shape-170': 'ea58',
        'el-tool-shape-171': 'ea59',
        'el-tool-shape-172': 'ea5a',
        'el-tool-shape-18': 'ea5b',
        'el-tool-shape-19': 'ea5c',
        'el-tool-shape-2': 'ea5d',
        'el-tool-shape-2-a': 'ea5e',
        'el-tool-shape-20': 'ea5f',
        'el-tool-shape-21': 'ea60',
        'el-tool-shape-22': 'ea61',
        'el-tool-shape-23': 'ea62',
        'el-tool-shape-24': 'ea63',
        'el-tool-shape-25': 'ea64',
        'el-tool-shape-26': 'ea65',
        'el-tool-shape-27': 'ea66',
        'el-tool-shape-28': 'ea67',
        'el-tool-shape-29': 'ea68',
        'el-tool-shape-3': 'ea69',
        'el-tool-shape-30': 'ea6a',
        'el-tool-shape-31': 'ea6b',
        'el-tool-shape-32': 'ea6c',
        'el-tool-shape-33': 'ea6d',
        'el-tool-shape-34': 'ea6e',
        'el-tool-shape-35': 'ea6f',
        'el-tool-shape-36': 'ea70',
        'el-tool-shape-37': 'ea71',
        'el-tool-shape-38': 'ea72',
        'el-tool-shape-39': 'ea73',
        'el-tool-shape-4': 'ea74',
        'el-tool-shape-40': 'ea75',
        'el-tool-shape-41': 'ea76',
        'el-tool-shape-42': 'ea77',
        'el-tool-shape-43': 'ea78',
        'el-tool-shape-44': 'ea79',
        'el-tool-shape-45': 'ea7a',
        'el-tool-shape-46': 'ea7b',
        'el-tool-shape-47': 'ea7c',
        'el-tool-shape-48': 'ea7d',
        'el-tool-shape-49': 'ea7e',
        'el-tool-shape-5': 'ea7f',
        'el-tool-shape-50': 'ea80',
        'el-tool-shape-51': 'ea81',
        'el-tool-shape-52': 'ea82',
        'el-tool-shape-53': 'ea83',
        'el-tool-shape-54': 'ea84',
        'el-tool-shape-55': 'ea85',
        'el-tool-shape-56': 'ea86',
        'el-tool-shape-59': 'ea87',
        'el-tool-shape-6': 'ea88',
        'el-tool-shape-60': 'ea89',
        'el-tool-shape-61': 'ea8a',
        'el-tool-shape-62': 'ea8b',
        'el-tool-shape-63': 'ea8c',
        'el-tool-shape-64': 'ea8d',
        'el-tool-shape-67': 'ea8e',
        'el-tool-shape-68': 'ea8f',
        'el-tool-shape-69': 'ea90',
        'el-tool-shape-7': 'ea91',
        'el-tool-shape-70': 'ea92',
        'el-tool-shape-71': 'ea93',
        'el-tool-shape-72': 'ea94',
        'el-tool-shape-76': 'ea95',
        'el-tool-shape-77': 'ea96',
        'el-tool-shape-78': 'ea97',
        'el-tool-shape-79': 'ea98',
        'el-tool-shape-8': 'ea99',
        'el-tool-shape-80': 'ea9a',
        'el-tool-shape-84': 'ea9b',
        'el-tool-shape-85': 'ea9c',
        'el-tool-shape-86': 'ea9d',
        'el-tool-shape-87': 'ea9e',
        'el-tool-shape-88': 'ea9f',
        'el-tool-shape-9': 'eaa0',
        'el-tool-shape-92': 'eaa1',
        'el-tool-shape-93': 'eaa2',
        'el-tool-shape-94': 'eaa3',
        'el-tool-shape-95': 'eaa4',
        'el-tool-shape-96': 'eaa5',
        'el-tool-slider': 'eaa6',
        'el-tool-stroke-bottom': 'eaa7',
        'el-tool-stroke-center': 'eaa8',
        'el-tool-stroke-full': 'eaa9',
        'el-tool-stroke-inner': 'eaaa',
        'el-tool-stroke-left': 'eaab',
        'el-tool-stroke-less': 'eaac',
        'el-tool-stroke-middle': 'eaad',
        'el-tool-stroke-outer': 'eaae',
        'el-tool-stroke-right': 'eaaf',
        'el-tool-stroke-top': 'eab0',
        'el-trash': 'eab1',
        'el-trophy': 'eab2',
        'el-undo': 'eab3',
        'el-ungroup': 'eab4',
        'el-unlock': 'eab5',
        'el-upload': 'eab6',
        'el-user': 'eab7',
        'el-user-clock': 'eab8',
        'el-user-cog': 'eab9',
        'el-user-list': 'eaba',
        'el-user-plus': 'eabb',
        'el-user-private': 'eabc',
        'el-user-raise-hand': 'eabd',
        'el-users': 'eabe',
        'el-video': 'eabf',
        'el-video-live': 'eac0',
        'el-volume-down': 'eac1',
        'el-volume-up': 'eac2',
        'el-warning-circle': 'eac3',
        'el-warning-triangle': 'eac4',
        'el-wifi': 'eac5',
        'el-youtube': 'eac6'
    };

    let els = {
        'el-align-top': 'e900',
        'el-animation-delay': 'e901',
        'el-animation-minus': 'e902',
        'el-animation-plus': 'e903',
        'el-arrow-down': 'e905',
        'el-arrow-left': 'e906',
        'el-arrow-right': 'e907',
        'el-arrow-up': 'e90f',
        'el-as': 'e908',
        'el-background': 'e909',
        'el-backward': 'e90a',
        'el-badge': 'e90b',
        'el-bell': 'e90c',
        'el-book': 'e910',
        'el-book-info': 'e9d8',
        'el-book-open': 'e90d',
        'el-book-window-2': 'e904',
        'el-bookmark': 'e90e',
        'el-bring-back': 'e911',
        'el-bring-bottom': 'e912',
        'el-bring-front': 'e914',
        'el-bring-top': 'e917',
        'el-bullet-square': 'e913',
        'el-buy-online': 'e918',
        'el-calendar': 'e915',
        'el-camera': 'e916',
        'el-caret-down': 'e919',
        'el-caret-left': 'e91a',
        'el-caret-right': 'e9c3',
        'el-caret-up': 'e9c4',
        'el-cart': 'e9d9',
        'el-chalkboard': 'e9cb',
        'el-chalkboard-users': 'e9c5',
        'el-change': 'e91b',
        'el-change-lock': 'e91c',
        'el-change-network': 'e91d',
        'el-chart': 'e91e',
        'el-chat': 'e91f',
        'el-chats': 'e920',
        'el-check-circle': 'e921',
        'el-check-shield': 'e9c6',
        'el-check-square': 'e922',
        'el-circle': 'e923',
        'el-class-live': 'e924',
        'el-classroom': 'e926',
        'el-clock': 'e925',
        'el-close': 'e9c8',
        'el-cloud': 'e9c9',
        'el-code-window': 'e927',
        'el-cog': 'e928',
        'el-comment': 'e929',
        'el-component': 'e92a',
        'el-copy': 'e92b',
        'el-course': 'e92c',
        'el-crash': 'e92d',
        'el-cursor': 'e92e',
        'el-dashboard': 'e92f',
        'el-desktop': 'e930',
        'el-devices': 'e931',
        'el-document-plus': 'e932',
        'el-download-2': 'e9de',
        'el-draw': 'e933',
        'el-dropdown': 'e9cd',
        'el-envelope': 'e934',
        'el-eraser': 'e935',
        'el-exercise': 'e936',
        'el-exit': 'e937',
        'el-eye': 'e938',
        'el-fade-in': 'e998',
        'el-fade-out': 'e999',
        'el-file': 'e939',
        'el-file-audio': 'e93a',
        'el-file-exercise': 'e93b',
        'el-file-gif': 'e93c',
        'el-file-img': 'e93d',
        'el-file-lms': 'e93e',
        'el-file-pdf': 'e93f',
        'el-file-ppt': 'e940',
        'el-file-report': 'e9d1',
        'el-file-slide': 'e941',
        'el-file-video': 'e942',
        'el-file-word': 'e943',
        'el-file-xls': 'e944',
        'el-file-youtube': 'e945',
        'el-fill': 'e946',
        'el-filter': 'e947',
        'el-firework': 'e948',
        'el-flag': 'e949',
        'el-folder': 'e94a',
        'el-folder-move': 'e9da',
        'el-font': 'e94b',
        'el-forward': 'e94c',
        'el-fullview': 'e94d',
        'el-global': 'e94e',
        'el-google-drive': 'e94f',
        'el-grid': 'e950',
        'el-hand': 'e951',
        'el-heart': 'e952',
        'el-home': 'e953',
        'el-home-2': 'e9d5',
        'el-images': 'e954',
        'el-info-circle': 'e955',
        'el-join': 'e956',
        'el-layer': 'e957',
        'el-learner': 'e958',
        'el-learner-close': 'e959',
        'el-learner-plus': 'e95a',
        'el-like': 'e9cc',
        'el-lipsync': 'e9dd',
        'el-list': 'e95b',
        'el-list-edit': 'e95c',
        'el-list-plus': 'e95d',
        'el-listen': 'e95e',
        'el-lock': 'e95f',
        'el-medal': 'e9d2',
        'el-media': 'e960',
        'el-microphone': 'e961',
        'el-money': 'e962',
        'el-news': 'e963',
        'el-next': 'e964',
        'el-note': 'e965',
        'el-note-pin': 'e9b2',
        'el-obj-align-bottom': 'e966',
        'el-obj-align-center': 'e967',
        'el-obj-align-h': 'e968',
        'el-obj-align-left': 'e969',
        'el-obj-align-middle': 'e96a',
        'el-obj-align-right': 'e96b',
        'el-obj-align-top': 'e96c',
        'el-obj-align-v': 'e96d',
        'el-pallete': 'e96e',
        'el-paper-plane': 'e96f',
        'el-paste': 'e970',
        'el-pencil': 'e971',
        'el-pens': 'e972',
        'el-phone': 'e973',
        'el-pin': 'e974',
        'el-play': 'e975',
        'el-play-circle': 'e976',
        'el-play-square': 'e977',
        'el-plus': 'e978',
        'el-plus-circle': 'e979',
        'el-power': 'e97a',
        'el-prev': 'e97b',
        'el-preview': 'e97c',
        'el-print': 'e9db',
        'el-process': 'e9ce',
        'el-puzzle': 'e97d',
        'el-question-mark': 'e9c1',
        'el-quiz-circle': 'e97e',
        'el-quiz-drag': 'e97f',
        'el-quiz-essay': 'e9d3',
        'el-quiz-image': 'e980',
        'el-quiz-match': 'e981',
        'el-quiz-multi': 'e982',
        'el-quiz-single': 'e983',
        'el-quiz-yes-no': 'e984',
        'el-quizs': 'e985',
        'el-quizs-2': 'e9d4',
        'el-random': 'e9cf',
        'el-ranking': 'e986',
        'el-record': 'e987',
        'el-redo': 'e988',
        'el-refresh-cam': 'e989',
        'el-refresh-live': 'e98a',
        'el-reply': 'e98b',
        'el-save': 'e98c',
        'el-scale-down': 'e98d',
        'el-scale-up': 'e98e',
        'el-scroll-h': 'e98f',
        'el-scroll-v': 'e990',
        'el-search': 'e991',
        'el-shapes': 'e992',
        'el-share': 'e993',
        'el-share-screen': 'e994',
        'el-shopping-cart': 'e995',
        'el-sign-dollar': 'e996',
        'el-size-contain': 'e99a',
        'el-size-cover': 'e99b',
        'el-slide': 'e997',
        'el-source-tree': 'e9dc',
        'el-speak': 'e99e',
        'el-sprite': 'e99f',
        'el-square': 'e9a0',
        'el-square-circle': 'e9a1',
        'el-square-rounded': 'e9a2',
        'el-star': 'e9a3',
        'el-star-half': 'e9c7',
        'el-stopwatch': 'e9a4',
        'el-store': 'e9df',
        'el-submit-exercise': 'e9a5',
        'el-sync-check': 'e9a6',
        'el-sync-close': 'e9a7',
        'el-table': 'e9a8',
        'el-tag': 'e9d6',
        'el-text-bold': 'e9a9',
        'el-text-edit': 'e9aa',
        'el-text-italic': 'e9ab',
        'el-text-strikethrough': 'e9ac',
        'el-text-underline': 'e9ad',
        'el-textbox': 'e9ae',
        'el-to-background': 'e9af',
        'el-tool-box': 'e9d0',
        'el-tool-shape-1': 'e99c',
        'el-tool-shape-2': 'e99d',
        'el-trash': 'e9b0',
        'el-trophy': 'e9d7',
        'el-undo': 'e9b1',
        'el-unlock': 'e9ca',
        'el-user': 'e9b3',
        'el-user-clock': 'e9b4',
        'el-user-plus': 'e9c2',
        'el-user-private': 'e9b5',
        'el-user-raise-hand': 'e9b6',
        'el-users': 'e9b7',
        'el-video': 'e9b8',
        'el-video-live': 'e9b9',
        'el-video-waiting': 'e9ba',
        'el-volume-down': 'e9bb',
        'el-volume-up': 'e9bc',
        'el-warning-circle': 'e9bd',
        'el-warning-network': 'e9be',
        'el-warning-triangle': 'e9bf',
        'el-youtube': 'e9c0'
    };

    let elc = {
        'el-check-circle': 'e900',
        'el-check-square': 'e901',
        'el-circle': 'e902',
        'el-exercise': 'e903',
        'el-eye': 'e90a',
        'el-file-audio': 'e904',
        'el-file-video': 'e905',
        'el-image': 'e90c',
        'el-move': 'e90d',
        'el-note-pin': 'e90b',
        'el-pencil': 'e906',
        'el-plus-circle': 'e90e',
        'el-quiz-multi': 'e907',
        'el-quiz-single': 'e908',
        'el-square-rounded': 'e909',
        'el-trash': 'e90f'
    };

    $.each(els, function (key, value) {
        let icon = `
			<div class="col-md-4">
				<div class="item-icon">
					<i class="els el-2x ${key}"></i>
					<span>${key}</span>
					<span>\\${value}</span>
				</div>
			</div>
		`;

        $('#appendEls').append(icon);
    });

    $.each(elo, function (key, value) {
        let icon = `
			<div class="col-md-4">
				<div class="item-icon">
					<i class="elo el-2x ${key}"></i>
					<span>${key}</span>
					<span>\\${value}</span>
				</div>
			</div>
		`;

        $('#appendElo').append(icon);
    });

    $.each(elc, function (key, value) {
        let icon = `
			<div class="col-md-4">
				<div class="item-icon">
					<i class="elc el-2x ${key}"></i>
					<span>${key}</span>
					<span>\\${value}</span>
				</div>
			</div>
		`;

        $('#appendElc').append(icon);
    });

    $('#inputSearchIcon')
        .unbind()
        .on('search', function () {
            let value = $(this).val().toLowerCase();

            $('.item-icon')
                .parent()
                .filter(function () {
                    $(this).toggle($(this).find('span').text().toLowerCase().indexOf(value) > -1);
                });
        });
}

function initIconGenerate() {
    $('#btnGenerateIcon')
        .unbind()
        .on('click', function () {
            let input = $('#inputCode').val();
            let $append = $('#codeAppend');
            let $outputArray = $('#outputCodeArray');
            let $outputSCSS = $('#outputSCSS');

            let icon_arr = [];

            $append.html('');
            $append.append(input);

            let icon = [];
            let unicode = [];

            let $div = $append.find('[class^="icon-"]');

            $div.each(function () {
                icon.push($(this).attr('class'));
                unicode.push($(this).closest('.glyph').find('input.unit.size1of2').val());
            });

            icon = icon.map(function (item) {
                return item.replace('icon-', 'el-');
            });

            $outputArray.html('');

            $.each(icon, function (index, item) {
                $outputArray.append("'" + item + "'" + ': ' + "'" + unicode[index] + "'," + '<br>');
                icon_arr.push({
                    acsii: unicode[index],
                    class: item
                });
            });

            $outputSCSS.html('');
            $.each(icon_arr, function (key, value) {
                let css = '';

                css += '&.' + icon_arr[key].class + ':before { <br>';
                css += 'content: "' + '&#92;' + icon_arr[key].acsii + '"; <br>';
                css += '} <br>';

                $outputSCSS.append(css);
            });
        });
}

function initZykSelect() {
    let data = [
        {
            label: 'Parent 1',
            id: 1,
            subgroup: [
                {
                    label: 'Parent 1.1',
                    id: 11,
                    subgroup: [
                        {
                            label: 'Parent 1.1.1 va data nay hoi bi la dai luooooooong',
                            id: 111
                        },
                        {
                            label: 'Parent 1.1.2',
                            id: 112,
                            subgroup: [
                                {
                                    label: 'Child 1.1.2.1',
                                    id: 1121
                                },
                                {
                                    label: 'Child 1.1.2.2',
                                    id: 1122,
                                    subgroup: [
                                        {
                                            label: 'Target 11221',
                                            id: 11221
                                        },
                                        {
                                            label: 'Target 11222',
                                            id: 11222
                                        },
                                        {
                                            label: 'Target 11223',
                                            id: 11223
                                        },
                                        {
                                            label: 'Target 11224',
                                            id: 11224
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    label: 'Parent bố mẹ 1.2',
                    id: 12
                }
            ]
        },
        {
            label: 'Parent 2',
            id: 2
        },
        {
            label: 'Parent 3',
            id: 3,
            subgroup: [
                {
                    label: 'Parent 3.1',
                    id: 31,
                    subgroup: [
                        {
                            label: 'Parent 1.4.1',
                            id: 311
                        },
                        {
                            label: 'Parent 1.3.2',
                            id: 312,
                            subgroup: [
                                {
                                    label: 'Child 1.7.2.1',
                                    id: 3121
                                },
                                {
                                    label: 'Child 1.8.2.2',
                                    id: 3122,
                                    subgroup: [
                                        {
                                            label: 'Target 31221',
                                            id: 31221
                                        },
                                        {
                                            label: 'Target 31222',
                                            id: 31222
                                        },
                                        {
                                            label: 'Target 31223',
                                            id: 31223
                                        },
                                        {
                                            label: 'Target 31224',
                                            id: 31224
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    label: 'Parent 1.7',
                    id: 41
                }
            ]
        }
    ];

    let selectConfig = {
        data: data,
        searchPlaceholder: `${lang['000100_25']}...`,
        resetSearchLabel: `${lang['000100_21']}`,
        disableSearch: true,
        focusToggle: true,
        selected: 11221,
        onSelect: function (id) {
            console.log(id);
        }
    };

    $('#btnZykSelect1').zykselect(selectConfig);
}

function initZykMultiSelect() {
    $('.content-code .zyk-multiselect:not(#zykMultiSelect3)').zykmultiselect();

    $('.content-code #zykMultiSelect3').zykmultiselect({
        selected: { 2: 'Option 2', 6: 'Option 6' }
    });

    $('.content-code .zyk-multiselect').on('change.zyk.zykmultiselect', function (e, data) {
        console.log('change', data);
    });
}

function initFormCheck() {}

function initDoCalendar() {
    let do_Calendar = new doCalendar('#doCalendar', {
        headerToolbar: {
            left: 'today',
            center: 'prev, title, next',
            right: 'week,month,year'
        },
        lang: langDetect,
        onClickDay: function (dayClicked) {
            $('#modalViewInfo').find('.text-paragraph').text(dayClicked);
            $('#modalViewInfo').modal('show');
        },
        onClickHour: function (hourClicked) {
            $('#modalViewInfo').find('.text-paragraph').text(hourClicked);
            $('#modalViewInfo').modal('show');
        },
        onClickEvent: function (events) {
            $('#modalViewInfo').find('.title').text(events.title);
            $('#modalViewInfo').find('.class').text(events.class);
            $('#modalViewInfo').find('.description').text(events.description);
            $('#modalViewInfo').find('.code_class').text(events.code_class);
            $('#modalViewInfo').find('.password').text(events.password);
            $('#modalViewInfo').find('.password').text(events.password);

            $('#modalViewInfo').modal('show');
        },
        events: [
            {
                id: 0,
                title: 'Lớp toán chuyên đề lớp 6',
                class: 'Toán 6 A 1',
                color: 'blue',
                description: 'Mô tả: Số lớn nhất - Số nhỏ nhất',
                code_class: 'Mã lớp học: 452 125 489 23',
                password: 'Mật khẩu: Zxy234',
                password: 'https://edulive.net/config?nextUrl=/gro',
                date: '25-12-2021',
                time: '3:30-4:30'
            },
            {
                id: 0,
                title: 'Lớp toán chuyên đề lớp 6',
                class: 'Toán 6 A 1',
                color: 'red',
                description: 'Mô tả: Số lớn nhất - Số nhỏ nhất',
                code_class: 'Mã lớp học: 452 125 489 23',
                password: 'Mật khẩu: Zxy234',
                password: 'https://edulive.net/config?nextUrl=/gro',
                date: '22-12-2021',
                time: '3:30-4:30'
            },
            {
                id: 0,
                title: 'Lớp toán chuyên đề lớp 6',
                class: 'Toán 6 A 1',
                color: 'blue',
                description: 'Mô tả: Số lớn nhất - Số nhỏ nhất',
                code_class: 'Mã lớp học: 452 125 489 23',
                password: 'Mật khẩu: Zxy234',
                password: 'https://edulive.net/config?nextUrl=/gro',
                date: '2-12-2021',
                time: '3:30-4:30'
            },
            {
                id: 0,
                title: 'Lớp toán chuyên đề lớp 6',
                class: 'Toán 6 A 1',
                color: 'blue',
                description: 'Mô tả: Số lớn nhất - Số nhỏ nhất',
                code_class: 'Mã lớp học: 452 125 489 23',
                password: 'Mật khẩu: Zxy234',
                password: 'https://edulive.net/config?nextUrl=/gro',
                date: '12-12-2021',
                time: '3:30-4:30'
            },
            {
                id: 0,
                title: 'Lớp toán chuyên đề lớp 6',
                class: 'Toán 6 A 1',
                color: 'blue',
                description: 'Mô tả: Số lớn nhất - Số nhỏ nhất',
                code_class: 'Mã lớp học: 452 125 489 23',
                password: 'Mật khẩu: Zxy234',
                password: 'https://edulive.net/config?nextUrl=/gro',
                date: '19-12-2021',
                time: '3:30-4:30'
            },
            {
                id: 0,
                title: 'Lớp toán chuyên đề lớp 6',
                class: 'Toán 6 A 1',
                color: 'blue',
                description: 'Mô tả: Số lớn nhất - Số nhỏ nhất',
                code_class: 'Mã lớp học: 452 125 489 23',
                password: 'Mật khẩu: Zxy234',
                password: 'https://edulive.net/config?nextUrl=/gro',
                date: '22-12-2021',
                time: '3:30-4:30'
            },
            {
                id: 0,
                title: 'Lớp toán chuyên đề lớp 6',
                class: 'Toán 6 A 1',
                color: 'blue',
                description: 'Mô tả: Số lớn nhất - Số nhỏ nhất',
                code_class: 'Mã lớp học: 452 125 489 23',
                password: 'Mật khẩu: Zxy234',
                password: 'https://edulive.net/config?nextUrl=/gro',
                date: '7-12-2021',
                time: '3:30-4:30'
            },
            {
                id: 0,
                title: 'Lớp toán chuyên đề lớp 6',
                class: 'Toán 6 A 1',
                color: 'blue',
                description: 'Mô tả: Số lớn nhất - Số nhỏ nhất',
                code_class: 'Mã lớp học: 452 125 489 23',
                password: 'Mật khẩu: Zxy234',
                password: 'https://edulive.net/config?nextUrl=/gro',
                date: '22-12-2021',
                time: '3:30-4:30'
            },
            {
                id: 0,
                title: 'Lớp toán chuyên đề lớp 6',
                class: 'Toán 6 A 1',
                color: 'blue',
                description: 'Mô tả: Số lớn nhất - Số nhỏ nhất',
                code_class: 'Mã lớp học: 452 125 489 23',
                password: 'Mật khẩu: Zxy234',
                password: 'https://edulive.net/config?nextUrl=/gro',
                date: '22-12-2021',
                time: '3:30-4:30'
            }
        ],

        dayNotInMonthClick: true,

        initialView: 'month'
    });
    let do_Calendar_Single_Month = new doCalendar('#doCalendarSingleMonth', {
        headerToolbar: {
            left: '',
            center: 'prev, title, next',
            right: ''
        },

        lang: langDetect,
        onClickDay: function (dayClicked) {
            $('#modalViewInfo').find('.text-paragraph').text(dayClicked);
            $('#modalViewInfo').modal('show');
        },
        onClickHour: function (hourClicked) {
            $('#modalViewInfo').find('.text-paragraph').text(hourClicked);
            $('#modalViewInfo').modal('show');
        },
        onClickEvent: function (events) {
            $('#modalViewInfo').find('.title').text(events.title);
            $('#modalViewInfo').find('.class').text(events.class);
            $('#modalViewInfo').find('.description').text(events.description);
            $('#modalViewInfo').find('.code_class').text(events.code_class);
            $('#modalViewInfo').find('.password').text(events.password);
            $('#modalViewInfo').find('.password').text(events.password);

            $('#modalViewInfo').modal('show');
        },
        events: [
            {
                id: 0,
                title: 'Lớp toán chuyên đề lớp 6',
                class: 'Toán 6 A 1',
                color: 'blue',
                description: 'Mô tả: Số lớn nhất - Số nhỏ nhất',
                code_class: 'Mã lớp học: 452 125 489 23',
                password: 'Mật khẩu: Zxy234',
                password: 'https://edulive.net/config?nextUrl=/gro',
                date: '25-12-2021',
                time: '3:30-4:30'
            },
            {
                id: 0,
                title: 'Lớp toán chuyên đề lớp 6',
                class: 'Toán 6 A 1',
                color: 'red',
                description: 'Mô tả: Số lớn nhất - Số nhỏ nhất',
                code_class: 'Mã lớp học: 452 125 489 23',
                password: 'Mật khẩu: Zxy234',
                password: 'https://edulive.net/config?nextUrl=/gro',
                date: '22-12-2021',
                time: '3:30-4:30'
            },
            {
                id: 0,
                title: 'Lớp toán chuyên đề lớp 6',
                class: 'Toán 6 A 1',
                color: 'blue',
                description: 'Mô tả: Số lớn nhất - Số nhỏ nhất',
                code_class: 'Mã lớp học: 452 125 489 23',
                password: 'Mật khẩu: Zxy234',
                password: 'https://edulive.net/config?nextUrl=/gro',
                date: '2-12-2021',
                time: '3:30-4:30'
            },
            {
                id: 0,
                title: 'Lớp toán chuyên đề lớp 6',
                class: 'Toán 6 A 1',
                color: 'blue',
                description: 'Mô tả: Số lớn nhất - Số nhỏ nhất',
                code_class: 'Mã lớp học: 452 125 489 23',
                password: 'Mật khẩu: Zxy234',
                password: 'https://edulive.net/config?nextUrl=/gro',
                date: '12-12-2021',
                time: '3:30-4:30'
            },
            {
                id: 0,
                title: 'Lớp toán chuyên đề lớp 6',
                class: 'Toán 6 A 1',
                color: 'blue',
                description: 'Mô tả: Số lớn nhất - Số nhỏ nhất',
                code_class: 'Mã lớp học: 452 125 489 23',
                password: 'Mật khẩu: Zxy234',
                password: 'https://edulive.net/config?nextUrl=/gro',
                date: '19-12-2021',
                time: '3:30-4:30'
            },
            {
                id: 0,
                title: 'Lớp toán chuyên đề lớp 6',
                class: 'Toán 6 A 1',
                color: 'blue',
                description: 'Mô tả: Số lớn nhất - Số nhỏ nhất',
                code_class: 'Mã lớp học: 452 125 489 23',
                password: 'Mật khẩu: Zxy234',
                password: 'https://edulive.net/config?nextUrl=/gro',
                date: '22-12-2021',
                time: '3:30-4:30'
            },
            {
                id: 0,
                title: 'Lớp toán chuyên đề lớp 6',
                class: 'Toán 6 A 1',
                color: 'blue',
                description: 'Mô tả: Số lớn nhất - Số nhỏ nhất',
                code_class: 'Mã lớp học: 452 125 489 23',
                password: 'Mật khẩu: Zxy234',
                password: 'https://edulive.net/config?nextUrl=/gro',
                date: '22-12-2021',
                time: '3:30-4:30'
            },
            {
                id: 0,
                title: 'Lớp toán chuyên đề lớp 6',
                class: 'Toán 6 A 1',
                color: 'blue',
                description: 'Mô tả: Số lớn nhất - Số nhỏ nhất',
                code_class: 'Mã lớp học: 452 125 489 23',
                password: 'Mật khẩu: Zxy234',
                password: 'https://edulive.net/config?nextUrl=/gro',
                date: '22-12-2021',
                time: '3:30-4:30'
            },
            {
                id: 0,
                title: 'Lớp toán chuyên đề lớp 6',
                class: 'Toán 6 A 1',
                color: 'blue',
                description: 'Mô tả: Số lớn nhất - Số nhỏ nhất',
                code_class: 'Mã lớp học: 452 125 489 23',
                password: 'Mật khẩu: Zxy234',
                password: 'https://edulive.net/config?nextUrl=/gro',
                date: '22-12-2021',
                time: '3:30-4:30'
            }
        ],

        dayNotInMonthClick: true,

        initialView: 'single-month'
    });
}

function initCalendar() {
    let calendarDemo1 = new ZykCalendar('#calendarDemo1', {
        view: 'single-month',
        lang: 'vi',
        boxDayRatio: 0.75,
        events: {
            '2022-01-02': {
                label: 'Haha'
            },
            '2022-01-12': {
                label: 'Hehe'
            },
            '2022-01-23': {
                label: 'Hihi'
            },
            '2022-01-31': {
                label: 'Huhu'
            }
        },
        eventOnClick: (event) => {
            console.log(event);
        }
    });

    let calendarDemo2 = new ZykCalendar('#calendarDemo2', {
        view: 'single-month',
        lang: 'vi',
        boxDayRatio: 1,
        events: {
            '2022-01-10': {
                label: 'Haha'
            },
            '2022-01-11': {
                label: 'Hihi'
            },
            '2022-01-12': {
                label: 'Huhu'
            },
            '2022-01-13': {
                label: 'Hehe'
            }
        },
        eventOnClick: (event) => {
            console.log(event);
        }
    });

    let calendarDemo3 = new ZykCalendar('#calendarDemo3', {
        view: 'month',
        lang: 'vi',
        header: {
            today: {},
            'date-control': {},
            'switch-view': {
                layout: 'dropdown'
            }
        },
        events: {
            '2022-01-10': {
                label: 'Haha'
            },
            '2022-01-11': {
                label: 'Hihi'
            },
            '2022-01-12': {
                label: 'Huhu'
            },
            '2022-01-13': {
                label: 'Hehe'
            }
        },
        eventOnClick: (event) => {
            console.log(event);
        }
    });

    console.log(calendarDemo3);
}

function initTypeSuggest() {
    $('#typeSuggestDemo1').zyktypesuggest({
        queryUrl: '/suggest-tags'
    });

    $('#typeSuggestDemo1').zyktypesuggest({
        queryUrl: '/suggest-tags'
    });

    $('#typeSuggestDemo1').on('search.zyk.zyktypesuggest', function (e, key) {
        console.log(key);
    });

    $('#typeSuggestDemo1').on('selectitem.zyk.zyktypesuggest', function (e, selected) {
        console.log(selected);
    });

    $('#typeSuggestDemo2').on('search.zyk.zyktypesuggest', function (e, key) {
        console.log(key);
    });

    $('#typeSuggestDemo2').on('selectitem.zyk.zyktypesuggest', function (e, selected) {
        console.log(selected);
    });
}

function initDialog() {
    let dialogDemo = new ZykDialog('#dialogDemo1', '#btnDemo1', {
        buttons: {
            '.btn-join-sign-up': () => {
                console.log('sign up');
            },
            '.btn-join-sign-in': () => {
                console.log('sign in');
            }
        }
    });

    $('#btnDemo1')
        .unbind()
        .on('click', function () {
            dialogDemo.show();
        });
}

function initPptXmlReader() {
    let dataXml = {};
    let xmlReader;

    let targets = [
        {
            key: 'presentationXml',
            locate: 'ppt/presentation.xml',
            data: 'presentation.xml'
        },
        {
            key: 'relationshipXml',
            locate: 'ppt/_rels/presentation.xml.rels',
            data: 'presentation.xml.rels'
        },
        {
            key: 'slidesXml',
            folder: 'ppt/slides',
            folderType: 'xml',
            data: 'slides'
        },
        {
            key: 'media',
            folder: 'ppt/media',
            folderType: 'media',
            data: 'media'
        },
        {
            key: 'theme',
            folder: 'ppt/theme',
            folderType: 'xml',
            data: 'theme'
        }
    ];

    $('#btnExport')
        .unbind()
        .on('click', function () {
            $('#inputFile').trigger('click');
        });

    $('#inputFile')
        .unbind()
        .on('click', function (e) {
            let files = e.target.files;

            handlePptFile(files[0]);
        });
}

function initSlide(data) {
    if (!data) {
        return;
    }
}

function getCanvasHeight(size = canvas_size) {
    var sw = 1;
    var sh = 1;
    if (eldCustom.canvas && eldCustom.canvas._slideMaster) {
        sw = eldCustom.canvas._slideMaster.swr;
        sh = eldCustom.canvas._slideMaster.shr;
    }

    return parseInt(size / (sw / sh));
}

function calcMainSize() {
    var $mainScreen = $('.canvas-wrapper');
    var height = $mainScreen.height();
    var width = $mainScreen.width();

    var canvas_height = getCanvasHeight(width);

    return canvas_height < height ? width : parseInt((width * height) / canvas_height);
}

async function initCanvas(ratio = 0) {
    var $mainScreen = $('.canvas-wrapper');
    var main_canvas_size = $mainScreen.height();

    eldCustom = new EldCustom('canvas', main_canvas_size);
    eldCustom.init();
    eldCustom.name = 'eldCustom';

    eldCustom.canvas.set({
        designMode: false,
        selection: false
    });
    eldCustom.canvas.setIsPlayer(true);
    eldCustom.canvas.canvasMode = eldraw.canvasMode.SELF_PLAY;

    canvas = eldCustom.canvas;

    genCanvas();

    let sr = {
        sw: 1,
        sh: 1
    };

    if (ratio == 0) {
        sr.sw = 16;
        sr.sh = 9;
    } else if (ratio == 1) {
        sr.sw = 4;
        sr.sh = 3;
    } else if (ratio == 2) {
        sr.sw = 1;
        sr.sh = 1;
    }

    canvas._slideMaster = await new Promise((resolve) => {
        eldraw.SlideMaster.fromObject(
            {
                sectionId: 0,
                shr: sr.sh,
                swr: sr.sw
            },
            function (sm) {
                resolve(sm);
            },
            true
        );
    });

    eldCustom.setSize(calcMainSize());
}

function genCanvas() {
    if (canvas) {
        canvas.clear();
    }
}

async function handlePptFile(file) {
    let dataXml = {};
    let xmlReader;

    let targets = [
        {
            key: 'presentationXml',
            locate: 'ppt/presentation.xml',
            data: 'presentation.xml'
        },
        {
            key: 'relationshipXml',
            locate: 'ppt/_rels/presentation.xml.rels',
            data: 'presentation.xml.rels'
        },
        {
            key: 'slidesXml',
            folder: 'ppt/slides',
            folderType: 'xml',
            data: 'slides'
        },
        {
            key: 'media',
            folder: 'ppt/media',
            folderType: 'media',
            data: 'media'
        },
        {
            key: 'theme',
            folder: 'ppt/theme',
            folderType: 'xml',
            data: 'theme'
        }
    ];

    let loadZip = await JSZip.loadAsync(file).then(async (zip) => {
        let promises = [];

        for (let i = 0; i < targets.length; i++) {
            let target = targets[i];

            if (target.folder) {
                if (target.folderType === 'xml') {
                    zip.folder(target.folder).forEach(async (relPath, file) => {
                        if (!file.dir) {
                            promises.push(
                                zip
                                    .file(file.name)
                                    .async('string')
                                    .then((content) => {
                                        if (file.name.indexOf('_rels') === -1) {
                                            return {
                                                key: target.key,
                                                relPath: relPath,
                                                content: JSON.stringify(content)
                                            };
                                        } else {
                                            return {
                                                key: `${target.key}_rels`,
                                                relPath: relPath.substr(relPath.indexOf('/') + 1, relPath.indexOf('.') - 2),
                                                content: JSON.stringify(content)
                                            };
                                        }
                                    })
                            );
                        }
                    });
                } else if (target.folderType === 'media') {
                    zip.folder(target.folder).forEach(async (relPath, file) => {
                        let type = relPath.substr(relPath.indexOf('.') + 1);

                        if (['jpg', 'jpeg', 'png', 'webp'].indexOf(type) > -1) {
                            promises.push(
                                {
                                    key: target.key,
                                    type: 'image',
                                    relPath: relPath,
                                    content: file
                                }

                                // file.async('base64').then((content) => {
                                //     return {
                                //         key: target.key,
                                //         type: 'image',
                                //         relPath: relPath,
                                //         content: content
                                //     };
                                // })
                            );
                        }
                    });
                }
            } else {
                content = await zip.file(target.locate).async('string');

                if (content) {
                    promises.push({
                        key: target.key,
                        data: target.data,
                        content: JSON.stringify(content)
                    });
                }
            }
        }

        return promises;
    });

    Promise.all(loadZip).then((data) => {
        for (let i = 0; i < data.length; i++) {
            if (!dataXml[data[i].key]) {
                dataXml[data[i].key] = {};
            }

            if (data[i].key == 'media') {
                if (!dataXml[data[i].key].images) {
                    dataXml[data[i].key].images = {};
                }

                if (!dataXml[data[i].key].audios) {
                    dataXml[data[i].key].audios = {};
                }

                if (!dataXml[data[i].key].fonts) {
                    dataXml[data[i].key].fonts = {};
                }

                switch (data[i].type) {
                    case 'image':
                        dataXml[data[i].key].images[data[i].relPath] = data[i].content;
                        break;
                }
            } else {
                let key;

                if (data[i].data) {
                    key = data[i].data;
                }

                if (data[i].relPath) {
                    key = data[i].relPath;
                }

                dataXml[data[i].key][key] = data[i].content;
            }
        }

        xmlReader = new PptXmlReader(dataXml);
        let json = xmlReader.exportJSON();

        $('#uploadPPT').val('');
    });
}

function initTimeliner() {
    let layerData = {
        '0061cde12c42': {
            index: 2,
            id: '0061cde12c42',
            label: 'Default',
            children: [
                {
                    id: 'e7f9568fc724',
                    index: 2,
                    actionId: '3e68809f6bfe',
                    actionType: 'object',
                    label: 'Some action #1',
                    objectId: 123456,
                    timer: {
                        start: 0,
                        end: 1
                    }
                },
                {
                    id: '6e5a334e3cec',
                    index: 1,
                    actionId: '6a19bb27e600',
                    label: 'Some action #2',
                    actionType: 'audio',
                    objectId: 234567,
                    timer: {
                        start: 1.4,
                        end: 2.5
                    }
                },
                {
                    id: '95175b446b69',
                    index: 1,
                    actionId: '6a19bb27e612',
                    label: 'Some action #3',
                    actionType: 'object',
                    objectId: 234567,
                    timer: {
                        start: 3.4,
                        end: 5
                    }
                }
            ]
        },
        '7f20e796f5d1': {
            index: 1,
            id: '7f20e796f5d1',
            label: 'Layer Group 1',
            children: [
                {
                    id: 'ce3548111fbc',
                    index: 1,
                    actionId: '6a19bb27e612',
                    label: 'Some action of doing something',
                    actionType: 'object',
                    objectId: 234567,
                    timer: {
                        start: 0.5,
                        end: 3
                    }
                }
            ]
        }
    };

    let timeliner;

    $('#btnToggleTimeliner')
        .unbind()
        .on('click', function () {
            if (!timeliner) {
                timeliner = new ZykTimeliner({
                    timeline: {
                        duration: 300
                    },
                    layers: layerData,
                    events: {
                        onShown: () => {
                            console.log('shown');
                        },
                        onHidden: () => {
                            console.log('hidden');
                        },
                        onPlayTimeline: () => {
                            console.log('Play Timeline');
                        },
                        onPlayingTimeline: () => {
                            console.log('Playing Timeline');
                        },
                        onPauseTimeline: () => {
                            console.log('Pause Timeline');
                        },
                        onStopTimeline: () => {
                            console.log('Stop Timeline');
                        },
                        onAddLayerGroup: () => {
                            console.log('Add Layer Group');
                        },
                        onEditLayerGroup: (id) => {
                            console.log(id);
                        },
                        onRemoveLayerGroup: (id) => {
                            console.log(id);
                        },
                        onAddLayer: (id, currentTime) => {
                            console.log(id);
                        },
                        onEditLayer: (id) => {
                            console.log(id);
                        },
                        onRemoveLayer: (id) => {
                            console.log(id);
                        },
                        onDblClickFrame: (id) => {
                            console.log(id);
                        },
                        onUpdateFrame: (data) => {
                            console.log(data);
                        }
                    }
                });
            } else {
                timeliner.toggle();
            }
        });
}

function initGradient() {
    let gradient1 = new ZykGradient('#zykGradient1');
    let gradient2 = new ZykGradient('#zykGradient2');
    let gradient3 = new ZykGradient('#zykGradient3');
    let gradient4 = new ZykGradient('#zykGradient4');
}
