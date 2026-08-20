"use strict";

/*
 * Для настоящих заявок через WhatsApp укажи номер Валерии без плюса и пробелов.
 * Пример: const WHATSAPP_NUMBER = "79001234567";
 * Пока строка пустая, форма работает в демонстрационном режиме.
 */
const WHATSAPP_NUMBER = "";

const form = document.getElementById("booking-form");
const serviceSelect = document.getElementById("service-select");
const successBlock = document.getElementById("booking-success");
const bookingMessage = document.getElementById("booking-message");
const resetButton = document.getElementById("reset-booking");
const timeButtons = [...document.querySelectorAll("[data-time]")];

let chosenTime = "13:30";

for (const serviceButton of document.querySelectorAll("[data-service]")) {
  serviceButton.addEventListener("click", () => {
    serviceSelect.value = serviceButton.dataset.service;
    document.getElementById("booking").scrollIntoView({ behavior: "smooth" });
  });
}

for (const timeButton of timeButtons) {
  timeButton.addEventListener("click", () => {
    chosenTime = timeButton.dataset.time;

    for (const button of timeButtons) {
      const active = button === timeButton;
      button.classList.toggle("time-active", active);
      button.setAttribute("aria-pressed", String(active));
    }
  });
}

form.addEventListener("submit", event => {
  event.preventDefault();

  const formData = new FormData(form);
  const name = String(formData.get("name")).trim();
  const contact = String(formData.get("contact")).trim();
  const service = String(formData.get("service"));

  if (WHATSAPP_NUMBER) {
    const message = [
      "Здравствуйте! Хочу записаться на наращивание ресниц.",
      `Имя: ${name}`,
      `Контакт: ${contact}`,
      `Услуга: ${service}`,
      `Удобное время: ${chosenTime}`,
    ].join("\n");

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    bookingMessage.textContent = "Открылся WhatsApp с готовой заявкой. Осталось отправить сообщение Валерии.";
  } else {
    bookingMessage.textContent = `В тестовом режиме форма работает: ты выбрала «${service}» на ${chosenTime}. Для настоящей записи нужно указать номер мастера в файле script.js.`;
  }

  form.hidden = true;
  successBlock.hidden = false;
});

resetButton.addEventListener("click", () => {
  successBlock.hidden = true;
  form.hidden = false;
  form.reset();
  serviceSelect.value = "Классика";
  chosenTime = "13:30";

  for (const button of timeButtons) {
    const active = button.dataset.time === chosenTime;
    button.classList.toggle("time-active", active);
    button.setAttribute("aria-pressed", String(active));
  }
});

document.getElementById("current-year").textContent = String(new Date().getFullYear());
