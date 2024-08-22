// Display districts when user click on province name
const chooseProvince = document.querySelectorAll("[chooseProvince]");

chooseProvince.forEach(province => {
    province.addEventListener("click", () => {
        const provinceName = province.getAttribute("data-name");

        // Fetch locations 
        fetch(`/admin/locations/fetch?province=${provinceName}`)
            .then(response => response.json())
            .then(data => {
                const displayDistricts = document.querySelector("[displayDistricts]");
                displayDistricts.innerHTML = "";
                
                data.forEach(location => {
                    location.districts.forEach(item => {
                      const tr = document.createElement('tr');
                      tr.innerHTML = `
                        <td>${item}</td>
                        <td>${location.province}</td>
                        <td>
                          <button class="btn btn-danger btn-sm button-delete">Xóa</button>
                        </td>
                      `;
                      displayDistricts.appendChild(tr);
                    });
                  });
            })
    })
})
// End Display districts when user click on province name