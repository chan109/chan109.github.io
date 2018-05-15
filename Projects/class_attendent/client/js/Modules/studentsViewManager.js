// <div class="student">
//     <div class="student-label">1</div>
//     <div class="student-name">Michael Chen</div>
// <div class="student-status">
//     <button class="attendenting">Attending</button>
//     <button class="delete">Delete</button>
//     </div>
//     </div>

function renderStudents(obj, i, targetDate){
    var studentDiv = $("<div>").addClass("student")
    studentDiv.append($("<div>").addClass("student-label").text(i+1))
    studentDiv.append($("<div>").addClass("student-name").text(obj.name))

    var studentStatusDiv = $("<div>").addClass("student-status")
    studentStatusDiv.append($("<button>").addClass(obj.status)
                                         .text(obj.status == "attending" ? "Attending" : "Absenting")
                                         .attr("id", obj.student_id)
                                         .click(function () {

        if($(this).hasClass("attending")) {

            //
            changeStatus(obj["student_id"], classId, targetDate)
            //sampleStudents[i].status = "absenting"
            // set

            $(this).removeClass("attending")
            $(this).addClass("absenting")
            $(this).text("Absenting")
        } else {
            studentsInDay[i].status = "attending"
            $(this).removeClass("absenting")
            $(this).addClass("attending")
            $(this).text("Attending")
        }
    }))

    studentDiv.append(studentStatusDiv)

    return studentDiv

}

function rendering(objs, targetDate) {
    var studentsDiv = $(".students")
    objs.forEach(function (arg, i) {
        var tmp = renderStudents(arg, i, targetDate)
        tmp.appendTo(studentsDiv)
    })
}

function defaultRendering(objs, targetDate) {
    if(objs.length >= 10) {
        rendering(objs.slice(0,10), targetDate)
    } else {
        rendering(objs, targetDate)
    }
}

//******************* handling days pagination *******************

function insertDayPaginationDiv(days, targetDate) {

    for(var i = 0; i<days; i++) {
        $(".paginationForDay").append(insertDayPaginationDivHelper(i, targetDate))
    }
}

function insertDayPaginationDivHelper(day, targetDate) {
    var result = targetDate == day+1 ? $("<a>").attr("id", day+1).text(`Day ${day+1}`).addClass("active") : $("<a>").attr("id", day+1).text(`Day ${day+1}`)
    result.click(function () {
        // $($(".paginationForDay > a")[0]).attr("id")
        debugger
        $(".paginationForDay > a").removeClass("active")
        console.log(day+1)
        $(".paginationForDay > a#" + (parseInt(day)+1)).addClass("active")



        //clean the old data
        $(".paginationForDay").html('')
        main(classes, $(this).attr("id"))
    })
    return result
}
// <div class="paginationForDay">
//     <a href="">Day 1</a>
// <a href="">Day 2</a>
// <a href="">Day 3</a>
// <a href="">Day 4</a>
// </div>
//******************* handling days pagination *******************



//******************* handling pagination *******************

function insertPaginationDiv(page, targetDate) {
    var paginationDiv = $(".pagination")
    for(var i = 0; i<=page; i++) {
        $(`<a Id=p${i}>`).text(i).appendTo(paginationDiv)
        paginationDiv.on('click', 'a',function () {
            $(`#p${activatePage}`).removeClass("active")
            activatePage = parseInt($(this).attr("id").split("p")[1])
            $(this).addClass("active")
            reRenderHelper(targetDate)
        })
    }
}

function reRenderHelper(targetDate) {
    activateBoxes = []
    if(activatePage != maxPage) {
        for(var i = activatePage*10 ;i<=activatePage*10+9;i++) {
            activateBoxes.push(i)
        }
    }
    else if(activatePage == maxPage) {
        for( var i = activatePage*10; i<=totalStudent;i++) {
            activateBoxes.push(i)
        }
    }
    $(".students").html("")
    var tmp = activateBoxes.map(function (data) {
        return studentsInDay[data]
    })

    rendering(tmp, targetDate)
}

function getTotalPageNum(students) {
    return students/10
}

//******************* handling pagination *******************



function main(classes, targetDate) {
    //varialbes to change students status

    //clean up the old div
    $(".students").html("")
    $(".pagination").html("")

    classId = sessionStorage.getItem("class_id")
    days = classes.filter(function (data) {
        return data.class_id == classId
    })[0].days

    studentsInDay = days[targetDate-1]

    activateBoxes = studentsInDay
    activatePage = 0;

    totalStudent = studentsInDay.length-1
    maxPage = getTotalPageNum(totalStudent)


    //rendering components
    insertDayPaginationDiv(days.length, targetDate)

    defaultRendering(studentsInDay, targetDate)

    $("#search-btn").click(function () {
        $(".students").html('')
        if($('#search-box').val() == "") {
            defaultRendering(studentsInDay)
        }else{
            var searchVal = $('#search-box').val()
            activateBoxes = studentsInDay.filter(
                function (data) {
                    return data.name.toLowerCase().match(searchVal.toLowerCase()) != null
                })
            rendering(activateBoxes)
        }

    })

    insertPaginationDiv(maxPage, targetDate)


}