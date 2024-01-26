let province = [];
let amphure = [];
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

function amphureFetch(id) {
  document.addEventListener("DOMContentLoaded", function () {
    var apiUrl = urlDistrict;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        DropdownAmphur(id, data);
        amphure = data;
      })
      .catch((error) => console.log("เกิดข้อผิดพลาด:", error));
  });
}

function subFetch() {
  document.addEventListener("DOMContentLoaded", function () {
    var apiUrl = urlSubDistrict;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        Dropdownsub("sub-select", data);
        Dropdownsub("sub-parent-select", data);
        zipCode = data;
      })
      .catch((error) => console.log("เกิดข้อผิดพลาด:", error));
  });
}

function DropdownAmphur(id, selectedValue) {
  var dropdownElement = document.getElementById(id);

  var defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.text = "Select an option";
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

function Dropdownsub(sub_id, selectedValue) {
  var dropdownElement = document.getElementById(sub_id);

  var defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.text = "Select an option";
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
}

function provinceid(province_id, district_id) {
  provinceFetch();
  var dropdowncontry = document.getElementById(province_id).value;
  const response = province.filter((item) => item.name_th === dropdowncontry)[0]
    .id;
  DropdownAmphur(district_id, response);
}

function amphureid(amphure_id, sub_id) {
  amphureFetch();
  var dropdowncontry = document.getElementById(amphure_id).value;
  const response = amphure.filter((item) => item.name_th === dropdowncontry)[0]
    .id;
  Dropdownsub(sub_id, response);
}

function zipcodeid(elementid, postcode_id) {
  subFetch();
  var dropdowncontry = document.getElementById(elementid).value;
  const response = zipCode.filter((item) => item.name_th === dropdowncontry)[0]
    .zip_code;
  document.getElementById(postcode_id).value = response;
}
