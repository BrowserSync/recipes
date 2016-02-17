type Person = {
    name:string
}

const sayHi = ({name}:Person)=> {
    document.querySelector('#example').textContent = `
        Hi, ${name}
    `
};

sayHi({name: "Frank"}); 