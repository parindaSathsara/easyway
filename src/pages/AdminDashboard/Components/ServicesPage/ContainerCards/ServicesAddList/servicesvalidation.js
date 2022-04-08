import $ from 'jquery';
import validate from 'jquery-validation';

function servicesvalidation() {
    $('#serviceAddForm').validate({
        errorElement: "span",
        rules: {
            serviceName: {
                required: true,
                normalizer: function (value) {
                    return $.trim(value);
                }
            },
            serviceType: {
                required: true,
                normalizer: function (value) {
                    return $.trim(value);
                }
            },
            serviceDescription: {
                required: true,
                normalizer: function (value) {
                    return $.trim(value);
                }
            },
        },

        messages:{
            serviceName: {
                required:"Service Name field cannot be empty"
            },
            serviceType: {
                required: "Service Type field cannot be empty"
            },
            serviceDescription: {
                required: "Service Description field cannot be empty"
            },
        }

    })
}

export default servicesvalidation;