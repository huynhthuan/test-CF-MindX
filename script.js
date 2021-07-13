//Exam 1
function adjacentElementsProduct(inputArray) {
    let maxMultiplier = 1;
    let firstNumber, secondNumber, valueMultiplier;

    inputArray.forEach(function (value, index) {
        if (index !== inputArray.length - 1) {
            valueMultiplier = value * inputArray[index + 1];
            if (valueMultiplier > maxMultiplier) {
                maxMultiplier = valueMultiplier;
                firstNumber = value;
                secondNumber = inputArray[index + 1];
            }
        }
    });

    return `Tích lớn nhất là ${maxMultiplier} (cặp ${firstNumber} và ${secondNumber})`;
}

// console.log(adjacentElementsProduct([2, 3, -5, -2, 4]));

//Exam 2
function sumArr(arr) {
    return arr.reduce((accumulator, currentValue) => accumulator + currentValue);
}

function alternatingSums(heightArray) {
    let heightTeam1 = [],
        heightTeam2 = [];
    heightArray.forEach(function (value, index) {
        index % 2 === 0 ? heightTeam1.push(heightArray[index]) : heightTeam2.push(heightArray[index]);
    });

    return [sumArr(heightTeam1), sumArr(heightTeam2)];
}

// console.log(alternatingSums([60, 40, 55, 75, 64]));

//Exam 3
const inputLink = document.querySelector('#link-must-shorten');
const shortenDomain = document.querySelector('input[name="options"]:checked');
const btn = document.querySelector('#do-shorten');

const arrErr = [
    'Không có URL nào được chỉ định (tham số "url" trống)',
    'Đã gửi URL không hợp lệ',
    'Đã đạt đến giới hạn tỷ lệ. Chờ một chút và thử lại',
    'Địa chỉ IP đã bị chặn do vi phạm điều khoản dịch vụ của chúng tôi',
    'Mã shrtcode (slug) đã được sử dụng / sử dụng',
    'Lỗi không xác định',
    'Không có mã nào được chỉ định (tham số "mã" trống)',
    'Đã gửi mã không hợp lệ (không tìm thấy mã / không có liên kết ngắn như vậy)',
    'Thiếu các thông số bắt buộc',
    'Cố gắng rút ngắn một liên kết không được phép',
];

btn.onclick = async () => {
    btn.classList.toggle('active');

    let response = await fetch(`https://api.shrtco.de/v2/shorten?url=${inputLink.value}`);
    let result = await response.json();
    if (result.ok) {
        Swal.fire({
            title: 'Rút gọn link thành công!',
            html: `<a href="https://${shortenDomain.value}/${result.result.code}" target="_blank" class="result-link">${shortenDomain.value}/${result.result.code}</a>`,
            icon: 'success',
            confirmButtonText: 'Đóng',
        });

        inputLink.value = '';
        btn.classList.remove('active');
    } else {
        Swal.fire({
            title: 'Đã có lỗi xảy ra!',
            text: arrErr[result.error_code - 1],
            icon: 'error',
            confirmButtonText: 'Đóng',
        });
        inputLink.value = '';
        btn.classList.remove('active');
    }
};
