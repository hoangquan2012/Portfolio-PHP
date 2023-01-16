$(document).ready(function () {
    class Loading {
        constructor(options) {
            let defaultOptions = {
                label: true,
                progress: true,
                image: true,
                progressStatus: 30,
                loadingAnimation: true,
                background: {
                    color: '#fff',
                    path: 'path/to/image.jpg'
                }
            };

            this.config = {
                ...defaultOptions,
                ...options
            };
            this.readyLoading();
        }

        readyLoading() {
            //--------- Set Text --------------//
            var label = this.config.label;
            if (label == false) {
                $('.loading-text').hide();
            } else $('.loading-text').show();

            //-------------Set loadingAnimation   ---------------//

            var loadingAnimation = this.config.loadingAnimation;
            if (loadingAnimation == false) {
                $('.loading-gif').hide();
            } else $('.loading-gif').show();

            //-------------Set Image ---------------//

            var image = this.config.image;
            if (image == false) {
                $('.loading-avatar').hide();
            } else $('.loading-avatar').show();

            //--------- Set loading --------------//
            var progress = this.config.progress;
            if (progress == false) {
                $('.loading-progress').hide();
            } else $('.loading-progress').show();

            //---------- Set background ----------//
            var background = this.config.background.path;
            var backgroundColor = this.config.background.color;
            $('.container').css('background', 'url(' + background + ')');
            $('.container').css('background', backgroundColor);
        }

        show() {
            $('.container').show();
        }

        hide() {
            $('.container').hide();
        }

        set changeProgressStatus(progressStatus) {
            //--------- Set % --------------//

            this.config.progressStatus = progressStatus;
            $('#dynamic')
                .css('width', progressStatus + '%')
                .attr('aria-valuenow', progressStatus)
                .text(progressStatus + '% Complete');
        }
    }

    let loading = new Loading({
        label: true,
        progress: true,
        loadingAnimation: true,
        image: true,
        background: {
            color: '#fff',
            path: 'path/to/image.jpg'
        }
    });

    loading.show();
    loading.changeProgressStatus = 50;
});
