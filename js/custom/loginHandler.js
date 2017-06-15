//#region LoginHandler
var LoginHandler = {
    init: function() {
        // Note: Disabling and enabling to make bootstrap field validation work
        $('.show-recovery').click(function() {
            $('#login').hide();
            $('#passwordRecovery').show();
            $('#UserNameForgot').removeAttr('disabled');
            $('#UserName').attr({ 'disabled': 'disabled' });
            $('#Password').attr({ 'disabled': 'disabled' });
            $('#UserNameForgot').focus();
        });

        $('.hide-recovery').click(function() {
            $('#passwordRecovery').hide();
            $('#login').show();
            $('#UserNameForgot').attr({ 'disabled': 'disabled' });
            $('#UserName').removeAttr('disabled');
            $('#Password').removeAttr('disabled');
            $('#UserName').focus();
        });

        $('#login input[type="submit"]').click(function() {
            if ($('#UserName').val() === '' || $('#Password').val() === '') {
                $('#credentialsError').show();
                $('#loginFailedMessage').hide();
                return false;
            } else {
                $('#credentialsError').hide();
            }
        });

        $('#licenseOptionsLink').click(function() {
            $('#login').hide();
            $('#licenseOptions').show();
        });

        $('#licenseOptionsBack').click(function() {
            $('#licenseOptions').hide();
            $('#login').show();
        });
    }
};
//#endregion

(function() {
    if (typeof useLogin !== 'undefined' && useLogin) {
        LoginHandler.init();
    }
})();
