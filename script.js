


console.log("hi");
let form=document.querySelector('#imgform')
form.addEventListener("submit",async function (e) {
        e.defaultPrevented();
        const formData = new FormData(form);
        //let image=document.querySelector("input[name='images']").value;
       let resp=await axios.post("/backend/multiple",formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
        console.log(resp.data);
        //console.log(image);
    })
    