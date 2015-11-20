$(document).ready(function() {
    //runs code when onsubmit is called
    // $('form').submit(function(event) {
    //     //prevents the submit function from refreshing the page 
    //     event.preventDefault();
    // });
    //Avoids form submit
    jQuery.validator.setDefaults({
        debug: true,
        success: "valid"
    });
    $("#tableForm").validate({
        rules: {
            rowsFrom: {
                required: true,
                range: [0, 20]
            },
            rowsTo: {
                required: true,
                min: function() {
                    return $("#rowsFrom").val();
                },
                max: 25
            },
            columnsFrom: {
                required: true,
                range: [0, 40]
            },
            columnsTo: {
                required: true,
                min: function() {
                    return $("#columnsFrom").val();
                },
                max: 60
            },
        },
        messages: {
            rowsTo: {
                min: function() {
                    return "Please enter a number greater than or equal to " + $("#rowsFrom").val();
                }
            },
            columnsTo: {
                min: function() {
                    return "Please enter a number greater than or equal to " + $("#columnsFrom").val();
                }
            }
        },
        //Callback for handling the actual submit when the form is valid
        submitHandler: function(event) {
            TableCreater();
        }

    });
});