(function () {
  const w = window.WEDDING;

  document.querySelectorAll("[data-field]").forEach((el) => {
    const value = w[el.dataset.field];
    if (value) el.textContent = value;
  });
  document.title = `${w.bride} & ${w.groom} — Wedding Invitation`;
  document.getElementById("mapLink").href = w.mapUrl;

  const events = document.getElementById("events");
  w.events.forEach((e) => {
    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = "<h3></h3><p class='when'></p><p class='where'></p>";
    card.querySelector("h3").textContent = e.name;
    card.querySelector(".when").textContent = `${e.date} · ${e.time}`;
    card.querySelector(".where").textContent = e.place;
    events.appendChild(card);
  });

  const countdown = document.getElementById("countdown");
  const target = new Date(w.date).getTime();
  function tick() {
    const diff = target - Date.now();
    if (diff <= 0) {
      countdown.textContent = "Just married!";
      return;
    }
    const units = [
      ["Days", Math.floor(diff / 86400000)],
      ["Hours", Math.floor(diff / 3600000) % 24],
      ["Minutes", Math.floor(diff / 60000) % 60],
      ["Seconds", Math.floor(diff / 1000) % 60]
    ];
    countdown.innerHTML = units
      .map(([label, n]) => `<div><span>${n}</span><small>${label}</small></div>`)
      .join("");
  }
  tick();
  setInterval(tick, 1000);

  document.getElementById("rsvpForm").addEventListener("submit", (ev) => {
    ev.preventDefault();
    const d = new FormData(ev.target);
    const subject = `RSVP: ${d.get("name")} — ${d.get("attending")}`;
    const body =
      `Name: ${d.get("name")}\nGuests: ${d.get("guests")}\n` +
      `Attending: ${d.get("attending")}\n\nMessage:\n${d.get("message")}`;
    window.location.href =
      `mailto:${w.rsvpEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
})();
