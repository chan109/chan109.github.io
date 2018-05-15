

function renderClassesHelper(objs) {
    objs.forEach(function (data) {
        $('.classes-container').append(renderClasses(data))
    })
}

function renderClasses(obj) {
    var classDetail = $("<div>").addClass("class")
    var classContent = renderClassContent(obj)
    var shellContent = renderShellContent(obj)
    classDetail.append(classContent).append(shellContent)
    return classDetail
}

function renderClassContent(obj) {
    var classContent = $("<div>").addClass("class-content")
    classContent.append($("<p>").css("margin-top", "10px").text("Class size: " + obj["class_size"]))

    var taData = $("<p>").addClass("TA").append($("<span>").text("TA:&nbsp"))
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
    shellContent.append($("<img>").attr("src", "img/profile.jpg").addClass("class-bg"))
    shellContent.append($("<h1>").text(obj.name))
    shellContent.append($("<h2>").text("Instructor" + obj.instructor_name))
    shellContent.append($("<h3>").addClass("start-date").text("Start date" + obj.start_date))
    shellContent.append($("<h3>").addClass("end-date").text("End date" + obj.end_date))
    return shellContent
}


$(function () {
    renderClassesHelper(sampleClass)

    $("#search-btn").click(function () {
        var searchVal = $('#search-box').val()
        $(".classes-container").html('')

        var filteredArray = sampleClass.filter(
            function (data) {
                return data.name.toLowerCase().match(searchVal.toLowerCase()) != null
            })
        renderClassesHelper(filteredArray)
    })

    $('.class').click(function () {
        window.location.href = '/user'
        sessionStorage.setItem("class_id", $(this).attr("class_id"))
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

});

// <div class="class">
//     <div class="class-content">
//     <p style="margin-top: 10px">Class size: 10</p>
// <p class="TA"><span>TA:&nbsp</span> <span>Michael</span><span>Michael</span><span>Michael</span><span>Michael</span><span>Michael</span></p>
// <p>Course Length: 32hours</p>
// <p>Number of student: 30</p>
// <ul >
// <li>HTML</li>
// <li>JAVASCRIPT</li>
// <li>JAVASCRIPT</li>
// <li>JAVASCRIPT</li>
//
// </ul>
// </div>
//
// <div class="shell magictime" data-hover="puffOut" data-return="puffIn">
//     <div class="bg-helper"></div>
//     <img src="../img/profile.jpg" alt="" class="class-bg">
//     <h1>前端开发第99期</h1>
//     <h2>Instructor: Yan Hong</h2>
// <h3 class="start-date">Start Date: 08/08/2017</h3>
// <h3 class="end-date">End Date: 09/08/2017</h3>
// </div>
// </div>


