import { Course } from './course.js';

import { dataCourses } from './dataCourses.js';

import { Student } from './student.js';

import { dataStudent } from './dataStudent.js';

let nameTitle: HTMLElement = document.getElementById('name')!;
let studentDatabody: HTMLElement = document.getElementById('studentData')!;
let coursesTbody: HTMLElement = document.getElementById('courses')!;
const btnfilterByName: HTMLElement = document.getElementById("button-filterByName")!;
const inputSearchBox: HTMLInputElement = <HTMLInputElement> document.getElementById("search-box")!;
const totalCreditElm: HTMLElement = document.getElementById("total-credits")!;
const rangoIni: HTMLElement = document.getElementById("ran-from")!;
const rangoFin: HTMLElement = document.getElementById("ran-to")!;
const btnFiltroRango: HTMLElement = document.getElementById("btn-range")!;

btnfilterByName.onclick = () => applyFilterByName();

btnFiltroRango.onclick = () => filtroRango();

renderCoursesInTable(dataCourses);

renderStudentDataInTable(dataStudent);

totalCreditElm.innerHTML = `${getTotalCredits(dataCourses)}`

function renderStudentDataInTable(data:Student): void {
  console.log("Desplegando datos del estudiante");
  for(let prop in data){
    if(prop == "name"){ 
      nameTitle.innerHTML = <string>data[prop as keyof Student];
      continue;
    }
    let trElement = document.createElement("tr");
    trElement.innerHTML = `<td>${prop}</td>
                           <td>${data[prop as keyof Student]}</td>`;
    studentDatabody.appendChild(trElement);
  }
  /*studentDatabody.innerHTML=`<tr>${data.name}</tr>
                           <tr>${data.code}</tr>
                           <tr>${data.id}</tr>
                           <tr>${data.age}</tr>
                           <tr>${data.address}</tr>
                           <tr>${data.tel}</tr>`; */
  
}

function renderCoursesInTable(courses: Course[]): void {
  console.log('Desplegando cursos');
  courses.forEach((course) => {
    let trElement = document.createElement("tr");
    trElement.innerHTML = `<td>${course.name}</td>
                           <td>${course.professor}</td>
                           <td>${course.credits}</td>`;
    coursesTbody.appendChild(trElement);
  });
}

function applyFilterByName() { 
  let text = inputSearchBox.value;
  text = (text == null) ? '' : text;
  clearCoursesInTable();
  let coursesFiltered: Course[] = searchCourseByName(text, dataCourses);
  renderCoursesInTable(coursesFiltered);
}

function searchCourseByName(nameKey: string, courses: Course[]) {
  return nameKey === '' ? dataCourses : courses.filter( c => 
    c.name.match(nameKey));
}

function filtroRango(){
  const desde:number = <number><unknown>rangoIni.value; //Esto marca error pero funciona y ni idea de qué propiedad no marque error xd
  const hasta:number = <number><unknown>rangoFin.value;
  if ( !desde || !hasta ){
    clearCoursesInTable()
    renderCoursesInTable(dataCourses);
  }
  else if(hasta < desde || desde > hasta){
    //._.xD
    //Esto está aquí solo para que no se haga nada si eso pasa jsjsjs
    1+1; //Aparentemente el compilador ignora esto si no hago nada en el if, así que ahora hace esta suma B)
  }
  else{ 
    const nuevoArreglo = dataCourses.filter(course =>{
      return course.credits > desde && course.credits < hasta;
    });     
    console.log(nuevoArreglo);
    clearCoursesInTable();
    renderCoursesInTable(nuevoArreglo);
  }
}

function getTotalCredits(courses: Course[]): number {
  let totalCredits: number = 0;
  courses.forEach((course) => totalCredits = totalCredits + course.credits);
  return totalCredits;
}

function clearCoursesInTable() {
  while (coursesTbody.hasChildNodes()) {
    if (coursesTbody.firstChild != null) {
      coursesTbody.removeChild(coursesTbody.firstChild);
     
    }
  }
}