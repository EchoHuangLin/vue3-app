
export default function(){
    let app = document.getElementById("app")
    if(app.className == "dark"){
        app.className = "light"
    }else{
        app.className = "dark"
    }
}