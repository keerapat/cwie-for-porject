let province = [];
let district = [];
let zipCode = [];

const urlProvince =
  "https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_province.json";
const urlDistrict =
  "https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_amphure.json";
const urlSubDistrict =
  "https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_tambon.json";

document.addEventListener("DOMContentLoaded", function () {
  var apiUrl = urlProvince;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      var dropdownElement = document.getElementById("province-select");
      var dropdownElementParent = document.getElementById(
        "province-parent-select"
      );
      data.forEach((item) => {
        var option = document.createElement("option");
        option.value = item.name_th;
        dropdownElement.appendChild(option);
        dropdownElementParent.appendChild(option.cloneNode(true));
      });
      province = data;
    })
    .catch((error) => console.error("เกิดข้อผิดพลาด:", error));
});

document.addEventListener("DOMContentLoaded", function () {
  var apiUrl = urlDistrict;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      district = data;
    })
    .catch((error) => console.log("เกิดข้อผิดพลาด:", error));
});

document.addEventListener("DOMContentLoaded", function () {
  var apiUrl = urlSubDistrict;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      zipCode = data;
    })
    .catch((error) => console.log("เกิดข้อผิดพลาด:", error));
});

function DropdownDistrict(id, selectedValue) {
  var dropdownElement = document.getElementById(id);

  var defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.text = "Select an option";
  dropdownElement.innerHTML = "";
  dropdownElement.appendChild(defaultOption);
  var apiUrlDropdown2 =
    "https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_amphure.json";

  fetch(apiUrlDropdown2)
    .then((response) => response.json())
    .then((data) => {
      data.forEach((item) => {
        var option = document.createElement("option");
        if (item.province_id == selectedValue) {
          option.value = item.name_th;
          dropdownElement.appendChild(option);
        }
      });
    })
    .catch((error) => console.error("เกิดข้อผิดพลาด:", error));
}

function DropdownSub(sub_id, selectedValue) {
  var dropdownElement = document.getElementById(sub_id);
  var defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.text = "Select an option";
  dropdownElement.innerHTML = "";
  dropdownElement.appendChild(defaultOption);
  var apiUrlDropdown3 =
    "https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_tambon.json";

  fetch(apiUrlDropdown3)
    .then((response) => response.json())
    .then((data) => {
      data.forEach((item) => {
        var option = document.createElement("option");
        if (item.amphure_id == selectedValue) {
          option.value = item.name_th;
          dropdownElement.appendChild(option);
        }
      });
    })
    .catch((error) => console.error("เกิดข้อผิดพลาด:", error));
  console.log(dropdownElement);
}

function provinceSelect(province_id, district_id) {
  var dropdownCountry = document.getElementById(province_id).value;
  const response = province.filter(
    (item) => item.name_th === dropdownCountry
  )[0].id;
  DropdownDistrict(district_id, response);
}

function districtSelect(district_id, sub_id) {
  var dropdownCountry = document.getElementById(district_id).value;
  const response = district.filter(
    (item) => item.name_th === dropdownCountry
  )[0].id;
  DropdownSub(sub_id, response);
}

function subDistrictSelect(subId, postcode_id) {
  var dropdownCountry = document.getElementById(subId).value;
  const response = zipCode.filter((item) => item.name_th === dropdownCountry)[0]
    .zip_code;
  document.getElementById(postcode_id).value = response;
}
