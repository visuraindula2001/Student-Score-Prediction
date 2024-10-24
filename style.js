






function predictscore(){
    const input = {
        hoursStudied : parseFloat(document.getElementById("hoursStudied").value),
        attendecePercentage: parseFloat(document.getElementById("attendecePercentage").value),
        examScore : parseFloat(document.getElementById("examScore").value)
    }
};

document.getElementById("predictBtn").addEventListener("click",predictscore)