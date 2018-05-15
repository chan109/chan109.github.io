// <div class="student">
//     <div class="student-label">1</div>
//     <div class="student-name">Michael Chen</div>
// <div class="student-status">
//     <button class="attendenting">Attending</button>
//     <button class="delete">Delete</button>
//     </div>
//     </div>

function renderStudents(obj, i){
    var studentDiv = $("<div>").addClass("student")
    studentDiv.append($("<div>").addClass("student-label").text(i+1))
    studentDiv.append($("<div>").addClass("student-name").text(obj.name))

    var studentStatusDiv = $("<div>").addClass("student-status")
    studentStatusDiv.append($("<button>").addClass(obj.status).text(obj.status == "attending" ? "Attending" : "Absenting").attr("id", i).click(function () {
        debugger
        if($(this).hasClass("attending")) {
            sampleStudents[i].status = "absenting"
            $(this).removeClass("attending")
            $(this).addClass("absenting")
            $(this).text("Absenting")
        } else {
            sampleStudents[i].status = "attending"
            $(this).removeClass("absenting")
            $(this).addClass("attending")
            $(this).text("Attending")
        }
    }))

    studentDiv.append(studentStatusDiv)

    return studentDiv

}

function rendering(objs) {
    var studentsDiv = $(".students")
    objs.forEach(function (arg, i) {
        var tmp = renderStudents(arg, i)
        tmp.appendTo(studentsDiv)
    })
}

function defaultRendering(objs) {
    if(objs.length >= 10) {
        rendering(objs.slice(0,10))
    } else {
        rendering(objs)
    }
}

//******************* handling pagination *******************

function insertPaginationDiv(page) {
    var paginationDiv = $(".pagination")
    for(var i = 0; i<=page; i++) {
        $(`<a Id=p${i}>`).text(i).appendTo(paginationDiv)
        paginationDiv.on('click', 'a',function () {
            debugger
            $(`#p${activatePage}`).removeClass("active")
            activatePage = parseInt($(this).attr("id").split("p")[1])
            $(this).addClass("active")
            reRenderHelper()
        })
    }
}

function reRenderHelper() {
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
        return sampleStudents[data]
    })

    rendering(tmp)
}

function getTotalPageNum(students) {
    return students/10
}

//******************* handling pagination *******************

(function () {
    activateBoxes = sampleStudents
    activatePage = 0;

    totalStudent = sampleStudents.length-1
    maxPage = getTotalPageNum(totalStudent)

    defaultRendering(sampleStudents)

    $("#search-btn").click(function () {
        $(".students").html('')
        if($('#search-box').val() == "") {
            defaultRendering(sampleStudents)
        }else{
            var searchVal = $('#search-box').val()
            activateBoxes = sampleStudents.filter(
                function (data) {
                    return data.name.toLowerCase().match(searchVal.toLowerCase()) != null
                })
            rendering(activateBoxes)
        }

    })

    insertPaginationDiv(maxPage)


})()