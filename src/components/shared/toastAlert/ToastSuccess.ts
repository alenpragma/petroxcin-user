import Swal from "sweetalert2";

export const showSuccessModal = (title: string, descrip: string) => {
  Swal.fire({
    html: `
      <div class="my-custom-modal flex flex-col items-center justify-start gap-4">
        <img class="w-10 h-10" src="https://cdn-icons-png.flaticon.com/512/148/148767.png" alt="img" />
        <p class="custom-text text-[20px] font-semibold">${title}</p>
        <p>${descrip}</p>
      </div>
    `,
    showConfirmButton: false,
    customClass: {
      popup: "w-fit px-14",
    },
    timer: 3000,
    timerProgressBar: false,
  });
};
export const showErrorModal = (title: string, descrip: string) => {
  Swal.fire({
    html: `
      <div class="my-custom-modal flex flex-col items-center justify-start gap-4">
        <img class="w-10 h-10" src="https://static.vecteezy.com/system/resources/previews/026/526/158/non_2x/error-icon-vector.jpg" alt="img" />
        <p class="custom-text text-[20px] font-semibold">${title}</p>
        <p>${descrip}</p>
      </div>
    `,
    showConfirmButton: false,
    customClass: {
      popup: "w-fit px-14",
    },
    timer: 3000,
    timerProgressBar: false,
  });
};
export const showMailModal = (title: string, descrip: string) => {
  Swal.fire({
    html: `
      <div class="my-custom-modal flex flex-col items-center justify-start gap-4">
        <img class="w-10 h-10" src="https://e7.pngegg.com/pngimages/105/439/png-clipart-white-and-blue-message-icon-illustration-email-computer-icons-symbol-message-inbox-by-gmail-envelope-miscellaneous-blue-thumbnail.png" alt="img" />
        <p class="custom-text text-[20px] font-semibold">${title}</p>
        <p>${descrip}</p>
      </div>
    `,
    showConfirmButton: false,
    customClass: {
      popup: "w-fit px-14",
    },
    timer: 3000,
    timerProgressBar: false,
  });
};
