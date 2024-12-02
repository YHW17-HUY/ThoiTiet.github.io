"use strict";

// Lấy các phần tử DOM
const input = document.querySelector("#city-input"); // Lấy input thành phố
const btn = document.querySelector("#search-btn"); // Lấy nút Submit
const list = document.createElement("ul"); // Tạo danh sách để hiển thị dữ liệu
const div1 = document.querySelector("#div1"); // Lấy phần tử div1
div1.appendChild(list); // Thêm danh sách vào div1
list.classList.add("cities"); // Thêm class để tiện sử dụng CSS

// API key
const apiKey = "e4c7c089eda971ae23eef1e3e1d1e69f";

// Sự kiện click trên nút
btn.addEventListener("click", function () {
  // Lấy giá trị thành phố từ input
  const city = input.value.trim(); // Loại bỏ khoảng trắng thừa

  if (city === "") {
    alert("Please enter a city name!"); // Thông báo nếu không nhập gì
    return;
  }

  // Tạo URL API với thành phố vừa nhập
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  // Gọi API
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("City not found");
      }
      return response.json();
    })
    .then((data) => {
      displayWeather(data);
    })
    .catch((err) => {
      alert(err.message); // Hiển thị lỗi nếu có vấn đề
    });

  // Reset input sau khi click
  input.value = "";
});

// Hàm hiển thị thông tin thời tiết
function displayWeather(data) {
  const { name, main, weather } = data;
  const icon = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

  const html = `
    <li class="city">
      <h2 class="city-name">${name}, ${data.sys.country}</h2>
      <div class="city-temp">${Math.round(main.temp)}°C</div>
      <figure>
        <img class="city-icon" src="${icon}" alt="${weather[0].description}">
        <figcaption>${weather[0].description}</figcaption>
      </figure>
    </li>`;

  // Kiểm tra trùng thành phố
  const existingCity = Array.from(list.children).find(
    (item) =>
      item.querySelector(".city-name").textContent ===
      `${name}, ${data.sys.country}`
  );

  if (existingCity) {
    alert("You already searched for this city!");
    return;
  }

  list.insertAdjacentHTML("afterbegin", html); // Thêm thành phố vào danh sách
}
