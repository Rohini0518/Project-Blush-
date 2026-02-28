
console.log("script js")
let output=document.getElementById("output")
 const handleSubmit=(e)=>{
    e.preventDefault()
const result=[]
const formData=new FormData(e.target)
let fname=formData.get("firstname")
let age=formData.get("age")
let gender=formData.get("gender")
let skills=formData.getAll("skills") 

if(!fname ||fname.trim() ===""){
    output.innerText="Enter Name"
    return;
}
if(!age ||age.trim() ===""){
    output.innerText="Enter Age"
    return;
}
if(!gender){
    output.innerText="Enter gender"
    return;
}
if(skills.length==0){
    output.innerText="Enter  skills"
    return;
}

for(let [key,value] of formData.entries()){
    result.push(`${key}:${value}`)
}

console.log(result)
output.innerText=`Output:${result.join(", ")}`
}

