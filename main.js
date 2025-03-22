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
    const nameInput = document.querySelector("#studentName");
    const colorInput = document.querySelector("#studentColor");
    const name = nameInput.value.trim();
    if (!name) return;
    let color = colorInput.value;
    const student = { name, color, avatar: getAvatarUrl(name) };
    students.push(student);
    displayStudents();
    nameInput.value = "";
    colorInput.value = getRandomColor();
}

function displayStudents() {
    const list = document.querySelector("#studentList");
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
    const card = document.querySelector("#selectedStudent");
    card.style.borderColor = student.color;
    card.innerHTML = `<img src='${student.avatar}' width='100'>`;
}

window.onload = function() {
    document.querySelector("#studentColor").value = getRandomColor();
};

document.querySelector("#studentColor").addEventListener("change", function() {
    const selectedColor = this.value;
    const studentName = document.querySelector("#studentName").value.trim();
    if (studentName) {
        const student = students.find(s => s.name === studentName);
        if (student) {
            student.color = selectedColor;
            displayStudents();
        }
    }
});
