if (window.screen.width < 600) {
  document.getElementById('descr').innerText = 'Czekam na Państwa telefon :)';

  document.getElementById('face').style.top = '68%';
  document.getElementById('face').style.left = '75%';
  document.getElementById('face').style.width = '20%';
  document.getElementById('face').style.height = 'auto';

  document.getElementById('box').style.top = '70.8%';
  document.getElementById('box').style.left = '20%';
  document.getElementById('box').style.width = '60%';
  document.getElementById('box').style.height = '7%';

  document.getElementById('shadow').style.display = 'none';
  document.getElementById('phone-icon').style.display = 'none';
  document.getElementById('phone-number').style.display = 'none';

  document.getElementById('descr').style.marginTop = '6.5%';
  document.getElementById('descr').style.fontSize = '2.7vw';
  document.getElementById('descr').style.marginLeft = '5%';
  document.getElementById('descr').style.marginRight = '5%';

  document.getElementById('call-me-icon').style.display = 'block';
  document.getElementById('call-me-icon').style.position = 'fixed';
  document.getElementById('call-me-icon').style.top = '85%';
  document.getElementById('call-me-icon').style.left = '78%';
  document.getElementById('call-me-icon').style.width = '15%';
  document.getElementById('call-me-icon').style.height = 'auto';
  document.getElementById('call-me-icon').style.zIndex = '3';
}

function redirect() {
  window.location.href = 'tel:660791170';
}

window.setInterval(function () {
  document.getElementById('mainMain').style.animation = 'goOut 2s ease forwards';
}, 10000);

window.setInterval(function () {
  document.getElementById('mainMain').style.animation = 'goIn 2s ease forwards';
}, 30000);
