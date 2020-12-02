function gameClicked(object) {
    console.log(object.id);
    let result = dataGridDisplayClicked(object, "col");
    console.log(result);
}