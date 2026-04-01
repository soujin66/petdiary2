// 기록 저장 버튼 이벤트
document.getElementById("save-btn").addEventListener("click", () => {
  const photoInput = document.getElementById("photo-input");
  const storyInput = document.getElementById("story-input").value;

  if (!photoInput.files[0] || !storyInput.trim()) {
    alert("사진과 에피소드를 모두 입력해주세요!");
    return;
  }

  const reader = new FileReader();
  reader.onload = function(e) {
    const record = {
      photo: e.target.result,
      story: storyInput,
      date: new Date().toLocaleString()
    };

    // localStorage에 저장
    let records = JSON.parse(localStorage.getItem("petDiary")) || [];
    records.push(record);
    localStorage.setItem("petDiary", JSON.stringify(records));

    // 화면 갱신
    displayRecords();
    photoInput.value = "";
    document.getElementById("story-input").value = "";
  };
  reader.readAsDataURL(photoInput.files[0]);
});

// 기록 불러오기
function displayRecords() {
  const recordsList = document.getElementById("records-list");
  recordsList.innerHTML = "";

  let records = JSON.parse(localStorage.getItem("petDiary")) || [];
  records.forEach(record => {
    const div = document.createElement("div");
    div.className = "record";
    div.innerHTML = `
      <img src="${record.photo}" alt="반려동물 사진">
      <p><strong>${record.date}</strong></p>
      <p>${record.story}</p>
    `;
    recordsList.appendChild(div);
  });
}

// 초기 실행
displayRecords();
