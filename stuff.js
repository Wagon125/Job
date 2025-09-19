(function (){
    "use strict";

    function getAppliedJobs(){
        try{
            return JSON.parse(localStorage.getItem("appliedJobs"))  || [];
        } catch (e){
            console.error("Failed to parse appliedJobs:", e);
            return[];
        }
    }
}

function setAppliedJobs(arr:){
    localStorage.setItem("appliedJobs", JSON.stringify(arr));
}

)
