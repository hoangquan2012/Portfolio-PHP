const csrf = $('meta[name="csrf-token"]').attr('content');

$(document).ready(function () {
    let view = localStorage.getItem('view');

    if (view == null) {
        view = 1;

        localStorage.setItem('view', 1);
    }

    callAjaxWork(
        '/projectboard',
        () => {
            initWork();
        },
        view
    );
});
const callAjaxWork = (url, callback = false, params) => {
    $.ajax({
        url: url,
        type: 'get',
        dataType: 'json',
        data: {
            _token: csrf,
            view: params
        },

        success: function (data) {
            $('.content-body').html(data.html);

            if (callback) {
                callback();
            }
        },
        error: function () {}
    });
};

function initWork() {
    let $modalAddProject = $('#modalAddProject');

    $modalAddProject.on('shown.bs.modal', function () {
        $('.input-name-project').val('');
        $('.input-name-project').focus();
    });

    $modalAddProject.find('.create-new-project').on('click', function () {
        let name = $('.input-name-project').val();
        var d = new Date();
        if (name.trim().length == 0) {
            $modalAddProject.find('.invalid-feedback').show();
            setInterval(function () {
                $modalAddProject.find('.invalid-feedback').hide();
            }, 5000);
            return;
        }

        const newProject = `
            <div class="card">
                <div class="item" data-id="28740">
                    <a href="#" class="item-row select-file" data-type="folder" data-src="28740">
                        <div class="item-col-5">
                            <h6 class="subtitle-sm file-name">
                                ${name}
                            </h6>
                        </div>
                        <div class="item-col-5">
                            <p class="p-sm create-day">
                                ${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}
                            </p>
                        </div>
                        <div class="item-col-2">

                            <div class="group-filter">
                                <div class="btn-edit">
                                    <i class="elo el-pencil"></i>
                                </div>
                                <div class="btn-watch">
                                    <i class="elo el-eye"></i>
                                </div>
                            </div>

                        </div>
                    </a>
                </div>
            </div>
        `;
        $modalAddProject.modal('hide');

        $('.project-list').find('.list-append').append(newProject);
    });

    $('.btn-edit').on('click', function () {
        let $modalEditProject = $('#modalEditProject');

        $modalEditProject.on('shown.bs.modal', function () {
            $modalEditProject.find('.input-edit-name').val('');
            $modalEditProject.find('.input-edit-name').focus();
        });

        $modalEditProject.find('.edit-name-project').on('click', function () {
            let name = $('.input-edit-name').val();
            if (name.trim().length == 0) {
                $modalEditProject.find('.invalid-feedback').show();
                setInterval(function () {
                    $modalEditProject.find('.invalid-feedback').hide();
                }, 5000);
                return;
            }
        });
    });

    $('.btn-switch-view').on('click', function () {
        let $icon = $(this).find('i');

        let view;
        if ($icon.hasClass('el-list')) {
            view = 2;
        } else {
            view = 1;
        }

        localStorage.setItem('view', view);

        callAjaxWork(
            '/projectboard',
            () => {
                initWork();
            },
            view
        );
    });
}
