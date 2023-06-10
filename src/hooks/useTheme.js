
export default function(){
    let app = document.getElementById("app")
    let tar = app.className
    if(app.className == "dark"){
        app.className = "light"
    }else{
        app.className = "dark"
    }
}