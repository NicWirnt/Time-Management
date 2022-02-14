const taskList = [];
const badList = [];
const hrPerWeek = 168;

const handleOnSubmit = (e) => {
    
    const frmData = new FormData(e);

    const task = frmData.get("task");
    const hr = +frmData.get("hr");

    const obj = {
        task,
        hr,
    }
    const ttl = totalTaskHours();
    if((ttl+hr) >=hrPerWeek){
        alert("Maximum hours reached in a week");
        return;
    }else{
    taskList.push(obj);
    }
    
    display();
    
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
    totalTaskHours();
    document.getElementById("task-list").innerHTML = str;

}


const deleteItem = (i) =>{
    taskList.splice(i,1);
    display();
    totalTaskHours();
};

const deleteBadItem = (i) =>{
    badList.splice(i,1);
    displayBad();
    totalTaskHours();
    totalSavedHours();
}

const totalTaskHours = () => {
    const totalTask = taskList.reduce((subttl, item) => subttl + item.hr, 0);
    const totalBad = badList.reduce((subttl, item) => subttl + item.hr, 0);
    const subTotal = totalTask + totalBad;
    document.getElementById("totalHours").innerText = subTotal;
    return subTotal;
}

const moveItem = (i) => {
    badList.push(taskList[i]);
    taskList.splice(i,1);
    display();
    displayBad();
    totalSavedHours();
}

const moveBackItem = (i) =>{
    taskList.push(badList[i]);
    badList.splice(i,1);
    display();
    totalSavedHours();
    displayBad();
}

const displayBad = () =>{
    let str="";
    badList.map((item, i) => {
        str += `
        <tr>
        <td>
            <input type="checkbox" name="" id="">
            ${item.task}
        </td>
        <td>${item.hr}hr</td>
        <td class="text-end">
            <button class="btn btn-sm btn-danger" onClick="deleteBadItem(${i})"><i  class="fas fa-trash-alt" title ="Delete"></i></button>
            <button class="btn btn-sm btn-warning" onClick="moveBackItem(${i})"><i class="fas fa-long-arrow-right" title="Mark as Bad List"></i></button>
        </td>
        </tr>
        `
        
    })
    
    document.getElementById("bad-list").innerHTML = str;
}





const totalSavedHours = () => {
    const total = badList.reduce((subttl, item) => subttl + item.hr, 0);
    document.getElementById("totalSaved").innerText = total;
}