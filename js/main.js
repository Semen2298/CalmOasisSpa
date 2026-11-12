"use strict";

(() => {
  const root = document.documentElement;
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  const coarse = matchMedia("(pointer: coarse)");
  const treatments = window.SpaTreatments;
  const byId = new Map(treatments.map((item) => [item.id, item]));
  const money = (amount) =>
    new Intl.NumberFormat("ru-RU", {
      style: "currency",
      currency: "RUB",
      maximumFractionDigits: 0,
    }).format(amount);
  root.classList.add("js");
  document.addEventListener(
    "pointerdown",
    () => {
      root.dataset.input = "pointer";
    },
    true,
  );
  document.addEventListener(
    "keydown",
    (event) => {
      if (event.key === "Tab") root.dataset.input = "keyboard";
    },
    true,
  );

  const menu = document.querySelector("#site-menu");
  const toggle = document.querySelector("[data-open-menu]");
  const dialogAnimations = new WeakMap();
  function openDialog(dialog) {
    dialogAnimations.get(dialog)?.cancel();
    dialog.showModal();
    if (reduced.matches) return;
    const from = dialog === menu ? "translateX(12%)" : "scale(.97)";
    const animation = dialog.animate(
      [
        { opacity: 0.5, transform: from },
        { opacity: 1, transform: "none" },
      ],
      { duration: 340, easing: "cubic-bezier(.22,1,.36,1)" },
    );
    dialogAnimations.set(dialog, animation);
  }
  function closeDialog(dialog, immediate = false) {
    dialogAnimations.get(dialog)?.cancel();
    if (!dialog.open) return;
    if (immediate || reduced.matches) {
      dialog.close();
      return;
    }
    const to = dialog === menu ? "translateX(6%)" : "scale(.985)";
    const animation = dialog.animate(
      [
        { opacity: 1, transform: "none" },
        { opacity: 0, transform: to },
      ],
      { duration: 170, easing: "ease-in" },
    );
    dialogAnimations.set(dialog, animation);
    animation.onfinish = () => dialog.close();
  }
  toggle.hidden = false;
  toggle.addEventListener("click", () => openDialog(menu));
  menu
    .querySelectorAll("a")
    .forEach((link) =>
      link.addEventListener("click", () => closeDialog(menu, true)),
    );
  const mobile = matchMedia("(max-width: 960px)");
  mobile.addEventListener("change", () => {
    if (!mobile.matches && menu.open) closeDialog(menu, true);
  });
  document.querySelectorAll("[data-close-dialog]").forEach((button) => {
    button.addEventListener("click", () =>
      closeDialog(button.closest("dialog")),
    );
  });
  document.querySelectorAll("dialog").forEach((dialog) => {
    dialog.addEventListener("cancel", (event) => {
      event.preventDefault();
      closeDialog(dialog);
    });
    reduced.addEventListener("change", () => {
      if (reduced.matches) dialogAnimations.get(dialog)?.finish();
    });
    dialog.addEventListener("click", (event) => {
      const bounds = dialog.getBoundingClientRect();
      if (
        event.target === dialog &&
        (event.clientX < bounds.left ||
          event.clientX > bounds.right ||
          event.clientY < bounds.top ||
          event.clientY > bounds.bottom)
      )
        closeDialog(dialog);
    });
  });
  document.querySelectorAll(".header__nav a").forEach((link) => {
    if (link.getAttribute("href") === document.body.dataset.page)
      link.setAttribute("aria-current", "page");
  });

  const treatmentPhoto = document.querySelector("[data-treatment-photo] > img");
  let photoRequest = 0;
  async function showTreatmentPhoto(id) {
    if (!treatmentPhoto) return;
    const item = byId.get(id);
    if (!item) return;
    const ticket = ++photoRequest;
    const next = new Image();
    next.src = `img/${item.image}-800.webp`;
    try {
      await next.decode();
      if (ticket !== photoRequest) return;
      treatmentPhoto.srcset = `img/${item.image}-480.webp 480w, img/${item.image}-800.webp 800w, img/${item.image}-1440.webp 1440w`;
      treatmentPhoto.src = next.src;
      treatmentPhoto.alt = {
        "spa-hands": "Спокойный массаж плеч через льняной халат",
        "spa-face": "Деликатный уход за лицом с мягкой маской",
        "spa-ritual": "Подготовка гладких тёплых камней к процедуре",
        "spa-nails": "Аккуратный маникюр в дневном свете",
      }[item.image];
      if (!reduced.matches)
        treatmentPhoto.animate([{ opacity: 0.5 }, { opacity: 1 }], {
          duration: 350,
        });
    } catch {
      // Keep the previous, fully loaded photograph when a request fails.
    }
  }

  // Native details remain usable without JavaScript; animation follows actual content height.
  const closeDisclosures = new WeakMap();
  document.querySelectorAll(".treatment, .note").forEach((details) => {
    const summary = details.querySelector("summary");
    const content = details.querySelector(".disclosure__content");
    let expanded = details.open;
    let animation;
    details.dataset.expanded = String(expanded);
    function setExpanded(value) {
      if (value === expanded) return;
      const height = content.getBoundingClientRect().height;
      animation?.cancel();
      expanded = value;
      if (expanded && details.closest(".treatments__list"))
        showTreatmentPhoto(details.dataset.treatment);
      details.dataset.expanded = String(expanded);
      content.inert = !expanded;
      if (reduced.matches) {
        details.open = expanded;
        return;
      }
      details.open = true;
      animation = content.animate(
        [
          { height: `${height}px` },
          { height: `${expanded ? content.scrollHeight : 0}px` },
        ],
        { duration: 320, easing: "cubic-bezier(.22,1,.36,1)" },
      );
      animation.onfinish = () => {
        details.open = expanded;
        animation = undefined;
      };
    }
    closeDisclosures.set(details, () => setExpanded(false));
    summary.addEventListener("click", (event) => {
      event.preventDefault();
      const next = !expanded;
      const group = details.closest(".treatments__list");
      if (next && group) {
        group.querySelectorAll(".treatment").forEach((other) => {
          if (other !== details) closeDisclosures.get(other)?.();
        });
      }
      setExpanded(next);
    });
    reduced.addEventListener("change", () => {
      if (reduced.matches) animation?.finish();
    });
  });

  const filters = document.querySelector(".catalog__filters");
  if (filters) {
    filters.hidden = false;
    filters.addEventListener("click", (event) => {
      const button = event.target.closest("[data-category]");
      if (!button) return;
      const category = button.dataset.category;
      filters
        .querySelectorAll("button")
        .forEach((item) =>
          item.setAttribute("aria-pressed", String(item === button)),
        );
      let count = 0;
      document.querySelectorAll("[data-group]").forEach((group) => {
        group.hidden = category !== "all" && group.dataset.group !== category;
        if (!group.hidden) count += group.querySelectorAll(".treatment").length;
      });
      document.querySelector(".catalog__status").textContent =
        `Показано процедур: ${count}.`;
    });
  }

  const form = document.querySelector("#visit-form");
  if (form) {
    const select = form.querySelector("#treatment");
    const box = form.querySelector(".form-errors");
    const fieldset = form.querySelector("fieldset");
    fieldset.disabled = false;
    const valid = (field) => {
      if (field.type === "checkbox") return field.checked;
      if (!field.value.trim()) return !field.required;
      if (field.type === "tel")
        return (
          /^[+\d\s()-]+$/.test(field.value) &&
          field.value.replace(/\D/g, "").length >= 7 &&
          field.value.replace(/\D/g, "").length <= 15
        );
      return field.validity.valid;
    };
    const message = (field) => {
      if (field === select) return "Выберите процедуру или помощь с выбором.";
      if (field.type === "email")
        return "Введите email в формате name@example.com.";
      if (field.type === "tel")
        return "Укажите телефон из 7–15 цифр или оставьте поле пустым.";
      if (field.type === "checkbox")
        return "Подтвердите ознакомление с условиями.";
      return "Напишите, как к вам обращаться.";
    };
    const error = (field, invalid) => {
      field.setAttribute("aria-invalid", String(invalid));
      const note = document.getElementById(`${field.id}-error`);
      if (note) {
        note.hidden = !invalid;
        note.textContent = invalid ? message(field) : "";
      }
    };
    const summarize = (focus = false) => {
      const fields = [...form.querySelectorAll('[aria-invalid="true"]')];
      const list = box.querySelector("ul");
      list.replaceChildren();
      fields.forEach((field) => {
        const item = document.createElement("li");
        const link = document.createElement("a");
        link.href = `#${field.id}`;
        link.textContent = message(field);
        link.addEventListener("click", (event) => {
          event.preventDefault();
          field.focus();
        });
        item.append(link);
        list.append(item);
      });
      box.hidden = !fields.length;
      if (focus && fields.length) box.focus();
    };
    function updateSelection() {
      const item = byId.get(select.value);
      form.querySelector("[data-selection-name]").textContent =
        item?.name ||
        (select.value === "gift"
          ? "Подарочный сертификат"
          : select.value === "consult"
            ? "Начнём с ваших пожеланий"
            : "Выбор за вами");
      form.querySelector("[data-selection-meta]").textContent = item
        ? `${item.minutes} мин · ${money(item.price)}`
        : select.value
          ? "Формат и детали можно обсудить. Это демоверсия."
          : "Длительность и стоимость появятся здесь.";
      if (select.hasAttribute("aria-invalid")) {
        error(select, !valid(select));
        if (!box.hidden) summarize();
      }
    }
    const initial = new URLSearchParams(location.search).get("treatment");
    if (byId.has(initial) || ["gift", "consult"].includes(initial))
      select.value = initial;
    updateSelection();
    select.addEventListener("change", updateSelection);
    document.querySelectorAll("[data-choose]").forEach((link) => {
      link.addEventListener("click", () => {
        select.value = link.dataset.choose;
        updateSelection();
        document.querySelector(".live-status").textContent =
          `${form.querySelector("[data-selection-name]").textContent}. Выбор добавлен в форму визита.`;
        if (!reduced.matches)
          form
            .querySelector(".booking__selection")
            .animate(
              [
                { backgroundColor: "#c4d8c5" },
                {
                  backgroundColor: getComputedStyle(
                    form.querySelector(".booking__selection"),
                  ).backgroundColor,
                },
              ],
              {
                duration: 650,
              },
            );
      });
    });
    form.addEventListener("focusout", (event) => {
      const field = event.target;
      if (
        !field.matches(
          'input[type="text"],input[type="email"],input[type="tel"],input:not([type])',
        )
      )
        return;
      if (field.value.trim() || field.hasAttribute("aria-invalid")) {
        error(field, !valid(field));
        if (!box.hidden) summarize();
      }
    });
    form.addEventListener("input", (event) => {
      const field = event.target;
      if (field.getAttribute("aria-invalid") === "true" && valid(field)) {
        error(field, false);
        if (!box.hidden) summarize();
      }
      form.querySelector(".form-status").textContent = "";
    });
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const fields = [...form.querySelectorAll('[required],input[type="tel"]')];
      fields.forEach((field) => error(field, !valid(field)));
      summarize(true);
      if (!fields.every(valid)) return;
      try {
        sessionStorage.setItem(
          "calm-oasis-visit",
          JSON.stringify({ treatment: select.value }),
        );
      } catch {
        form.querySelector(".form-status").textContent =
          "Выбор проверен. Браузер запрещает сохранить итог. Контакты не отправлены, запись не создана.";
        return;
      }
      form.reset();
      location.assign("thanks.html");
    });
  }

  const result = document.querySelector("[data-result]");
  if (result) {
    let selected;
    try {
      selected = JSON.parse(
        sessionStorage.getItem("calm-oasis-visit"),
      )?.treatment;
    } catch {
      /* Empty result remains available. */
    }
    const item = byId.get(selected);
    if (item || ["consult", "gift"].includes(selected)) {
      result.hidden = false;
      document.querySelector("[data-result-empty]").hidden = true;
      document.querySelector("[data-result-title]").textContent =
        "Ваш выбор — уже начало.";
      document.querySelector("[data-result-text]").textContent =
        "Хорошо, когда время для себя появляется в планах. Ниже — выбранный вами формат визита.";
      result.querySelector("[data-result-name]").textContent =
        item?.name ||
        (selected === "gift" ? "Подарочный сертификат" : "Помощь с выбором");
      result.querySelector("[data-result-meta]").textContent = item
        ? `${item.minutes} мин · ${money(item.price)}`
        : "Детали обычно обсуждают перед визитом.";
      result.querySelector("[data-result-repeat]").href =
        `index.html?treatment=${encodeURIComponent(selected)}#booking`;
    }
  }

  const viewer = document.querySelector("#photo-view");
  document.querySelectorAll("[data-photo]").forEach((button) => {
    button.addEventListener("click", () => {
      const source = button.querySelector("img");
      const image = viewer.querySelector("[data-full-photo]");
      image.src = `img/${button.dataset.photo}-1440.webp`;
      image.alt = source.alt;
      openDialog(viewer);
    });
  });

  const heroCaption = document.querySelector(".hero__media figcaption");
  if (heroCaption && !reduced.matches) {
    const entrance = heroCaption.animate(
      [
        { opacity: 0, transform: "translateX(-8px)" },
        { opacity: 1, transform: "translateX(0)" },
      ],
      { duration: 600, easing: "cubic-bezier(.22,1,.36,1)" },
    );
    reduced.addEventListener("change", () => {
      if (reduced.matches) entrance.cancel();
    });
  }
  const scene = document.querySelector(".space__photo-button");
  if (scene) {
    let visible = false,
      pending = false;
    const photo = scene.querySelector("img");
    function draw() {
      pending = false;
      if (!visible || reduced.matches || coarse.matches) {
        photo.style.transform = "";
        return;
      }
      const bounds = scene.getBoundingClientRect();
      const progress = Math.max(
        -1,
        Math.min(
          1,
          (bounds.top + bounds.height / 2 - innerHeight / 2) / innerHeight,
        ),
      );
      photo.style.transform = `translateY(${progress * 1.7}%) scale(1.04)`;
    }
    function schedule() {
      if (!pending) {
        pending = true;
        requestAnimationFrame(draw);
      }
    }
    new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      schedule();
    }).observe(scene);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    reduced.addEventListener("change", schedule);
    coarse.addEventListener("change", schedule);
  }
})();
