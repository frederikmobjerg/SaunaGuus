const modal = document.getElementById('subscribeModal');
const subscribeButtons = document.querySelectorAll('.subscribe');
const modalSubscribe = document.querySelector('.modal-subscribe');
const modalInput = document.querySelector('.modal-input');

let currentProject = null; // husker hvilken knap der blev trykket

// Åbn modal og gem hvilket projekt
subscribeButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    currentProject = btn.getAttribute('data-project'); // fx "london" eller "newyork"
    modal.style.display = 'flex';
    modalInput.value = "";
  });
});

// Luk modal når man klikker udenfor
window.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});

// SUBMIT-knap
modalSubscribe.addEventListener('click', async () => {
  const email = modalInput.value.trim();

  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    showMessage("Fill in a valid email.");
    return;
  }

  // Vælg Formspree endpoint ud fra valgt projekt
  let formspreeUrl = "";
  if (currentProject === "london") {
    formspreeUrl = "https://formspree.io/f/mzzagezo";
  } else if (currentProject === "newyork") {
    formspreeUrl = "https://formspree.io/f/meolkaod";
  } else {
    showMessage("No project chosen.");
    return;
  }

  try {
    const res = await fetch(formspreeUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify({ email })
    });

    if (res.ok) {
      modal.style.display = 'none'; // LUK FØRST
      modalInput.value = "";
      showMessage(`Thank you! You are now subscribed to ${currentProject}`);
    } else {
      const data = await res.json().catch(() => ({}));
      const msg = data?.errors?.map(e => e.message).join(", ") || "something went wrong.";
      showMessage(msg);
    }
  } catch (err) {
    showMessage("could not send. check your internet connection.");
    console.error(err);
  }
});

// Placeholder-effekt (valgfrit)
modalInput.addEventListener('focus', () => {
  modalInput.placeholder = '';
});

modalInput.addEventListener('blur', () => {
  modalInput.placeholder = 'ENTER EMAIL';
});

modalInput.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    modalSubscribe.click();
  }
});


window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    const overlay = document.getElementById('intro-overlay');
    overlay.style.opacity = 0;
    setTimeout(() => {
      overlay.style.display = 'none';
    }, 1200); // matcher transition-tiden
  }, 1800); // hvor længe introen vises (ms)
});

function showMessage(msg) {
  const msgBox = document.getElementById('custom-message');
  msgBox.textContent = msg;
  msgBox.style.display = 'block';
  msgBox.style.zIndex = '10000'; // sikrer at den er ovenpå modal
  msgBox.style.opacity = '1'; // hvis du bruger fade senere

  // Skjul efter 3 sekunder
  setTimeout(() => {
    msgBox.style.display = 'none';
  }, 3000);
}

const cursor = document.querySelector('.custom-cursor');
let isRed = true;

document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});

document.addEventListener('click', () => {
  if (isRed) {
    cursor.style.background = '#97bfc5'; // blå
  } else {
    cursor.style.background = '#c55a48'; // rød
  }
  isRed = !isRed;
});

window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};

document.addEventListener('DOMContentLoaded', () => {
  let colorToggle = true;
  const sections = document.querySelectorAll('.about-text, .ourspark-text, .ethos-text');
  sections.forEach(section => {
    section.innerHTML = section.innerHTML.replace(/SaunaGuus/g, function () {
      const cls = colorToggle ? 'color-blue' : 'color-red';
      colorToggle = !colorToggle;
      return `<span class="${cls}">SaunaGuus</span>`;
    });
  });
});

subscribeButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    console.log('Project:', btn.getAttribute('data-project')); // Debug
    currentProject = btn.getAttribute('data-project');
    modal.style.display = 'flex';
    modalInput.value = "";
  });
});