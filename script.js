const taskList = [];
const badList = [];
const hrPerWeek = 168;
const ttl = 0;

const handleOnSubmit = (e) => {
    
    const frmData = new FormData(e);

    const task = frmData.get("task");
    const hr = +frmData.get("hr");

    const obj = {
        task,
        hr,
    }

    taskList.push(obj);
    
    display();
    totalTaskHours();
    
}

const display = () =>{
    let str = "";
    taskList.map((item, i) => {
        str += `
        <tr>
        <td>
            <input type="checkbox" name="" id="">
            ${item.task}
        </td>
        <td>${item.hr}hr</td>
        <td class="text-end">
            <button class="btn btn-sm btn-danger" onClick="deleteItem(${i})"><i  class="fas fa-trash-alt" title ="Delete"></i></button>
            <button class="btn btn-sm btn-warning" onClick="moveItem(${i})"><i class="fas fa-long-arrow-right" title="Mark as Bad List"></i></button>
        </td>
        </tr>
        `
        
    })

    document.getElementById("task-list").innerHTML = str;
}


const deleteItem = (i) =>{
    taskList.splice(i,1);
    display();
    totalTaskHours();
};

const totalTaskHours = () => {
    const total = taskList.reduce((subttl, item) => subttl + item.hr, 0);
    document.getElementById("totalHours").innerText = total;
}

const moveItem = (i) => {
    document.getElementById("bad-list").innerHTML = display();
}