function renderToClassContainer(objs) {
    objs.forEach(function (data) {
        $('.classes-container').append(renderClasses(data))
    })
}

function renderClasses(obj) {

    //the id "1" need to be changed to class id
    var classDetail = $("<div>").addClass("class").attr("class-id", obj.class_id)
    var classContent = renderClassContent(obj)
    var shellContent = renderShellContent(obj)
    classDetail.append(classContent).append(shellContent)
    return classDetail
}

function renderClassContent(obj) {
    var classContent = $("<div>").addClass("class-content")
    classContent.append($("<p>").css("margin-top", "10px").text("Class size: " + obj["class_size"]))

    var taData = $("<p>").addClass("TA").append($("<span>").text("TA:"))
    obj.ta.forEach(function (data) {
        taData.append($("<span>").text(data))
    })

    classContent.append(taData)
    classContent.append($("<p>").text("Course length: " + obj["course_length"] + "hours"))
    classContent.append($("<p>").text("Number of student: " + obj["class_size"] + "hours"))

    var tags = $("<ul>")
    obj["tag"].forEach(function (data) {
        tags.append($("<li>").text(data))
    })

    classContent.append(tags)

    return classContent
}

function renderShellContent(obj) {
    var shellContent = $("<div>").addClass("shell").addClass("magictime").attr("data-hover", "puffOut").attr("data-return", "puffIn")
    shellContent.append($("<div>").addClass("bg-helper"))
    shellContent.append($("<img>").attr("src", obj.img_src).addClass("class-bg"))
    shellContent.append($("<h1>").text(obj.name))
    shellContent.append($("<h2>").text(obj.instructor_name))
    shellContent.append($("<h3>").addClass("start-date").text("Start date" + obj.start_date))
    shellContent.append($("<h3>").addClass("end-date").text("End date" + obj.end_date))
    return shellContent
}

function main(data) {
    renderToClassContainer(data)

    $("#search-btn").click(function () {
        var searchVal = $('#search-box').val()
        $(".classes-container").html('')

        var filteredArray = classes.filter(
            function (data) {
                return data.name.toLowerCase().match(searchVal.toLowerCase()) != null
            })
        renderToClassContainer(filteredArray)

        $('.class').click(function () {

            sessionStorage.setItem("class_id", $(this).attr("class-id"))
            debugger
            window.location.href = 'registeredStudents.html'
        })


        $('.class').hover(
            function () {

                var overlay = $(this).find('.shell');
                overlay.removeClass(overlay.data('return')).addClass(overlay.data('hover'));
            },
            function () {
                var overlay = $(this).find('.shell');
                overlay.removeClass(overlay.data('hover')).addClass(overlay.data('return'));
            }
        );
    })

    $('.class').click(function () {

        sessionStorage.setItem("class_id", $(this).attr("class-id"))
        debugger
        window.location.href = 'registeredStudents.html'
    })


    $('.class').hover(
        function () {

            var overlay = $(this).find('.shell');
            overlay.removeClass(overlay.data('return')).addClass(overlay.data('hover'));
        },
        function () {
            var overlay = $(this).find('.shell');
            overlay.removeClass(overlay.data('hover')).addClass(overlay.data('return'));
        }
    );

}