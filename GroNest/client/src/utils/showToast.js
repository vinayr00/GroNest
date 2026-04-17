export function showToast(message){

  const toast = document.getElementById("toast");

  toast.innerHTML = "✅ " + message;

  toast.style.display = "block";

  setTimeout(()=>{
    toast.style.display = "none";
  },2000);

}