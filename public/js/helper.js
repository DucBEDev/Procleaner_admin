// Upload preview image
const formCreateHelper = document.querySelector("[form-create-helper]");

if (formCreateHelper) {
    const uploadHealthCertificateInput = formCreateHelper.querySelector("[upload-healthCertificate-input]");
    const uploadHealthCertificatePreview = formCreateHelper.querySelector("[upload-healthCertificate-preview]");

    uploadHealthCertificateInput.addEventListener("change", () => {
        const files = uploadHealthCertificateInput.files;
        uploadHealthCertificatePreview.innerHTML = "";

        for (let i = 0; i < files.length; i++) {
            const reader = new FileReader();

            reader.onloadend = (e) => {
                const img = document.createElement("img");
                img.src = e.target.result;
                img.classList.add("image-preview");
                uploadHealthCertificatePreview.appendChild(img);
            };

            reader.readAsDataURL(files[i]);
        }
    })
}
// End Upload preview image

// Display workingArea input when Choose job detail 
const jobDetailRadio = document.querySelectorAll("input[name='jobDetail']");

if (jobDetailRadio.length > 0) {
    const workingAreaFullTime = document.querySelector("[workingAreaFullTime]");
    const workingAreaPartTime = document.querySelector("[workingAreaPartTime]");
    
    jobDetailRadio.forEach(button => {
        button.addEventListener("change", (e) => {
            const jobDetail = e.target.value;

            if (jobDetail == "fullTime") {
                workingAreaFullTime.classList.remove("d-none");
                workingAreaPartTime.classList.add("d-none");
            }
            else {
                workingAreaFullTime.classList.add("d-none");
                workingAreaPartTime.classList.remove("d-none");
            }
        })
    })
}
// End Display workingArea input when Choose job detail