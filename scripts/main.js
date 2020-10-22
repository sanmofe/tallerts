import { dataCourses } from './dataCourses.js';
import { dataStudent } from './dataStudent.js';
var nameTitle = document.getElementById('name');
var studentDatabody = document.getElementById('studentData');
var coursesTbody = document.getElementById('courses');
var btnfilterByName = document.getElementById("button-filterByName");
var inputSearchBox = document.getElementById("search-box");
var totalCreditElm = document.getElementById("total-credits");
var rangoIni = document.getElementById("ran-from");
var rangoFin = document.getElementById("ran-to");
var btnFiltroRango = document.getElementById("btn-range");
btnfilterByName.onclick = function () { return applyFilterByName(); };
btnFiltroRango.onclick = function () { return filtroRango(); };
renderCoursesInTable(dataCourses);
renderStudentDataInTable(dataStudent);
totalCreditElm.innerHTML = "" + getTotalCredits(dataCourses);
function renderStudentDataInTable(data) {
    console.log("Desplegando datos del estudiante");
    for (var prop in data) {
        if (prop == "name") {
            nameTitle.innerHTML = data[prop];
            continue;
        }
        var trElement = document.createElement("tr");
        trElement.innerHTML = "<td>" + prop + "</td>\n                           <td>" + data[prop] + "</td>";
        studentDatabody.appendChild(trElement);
    }
    /*studentDatabody.innerHTML=`<tr>${data.name}</tr>
                             <tr>${data.code}</tr>
                             <tr>${data.id}</tr>
                             <tr>${data.age}</tr>
                             <tr>${data.address}</tr>
                             <tr>${data.tel}</tr>`; */
}
function renderCoursesInTable(courses) {
    console.log('Desplegando cursos');
    courses.forEach(function (course) {
        var trElement = document.createElement("tr");
        trElement.innerHTML = "<td>" + course.name + "</td>\n                           <td>" + course.professor + "</td>\n                           <td>" + course.credits + "</td>";
        coursesTbody.appendChild(trElement);
    });
}
function applyFilterByName() {
    var text = inputSearchBox.value;
    text = (text == null) ? '' : text;
    clearCoursesInTable();
    var coursesFiltered = searchCourseByName(text, dataCourses);
    renderCoursesInTable(coursesFiltered);
}
function searchCourseByName(nameKey, courses) {
    return nameKey === '' ? dataCourses : courses.filter(function (c) {
        return c.name.match(nameKey);
    });
}
function filtroRango() {
    var desde = rangoIni.value; //Esto marca error pero funciona y ni idea de qué propiedad no marque error xd
    var hasta = rangoFin.value;
    if (!desde || !hasta) {
        clearCoursesInTable();
        renderCoursesInTable(dataCourses);
    }
    else if (hasta < desde || desde > hasta) {
        //._.xD
        //Esto está aquí solo para que no se haga nada si eso pasa jsjsjs
        1 + 1; //Aparentemente el compilador ignora esto si no hago nada en el if, así que ahora hace esta suma B)
    }
    else {
        var nuevoArreglo = dataCourses.filter(function (course) {
            return course.credits > desde && course.credits < hasta;
        });
        console.log(nuevoArreglo);
        clearCoursesInTable();
        renderCoursesInTable(nuevoArreglo);
    }
}
function getTotalCredits(courses) {
    var totalCredits = 0;
    courses.forEach(function (course) { return totalCredits = totalCredits + course.credits; });
    return totalCredits;
}
function clearCoursesInTable() {
    while (coursesTbody.hasChildNodes()) {
        if (coursesTbody.firstChild != null) {
            coursesTbody.removeChild(coursesTbody.firstChild);
        }
    }
}
