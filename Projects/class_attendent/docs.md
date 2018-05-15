# Backend API

Get all the active student objects:

    Get /student?active=true
    
Get all the inactive student objects:

    Get /student?active=false

Get the target student object:

    Get /student/:id
    response:
            id: "1"
            name: "michael"
            hobbies: ["badminton", "guitar"]
            class: ["front-end design", front-end programming"]
            active: true or false
            createdAt: timeStamp-->date.now()
            email: "abc@qq.com"
            phone: "234-554-4593"
    

Get all the active class section:

    Get /classSection?active=true

Get all the inactive class section:

    Get /classSection?active=false

Get the target class section:

    Get /classSection/:id

Create a new student


    Post /student
    data:
        id: "1"
        name: "michael"
        gender: "male"
        hobbies: ["badminton", "guitar"]
        active: true
        class: ["front-end design", front-end programming"]
        createdAt: timeStamp-->date.now()
        email: "abc@qq.com"
        absence_description: "I have a cold"
        phone: "234-554-4593"
        learningHours: "20"
    
Create a new class

    Post /classSection
    data:
        id: "1"
        name: "Front-end"
        class_limit: "10"
        studentId: ["1", "2"] -- can be empty
        inactivestudentId:[
        {"id":1
        ]
        instructor: "Yan Hong"
        ta: ["Iris", "Jung", "Anna"]
        createdAt: timeStamp-->date.now()
        duration: "4"
        endDate: some date
    
