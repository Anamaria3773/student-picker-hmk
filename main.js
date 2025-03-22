let students = [];

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function getAvatarUrl(name) {
    return `https://api.dicebear.com/9.x/big-smile/svg?seed=${name}`;
}

function addStudent() {
    const name = document.getElementById("studentName").value.trim();
    if (!name) return;
    let color = document.getElementById("studentColor").value;
    const student = { name, color, avatar: getAvatarUrl(name) };
    students.push(student);
    displayStudents();
    document.getElementById("studentName").value = "";
    document.getElementById("studentColor").value = getRandomColor();
}

function displayStudents() {
    const list = document.getElementById("studentList");
    list.innerHTML = "";
    students.forEach((student, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <span>
                <div class="color-circle" style="background-color: ${student.color};"></div>
                <img src='${student.avatar}' width='30'> ${student.name}
            </span>
            <button onclick='removeStudent(${index})'>delete</button>
        `;
        list.appendChild(li);
    });
}

function removeStudent(index) {
    students.splice(index, 1);
    displayStudents();
}

function pickRandomStudent() {
    if (students.length === 0) return;
    const student = students[Math.floor(Math.random() * students.length)];
    const card = document.getElementById("selectedStudent");
    card.style.borderColor = student.color;
    card.innerHTML = `<img src='${student.avatar}' width='100'>`;
}

window.onload = function() {
    document.getElementById("studentColor").value = getRandomColor();
};

document.getElementById("studentColor").addEventListener("change", function() {
    const selectedColor = this.value;
    const studentName = document.getElementById("studentName").value.trim();
    if (studentName) {
        const student = students.find(s => s.name === studentName);
        if (student) {
            student.color = selectedColor;
            displayStudents();
        }
    }
});