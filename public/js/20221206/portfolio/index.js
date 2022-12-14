$(document).ready(function () {
    $('.sider-item-content').on('click', function () {
        $(this).closest('.sider-item').siblings().find('.sider-item-content').removeClass('active');
        $(this).addClass('active');
    });
});
